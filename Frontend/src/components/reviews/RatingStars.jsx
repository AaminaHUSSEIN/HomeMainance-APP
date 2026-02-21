// src/components/reviews/RatingStars.jsx
import React from 'react'
import { FiStar } from 'react-icons/fi'

const RatingStars = ({ rating, size = 18, interactive = false, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5]

  if (interactive) {
    return (
      <div className="flex items-center gap-1.5 p-2 bg-slate-50/50 rounded-2xl border border-slate-100 w-fit">
        {stars.map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`p-1.5 rounded-xl transition-all duration-300 transform active:scale-90 ${
              star <= rating 
                ? 'text-amber-400 bg-white shadow-sm scale-110 rotate-12' 
                : 'text-slate-300 hover:text-amber-300 hover:bg-white/80'
            }`}
            aria-label={`Rate ${star} stars`}
          >
            <FiStar 
              size={size} 
              fill={star <= rating ? "currentColor" : "none"} 
              strokeWidth={star <= rating ? 2 : 1.5}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-sky-50 shadow-sm w-fit">
      <div className="flex items-center gap-0.5">
        {stars.map((star) => (
          <FiStar
            key={star}
            className={`${
              star <= rating 
                ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]' 
                : 'text-slate-200'
            } transition-all duration-500`}
            size={size}
            fill={star <= rating ? "currentColor" : "none"}
            strokeWidth={2}
          />
        ))}
      </div>
      
      <div className="flex items-center gap-1.5 border-l border-slate-100 pl-3">
        <span className="text-[11px] font-black text-slate-900 tracking-tighter">
          {rating.toFixed(1)}
        </span>
        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
          Score
        </span>
      </div>
    </div>
  )
}

export default RatingStars