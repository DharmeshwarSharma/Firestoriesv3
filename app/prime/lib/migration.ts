import { ContentManager } from './content-database';

export class PrimeContentMigration {
  static migrateToNewSystem(): boolean {
    try {
      console.log("Starting Prime Video content migration...");
      
      // Clear old cached data
      this.clearLegacyCache();
      
      // Verify new system works
      const testContent = ContentManager.getContentById("tv-6"); // Fallout
      if (!testContent) {
        throw new Error("Content database not properly initialized");
      }
      
      console.log("Migration successful. Test content:", testContent.title);
      
      // Set migration flag
      localStorage.setItem("prime-migration-complete", "true");
      
      return true;
    } catch (error) {
      console.error("Migration failed:", error);
      return false;
    }
  }
  
  static isMigrationComplete(): boolean {
    return localStorage.getItem("prime-migration-complete") === "true";
  }
  
  private static clearLegacyCache(): void {
    const legacyKeys = [
      'firetv_chats',
      'firetv_messages',
      'prime-clip-cache'
    ];
    
    // Clear specific legacy keys
    legacyKeys.forEach(key => localStorage.removeItem(key));
    
    // Clear any chat data that might have wrong thumbnails
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith('firetv_chat_')) {
        localStorage.removeItem(key);
      }
    }
    
    console.log("Cleared legacy cache data");
  }
}
