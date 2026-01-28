
import React from 'react';
import { User, UserRole } from '../types';

interface AssignmentsPageProps {
  user: User;
}

const AssignmentsPage: React.FC<AssignmentsPageProps> = ({ user }) => {
  const assignments = [
    { id: '1', title: 'Fiqh Research: Maqasid al-Shariah', course: 'ISL101', dueDate: 'Today, 11:59 PM', status: 'Pending', pts: 100 },
    { id: '2', title: 'Arabic Grammar Quiz: Sarf Level 1', course: 'ARB202', dueDate: 'Tomorrow', status: 'Submitted', pts: 50 },
    { id: '3', title: 'Hadith Sciences: Sahih Bukhari Intro', course: 'ISL303', dueDate: 'March 15', status: 'Graded', pts: 100, grade: 92 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-duii-primary uppercase tracking-tight">Academic Grading</h1>
          <p className="text-duii-secondary text-xs font-bold uppercase tracking-widest mt-1">Darul Ulum Assignment Management</p>
        </div>
        {user.role !== UserRole.STUDENT && (
          <button className="px-6 py-3 bg-duii-primary text-duii-secondary rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-black transition-all">
            New Task Entry
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {assignments.map(ass => (
          <div key={ass.id} className="bg-white p-8 rounded-[2.5rem] border border-duii-secondary/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between hover:shadow-md transition-all group relative overflow-hidden">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-2 py-1 bg-duii-bg/50 text-duii-primary text-[10px] font-black uppercase tracking-wider rounded border border-duii-secondary/10">
                  {ass.course}
                </span>
                <span className={`text-[10px] font-black uppercase tracking-widest ${
                  ass.status === 'Pending' ? 'text-rose-500' : ass.status === 'Submitted' ? 'text-amber-500' : 'text-emerald-500'
                }`}>
                  {ass.status}
                </span>
              </div>
              <h3 className="text-xl font-black text-duii-primary tracking-tight">{ass.title}</h3>
              <div className="flex items-center space-x-4 mt-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                <div className="flex items-center space-x-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <span>Due: {ass.dueDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>{ass.pts} Points</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0 flex items-center space-x-4">
              {ass.grade !== undefined && (
                <div className="text-right mr-4">
                  <div className="text-2xl font-black text-emerald-600 leading-none">{ass.grade}%</div>
                  <div className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Institutional Grade</div>
                </div>
              )}
              {user.role === UserRole.STUDENT ? (
                <button className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  ass.status === 'Pending' 
                    ? 'bg-duii-primary text-duii-secondary shadow-lg hover:bg-black' 
                    : 'bg-duii-bg text-slate-400 cursor-default border border-duii-secondary/10'
                }`}>
                  {ass.status === 'Pending' ? 'Upload Research' : 'Review Work'}
                </button>
              ) : (
                <button className="px-8 py-3 bg-duii-primary text-duii-secondary rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-black transition-all">
                  Evaluate Class
                </button>
              )}
            </div>
            
            <div className="absolute top-0 right-0 w-1 h-full bg-duii-secondary/20 group-hover:bg-duii-secondary transition-colors"></div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-duii-primary rounded-[3rem] p-12 text-duii-secondary flex flex-col md:flex-row items-center gap-12 relative overflow-hidden border border-duii-secondary/30 shadow-2xl">
        <div className="flex-1 z-10">
          <div className="bg-duii-secondary text-duii-primary px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 inline-block">AI Evaluation Suite</div>
          <h2 className="text-3xl font-black mb-4 leading-tight tracking-tight text-white">Advanced AI Grading Assistant</h2>
          <p className="text-duii-secondary/80 text-lg mb-8 max-w-lg font-medium">Faculty members can now utilize Gemini to perform semantic analysis of student responses, detect thematic consistency, and generate feedback drafts for traditional Islamic sciences assignments.</p>
          <button className="px-10 py-4 bg-duii-secondary text-duii-primary rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl">
            Authorize AI Access
          </button>
        </div>
        <div className="w-full md:w-1/3 aspect-video bg-white/5 rounded-[2.5rem] border-4 border-white/10 flex items-center justify-center relative group cursor-pointer z-10 backdrop-blur-sm">
           <svg className="w-20 h-20 text-duii-secondary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
           <div className="absolute inset-0 bg-duii-secondary/10 rounded-[2.5rem] group-hover:bg-transparent transition-colors"></div>
        </div>
        {/* Decor */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
};

export default AssignmentsPage;
