// Centralized content database for Prime Video
export interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  backgroundImage?: string;
  year: number;
  duration: string;
  rating: string;
  genre: string;
  badge?: string;
  isPrime: boolean;
  description?: string;
  episodeInfo?: string;
  newEpisodeInfo?: string;
  imdbRating?: string;
  type: 'movie' | 'tv' | 'original';
  category: 'action' | 'comedy' | 'drama' | 'sci-fi' | 'reality' | 'thriller' | 'horror' | 'biography' | 'superhero' | 'fantasy';
}

export interface FeaturedContent extends ContentItem {
  backgroundImage: string;
  description: string;
  episodeInfo?: string;
  newEpisodeInfo?: string;
  imdbRating: string;
}

// Master content database - single source of truth
export const CONTENT_DATABASE: { [key: string]: ContentItem } = {
  // Featured Content
  "featured-1": {
    id: "featured-1",
    title: "Sholay",
    thumbnail: "https://i.pinimg.com/736x/34/5a/24/345a24ace17936febd4c6cd31c3197a7.jpg",
    backgroundImage: "https://i.pinimg.com/736x/34/5a/24/345a24ace17936febd4c6cd31c3197a7.jpg",
    year: 2024,
    duration: "1hr 45m",
    rating: "TV-MA",
    genre: "All Time Classic",
    isPrime: true,
    type: "original",
    category: "reality",
    description: "The all time classic Sholay , rewatch to have the nostalgia.",
    imdbRating: "9",
    badge: "TOP 10"
  },

  // TV Shows
  "tv-1": {
    id: "tv-1",
    title: "The Boys",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/the+boys.avif",
    backgroundImage: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/the+boys.avif",
    year: 2024,
    duration: "1h 2m",
    rating: "TV-MA",
    genre: "Superhero",
    isPrime: true,
    type: "tv",
    category: "superhero",
    description: "Season 4 · A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.",
    imdbRating: "8.7",
    badge: "WATCHING"
  },

  "tv-2": {
    id: "tv-2",
    title: "The Marvelous Mrs. Maisel",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/the+marvelous+show.jpeg",
    year: 2023,
    duration: "52m",
    rating: "TV-MA",
    genre: "Comedy-Drama",
    isPrime: true,
    type: "tv",
    category: "comedy",
    imdbRating: "8.7"
  },

  "tv-3": {
    id: "tv-3",
    title: "The Power",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/the+power.webp",
    year: 2023,
    duration: "52m",
    rating: "TV-MA", 
    genre: "Sci-Fi",
    isPrime: true,
    type: "tv",
    category: "sci-fi",
    imdbRating: "7.6"
  },

  "tv-4": {
    id: "tv-4",
    title: "Jack Ryan",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/Jack+Ryan.png",
    year: 2024,
    duration: "58m",
    rating: "TV-MA",
    genre: "Thriller",
    isPrime: true,
    type: "tv",
    category: "thriller",
    imdbRating: "8.1"
  },

  "tv-5": {
    id: "tv-5",
    title: "Reacher",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/reacher.jpg",
    backgroundImage: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/reacher.jpg",
    year: 2021,
    duration: "1h 32m",
    rating: "TV-MA",
    genre: "Action",
    isPrime: true,
    type: "tv",
    category: "action",
    imdbRating: "7.4",
    badge: "TOP 10"
  },

  "tv-6": {
    id: "tv-6",
    title: "Fallout",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/fallout.webp",
    backgroundImage: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/fallout.webp",
    year: 2024,
    duration: "1h 5m",
    rating: "TV-MA",
    genre: "Sci-Fi",
    isPrime: true,
    type: "tv",
    category: "sci-fi",
    description: "Based on one of the greatest video game series of all time, Fallout is the story of haves and have-nots in a world in which there's almost nothing left to have.",
    imdbRating: "8.6",
    badge: "NEW EPISODES"
  },

  "tv-7": {
    id: "tv-7",
    title: "The Wheel of Time",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/the+wheelc+of+time.jpeg",
    year: 2023,
    duration: "58m",
    rating: "TV-14",
    genre: "Fantasy",
    isPrime: true,
    type: "tv",
    category: "fantasy",
    imdbRating: "6.5"
  },

  // Movies
  "movie-1": {
    id: "movie-1",
    title: "The Tomorrow War",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/The+tomorrow+war.png",
    backgroundImage: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/The+tomorrow+war.png",
    year: 2021,
    duration: "2h 18m",
    rating: "PG-13",
    genre: "Action",
    isPrime: true,
    type: "movie",
    category: "action",
    description: "A family man is drafted to fight in a future war where the fate of humanity relies on his ability to confront the past.",
    imdbRating: "6.5",
    badge: "BOOKMARKED"
  },

  "movie-2": {
    id: "movie-2",
    title: "Mr. & Mrs. Smith",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/mr+ans+mrs+smith.jpg",
    backgroundImage: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/mr+ans+mrs+smith.jpg",
    year: 2024,
    duration: "1h 50m",
    rating: "TV-MA",
    genre: "Action",
    isPrime: true,
    type: "movie",
    category: "action",
    description: "Two strangers land jobs with a spy agency that offers them a glorious life of espionage, wealth, world travel, and a dream house in the suburbs.",
    imdbRating: "7.2"
  },

  "movie-3": {
    id: "movie-3",
    title: "Sound of Metal",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/sound+of+metal.jpg",
    year: 2020,
    duration: "2h 0m",
    rating: "R",
    genre: "Drama",
    isPrime: true,
    type: "movie",
    category: "drama",
    imdbRating: "7.7"
  },

  "movie-4": {
    id: "movie-4",
    title: "The Bear",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/the+bear.jpeg",
    year: 2021,
    duration: "2h 8m",
    rating: "R",
    genre: "Drama",
    isPrime: true,
    type: "movie",
    category: "drama",
    imdbRating: "6.8"
  },

  "movie-5": {
    id: "movie-5",
    title: "Coming 2 America",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/coming+2+america.jpeg",
    year: 2021,
    duration: "1h 50m",
    rating: "PG-13",
    genre: "Comedy",
    isPrime: true,
    type: "movie",
    category: "comedy",
    imdbRating: "5.3",
    badge: "NEW"
  },

  "movie-6": {
    id: "movie-6",
    title: "Final Destination 2",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/Final+Destination+2.jpg",
    year: 2024,
    duration: "2h 8m",
    rating: "R",
    genre: "Horror",
    isPrime: true,
    type: "movie",
    category: "horror",
    imdbRating: "6.8",
    badge: "AWARD WINNER"
  },

  "movie-7": {
    id: "movie-7",
    title: "Final Destination 4",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/Final+Destination+4.jpg",
    year: 2020,
    duration: "2h 0m",
    rating: "R", 
    genre: "Horror",
    isPrime: true,
    type: "movie",
    category: "horror",
    imdbRating: "7.7",
    badge: "AWARD WINNER"
  },

  "movie-8": {
    id: "movie-8",
    title: "Mission Impossible 1",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/MI+1.webp",
    year: 2023,
    duration: "1h 51m",
    rating: "PG-13",
    genre: "Action",
    isPrime: true,
    type: "movie",
    category: "action",
    imdbRating: "7.4"
  },

  "movie-9": {
    id: "movie-9",
    title: "Mission Impossible 4",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/MI+4.jpg",
    year: 2014,
    duration: "1h 41m",
    rating: "PG-13",
    genre: "Action",
    isPrime: true,
    type: "movie",
    category: "action",
    imdbRating: "7.4",
    badge: "TOP 10"
  },

  "movie-10": {
    id: "movie-10",
    title: "Mission Impossible 7",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/MI7.jpg",
    year: 2021,
    duration: "2h 18m",
    rating: "PG-13",
    genre: "Action",
    isPrime: true,
    type: "movie",
    category: "action",
    imdbRating: "6.5",
    badge: "TOP 10"
  },

  // Originals
  "original-1": {
    id: "original-1",
    title: "Citadel",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/citadel.jpeg",
    year: 2024,
    duration: "38m",
    rating: "TV-MA",
    genre: "Action",
    isPrime: true,
    type: "original",
    category: "action",
    imdbRating: "8.5",
    badge: "NEW SERIES"
  },

  "original-2": {
    id: "original-2", 
    title: "Being The Ricardos",
    thumbnail: "https://firestories.s3.ap-south-1.amazonaws.com/prime-images/being+the+ricardos.jpg",
    year: 2024,
    duration: "2h 17m",
    rating: "PG-13",
    genre: "Drama",
    isPrime: true,
    type: "original",
    category: "drama",
    imdbRating: "7.8"
  }
};

