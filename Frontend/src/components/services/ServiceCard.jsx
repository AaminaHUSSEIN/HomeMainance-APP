import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiLock } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext'; 
import toast from 'react-hot-toast';

const ServiceCard = ({ service }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handlePush = () => {
    if (isAuthenticated) {
      // encodeURIComponent waxay hubinaysaa in (Spac-yada) iyo ( ) aysan jabin URL-ka
      const type = encodeURIComponent(service.name);
      navigate(`/providers?serviceType=${type}&serviceId=${service._id}`);
    } else {
      toast.error("Fadlan marka hore is-diiwaangeli!");
      navigate('/register');
    }
  };

  return (
    <div className="group bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
      <div className="p-6">
        <h3 className="text-xl font-black text-slate-900 mb-4">{service.name}</h3>
        
        <button
          onClick={handlePush}
          className={`flex items-center justify-between w-full px-5 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
            isAuthenticated 
              ? "bg-blue-600 text-white hover:bg-slate-900 shadow-lg shadow-blue-100 active:scale-95" 
              : "bg-slate-50 text-slate-400 border border-dashed border-slate-300 cursor-pointer"
          }`}
        >
          <span>{isAuthenticated ? "View Specialists" : "Register to View"}</span>
          
          {isAuthenticated ? (
            <FiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          ) : (
            <FiLock size={16} />
          )}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;