"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { usePrimeAuthStore } from "../lib/stores/auth"
import { PrimeUserDataService } from "../lib/services/user-data"
import { useStorageListener } from "../hooks/use-storage-listener"
import { Suspense } from "react"
import ContentRow from "../components/home/ContentRow"
import LoadingSkeleton from "../components/ui/LoadingSkeleton"
import { Bookmark, Heart, Clock, Trash2 } from "lucide-react"
import { ContentManager } from "../lib/content-database"

export default function BookmarksPage() {
  const router = useRouter()
  const { user, setUser } = usePrimeAuthStore()
  const [loading, setLoading] = useState(true)
  const bookmarkedMovies = [
    ContentManager.getContentById("movie-1"), // The Tomorrow War
    ContentManager.getContentById("movie-3"), // Sound of Metal  
    ContentManager.getContentById("tv-4"),    // Jack Ryan
  ].filter(Boolean);

  const bookmarkedTVShows = [
    ContentManager.getContentById("tv-1"),    // The Boys
    ContentManager.getContentById("tv-2"),    // The Marvelous Mrs. Maisel
    ContentManager.getContentById("tv-6"),    // Fallout
  ].filter(Boolean);

  const continueWatching = [
    ContentManager.getContentById("featured-1"), // THE TRAITORS
    ContentManager.getContentById("movie-9"),    // Mission Impossible 2
  ].filter(Boolean);


  // Add storage listener for prime-user changes
  const { timestamp } = useStorageListener("prime-user")

  useEffect(() => {
    console.log('Prime Account: Storage change detected, reinitializing user data')

    // Clear current user and loading state
    setLoading(true)
    if (user) {
      setUser(null)
    }

    // Initialize user data from FireStories
    const completeUserData = PrimeUserDataService.initializeFromFireStories()

    if (completeUserData) {
      setUser(completeUserData)
      console.log('Prime Account: User initialized/updated:', {
        user: completeUserData.name,
        friends: completeUserData.friends?.length || 0,
        campfires: completeUserData.campfires?.length || 0
      })
    } else {
      // If no user data available, redirect to main app
      console.log('Prime Account: No user data found, redirecting to FireStories')
      router.push("/")
      return
    }

    setLoading(false)
  }, [timestamp, setUser, router]) // React to storage changes via timestamp


  return (
    <div className="min-h-screen bg-[#0F171E] pt-20 page-transition">
      {/* Header Section */}
      <div className="px-8 md:px-16 py-12">
        <div className="max-w-4xl">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#00A8E1] to-[#1FB6FF] rounded-full flex items-center justify-center shadow-lg">
              <Bookmark className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-6xl md:text-7xl font-black text-white tracking-tight leading-none">MY BOOKMARKS</h1>
              <p className="text-xl text-gray-300 mt-2">Your saved movies and TV shows</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 text-red-500" />
                <div>
                  <div className="text-white font-bold text-lg">
                    {bookmarkedMovies.length + bookmarkedTVShows.length}
                  </div>
                  <div className="text-gray-400 text-sm">Total Saved</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-blue-500" />
                <div>
                  <div className="text-white font-bold text-lg">{continueWatching.length}</div>
                  <div className="text-gray-400 text-sm">Continue Watching</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#00A8E1] to-[#1FB6FF] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">
                    {bookmarkedMovies.length + bookmarkedTVShows.length}
                  </div>
                  <div className="text-gray-400 text-sm">Prime Content</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
              <button className="flex items-center space-x-3 w-full text-left hover:bg-white/5 transition-colors duration-200 rounded-lg p-2 -m-2">
                <Trash2 className="w-6 h-6 text-gray-400" />
                <div>
                  <div className="text-white font-bold text-sm">Clear All</div>
                  <div className="text-gray-400 text-xs">Remove bookmarks</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-12">
        <Suspense fallback={<LoadingSkeleton type="row" />}>
          <ContentRow title="Continue Watching" items={continueWatching} />
        </Suspense>

        <Suspense fallback={<LoadingSkeleton type="row" />}>
          <ContentRow title="Bookmarked Movies" items={bookmarkedMovies} />
        </Suspense>

        <Suspense fallback={<LoadingSkeleton type="row" />}>
          <ContentRow title="Bookmarked TV Shows" items={bookmarkedTVShows} />
        </Suspense>
      </div>

      {/* Empty State (if no bookmarks) */}
      {bookmarkedMovies.length === 0 && bookmarkedTVShows.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-8">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <Bookmark className="w-12 h-12 text-gray-500" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-4">No bookmarks yet</h2>
          <p className="text-gray-400 text-center max-w-md mb-8">
            Start exploring and bookmark your favorite movies and TV shows to see them here.
          </p>
          <button className="bg-gradient-to-r from-[#00A8E1] to-[#1FB6FF] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
            Browse Content
          </button>
        </div>
      )}
    </div>
  )
}
