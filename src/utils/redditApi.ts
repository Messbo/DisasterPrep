import axios from 'axios';
import { RedditResponse, RedditPost, TimeRange } from '../types/alerts';

const DISASTER_KEYWORDS = [
  'earthquake',
  'flood',
  'hurricane',
  'wildfire',
  'tornado',
  'storm',
  'volcano',
  'tsunami',
  'landslide',
  'drought',
];

const DISASTER_SUBREDDITS = [
  'naturaldisasters',
  'earthquake',
  'weather',
  'climate',
  'tropicalweather',
  'wildfire',
];

export const fetchRedditPosts = async (location: string, timeRange: TimeRange): Promise<RedditPost[]> => {
  try {
    const searchTerms = DISASTER_KEYWORDS.map(keyword => `${location} ${keyword}`);
    const subredditSearches = DISASTER_SUBREDDITS.map(subreddit => 
      axios.get<RedditResponse>(
        `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(location)}&restrict_sr=on&t=${timeRange}&sort=new`
      )
    );

    const keywordSearches = searchTerms.map(term =>
      axios.get<RedditResponse>(
        `https://www.reddit.com/search.json?q=${encodeURIComponent(term)}&t=${timeRange}&sort=new`
      )
    );

    const responses = await Promise.all([...subredditSearches, ...keywordSearches]);
    
    const allPosts = responses.flatMap(response => 
      response.data.data.children.map(child => ({
        ...child.data,
        disaster_types: DISASTER_KEYWORDS.filter(keyword => 
          child.data.title.toLowerCase().includes(keyword) || 
          child.data.selftext.toLowerCase().includes(keyword)
        ),
      }))
    );

    // Remove duplicates and sort by date
    const uniquePosts = Array.from(new Map(allPosts.map(post => [post.id, post])).values());
    const filteredPosts = uniquePosts.filter(post => post.disaster_types.length > 0);
    
    return filteredPosts.sort((a, b) => b.created_utc - a.created_utc);
  } catch (error) {
    console.error('Error fetching Reddit posts:', error);
    throw new Error('Failed to fetch disaster alerts');
  }
};