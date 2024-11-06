export type TimeRange = 'hour' | 'day' | 'week' | 'month' | 'year';

export interface RedditPost {
  id: string;
  title: string;
  selftext: string;
  created_utc: number;
  num_comments: number;
  subreddit: string;
  permalink: string;
  disaster_types: string[];
}

export interface RedditResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
  };
}