import { ContentManager } from "../content-database";
import type { ClipShareData } from "../types/clip";

export interface PrimeClipMessage {
  id: number;
  type: "clip";
  sender: string;
  content: string;
  timestamp: string;
  avatar: string;
  clipData: {
    title: string;
    thumbnail: string;
    duration: string;
    platform: "Prime Video";
    primeData: {
      contentId: string;
      startTime: number;
      endTime: number;
      clipId: string;
      sharedFrom: "Prime Video";
    };
  };
  reactionData?: {
    type: "text" | "voice";
    content: string;
    voiceBlob?: Blob;
    voiceDuration?: string;
    voiceBase64?: string;
    timestamp?: number;
  };
}

export class PrimeClipIntegration {
  static async shareClipToFireStories(clipShareData: ClipShareData): Promise<boolean> {
    try {
      const currentUser = this.getCurrentPrimeUser();
      if (!currentUser) {
        throw new Error("No current user found");
      }

      // Get content information from ContentManager
      const content = ContentManager.findContentByTitle(clipShareData.clipOptions.title) 
        || ContentManager.getContentById("featured-1"); // fallback

      // Prepare reaction data with proper voice handling
      let reactionData: any = undefined;
      if (clipShareData.message || clipShareData.voiceNote) {
        if (clipShareData.voiceNote) {
          const base64Audio = await this.blobToBase64(clipShareData.voiceNote.blob);
          reactionData = {
            type: "voice" as const,
            content: clipShareData.message || "Voice reaction",
            voiceBlob: clipShareData.voiceNote.blob,
            voiceDuration: this.formatDuration(clipShareData.voiceNote.duration),
            voiceBase64: base64Audio,
            timestamp: Date.now(),
          };
        } else if (clipShareData.message) {
          reactionData = {
            type: "text" as const,
            content: clipShareData.message,
            timestamp: Date.now(),
          };
        }
      }

      // Create Prime Video specific clip data using ContentManager
      const primeClipData = {
        id: `prime_clip_${Date.now()}`,
        contentId: content.id,
        contentTitle: content.title,
        contentThumbnail: content.thumbnail,
        startTime: clipShareData.clipOptions.timestamp,
        endTime: clipShareData.clipOptions.timestamp + clipShareData.clipOptions.duration,
        duration: clipShareData.clipOptions.duration,
        originalTitle: content.title,
      };

      console.log("Prime Clip Integration - Using ContentManager:", {
        requestedTitle: clipShareData.clipOptions.title,
        foundContent: content,
        contentId: content.id,
        thumbnail: content.thumbnail
      });

      // Send to FireStories MessageSystem
      const { MessageSystem } = await import("@/lib/message-system");

      const friendIds = clipShareData.selectedUsers.map((user) => parseInt(user.id));
      const campfireIds = clipShareData.selectedCampfires.map((campfire) => parseInt(campfire.id));

      MessageSystem.sendPrimeClipMessage(
        currentUser.id,
        friendIds,
        campfireIds,
        primeClipData,
        reactionData
      );

      return true;
    } catch (error) {
      console.error("Failed to share Prime clip to FireStories:", error);
      return false;
    }
  }

  private static getCurrentPrimeUser() {
    try {
      const userData = localStorage.getItem("prime-user");
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  private static blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert blob to base64"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private static formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  // Clear cache method for migration
  static clearAllCache(): void {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('firetv_') || key.startsWith('prime-'))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      console.log("Cleared all Prime Video cache for content database migration");
      window.location.reload();
    } catch (error) {
      console.error("Error clearing cache:", error);
    }
  }
}
