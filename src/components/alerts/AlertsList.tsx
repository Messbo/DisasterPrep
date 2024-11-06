import React from 'react';
import { Calendar, MessageCircle, ExternalLink } from 'lucide-react';
import { RedditPost } from '../../types/alerts';

interface AlertsListProps {
  posts: RedditPost[];
}

const AlertsList: React.FC<AlertsListProps> = ({ posts }) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <a
                href={`https://reddit.com${post.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                <ExternalLink size={20} />
              </a>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.created_utc)}
              </span>
              <span className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {post.num_comments} comments
              </span>
              <span className="text-blue-500">r/{post.subreddit}</span>
            </div>
            
            <p className="text-gray-600 mb-4">{post.selftext.slice(0, 300)}...</p>
            
            <div className="flex flex-wrap gap-2">
              {post.disaster_types.map((type) => (
                <span
                  key={type}
                  className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertsList;