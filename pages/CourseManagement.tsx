
import React, { useState } from 'react';
import { User, UserRole, Course, Section, CourseCategory } from '../types';

interface CourseManagementProps {
  user: User;
  courses: Course[];
  setCourses: (c: Course[] | ((prev: Course[]) => Course[])) => void;
  sections: Section[];
  setSections: (s: Section[] | ((prev: Section[]) => Section[])) => void;
  teachers: User[];
}

const CourseManagement: React.FC<CourseManagementProps> = ({ user, courses, setCourses, sections, setSections, teachers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'COURSE' | 'SECTION'>('COURSE');
  const [activeTab, setActiveTab] = useState<CourseCategory>(CourseCategory.GENERAL);
  
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

  const [newCourse, setNewCourse] = useState({ 
    code: '', 
    title: '', 
    credits: 3, 
    category: CourseCategory.GENERAL 
  });
  const [newSection, setNewSection] = useState({ 
    courseId: '', 
    schedule: '', 
    room: '', 
    instructorId: '' 
  });

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourseId) {
      setCourses(prev => prev.map(c => c.id === editingCourseId ? { ...c, ...newCourse } : c));
      alert("Institutional curriculum unit updated.");
    } else {
      const course: Course = {
        id: 'c-' + Math.random().toString(36).substr(2, 5),
        ...newCourse,
        instructorIds: []
      };
      setCourses(prev => [...prev, course]);
      alert("New curriculum unit registered.");
    }
    closeModal();
  };

  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSectionId) {
      setSections(prev => prev.map(s => s.id === editingSectionId ? { ...s, ...newSection } : s));
      alert("Majlis session parameters updated.");
    } else {
      const sectionId = 's-' + Math.random().toString(36).substr(2, 5);
      const section: Section = {
        id: sectionId,
        capacity: 30,
        ...newSection
      };
      setSections(prev => [...prev, section]);
      alert("New Majlis session configured.");
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourseId(null);
    setEditingSectionId(null);
    setNewCourse({ code: '', title: '', credits: 3, category: activeTab });
    setNewSection({ courseId: '', schedule: '', room: '', instructorId: '' });
  };

  const filteredCourses = courses.filter(c => c.category === activeTab);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-duii-primary uppercase tracking-tight">Curriculum Portal</h1>
          <p className="text-duii-secondary text-xs font-bold uppercase tracking-widest mt-1">Darul Ulum Educational Structure</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-2xl border border-duii-secondary/20 shadow-sm">
          <button 
            type="button"
            onClick={() => setActiveTab(CourseCategory.GENERAL)}
            className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
              activeTab === CourseCategory.GENERAL 
                ? 'bg-duii-primary text-duii-secondary shadow-lg' 
                : 'text-slate-400 hover:text-duii-primary'
            }`}
          >
            General Studies
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab(CourseCategory.ARABIC)}
            className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
              activeTab === CourseCategory.ARABIC 
                ? 'bg-duii-primary text-duii-secondary shadow-lg' 
                : 'text-slate-400 hover:text-duii-primary'
            }`}
          >
            Arabic Sciences
          </button>
        </div>

        {user.role === UserRole.ADMIN && (
          <div className="flex space-x-2">
            <button 
              type="button"
              onClick={() => { 
                setModalType('COURSE'); 
                setNewCourse(prev => ({ ...prev, category: activeTab }));
                setIsModalOpen(true); 
              }} 
              className="px-6 py-2.5 bg-duii-primary text-duii-secondary rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all"
            >
              Add Course
            </button>
            <button 
              type="button"
              onClick={() => { 
                setModalType('SECTION'); 
                setIsModalOpen(true); 
              }} 
              className="px-6 py-2.5 bg-duii-secondary text-duii-primary rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all"
            >
              New Majlis
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[10px] font-black text-duii-secondary uppercase tracking-widest">
              {activeTab === CourseCategory.GENERAL ? 'General Modules' : 'Arabic Modules'}
            </h2>
            <span className="text-[10px] font-bold text-slate-400">({filteredCourses.length} Courses)</span>
          </div>
          
          <div className="space-y-4">
            {filteredCourses.length > 0 ? filteredCourses.map(course => (
              <div key={course.id} className="bg-white p-6 rounded-[2rem] border border-duii-secondary/10 shadow-sm hover:border-duii-secondary/30 transition-all relative overflow-hidden">
                <div className="flex justify-between mb-4">
                  <div>
                    <span className="text-[9px] font-black text-duii-secondary uppercase bg-duii-bg/40 px-2 py-1 rounded">{course.code}</span>
                    <h3 className="text-lg font-black text-duii-primary mt-1">{course.title}</h3>
                  </div>
                  <div className="text-[10px] font-black text-slate-400 uppercase">{course.credits} Credits</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-duii-bg border-2 border-white flex items-center justify-center text-[10px] font-bold text-duii-primary shadow-sm">
                      {course.code[0]}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Academic Unit</span>
                  </div>
                  
                  {user.role === UserRole.ADMIN && (
                    <div className="flex items-center space-x-3 relative z-10">
                      <button 
                        type="button"
                        onClick={(e) => { 
                          e.preventDefault();
                          e.stopPropagation(); 
                          setModalType('COURSE');
                          setEditingCourseId(course.id);
                          setNewCourse({
                            code: course.code,
                            title: course.title,
                            credits: course.credits,
                            category: course.category
                          });
                          setIsModalOpen(true);
                        }} 
                        className="text-[10px] font-black text-duii-secondary hover:text-duii-primary uppercase transition-colors px-2 py-1 bg-duii-bg/30 rounded"
                      >
                        Edit
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => { 
                          e.preventDefault();
                          e.stopPropagation(); 
                          if (window.confirm("Deleting this course will also remove all associated Majlis sessions. Proceed with caution?")) {
                            setCourses(prev => prev.filter(c => c.id !== course.id));
                            setSections(prev => prev.filter(s => s.courseId !== course.id));
                          }
                        }} 
                        className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase transition-colors px-2 py-1 bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className={`absolute top-0 right-0 w-1.5 h-full ${activeTab === CourseCategory.GENERAL ? 'bg-duii-secondary/20' : 'bg-duii-primary/10'}`}></div>
              </div>
            )) : (
              <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">No modules configured in this branch.</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-[10px] font-black text-duii-secondary uppercase tracking-widest px-2">Majlis Registry (Class Sessions)</h2>
          <div className="bg-white rounded-[2.5rem] border border-duii-secondary/10 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-duii-bg/30 text-duii-secondary text-[10px] font-black uppercase tracking-widest">
                  <th className="px-6 py-5">Majlis</th>
                  <th className="px-6 py-5">Timing</th>
                  <th className="px-6 py-5">Hall</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-duii-secondary/5">
                {sections.filter(s => {
                  const course = courses.find(c => c.id === s.courseId);
                  return course?.category === activeTab;
                }).map(section => (
                  <tr key={section.id} className="hover:bg-duii-bg/10 transition-colors">
                    <td className="px-6 py-5 font-black text-duii-primary text-sm uppercase tracking-tight">
                      <div className="flex flex-col">
                        <span>{section.id}</span>
                        <span className="text-[8px] text-slate-400 font-bold uppercase">{courses.find(c => c.id === section.courseId)?.code}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-xs font-bold text-slate-500">{section.schedule}</td>
                    <td className="px-6 py-5 font-black text-[10px] uppercase text-duii-secondary">{section.room}</td>
                    <td className="px-6 py-5 text-right">
                      {user.role === UserRole.ADMIN ? (
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setModalType('SECTION');
                              setEditingSectionId(section.id);
                              setNewSection({
                                courseId: section.courseId,
                                schedule: section.schedule,
                                room: section.room,
                                instructorId: section.instructorId
                              });
                              setIsModalOpen(true);
                            }}
                            className="p-2 bg-duii-bg/50 rounded-lg text-duii-primary hover:bg-duii-secondary hover:text-white transition-all"
                            title="Edit Section"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                          </button>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (window.confirm("Are you sure you want to rescind this Majlis session? This action cannot be undone.")) {
                                setSections(prev => prev.filter(s => s.id !== section.id));
                              }
                            }}
                            className="p-2 bg-red-50 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-all"
                            title="Delete Section"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-slate-400">{section.capacity} Seats</span>
                      )}
                    </td>
                  </tr>
                ))}
                {sections.filter(s => courses.find(c => c.id === s.courseId)?.category === activeTab).length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-slate-300 font-bold text-[10px] uppercase tracking-widest">
                      No active sessions for this curriculum.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-duii-primary/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-xl border border-duii-secondary/30 overflow-hidden animate-in zoom-in duration-200">
            <div className="p-8 border-b border-duii-secondary/10 flex items-center justify-between bg-duii-bg/20">
              <h2 className="text-lg font-black text-duii-primary uppercase tracking-tight">
                {editingCourseId || editingSectionId ? 'Modify Record' : (modalType === 'COURSE' ? 'Register Curriculum Unit' : 'Configure Majlis Session')}
              </h2>
              <button 
                type="button"
                onClick={closeModal} 
                className="p-2 hover:bg-white rounded-full transition-colors text-slate-400"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form onSubmit={modalType === 'COURSE' ? handleAddCourse : handleAddSection} className="p-8 space-y-6">
              {modalType === 'COURSE' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-duii-secondary uppercase tracking-widest px-1">Curriculum Branch</label>
                      <select 
                        value={newCourse.category} 
                        onChange={e => setNewCourse({...newCourse, category: e.target.value as CourseCategory})} 
                        className="w-full p-4 bg-duii-bg/10 rounded-2xl font-bold border-2 border-transparent focus:border-duii-primary outline-none"
                      >
                        <option value={CourseCategory.GENERAL}>General Studies</option>
                        <option value={CourseCategory.ARABIC}>Arabic Sciences</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-duii-secondary uppercase tracking-widest px-1">Institutional Code</label>
                      <input 
                        type="text" 
                        value={newCourse.code} 
                        onChange={e => setNewCourse({...newCourse, code: e.target.value})} 
                        placeholder="e.g. ARB-201" 
                        className="w-full p-4 bg-duii-bg/10 rounded-2xl font-bold uppercase border-2 border-transparent focus:border-duii-primary outline-none" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-duii-secondary uppercase tracking-widest px-1">Formal Unit Title</label>
                    <input 
                      type="text" 
                      value={newCourse.title} 
                      onChange={e => setNewCourse({...newCourse, title: e.target.value})} 
                      placeholder="Course Title" 
                      className="w-full p-4 bg-duii-bg/10 rounded-2xl font-bold border-2 border-transparent focus:border-duii-primary outline-none" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-duii-secondary uppercase tracking-widest px-1">Academic Weight (Credits)</label>
                    <input 
                      type="number" 
                      value={newCourse.credits} 
                      onChange={e => setNewCourse({...newCourse, credits: parseInt(e.target.value)})} 
                      className="w-full p-4 bg-duii-bg/10 rounded-2xl font-bold border-2 border-transparent focus:border-duii-primary outline-none" 
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-duii-secondary uppercase tracking-widest px-1">Target Curriculum Unit</label>
                    <select 
                      value={newSection.courseId} 
                      onChange={e => setNewSection({...newSection, courseId: e.target.value})} 
                      className="w-full p-4 bg-duii-bg/10 rounded-2xl font-bold border-2 border-transparent focus:border-duii-primary outline-none" 
                      required
                    >
                      <option value="">Select Course Reference</option>
                      {courses.filter(c => c.category === activeTab).map(c => <option key={c.id} value={c.id}>{c.code} - {c.title}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-duii-secondary uppercase tracking-widest px-1">Temporal Schedule</label>
                      <input 
                        type="text" 
                        value={newSection.schedule} 
                        onChange={e => setNewSection({...newSection, schedule: e.target.value})} 
                        placeholder="e.g. Sun/Tue 09:30" 
                        className="w-full p-4 bg-duii-bg/10 rounded-2xl font-bold border-2 border-transparent focus:border-duii-primary outline-none" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-duii-secondary uppercase tracking-widest px-1">Majlis / Hall Room</label>
                      <input 
                        type="text" 
                        value={newSection.room} 
                        onChange={e => setNewSection({...newSection, room: e.target.value})} 
                        placeholder="e.g. Hall 4" 
                        className="w-full p-4 bg-duii-bg/10 rounded-2xl font-bold border-2 border-transparent focus:border-duii-primary outline-none" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-duii-secondary uppercase tracking-widest px-1">Assigned Faculty Member</label>
                    <select 
                      value={newSection.instructorId} 
                      onChange={e => setNewSection({...newSection, instructorId: e.target.value})} 
                      className="w-full p-4 bg-duii-bg/10 rounded-2xl font-bold border-2 border-transparent focus:border-duii-primary outline-none" 
                      required
                    >
                      <option value="">Select Instructor</option>
                      {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                  </div>
                </>
              )}
              <button 
                type="submit" 
                className="w-full p-5 bg-duii-primary text-duii-secondary rounded-2xl font-black uppercase text-xs tracking-[0.3em] shadow-xl shadow-duii-primary/20 hover:bg-black transition-all"
              >
                {editingCourseId || editingSectionId ? 'Update Information' : 'Confirm Institutional Entry'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
