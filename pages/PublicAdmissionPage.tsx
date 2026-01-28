
import React, { useState } from 'react';
import { ICONS } from '../constants';

const PublicAdmissionPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', prevInst: '', address: '', program: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-8">
        <div className="max-w-xl bg-white dark:bg-[#251808] p-12 md:p-20 rounded-[4rem] text-center border border-duii-secondary/20 dark:border-white/5 shadow-2xl space-y-8 animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
          </div>
          <h2 className="text-4xl font-black text-duii-primary dark:text-white uppercase tracking-tighter">Jazakallah Khayran!</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Your application has been received into our registry. Our administrative team will reach out to you via the provided contact details within 48 hours.</p>
          <button onClick={() => setSubmitted(false)} className="px-10 py-4 bg-duii-primary text-duii-secondary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all">Enroll Another Student</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-duii-primary dark:text-white uppercase tracking-tight">Admission Entry</h1>
          <p className="text-duii-secondary font-bold text-xs uppercase tracking-[0.3em]">Enrollment For 2024 Session</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#251808] p-8 md:p-16 rounded-[3rem] shadow-2xl border border-duii-secondary/10 dark:border-white/5 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-duii-primary dark:text-duii-secondary uppercase tracking-widest px-1">Full Identity Name</label>
              <input type="text" required className="w-full p-4 md:p-5 bg-duii-bg/10 dark:bg-white/5 rounded-2xl border-2 border-transparent focus:border-duii-primary outline-none font-bold transition-all dark:text-white" placeholder="Enter Full Name" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-duii-primary dark:text-duii-secondary uppercase tracking-widest px-1">Active Contact Number</label>
              <input type="tel" required className="w-full p-4 md:p-5 bg-duii-bg/10 dark:bg-white/5 rounded-2xl border-2 border-transparent focus:border-duii-primary outline-none font-bold transition-all dark:text-white" placeholder="+880 XXXX-XXXXXX" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-duii-primary dark:text-duii-secondary uppercase tracking-widest px-1">Email Address</label>
              <input type="email" required className="w-full p-4 md:p-5 bg-duii-bg/10 dark:bg-white/5 rounded-2xl border-2 border-transparent focus:border-duii-primary outline-none font-bold transition-all dark:text-white" placeholder="user@domain.com" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-duii-primary dark:text-duii-secondary uppercase tracking-widest px-1">Previous Institute</label>
              <input type="text" className="w-full p-4 md:p-5 bg-duii-bg/10 dark:bg-white/5 rounded-2xl border-2 border-transparent focus:border-duii-primary outline-none font-bold transition-all dark:text-white" placeholder="School/Madrasa Name" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-duii-primary dark:text-duii-secondary uppercase tracking-widest px-1">Residential Address</label>
            <textarea rows={3} className="w-full p-4 md:p-5 bg-duii-bg/10 dark:bg-white/5 rounded-2xl border-2 border-transparent focus:border-duii-primary outline-none font-bold transition-all resize-none dark:text-white" placeholder="House, Road, Area, City..."></textarea>
          </div>

          <div className="space-y-8">
            <label className="text-[10px] font-black text-duii-primary dark:text-duii-secondary uppercase tracking-widest block border-b border-duii-secondary/10 pb-4">Select Target Academic Program</label>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="text-duii-secondary"><ICONS.Building /></div>
                  <h4 className="text-[11px] font-black text-duii-secondary uppercase tracking-widest">General Stream</h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Kindergarten', 'Class-01', 'Class-02', 'Class-03', 'Class-04', 'Class-05', 'Class-06', 'Class-07', 'Class-08', 'Class-09'].map(opt => (
                    <label key={opt} className="flex items-center space-x-3 p-3 md:p-4 bg-duii-bg/20 dark:bg-white/5 rounded-xl cursor-pointer hover:bg-duii-secondary/20 transition-all border border-transparent has-[:checked]:border-duii-primary has-[:checked]:bg-white dark:has-[:checked]:bg-white/10">
                      <input type="radio" name="program" value={opt} className="w-4 h-4 accent-duii-primary" required />
                      <span className="text-[10px] font-black uppercase tracking-tighter dark:text-white/60">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="text-duii-secondary"><ICONS.GraduationCap /></div>
                  <h4 className="text-[11px] font-black text-duii-secondary uppercase tracking-widest">Arabic Stream</h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Nurani Maktab', 'Najera', 'Hifjul Quran', 'Mizan', 'Nahw-mir', 'Hidayatun-Nahw'].map(opt => (
                    <label key={opt} className="flex items-center space-x-3 p-3 md:p-4 bg-duii-bg/20 dark:bg-white/5 rounded-xl cursor-pointer hover:bg-duii-secondary/20 transition-all border border-transparent has-[:checked]:border-duii-primary has-[:checked]:bg-white dark:has-[:checked]:bg-white/10">
                      <input type="radio" name="program" value={opt} className="w-4 h-4 accent-duii-primary" />
                      <span className="text-[10px] font-black uppercase tracking-tighter dark:text-white/60">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="w-full py-5 md:py-6 bg-duii-primary text-duii-secondary rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl shadow-duii-primary/30 hover:bg-black transition-all">
            Submit Application Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default PublicAdmissionPage;
