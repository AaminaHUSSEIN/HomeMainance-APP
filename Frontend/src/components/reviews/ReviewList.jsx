import React from 'react'
import { FiStar, FiUser, FiCalendar, FiMessageCircle } from 'react-icons/fi'
import { format } from 'date-fns'

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
        <FiMessageCircle size={40} className="mx-auto text-slate-300 mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">No client testimonials yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Dynamic Header for the list */}
      <div className="flex items-center gap-4 mb-10 px-2">
        <div className="h-px flex-1 bg-slate-100"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-500 whitespace-nowrap">
          Community Feedback
        </span>
        <div className="h-px flex-1 bg-slate-100"></div>
      </div>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="group bg-white p-8 rounded-[2.5rem] border border-sky-50 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-sky-100/40 hover:-translate-y-1"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-4">
                {/* User Avatar Capsule */}
                <div className="relative">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-sky-500 border border-sky-50 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500">
                    <FiUser size={24} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
                </div>

                <div>
                  <p className="font-black text-slate-900 tracking-tighter text-lg leading-tight capitalize">
                    {review.user?.name || 'Verified Client'}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <FiCalendar className="text-slate-300" size={12} />
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      {format(new Date(review.createdAt), 'MMMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Score Badge */}
              <div className="flex items-center gap-1 bg-slate-50 px-4 py-2 rounded-xl group-hover:bg-sky-50 transition-colors">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={14}
                    className={`${
                      i < review.rating ? 'text-amber-400 fill-current' : 'text-slate-200'
                    }`}
                  />
                ))}
                <span className="ml-2 text-[10px] font-black text-slate-900">{review.rating.toFixed(1)}</span>
              </div>
            </div>

            {/* Comment Body */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-1 h-full bg-sky-100 rounded-full group-hover:bg-sky-500 transition-colors"></div>
              <p className="pl-6 text-slate-600 leading-relaxed font-medium text-sm italic">
                "{review.comment}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewList