
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS, ICONS } from '../constants';

interface DirectoryPageProps {
  user: User;
}

const DirectoryPage: React.FC<DirectoryPageProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const teachers = MOCK_USERS.filter(u => u.role === UserRole.TEACHER);
  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-duii-primary uppercase tracking-tight">Institutional Faculty</h1>
          <p className="text-duii-secondary text-xs font-bold uppercase tracking-widest mt-1">Darul Ulum Scholarly Directory</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by name or faculty..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-duii-secondary/20 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-duii-primary outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-4 top-3.5 text-duii-secondary/50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTeachers.map(teacher => (
          <div key={teacher.id} className="bg-white p-8 rounded-[3rem] border border-duii-secondary/10 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="flex items-center space-x-5 mb-8">
              <img 
                src={teacher.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=3f2305&color=c49a6c`} 
                className="w-20 h-20 rounded-[2rem] object-cover ring-4 ring-duii-bg shadow-lg group-hover:scale-105 transition-transform"
                alt={teacher.name}
              />
              <div>
                <h3 className="font-black text-duii-primary text-lg leading-tight tracking-tight">{teacher.name}</h3>
                <p className="text-[10px] text-duii-secondary font-black uppercase tracking-[0.15em] mt-1">{teacher.department}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <a 
                href={`mailto:${teacher.email}`}
                className="flex items-center space-x-3 text-[11px] font-bold text-slate-500 hover:text-duii-primary transition-colors group/link"
              >
                <div className="p-2.5 bg-duii-bg rounded-xl border border-duii-secondary/10 group-hover/link:bg-duii-secondary group-hover/link:text-duii-primary transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <span>{teacher.email}</span>
              </a>
              
              <a 
                href={`tel:${teacher.phone}`}
                className="flex items-center space-x-3 text-[11px] font-bold text-slate-500 hover:text-duii-primary transition-colors group/link"
              >
                <div className="p-2.5 bg-duii-bg rounded-xl border border-duii-secondary/10 group-hover/link:bg-duii-secondary group-hover/link:text-duii-primary transition-all">
                  <ICONS.Phone />
                </div>
                <span className="tracking-widest uppercase">{teacher.phone}</span>
              </a>
            </div>

            <button className="w-full mt-8 py-4 bg-duii-primary text-duii-secondary text-[10px] font-black uppercase tracking-[0.25em] rounded-2xl hover:bg-black transition-all shadow-lg shadow-duii-primary/10">
              Direct Inquire
            </button>
            
            <div className="absolute top-0 right-0 w-16 h-16 bg-duii-bg rounded-bl-[4rem] flex items-center justify-end pr-4 pt-4 group-hover:bg-duii-secondary/10 transition-colors">
               <svg className="w-4 h-4 text-duii-secondary/30" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
          </div>
        ))}
        {filteredTeachers.length === 0 && (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-duii-secondary/10 rounded-[3rem] bg-white/50">
            <div className="inline-block p-6 bg-duii-bg rounded-full mb-6 border border-duii-secondary/20">
              <svg className="w-10 h-10 text-duii-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <h3 className="text-xl font-black text-duii-primary uppercase tracking-tight">Scholarly Profile Not Found</h3>
            <p className="text-duii-secondary font-bold text-xs uppercase tracking-widest mt-2">Try searching by department or surname.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectoryPage;
