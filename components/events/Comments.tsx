"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Reply, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Comment } from "@/types";

const SAMPLE_COMMENTS: Comment[] = [
  {
    id: "c1",
    author: "Priya Fernando",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80",
    text: "So excited for this! I attended the last one and it was absolutely amazing. The networking session alone was worth it 🙌",
    time: "2 days ago",
    likes: 12,
    replies: [
      {
        id: "c1r1",
        author: "Kasun Perera",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
        text: "Thanks Priya! We've made it even better this time. Can't wait to see you there 🎉",
        time: "1 day ago",
        likes: 5,
      },
    ],
  },
  {
    id: "c2",
    author: "Nuwan Fernando",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    text: "Will there be recordings available for those who can't make it in person?",
    time: "1 day ago",
    likes: 8,
  },
  {
    id: "c3",
    author: "Amaya Silva",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    text: "Just registered! Bringing 3 colleagues from my team. This is exactly what the Colombo tech scene needs 💪",
    time: "5 hours ago",
    likes: 15,
  },
];

function CommentItem({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) {
  const [liked, setLiked] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  return (
    <div className={cn("flex gap-3", isReply && "ml-10 mt-3")}>
      <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 border-cream-dark">
        <Image src={comment.avatar} alt={comment.author} fill className="object-cover" sizes="36px" />
      </div>
      <div className="flex-1">
        <div className="bg-cream-dark/50 rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-heading font-bold text-sm text-warm-black">{comment.author}</span>
            <span className="text-xs text-warm-muted font-mono">{comment.time}</span>
          </div>
          <p className="text-sm text-warm-gray font-body leading-relaxed">{comment.text}</p>
        </div>
        <div className="flex items-center gap-4 mt-1.5 px-2">
          <button
            onClick={() => setLiked(!liked)}
            className={cn(
              "flex items-center gap-1 text-xs font-semibold transition-colors",
              liked ? "text-coral" : "text-warm-muted hover:text-coral"
            )}
          >
            <Heart size={13} fill={liked ? "currentColor" : "none"} />
            {comment.likes + (liked ? 1 : 0)}
          </button>
          {!isReply && (
            <button
              onClick={() => setShowReply(!showReply)}
              className="flex items-center gap-1 text-xs font-semibold text-warm-muted hover:text-warm-gray transition-colors"
            >
              <Reply size={13} />
              Reply
            </button>
          )}
        </div>

        {/* Reply input */}
        {showReply && (
          <div className="mt-2 ml-1 flex gap-2">
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 px-4 py-2 rounded-full bg-white border border-[rgba(26,22,20,0.08)] text-sm font-body focus:outline-none focus:border-coral/30 transition-all"
            />
            <button
              onClick={() => { setReplyText(""); setShowReply(false); }}
              className="px-4 py-2 rounded-full bg-coral text-white text-xs font-semibold hover:bg-coral-light transition-colors"
            >
              Post
            </button>
          </div>
        )}

        {/* Nested replies */}
        {comment.replies?.map((reply) => (
          <CommentItem key={reply.id} comment={reply} isReply />
        ))}
      </div>
    </div>
  );
}

export default function Comments() {
  const [text, setText] = useState("");
  const [sort, setSort] = useState<"newest" | "top">("top");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-lg text-warm-black">
          Discussion ({SAMPLE_COMMENTS.length})
        </h3>
        <div className="flex items-center gap-1 p-1 bg-cream-dark rounded-xl">
          {(["top", "newest"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize",
                sort === s ? "bg-white shadow-warm-sm text-warm-black" : "text-warm-muted"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Comment input */}
      <div className="flex gap-3">
        <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 border-cream-dark">
          <Image
            src="https://images.unsplash.com/photo-1535713875002-d2d457cfdf7e?w=100&q=80"
            alt="You"
            fill
            className="object-cover"
            sizes="36px"
          />
        </div>
        <div className="flex-1 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts..."
            className="flex-1 px-5 py-3 rounded-full bg-white border border-[rgba(26,22,20,0.08)] text-sm font-body text-warm-black placeholder:text-warm-muted focus:outline-none focus:border-coral/30 focus:shadow-glow-coral transition-all shadow-warm-sm"
          />
          <button
            onClick={() => setText("")}
            disabled={!text.trim()}
            className="px-5 py-3 rounded-full bg-gradient-to-r from-coral to-gold text-white text-sm font-semibold disabled:opacity-40 hover:shadow-glow-coral transition-all"
          >
            Post
          </button>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-5">
        {SAMPLE_COMMENTS.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      <button className="flex items-center gap-2 text-sm font-semibold text-coral hover:underline mx-auto">
        <ChevronDown size={16} />
        Load more comments
      </button>
    </div>
  );
}
