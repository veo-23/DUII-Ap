
import React, { useState } from 'react';
import { User, UserRole, AttendanceStatus } from '../types';
import { MOCK_SECTIONS, MOCK_USERS } from '../constants';

interface AttendancePageProps {
  user: User;
}

const AttendancePage: React.FC<AttendancePageProps> = ({ user }) => {
  const [selectedSection, setSelectedSection] = useState(MOCK_SECTIONS[0].id);
  const [view, setView] = useState<'TAKE' | 'HISTORY'>('TAKE');

  const students = MOCK_USERS.filter(u => u.role === UserRole.STUDENT);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-duii-primary uppercase tracking-tight">Attendance Log</h1>
          <p className="text-duii-secondary text-xs font-bold uppercase tracking-widest mt-1">Darul Ulum Student Registry</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-xl border border-duii-secondary/20 shadow-sm">
          <button 
            onClick={() => setView('TAKE')}
            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${view === 'TAKE' ? 'bg-duii-primary text-duii-secondary shadow-md' : 'text-slate-400 hover:bg-duii-bg'}`}
          >
            Real-time Track
          </button>
          <button 
            onClick={() => setView('HISTORY')}
            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${view === 'HISTORY' ? 'bg-duii-primary text-duii-secondary shadow-md' : 'text-slate-400 hover:bg-duii-bg'}`}
          >
            Full Records
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-[10px] font-black text-duii-secondary uppercase tracking-widest px-2">Assigned Majlis</h3>
          {MOCK_SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSection(s.id)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                selectedSection === s.id 
                  ? 'border-duii-secondary bg-white ring-4 ring-duii-secondary/10' 
                  : 'border-white bg-white/50 hover:border-duii-secondary/20'
              }`}
            >
              <div className="font-black text-duii-primary text-sm uppercase">{s.id} - {s.room}</div>
              <div className="text-[10px] text-duii-secondary font-bold mt-1 uppercase">{s.schedule}</div>
            </button>
          ))}
          
          <div className="p-6 bg-duii-primary rounded-[2rem] text-duii-secondary border border-duii-secondary/30">
            <h4 className="font-black uppercase tracking-widest mb-2 text-xs">QR Registry</h4>
            <p className="text-[10px] text-duii-secondary/70 mb-4 leading-relaxed font-bold">Generate a one-time code for student self-check-in during class sessions.</p>
            <button className="w-full py-3 bg-duii-secondary text-duii-primary rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all">
              Initialize QR
            </button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2rem] border border-duii-secondary/20 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-duii-secondary/10 flex items-center justify-between">
              <h3 className="font-black text-duii-primary uppercase text-sm tracking-tight">Active Student Body</h3>
              <span className="text-[10px] font-black text-duii-secondary uppercase tracking-widest">Date: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-duii-bg/30 text-duii-secondary text-[10px] font-black uppercase tracking-widest">
                    <th className="px-6 py-4">Identity</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-duii-secondary/10">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-duii-bg/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={student.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=3f2305&color=c49a6c`} 
                            className="w-8 h-8 rounded-lg shadow-sm" 
                            alt="" 
                          />
                          <div>
                            <span className="font-bold text-duii-primary text-sm block">{student.name}</span>
                            <span className="text-[9px] font-black text-duii-secondary uppercase">{student.id} | {student.batch}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-1">
                          {[
                            { status: AttendanceStatus.PRESENT, label: 'P' },
                            { status: AttendanceStatus.ABSENT, label: 'A' },
                            { status: AttendanceStatus.LATE, label: 'L' }
                          ].map(item => (
                            <button
                              key={item.status}
                              className={`w-8 h-8 text-[10px] font-black rounded-lg border transition-all ${
                                item.status === AttendanceStatus.PRESENT 
                                  ? 'border-emerald-100 text-emerald-600 hover:bg-emerald-50' 
                                  : item.status === AttendanceStatus.ABSENT 
                                    ? 'border-red-100 text-red-600 hover:bg-red-50'
                                    : 'border-amber-100 text-amber-600 hover:bg-amber-50'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-duii-secondary hover:text-duii-primary">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-8 bg-duii-bg/20 flex justify-end">
              <button className="px-8 py-3 bg-duii-primary text-duii-secondary rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-duii-primary/10 hover:bg-black transition-all">
                Finalize Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
