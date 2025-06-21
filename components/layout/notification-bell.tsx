"use client"
import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  sender: string
  message: string
  timestamp: string
  timestampValue: number // For proper sorting
  campfire?: string
  isNew: boolean
  type: 'clip' | 'message' | 'activity'
  avatar?: string
}

export function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  const formatTimestamp = (timestamp: string | number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  const getCampfireName = (campfireId: number) => {
    try {
      const netflixUser = JSON.parse(localStorage.getItem('netflix-user') || '{}')
      const primeUser = JSON.parse(localStorage.getItem('prime-user') || '{}')
      
      const campfires = netflixUser.campfires || primeUser.campfires || []
      const campfire = campfires.find((c: any) => c.id === campfireId)
      return campfire?.name || `Campfire ${campfireId}`
    } catch {
      return `Campfire ${campfireId}`
    }
  }

  const getUserName = (userId: number) => {
    try {
      const users = JSON.parse(localStorage.getItem('firetv_users') || '[]')
      const user = users.find((u: any) => u.id === userId)
      return user?.name || 'Unknown User'
    } catch {
      return 'Unknown User'
    }
  }

  const fetchNotifications = () => {
  const allNotifications: Notification[] = []
  const currentTime = new Date().getTime()
  const oneHourAgo = currentTime - (60 * 60 * 1000) // 1 hour ago

  try {
    const currentUser = JSON.parse(
      localStorage.getItem('netflix-user') ||
      localStorage.getItem('prime-user') ||
      '{}'
    )
    const currentUserId = currentUser?.id
    const userCampfires = currentUser?.campfires?.map((c: any) => c.id) || []

    // --- FireTV Pending Messages ---
    const pendingMessages = JSON.parse(localStorage.getItem('firetv_pending_messages') || '[]')
    pendingMessages.forEach((msg: any) => {
      const { fromUserId, toUserId, toCampfireId } = msg.route
      const messageTimestamp = new Date(msg.route.timestamp).getTime()
      const isRecent = messageTimestamp > oneHourAgo

      // Skip if sent by current user
      if (fromUserId === currentUserId) return

      // Skip if not for this user
      const isForThisUser =
        (toUserId && toUserId === currentUserId) ||
        (toCampfireId && userCampfires.includes(toCampfireId))
      if (!isForThisUser) return

      if (msg.message.type === 'clip') {
        let notificationMessage = ''
        let campfireName = ''

        if (toCampfireId) {
          campfireName = getCampfireName(toCampfireId)
          notificationMessage = `shared a clip from ${msg.message.clipData.title} in ${campfireName}`
        } else if (toUserId) {
          const recipientName = getUserName(toUserId)
          notificationMessage = `shared a clip from ${msg.message.clipData.title} with ${recipientName}`
        }

        allNotifications.push({
          id: `firetv_${msg.id}_${toUserId || toCampfireId}`,
          sender: msg.message.sender,
          message: notificationMessage,
          timestamp: formatTimestamp(messageTimestamp),
          timestampValue: messageTimestamp,
          campfire: campfireName || undefined,
          isNew: isRecent,
          type: 'clip',
          avatar: msg.message.avatar
        })
      }
    })

    // --- Netflix Shared Clips ---
    const netflixClips = JSON.parse(localStorage.getItem('netflix_shared_clips') || '[]')
    netflixClips.forEach((clip: any) => {
      const clipTimestamp = new Date(clip.createdAt).getTime()
      const isRecent = clipTimestamp > oneHourAgo

      // Skip if sent by current user
      if (clip.sharedBy.id === currentUserId) return

      const sharedWith = clip.sharedWith || []
      const isForThisUser =
        sharedWith.includes(currentUserId) ||
        (clip.shareTarget === 'campfires' && sharedWith.some((id: number) => userCampfires.includes(id)))

      if (!isForThisUser) return

      let notificationMessage = ''
      if (clip.shareTarget === 'campfires') {
        notificationMessage = `shared a clip from ${clip.contentTitle} in campfire`
      } else {
        notificationMessage = `shared a clip from ${clip.contentTitle} with friends`
      }

      allNotifications.push({
        id: `netflix_${clip.id}`,
        sender: clip.sharedBy.name,
        message: notificationMessage,
        timestamp: formatTimestamp(clipTimestamp),
        timestampValue: clipTimestamp,
        campfire: clip.shareTarget === 'campfires' ? 'Campfire' : undefined,
        isNew: isRecent,
        type: 'clip',
        avatar: clip.sharedBy.avatar
      })
    })

    // --- Activity from other users ---
    const users = JSON.parse(localStorage.getItem('firetv_users') || '[]')
    users.forEach((user: any) => {
      if (user.id !== currentUserId && user.isOnline) {
        const activityTime = currentTime - Math.random() * 1800000 // random last 30 mins
        const isRecent = activityTime > oneHourAgo

        if (isRecent && user.status !== 'Offline') {
          allNotifications.push({
            id: `activity_${user.id}_${activityTime}`,
            sender: user.name,
            message: `is now ${user.status}`,
            timestamp: formatTimestamp(activityTime),
            timestampValue: activityTime,
            isNew: true,
            type: 'activity',
            avatar: user.avatar
          })
        }
      }
    })

  } catch (error) {
    console.error('Error fetching notifications:', error)
  }

  // Sort by most recent
  allNotifications.sort((a, b) => b.timestampValue - a.timestampValue)

  // Remove duplicates and limit to top 20
  const uniqueNotifications = allNotifications.filter((notification, index, self) =>
    index === self.findIndex((n) => n.id === notification.id)
  ).slice(0, 20)

  setNotifications(uniqueNotifications)
}


  useEffect(() => {
    // Initial fetch
    fetchNotifications()
    
    // Refresh notifications every 10 seconds for more dynamic updates
    const interval = setInterval(fetchNotifications, 10000)
    
    // Listen for localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.includes('firetv_') || e.key?.includes('netflix_') || e.key?.includes('prime_')) {
        fetchNotifications()
      }
    }

    // Listen for focus events to refresh when user returns to tab
    const handleFocus = () => {
      fetchNotifications()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('focus', handleFocus)

    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  // Auto-refresh when notification panel is opened
  useEffect(() => {
    if (showNotifications) {
      fetchNotifications()
    }
  }, [showNotifications])

  const unreadCount = notifications.filter((n) => n.isNew).length

  const markAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isNew: false })))
  }

  return (
    <div className="relative">
      <button
        onClick={() => {
          setShowNotifications(!showNotifications)
          if (!showNotifications) {
            markAsRead()
          }
        }}
        className="relative p-2 text-gray-400 hover:text-[#ff6404] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#ff6404] rounded-lg"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#ff6404] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 top-12 w-80 bg-gray-950 border border-gray-800 rounded-lg shadow-2xl z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <h3 className="text-[#ff6404] font-semibold">Notifications</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={fetchNotifications}
                className="text-xs text-gray-400 hover:text-[#ff6404] transition-colors px-2 py-1 rounded hover:bg-gray-800"
              >
                Refresh Now
              </button>
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                No recent notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 border-b border-gray-900 hover:bg-gray-900 cursor-pointer transition-colors duration-300",
                    notification.isNew && "bg-[#ff6404]/10 border-l-2 border-l-[#ff6404]",
                  )}
                >
                  <div className="flex items-start space-x-3">
                    {notification.avatar ? (
                      <img 
                        src={notification.avatar} 
                        alt={notification.sender}
                        className="w-8 h-8 rounded-full flex-shrink-0 mt-1"
                      />
                    ) : (
                      <div className="w-2 h-2 bg-[#ff6404] rounded-full mt-2 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-white text-sm">
                        <span className="font-semibold text-[#ff6404]">{notification.sender}</span> {notification.message}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {notification.campfire && `${notification.campfire} • `}
                        {notification.timestamp}
                      </p>
                    </div>
                    {notification.isNew && (
                      <div className="w-2 h-2 bg-[#ff6404] rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
