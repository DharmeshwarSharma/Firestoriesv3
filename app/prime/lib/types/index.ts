
export interface FeaturedContent extends ContentItem {
  backgroundImage: string;
  description: string;
  imdbRating: string;
}


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



export interface ContentRowProps {
  title: string
  items: ContentItem[]
  seeMoreLink?: string
}

