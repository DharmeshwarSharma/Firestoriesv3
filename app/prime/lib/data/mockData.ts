import { ContentManager, CONTENT_DATABASE, type ContentItem, type FeaturedContent } from '../content-database';

// Export types for backward compatibility
export type { ContentItem, FeaturedContent };

// Featured content carousel using centralized data
export const featuredContentCarousel: FeaturedContent[] = ContentManager.getFeaturedContent();

// Default featured content
export const featuredContent: FeaturedContent = featuredContentCarousel[0];

// Content arrays using centralized data
export const featuredOriginals: ContentItem[] = ContentManager.getFeaturedOriginals();
export const recentlyAdded: ContentItem[] = ContentManager.getRecentlyAdded();
export const popularMovies: ContentItem[] = ContentManager.getPopularMovies();
export const topTVShows: ContentItem[] = ContentManager.getTopTVShows();

// Updated getContentById function using centralized data
export const getContentById = (id: string): ContentItem | FeaturedContent => {
  const content = ContentManager.getContentById(id);
  
  if (content) {
    return content;
  }

  // Fallback for unknown IDs
  return {
    id,
    title: "Sample Content",
    description: "This is a sample description for the content. In a real application, this would be fetched from a database or API with detailed plot information and cast details.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    image: "/placeholder.svg?height=200&width=300",
    year: 2024,
    duration: "1h 30m",
    genre: "Drama, Thriller",
    rating: "TV-MA",
  };
};

export const recommendedContent: ContentItem[] = [
  ContentManager.getContentById("tv-1"),     // The Boys
  ContentManager.getContentById("movie-1"),  // The Tomorrow War
  ContentManager.getContentById("tv-4"),     // Jack Ryan  
  ContentManager.getContentById("tv-6"),     // Fallout
].filter(Boolean) as ContentItem[];
