"use client";

import type React from "react";
import { use } from "react";
import { ContentManager } from "../../lib/content-database";

import { useRouter } from "next/navigation";
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  SkipBack,
  SkipForward,
  Settings,
  Subtitles,
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ClipButton from "../../components/watch/ClipButton";

interface WatchPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function WatchPage({ params }: WatchPageProps) {
  const router = useRouter();
  const { id } = use(params); // Unwrap the Promise using React.use()
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [videoError, setVideoError] = useState(false);


  const content = ContentManager.getContentById(id);
  if (!content) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Content Not Found</h1>
          <p className="text-gray-400 mb-6">The requested content could not be found.</p>
          <button
            onClick={() => router.push('/prime')}
            className="bg-[#00A8E1] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#1FB6FF] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const timeParam = urlParams.get("t");
    console.log("Prime Video Player - URL params:", {
      timeParam,
      contentId: id,
    });
    if (timeParam) {
      const time = parseFloat(timeParam);
      if (!isNaN(time) && time >= 0) {
        console.log("Prime Video Player - Setting start time:", time);
        setStartTime(time);
      }
    }
  }, [id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => {
      setDuration(video.duration);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      // Only seek to start time once when metadata is loaded
      if (startTime !== null && video.duration > 0 && video.currentTime === 0) {
        const targetTime = Math.min(startTime, video.duration);
        video.currentTime = targetTime;
        setCurrentTime(targetTime);
        // Clear startTime to prevent further seeking
        setStartTime(null);
      }
    };

    const handleError = () => {
      console.error("Video loading error");
      setVideoError(true);
    };

    const handleCanPlay = () => {
      setVideoError(false);
    };


    video.addEventListener("error", handleError);
    video.addEventListener("canplay", handleCanPlay);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("error", handleError);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [startTime]);


  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video) {
      const newTime = (Number.parseFloat(e.target.value) / 100) * duration;
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Full Screen Video Player */}
      <div
        className="relative w-full h-full bg-black"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={
            "thumbnail" in content && content.thumbnail
              ? content.thumbnail
              : ("image" in content && content.image
                ? content.image
                : "/placeholder.svg?height=1080&width=1920")
          }
          onClick={togglePlay}
          autoPlay
          playsInline
        >
          <source
            src="https://firestories.s3.ap-south-1.amazonaws.com/videos/Kitne+Aadmi+The+-++Most+Famous+Dialogue+From+Sholay++Gabbar+Singh++Amazon+Prime+Video.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className={`absolute top-6 left-6 z-50 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm ${showControls ? "opacity-100" : "opacity-0"
            }`}
          aria-label="Go back"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Video Title (only shows briefly) */}
        <div
          className={`absolute top-6 left-1/2 transform -translate-x-1/2 z-40 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"
            }`}
        >
          <h1 className="text-white text-xl font-bold bg-black/60 px-6 py-2 rounded-full backdrop-blur-sm">
            {content.title}
          </h1>
        </div>

        {/* Video Controls */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"
            }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-8 video-controls">
            {/* Progress Bar */}
            <div className="mb-6 group/progress">
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={duration ? (currentTime / duration) * 100 : 0}
                  onChange={handleSeek}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer transition-all duration-300 group-hover/progress:h-3"
                  style={{
                    background: `linear-gradient(to right, #00A8E1 0%, #00A8E1 ${duration ? (currentTime / duration) * 100 : 0
                      }%, rgba(255,255,255,0.2) ${duration ? (currentTime / duration) * 100 : 0
                      }%, rgba(255,255,255,0.2) 100%)`,
                  }}
                  aria-label="Video progress"
                />
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-sm font-medium opacity-0 group-hover/progress:opacity-100 transition-opacity duration-300">
                  {formatTime(currentTime)}
                </div>
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-sm font-medium opacity-0 group-hover/progress:opacity-100 transition-opacity duration-300">
                  {formatTime(duration)}
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={togglePlay}
                  className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </button>
                <button
                  className="text-white hover:text-white/80 transition-all duration-300 hover:scale-110"
                  aria-label="Skip back"
                >
                  <SkipBack className="w-6 h-6" />
                </button>
                <button
                  className="text-white hover:text-white/80 transition-all duration-300 hover:scale-110"
                  aria-label="Skip forward"
                >
                  <SkipForward className="w-6 h-6" />
                </button>
                <button
                  className="text-white hover:text-white/80 transition-all duration-300 hover:scale-110"
                  aria-label="Volume"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
                <span className="text-white font-semibold text-lg">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="text-white hover:text-white/80 transition-all duration-300 hover:scale-110"
                  aria-label="Subtitles"
                >
                  <Subtitles className="w-6 h-6" />
                </button>
                <button
                  className="text-white hover:text-white/80 transition-all duration-300 hover:scale-110"
                  aria-label="Settings"
                >
                  <Settings className="w-6 h-6" />
                </button>
                <button
                  className="text-white hover:text-white/80 transition-all duration-300 hover:scale-110"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Clip This Moment Button */}
        <ClipButton
          currentTime={currentTime}
          contentTitle={content.title}
          contentThumbnail={"thumbnail" in content && content.thumbnail ? content.thumbnail : ("image" in content && content.image ? content.image : "/placeholder.svg?height=200&width=300")}
        />

      </div>
    </div>
  );
}
