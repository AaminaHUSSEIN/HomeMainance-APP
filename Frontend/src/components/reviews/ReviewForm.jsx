// src/components/reviews/ReviewForm.jsx
import React from 'react'
import reviewService from '../../services/reviewService'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FiStar, FiSend, FiMessageSquare, FiActivity, FiAward } from 'react-icons/fi'

const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  comment: z.string().min(10, 'Review must be at least 10 characters long'),
})

const ReviewForm = ({ serviceId, providerId, onReviewAdded }) => {
  const [selectedRating, setSelectedRating] = React.useState(0)
  const [hoverRating, setHoverRating] = React.useState(0)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  })

  const handleRatingClick = (star) => {
    setSelectedRating(star)
    setValue('rating', star, { shouldValidate: true })
  }

  const onSubmit = async (data) => {
    try {
      await reviewService.create({
        service: serviceId,
        serviceProvider: providerId,
        rating: data.rating,
        comment: data.comment,
      })
      reset()
      setSelectedRating(0)
      if (onReviewAdded) onReviewAdded()
    } catch (error) {
      console.error('Error creating review:', error)
    }
  }

  return (
    <div className="bg-white rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-sky-50 overflow-hidden transition-all duration-500">
      
      {/* Premium Header */}
      <div className="bg-[#020617] p-10 relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-sky-500/20">
            <FiAward size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tighter text-white uppercase">Client <span className="text-sky-500">Insight</span></h2>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.4em]">Your feedback powers our ecosystem</p>
          </div>
        </div>
        <FiMessageSquare className="absolute -right-6 -bottom-6 text-white/[0.03] w-40 h-40 rotate-12" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-10">
        
        {/* Elite Star Selection */}
        <div className="flex flex-col items-center justify-center py-10 space-y-6 bg-slate-50/50 rounded-[2.5rem] border border-sky-50 relative overflow-hidden group">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Service Quality Assessment
          </label>
          
          <div className="flex space-x-3 relative z-10">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRatingClick(star)}
                className="group relative p-1 transition-all duration-300 active:scale-75"
              >
                <FiStar 
                  size={42} 
                  className={`transition-all duration-500 ${
                    (hoverRating || selectedRating) >= star 
                      ? 'text-amber-400 scale-110 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]' 
                      : 'text-slate-200'
                  }`} 
                  fill={(hoverRating || selectedRating) >= star ? "currentColor" : "none"} 
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>

          {errors.rating && (
            <p className="absolute bottom-4 text-[9px] font-black text-rose-500 uppercase tracking-widest animate-pulse">
              {errors.rating.message}
            </p>
          )}
        </div>

        {/* Professional Comment Area */}
        <div className="space-y-4">
          <div className="flex justify-between items-end px-2">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
              <FiMessageSquare className="text-sky-500" size={14} /> Performance Notes
            </label>
            {errors.comment && <span className="text-[9px] font-black text-rose-500 uppercase italic">Minimum 10 chars required</span>}
          </div>
          
          <textarea
            {...register('comment')}
            rows={4}
            className={`w-full px-8 py-6 bg-slate-50 border-2 rounded-[2rem] font-bold text-slate-900 transition-all duration-300 resize-none placeholder:text-slate-300 placeholder:font-medium text-sm ${
              errors.comment ? 'border-rose-100 bg-rose-50/30' : 'border-transparent focus:border-sky-100 focus:bg-white focus:shadow-inner'
            }`}
            placeholder="Document your experience with this specialist..."
          />
        </div>

        {/* Global Submit Action */}
        <button
          type="submit"
          disabled={isSubmitting || selectedRating === 0}
          className="group relative w-full h-20 bg-[#020617] text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.4em] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-sky-200 active:scale-[0.97] disabled:opacity-30 disabled:grayscale"
        >
          <div className="absolute inset-0 bg-sky-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          
          <span className="relative z-10 flex items-center justify-center gap-4">
            {isSubmitting ? (
              <>
                <FiActivity className="animate-spin" size={20} />
                Processing Transaction...
              </>
            ) : (
              <>
                Finalize Review <FiSend className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" size={16} />
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  )
}

export default ReviewForm