// Content categorization and filtering functions
export class ContentManager {
    

  static getContentById(id: string): ContentItem | null {
    return CONTENT_DATABASE[id] || null;
  }

  static getAllContent(): ContentItem[] {
    return Object.values(CONTENT_DATABASE);
  }

  static getContentByType(type: 'movie' | 'tv' | 'original'): ContentItem[] {
    return Object.values(CONTENT_DATABASE).filter(item => item.type === type);
  }

  static getContentByCategory(category: string): ContentItem[] {
    return Object.values(CONTENT_DATABASE).filter(item => item.category === category);
  }

  static getFeaturedContent(): FeaturedContent[] {
    return Object.values(CONTENT_DATABASE).filter(item => 
      item.backgroundImage && item.description && item.imdbRating
    ) as FeaturedContent[];
  }

  static getRecentlyAdded(): ContentItem[] {
    return [
      CONTENT_DATABASE["movie-6"], // Final Destination 2
      CONTENT_DATABASE["tv-6"],    // Fallout
      CONTENT_DATABASE["tv-2"],    // The Marvelous Mrs. Maisel
      CONTENT_DATABASE["tv-4"],    // Jack Ryan
      CONTENT_DATABASE["movie-8"], // Mission Impossible 1
    ].filter(Boolean);
  }

  static getPopularMovies(): ContentItem[] {
    return [
      CONTENT_DATABASE["movie-10"], // Mission Impossible 7
      CONTENT_DATABASE["movie-2"],  // Mr & Mrs Smith
      CONTENT_DATABASE["movie-3"],  // Sound of Metal
      CONTENT_DATABASE["movie-4"],  // The Bear
      CONTENT_DATABASE["tv-1"],     // The Boys
    ].filter(Boolean);
  }

  static getTopTVShows(): ContentItem[] {
    return [
      CONTENT_DATABASE["tv-2"],  // The Marvelous Mrs. Maisel
      CONTENT_DATABASE["tv-3"],  // The Power
      CONTENT_DATABASE["movie-1"], // The Tomorrow War
      CONTENT_DATABASE["featured-1"], // The Traitors
      CONTENT_DATABASE["tv-7"],  // The Wheel of Time
    ].filter(Boolean);
  }

  static getFeaturedOriginals(): ContentItem[] {
    return [
      CONTENT_DATABASE["featured-1"], // THE TRAITORS
      CONTENT_DATABASE["original-2"], // Being The Ricardos
      CONTENT_DATABASE["original-1"], // Citadel
      CONTENT_DATABASE["movie-5"],    // Coming 2 America
      CONTENT_DATABASE["tv-6"],       // Fallout
    ].filter(Boolean);
  }

  static getActionMovies(): ContentItem[] {
    return this.getContentByCategory('action').filter(item => item.type === 'movie');
  }

  static getComedyMovies(): ContentItem[] {
    return this.getContentByCategory('comedy');
  }

  static getDramaMovies(): ContentItem[] {
    return this.getContentByCategory('drama');
  }

  static getActionSeries(): ContentItem[] {
    return this.getContentByCategory('action').filter(item => item.type === 'tv');
  }

  static getComedySeries(): ContentItem[] {
    return this.getContentByCategory('comedy').filter(item => item.type === 'tv');
  }

  static getDramaSeries(): ContentItem[] {
    return this.getContentByCategory('drama').filter(item => item.type === 'tv');
  }

  // Content search and mapping
  static findContentByTitle(title: string): ContentItem | null {
    const titleLower = title.toLowerCase().trim();
    
    // Direct title match
    const content = Object.values(CONTENT_DATABASE).find(item => 
      item.title.toLowerCase() === titleLower
    );
    
    if (content) return content;

    // Partial title match
    return Object.values(CONTENT_DATABASE).find(item =>
      item.title.toLowerCase().includes(titleLower) ||
      titleLower.includes(item.title.toLowerCase())
    ) || null;
  }

