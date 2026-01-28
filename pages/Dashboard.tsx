
import React from 'react';
import { User, UserRole, Course, Section, Announcement } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

interface DashboardProps {
  user: User;
  users: User[];
  courses: Course[];
  sections: Section[];
  announcements: Announcement[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, users, courses, sections, announcements }) => {
  // Analytical data (Mocked trend for visual)
  const chartData = [
    { name: 'Mon', attendance: 85, activities: 78 },
    { name: 'Tue', attendance: 88, activities: 82 },
    { name: 'Wed', attendance: 92, activities: 85 },
    { name: 'Thu', attendance: 90, activities: 84 },
    { name: 'Fri', attendance: 84, activities: 80 },
  ];

  // Logic for Stat Cards
  const totalStudents = users.filter(u => u.role === UserRole.STUDENT).length;
  const totalFaculty = users.filter(u => u.role === UserRole.TEACHER).length;
  const activeModules = courses.length;
  const unreadNotices = announcements.length;

  const StatCard = ({ title, value, change, positive }: { title: string, value: string | number, change: string, positive: boolean }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-duii-secondary/10 shadow-sm hover:shadow-md transition-all group">
      <p className="text-[10px] font-black text-duii-secondary uppercase tracking-widest mb-2">{title}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-2xl font-black text-duii-primary group-hover:scale-105 transition-transform origin-left">{value}</h3>
        <span className={`text-[9px] font-black px-2 py-1 rounded-full border ${positive ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
          {change}
        </span>
      </div>
    </div>
  );

  // Relevant sections for the current user
  const mySections = user.role === UserRole.TEACHER 
    ? sections.filter(s => s.instructorId === user.id)
    : sections.slice(0, 4); // For Admin/Student, show general upcoming

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-duii-primary tracking-tight">Assalamu Alaikum, {user.name.split(' ')[0]}!</h1>
          <p className="text-duii-secondary font-medium text-sm mt-1 uppercase tracking-wider text-[11px] font-black">
            Welcome to the {user.role.toLowerCase()} institutional dashboard.
          </p>
        </div>
        <div className="text-[10px] font-black text-duii-primary uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-duii-secondary/20 shadow-sm">
          Today: {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {user.role === UserRole.ADMIN ? (
          <>
            <StatCard title="Student Body" value={totalStudents} change="+4" positive={true} />
            <StatCard title="Faculty Staff" value={totalFaculty} change="Stable" positive={true} />
            <StatCard title="Active Modules" value={activeModules} change="+1" positive={true} />
            <StatCard title="Board Notices" value={unreadNotices} change="Sync" positive={true} />
          </>
        ) : (
          <>
            <StatCard title="Assigned Units" value={user.role === UserRole.TEACHER ? mySections.length : activeModules} change="Active" positive={true} />
            <StatCard title="Avg Attendance" value="94.2%" change="+1.2%" positive={true} />
            <StatCard title="Pending Tasks" value="3" change="Alert" positive={false} />
            <StatCard title="Latest Notices" value={unreadNotices} change="New" positive={true} />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Analytics Section */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-duii-secondary/10 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-duii-primary text-lg uppercase tracking-tight">Academic Analytics</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-duii-primary rounded-full"></div>
                  <span className="text-[9px] font-black text-duii-secondary uppercase">Attendance</span>
                </div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorAttend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c49a6c" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#c49a6c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#c49a6c', fontSize: 10, fontWeight: 'bold'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#c49a6c', fontSize: 10, fontWeight: 'bold'}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: '1px solid #c49a6c20', boxShadow: '0 10px 15px -3px rgba(63, 35, 5, 0.1)', backgroundColor: '#fff'}}
                    itemStyle={{color: '#3f2305', fontWeight: 'bold'}}
                  />
                  <Area type="monotone" dataKey="attendance" stroke="#3f2305" strokeWidth={4} fillOpacity={1} fill="url(#colorAttend)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Announcements Table (Simplified for Dashboard) */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-duii-secondary/10 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-duii-primary uppercase text-sm tracking-tight">Recent Notices</h3>
                <Link to="/announcements" className="text-[10px] font-black text-duii-secondary uppercase hover:underline">View All</Link>
             </div>
             <div className="space-y-4">
                {announcements.slice(0, 3).map(ann => (
                  <div key={ann.id} className="p-4 bg-duii-bg/20 rounded-2xl border border-duii-secondary/10 flex items-center justify-between hover:bg-duii-bg/40 transition-colors">
                    <div>
                      <h4 className="font-black text-duii-primary text-xs uppercase">{ann.title}</h4>
                      <p className="text-[10px] text-slate-500 font-medium truncate max-w-xs">{ann.content}</p>
                    </div>
                    <span className="text-[9px] font-bold text-duii-secondary bg-white px-2 py-1 rounded-lg border border-duii-secondary/10">
                      {new Date(ann.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {announcements.length === 0 && <p className="text-center py-6 text-slate-400 text-xs font-bold uppercase tracking-widest">No active notices.</p>}
             </div>
          </div>
        </div>

        {/* Sidebar: Prayer & Class Schedule */}
        <div className="bg-duii-primary p-8 rounded-[2.5rem] text-duii-secondary flex flex-col shadow-xl border border-duii-secondary/30">
          <h3 className="font-black text-lg mb-6 uppercase tracking-widest border-b border-duii-secondary/20 pb-4">Institutional Schedule</h3>
          <div className="space-y-4 flex-1">
            {mySections.length > 0 ? mySections.map((slot, idx) => {
              const course = courses.find(c => c.id === slot.courseId);
              return (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="text-[10px] font-black text-duii-secondary/60 w-16 pt-1 uppercase">{slot.schedule.split(' ')[1]}</div>
                  <div className="flex-1">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                      <h4 className="font-black text-white text-xs uppercase tracking-tight group-hover:text-duii-secondary transition-colors">
                        {course?.title || 'Course Session'}
                      </h4>
                      <p className="text-[9px] text-duii-secondary/70 mt-1 font-bold uppercase tracking-widest">{slot.room}</p>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="p-10 text-center bg-white/5 rounded-3xl border border-white/10">
                 <p className="text-[10px] font-black uppercase text-duii-secondary/50">No classes assigned today.</p>
              </div>
            )}
            
            <div className="h-px bg-white/10 my-4"></div>
            
            {/* Mock Prayer Times for completeness */}
            <div className="flex items-start space-x-4">
                <div className="text-[10px] font-black text-duii-secondary/60 w-16 pt-1 uppercase">01:15 PM</div>
                <div className="flex-1">
                  <div className="p-4 rounded-2xl bg-duii-secondary/10 border border-duii-secondary/20">
                    <h4 className="font-black text-duii-secondary text-xs uppercase tracking-tight">Zuhr Congregation</h4>
                    <p className="text-[9px] text-duii-secondary/70 mt-1 font-bold uppercase">Main Mosque Hall</p>
                  </div>
                </div>
            </div>
          </div>
          
          <Link to="/courses" className="w-full mt-8 py-4 text-duii-primary font-black text-[10px] uppercase tracking-[0.2em] bg-duii-secondary rounded-2xl hover:bg-white transition-all shadow-lg text-center">
            Institutional Timetable
          </Link>
        </div>
      </div>
      
      {/* AI Assistant Call-to-Action */}
      <div className="bg-white border-2 border-duii-secondary/10 rounded-[2.5rem] p-10 text-duii-primary flex flex-col md:flex-row items-center justify-between overflow-hidden relative shadow-sm group">
        <div className="max-w-xl z-10">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-[10px] font-black bg-duii-primary text-duii-secondary px-3 py-1 rounded-full uppercase tracking-widest">AI Hub Enabled</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
          </div>
          <h2 className="text-3xl font-black mb-3 leading-tight tracking-tight">Darul Ulum AI Tutor</h2>
          <p className="text-slate-600 mb-8 font-medium">Access our proprietary language model fine-tuned for the Darul Ulum curriculum. Clarify Fiqh principles, summarize Hadith lectures, or check institutional bylaws instantly.</p>
          <Link to="/ai-assistant" className="bg-duii-primary text-duii-secondary px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all inline-block shadow-xl shadow-duii-primary/10 group-hover:scale-105">
            Initialize AI Consultation
          </Link>
        </div>
        <div className="md:w-1/3 flex justify-center mt-8 md:mt-0 opacity-10 transform scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700">
          <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
