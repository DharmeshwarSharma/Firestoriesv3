"use client"
import { useStorageListener } from "../hooks/use-storage-listener"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { usePrimeAuthStore } from "../lib/stores/auth"
import { PrimeUserDataService } from "../lib/services/user-data"
import { ContentManager } from "../lib/content-database"
import { Suspense } from "react"
import ContentRow from "../components/home/ContentRow"
import FeaturedBanner from "../components/home/FeaturedBanner"
import LoadingSkeleton from "../components/ui/LoadingSkeleton"




export default function MoviesPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { user, setUser } = usePrimeAuthStore()
  const featuredMovie = ContentManager.getFeaturedContent()[1] || ContentManager.getFeaturedContent()[0]; // Use second featured or fallback to first
  const actionMovies = ContentManager.getActionMovies();
  const comedyMovies = ContentManager.getComedyMovies();
  const dramaMovies = ContentManager.getDramaMovies();
  const popularMovies = ContentManager.getPopularMovies();
  const recentlyAdded = ContentManager.getRecentlyAdded();

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
    <div className="pt-20 page-transition">
      <Suspense fallback={<LoadingSkeleton type="hero" />}>
        <FeaturedBanner content={featuredMovie} />
      </Suspense>

      <div className="py-12 space-y-12">
        <Suspense fallback={<LoadingSkeleton type="row" />}>
          <ContentRow title="Popular Movies" items={popularMovies} seeMoreLink="#" />
        </Suspense>

        <Suspense fallback={<LoadingSkeleton type="row" />}>
          <ContentRow title="Action & Adventure" items={actionMovies} seeMoreLink="#" />
        </Suspense>

        <Suspense fallback={<LoadingSkeleton type="row" />}>
          <ContentRow title="Comedy Movies" items={comedyMovies} seeMoreLink="#" />
        </Suspense>

        <Suspense fallback={<LoadingSkeleton type="row" />}>
          <ContentRow title="Award-Winning Dramas" items={dramaMovies} seeMoreLink="#" />
        </Suspense>

        <Suspense fallback={<LoadingSkeleton type="row" />}>
          <ContentRow title="Recently Added Movies" items={recentlyAdded} seeMoreLink="#" />
        </Suspense>
      </div>
    </div>
  )
}