  static getContentThumbnail(id: string): string {
    const content = this.getContentById(id);
    return content?.thumbnail || "/placeholder.svg?height=200&width=300";
  }

  static getContentBackgroundImage(id: string): string {
    const content = this.getContentById(id);
    return content?.backgroundImage || content?.thumbnail || "/placeholder.svg?height=1080&width=1920";
  }
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
      
      // Also clear any message data that might have incorrect thumbnails
      this.clearMessageCache();
      
      // Reload page to ensure fresh start
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error clearing cache:", error);
    }
  }

  static clearMessageCache(): void {
    try {
      // Clear all chat-related storage that might contain incorrect thumbnails
      const messageKeys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
          key.startsWith('firetv_chat_') || 
          key.startsWith('firetv_messages') ||
          key.includes('clip_cache') ||
          key.includes('pending_messages')
        )) {
          messageKeys.push(key);
        }
      }
      
      messageKeys.forEach(key => {
        localStorage.removeItem(key);
        console.log(`Removed cached data: ${key}`);
      });
      
      console.log(`Cleared ${messageKeys.length} message cache entries`);
    } catch (error) {
      console.error("Error clearing message cache:", error);
    }
  }

  static validateContentDatabase(): boolean {
    try {
      // Test that essential content exists
      const testItems = [
        'tv-6',    // Fallout
        'tv-1',    // The Boys  
        'movie-1', // The Tomorrow War
        'movie-2', // Mr. & Mrs. Smith
        'featured-1' // The Traitors
      ];

      for (const id of testItems) {
        const content = this.getContentById(id);
        if (!content) {
          console.error(`Content validation failed: ${id} not found`);
          return false;
        }
        
        if (!content.thumbnail || content.thumbnail.includes('placeholder')) {
          console.warn(`Content ${id} has placeholder thumbnail`);
        }
      }

      console.log("Content database validation passed");
      return true;
    } catch (error) {
      console.error("Content database validation failed:", error);
      return false;
    }
  }

  static runDiagnostics(): void {
    console.log("=== Prime Video Content Database Diagnostics ===");
    
    // Count content by type
    const allContent = this.getAllContent();
    const movieCount = allContent.filter(item => item.type === 'movie').length;
    const tvCount = allContent.filter(item => item.type === 'tv').length;
    const originalCount = allContent.filter(item => item.type === 'original').length;
    
    console.log(`Total content items: ${allContent.length}`);
    console.log(`Movies: ${movieCount}`);
    console.log(`TV Shows: ${tvCount}`);
    console.log(`Originals: ${originalCount}`);
    
    // Test key functionality
    console.log("\n=== Testing Search Functionality ===");
    const searchTests = ['fallout', 'boys', 'smith', 'traitors'];
    searchTests.forEach(term => {
      const result = this.findContentByTitle(term);
      console.log(`Search '${term}': ${result ? result.title : 'Not found'}`);
    });
    
    // Validate thumbnails
    console.log("\n=== Thumbnail Validation ===");
    let placeholderCount = 0;
    allContent.forEach(item => {
      if (item.thumbnail.includes('placeholder')) {
        placeholderCount++;
        console.warn(`${item.id} (${item.title}) has placeholder thumbnail`);
      }
    });
    console.log(`Items with placeholder thumbnails: ${placeholderCount}`);
    
    // Test content retrieval
    console.log("\n=== Content Retrieval Test ===");
    console.log("Featured content:", this.getFeaturedContent().map(c => c.title));
    console.log("Recent content:", this.getRecentlyAdded().map(c => c.title));
    console.log("Popular movies:", this.getPopularMovies().map(c => c.title));
    
    console.log("=== Diagnostics Complete ===");
  }

  // Emergency reset method
  static emergencyReset(): void {
    try {
      console.log("Performing emergency reset of Prime Video data...");
      
      // Clear ALL localStorage
      localStorage.clear();
      
      // Reload page
      if (typeof window !== 'undefined') {
        alert("Emergency reset complete. Page will reload.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Emergency reset failed:", error);
    }
  }
}

