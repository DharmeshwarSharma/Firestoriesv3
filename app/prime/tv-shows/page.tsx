"use client"
import { Suspense } from "react"
import ContentRow from "../components/home/ContentRow"
import FeaturedBanner from "../components/home/FeaturedBanner"
import { useRouter } from "next/navigation"
import { usePrimeAuthStore } from "../lib/stores/auth"
import { useEffect, useState } from "react"
import { PrimeUserDataService } from "../lib/services/user-data"
import LoadingSkeleton from "../components/ui/LoadingSkeleton"
import { useStorageListener } from "../hooks/use-storage-listener"
import { ContentManager } from "../lib/content-database"



export default function TvShowPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { user, setUser } = usePrimeAuthStore()  // Add storage listener for prime-user changes
  const { timestamp } = useStorageListener("prime-user")
  const featuredShow = ContentManager.getContentById("tv-5"); // Reacher
  const topTVShows = ContentManager.getTopTVShows();
  const actionSeries = ContentManager.getActionSeries();
  const comedySeries = ContentManager.getComedySeries();
  const dramaSeries = ContentManager.getDramaSeries();
  const recentlyAdded = ContentManager.getRecentlyAdded().filter(item => item.type === 'tv');


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
        <FeaturedBanner content={featuredShow} />
      </Suspense>

      <div className="py-12 space-y-12">
        <Suspense fallback={<LoadingSkeleton type="row" />}>
          <ContentRow title="Popular Series" items={topTVShows} seeMoreLink="#" />
        </Suspense>

        <Suspense fallback={<LoadingSkeleton type="row" />}>
          <ContentRow title="Action Series" items={actionSeries} seeMoreLink="#" />
        </Suspense>

        <Suspense fallback={<LoadingSkeleton type="row" />}>
          <ContentRow title="Comedy Series" items={comedySeries} seeMoreLink="#" />
        </Suspense>

        <Suspense fallback={<LoadingSkeleton type="row" />}>
          <ContentRow title="Recently Added Series" items={recentlyAdded} seeMoreLink="#" />
        </Suspense>
      </div>
    </div>
  )
}

