
import React, { useState } from 'react';
import { User, UserRole, Announcement } from '../types';
import { MOCK_SECTIONS } from '../constants';

interface AnnouncementsPageProps {
  user: User;
  announcements: Announcement[];
  setAnnouncements: (a: Announcement[]) => void;
}

const AnnouncementsPage: React.FC<AnnouncementsPageProps> = ({ user, announcements, setAnnouncements }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [targetRole, setTargetRole] = useState<UserRole | 'ALL'>('ALL');
  const [targetSection, setTargetSection] = useState<string | ''>('');

  const canPost = user.role === UserRole.ADMIN || user.role === UserRole.TEACHER;

  const handlePost = () => {
    if (!newTitle || !newContent) return;
    
    const newAnnouncement: Announcement = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: user.id,
      title: newTitle,
      content: newContent,
      targetRole: targetRole,
      sectionId: targetSection || undefined,
      timestamp: new Date().toISOString()
    };
    
    setAnnouncements([newAnnouncement, ...announcements]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewContent('');
    alert("Broadcast dispatched successfully.");
  };

  const deleteAnnouncement = (id: string) => {
    if (window.confirm("Rescind this broadcast?")) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  // Only show announcements relevant to the user
  const visibleAnnouncements = announcements.filter(ann => {
    if (user.role === UserRole.ADMIN) return true;
    if (ann.targetRole !== 'ALL' && ann.targetRole !== user.role) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-duii-primary uppercase tracking-tight">Notice Board</h1>
          <p className="text-duii-secondary text-xs font-bold uppercase tracking-widest mt-1">Institutional Bulletins</p>
        </div>
        {canPost && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-duii-primary text-duii-secondary rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            <span>Broadcast</span>
          </button>
        )}
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {visibleAnnouncements.map(ann => (
          <div key={ann.id} className="bg-white p-8 rounded-[2.5rem] border border-duii-secondary/20 shadow-sm relative overflow-hidden group">
            {ann.sectionId && (
              <div className="absolute top-0 right-0 px-4 py-2 bg-duii-secondary text-duii-primary text-[9px] font-black uppercase tracking-widest rounded-bl-2xl">
                Majlis: {ann.sectionId}
              </div>
            )}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-black text-duii-primary tracking-tight">{ann.title}</h3>
                <div className="flex items-center space-x-2 text-[9px] text-duii-secondary mt-1 uppercase font-black tracking-widest">
                  <span>{new Date(ann.timestamp).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Target: {ann.targetRole}</span>
                </div>
              </div>
              {user.role === UserRole.ADMIN && (
                <button onClick={() => deleteAnnouncement(ann.id)} className="p-2 text-red-300 hover:text-red-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              )}
            </div>
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap font-medium text-sm">{ann.content}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-duii-primary/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden border border-duii-secondary/30">
            <div className="p-8 border-b border-duii-secondary/10 flex items-center justify-between">
              <h2 className="text-lg font-black text-duii-primary uppercase">Compose Broadcast</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400">Cancel</button>
            </div>
            <div className="p-8 space-y-6">
              <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full p-4 bg-duii-bg/10 rounded-2xl outline-none font-bold" placeholder="Subject" />
              <div className="grid grid-cols-2 gap-4">
                <select value={targetRole} onChange={(e) => setTargetRole(e.target.value as any)} className="w-full p-4 bg-duii-bg/10 rounded-2xl font-bold">
                  <option value="ALL">Everyone</option>
                  <option value={UserRole.STUDENT}>Students</option>
                  <option value={UserRole.TEACHER}>Teachers</option>
                </select>
                <select value={targetSection} onChange={(e) => setTargetSection(e.target.value)} className="w-full p-4 bg-duii-bg/10 rounded-2xl font-bold">
                  <option value="">Global</option>
                  {MOCK_SECTIONS.map(s => <option key={s.id} value={s.id}>{s.id}</option>)}
                </select>
              </div>
              <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} rows={4} className="w-full p-4 bg-duii-bg/10 rounded-2xl font-bold resize-none" placeholder="Message content..."></textarea>
            </div>
            <div className="p-8 bg-duii-bg/20 flex justify-end">
              <button onClick={handlePost} className="px-10 py-4 bg-duii-primary text-duii-secondary rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-duii-primary/20">Send Broadcast</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;
