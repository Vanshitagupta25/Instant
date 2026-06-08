'use client';

import { Send, Shield } from 'lucide-react';
import { useState } from 'react';

export default function PostCreator({ onCreatePost }: { onCreatePost: (content: string) => void }) {

  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onCreatePost(content);
      setContent('');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 space-y-4">
      {/* Premium Trust Banner */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary/15 to-accent/15 border border-primary/40 rounded-lg">
        <Shield size={16} className="text-primary flex-shrink-0" />
        <div className="text-sm">
          <span className="font-semibold text-primary">Identity Protected</span>
          <span className="text-foreground/80 ml-2">Share safely without attribution</span>
        </div>
      </div>

      {/* Prominent Creation Box Label */}
      <div className="px-4 py-2 rounded-lg bg-secondary/40">
        <p className="text-sm font-semibold text-foreground/90">Create an Anonymous Post...</p>
        <p className="text-xs text-foreground/60 mt-1">Your feedback matters. Speak freely without fear of attribution.</p>
      </div>

      {/* Input Area */}
      <div className="space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? Share your thoughts anonymously..."
          className="w-full min-h-20 px-4 py-3 bg-background border border-border/50 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none transition-all"
        />

        {/* Submit Button */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setContent('');
            }}
            className="px-4 py-2 rounded-lg bg-secondary/40 hover:bg-secondary/60 text-foreground/70 font-medium transition-colors text-sm"
          >
            Clear
          </button>
          <button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 disabled:from-muted disabled:to-muted disabled:text-muted-foreground disabled:cursor-not-allowed text-white font-semibold transition-all shadow-lg hover:shadow-primary/30 text-sm"
          >
            <Send size={16} />
            <span>Post Anonymously</span>
          </button>
        </div>
      </div>
    </div>
  );
}
