// src/components/bookings/BookingStatus.jsx
import React from 'react'
import { FiCheckCircle, FiClock, FiXCircle, FiActivity, FiArrowUpRight } from 'react-icons/fi'

const BookingStatus = ({ status }) => {
  const statusConfig = {
    pending: {
      icon: FiClock,
      color: 'text-sky-600',
      bg: 'bg-sky-50/50',
      border: 'border-sky-100',
      dot: 'bg-sky-400',
      label: 'Awaiting Approval',
      description: 'Request is in queue for verification.',
    },
    confirmed: {
      icon: FiActivity,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50/50',
      border: 'border-indigo-100',
      dot: 'bg-indigo-500',
      label: 'Confirmed',
      description: 'Provider is scheduled for arrival.',
    },
    completed: {
      icon: FiCheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50/50',
      border: 'border-emerald-100',
      dot: 'bg-emerald-500',
      label: 'Service Completed',
      description: 'Successfully delivered and finalized.',
    },
    cancelled: {
      icon: FiXCircle,
      color: 'text-rose-600',
      bg: 'bg-rose-50/50',
      border: 'border-rose-100',
      dot: 'bg-rose-500',
      label: 'Revoked',
      description: 'This booking has been cancelled.',
    },
  }

  const config = statusConfig[status] || statusConfig.pending
  const Icon = config.icon

  return (
    <div className="flex flex-col gap-3 group">
      {/* Status Badge Container */}
      <div 
        className={`inline-flex items-center self-start gap-3 px-5 py-2.5 rounded-full border backdrop-blur-md ${config.bg} ${config.border} transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:shadow-lg group-hover:-translate-y-0.5`}
      >
        {/* Animated Status Indicator */}
        <div className="relative flex h-2.5 w-2.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.dot} opacity-40`}></span>
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${config.dot} shadow-[0_0_10px_rgba(0,0,0,0.1)]`}></span>
        </div>

        {/* Status Text & Icon */}
        <div className="flex items-center gap-2">
          <Icon className={`${config.color} group-hover:scale-110 transition-transform`} size={14} />
          <span className={`text-[11px] font-black uppercase tracking-[0.25em] ${config.color} leading-none`}>
            {config.label}
          </span>
        </div>
        
        {/* Subtle Decorative Element */}
        <FiArrowUpRight size={10} className={`${config.color} opacity-30`} />
      </div>

      {/* Modern Sub-text */}
      <div className="flex items-center gap-2 ml-1">
        <div className={`w-1 h-1 rounded-full ${config.dot} opacity-30`}></div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {config.description}
        </p>
      </div>
    </div>
  )
}

export default BookingStatus