
import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { UserRole, User, Course, Section, Announcement } from './types';
import { MOCK_USERS, MOCK_COURSES, MOCK_SECTIONS, MOCK_ANNOUNCEMENTS, ICONS } from './constants';
import Dashboard from './pages/Dashboard';
import CourseManagement from './pages/CourseManagement';
import AttendancePage from './pages/AttendancePage';
import AssignmentsPage from './pages/AssignmentsPage';
import PaymentsPage from './pages/PaymentsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import DirectoryPage from './pages/DirectoryPage';
import SettingsPage from './pages/SettingsPage';
import AIAssistantPage from './pages/AIAssistantPage';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import PublicCoursesPage from './pages/PublicCoursesPage';
import PublicAdmissionPage from './pages/PublicAdmissionPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

type ThemeMode = 'light' | 'dark' | 'device';

const SidebarItem: React.FC<{ to: string, icon: React.ReactNode, label: string, isOpen: boolean }> = ({ to, icon, label, isOpen }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 p-3.5 rounded-xl transition-all ${
        isActive 
          ? 'bg-duii-primary text-duii-secondary shadow-lg shadow-duii-primary/20 ring-1 ring-duii-secondary/30' 
          : 'text-slate-400 hover:bg-duii-bg hover:text-duii-primary dark:hover:bg-white/5'
      }`}
    >
      <span className={`${isActive ? 'text-duii-secondary' : 'text-slate-400'} transition-colors`}>{icon}</span>
      {isOpen && <span className="font-black text-[10px] uppercase tracking-wider">{label}</span>}
    </Link>
  );
};

const ThemeToggle: React.FC<{ currentTheme: ThemeMode, setTheme: (t: ThemeMode) => void }> = ({ currentTheme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes: { id: ThemeMode, label: string, icon: React.ReactNode }[] = [
    { id: 'light', label: 'Light', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg> },
    { id: 'dark', label: 'Dark', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg> },
    { id: 'device', label: 'Device', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> }
  ];

  const activeTheme = themes.find(t => t.id === currentTheme) || themes[0];

  return (
    <div className="relative" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2.5 rounded-full bg-duii-primary/5 dark:bg-white/5 border border-duii-secondary/20 hover:border-duii-secondary transition-all"
        title="Toggle Theme"
      >
        <span className="text-duii-primary dark:text-duii-secondary">{activeTheme.icon}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-40 bg-white dark:bg-[#251808] border border-duii-secondary/20 rounded-2xl shadow-2xl overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-1.5 flex flex-col">
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => { setTheme(t.id); setIsOpen(false); }}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  currentTheme === t.id 
                    ? 'bg-duii-primary text-duii-secondary' 
                    : 'text-duii-primary/60 dark:text-white/60 hover:bg-duii-primary/5 dark:hover:bg-white/5'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PublicNavbar: React.FC<{ onLoginClick: () => void, currentTheme: ThemeMode, setTheme: (t: ThemeMode) => void }> = ({ onLoginClick, currentTheme, setTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Courses', path: '/public-courses' },
    { label: 'Admission', path: '/admission' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 px-6 md:px-12 py-4 ${
        scrolled || mobileMenuOpen
          ? 'bg-white/90 dark:bg-[#1a1005]/90 backdrop-blur-xl shadow-xl py-3 border-b border-duii-secondary/10' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-duii-primary p-2 rounded-xl border border-duii-secondary/30 group-hover:rotate-12 transition-transform shadow-lg">
               <svg className="w-6 h-6 text-duii-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <span className={`font-black text-xl uppercase tracking-tighter hidden sm:block ${scrolled ? 'text-duii-primary dark:text-white' : 'text-duii-primary dark:text-white'}`}>Darul Ulum</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center bg-duii-primary/5 dark:bg-white/5 px-2 py-1.5 rounded-[2rem] border border-duii-secondary/10">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${
                  location.pathname === link.path 
                    ? 'bg-duii-primary text-duii-secondary shadow-lg' 
                    : 'text-duii-primary/60 dark:text-white/60 hover:text-duii-primary dark:hover:text-white hover:bg-duii-secondary/20'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <ThemeToggle currentTheme={currentTheme} setTheme={setTheme} />
            <button onClick={onLoginClick} className="hidden md:block px-6 py-2.5 bg-duii-primary text-duii-secondary rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-duii-primary/20">
              Login
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden p-2.5 bg-duii-primary/5 dark:bg-white/5 rounded-xl text-duii-primary dark:text-duii-secondary transition-all"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"/></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 bg-white dark:bg-[#1a1005] transition-all duration-500 lg:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col h-full pt-28 px-8 pb-12">
          <div className="flex-1 space-y-4">
            {navLinks.map((link, idx) => (
              <Link 
                key={link.path} 
                to={link.path} 
                style={{ animationDelay: `${idx * 100}ms` }}
                className={`block text-3xl font-black uppercase tracking-tighter animate-in slide-in-from-left duration-500 ${
                  location.pathname === link.path ? 'text-duii-secondary' : 'text-duii-primary dark:text-white/40'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="space-y-6 pt-8 border-t border-duii-secondary/10">
            <button 
              onClick={onLoginClick}
              className="w-full py-5 bg-duii-primary text-duii-secondary rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl"
            >
              Institutional Login
            </button>
            <div className="flex justify-center space-x-6">
              <ICONS.Facebook />
              <ICONS.Twitter />
              <ICONS.Instagram />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PublicFooter: React.FC = () => (
  <footer className="bg-duii-primary pt-24 pb-12 px-8 text-duii-secondary border-t border-duii-secondary/20 relative overflow-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="bg-duii-secondary p-2 rounded-lg">
            <svg className="w-6 h-6 text-duii-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <span className="font-black text-xl uppercase tracking-tighter text-white text-wrap">Darul Ulum Islamic Institute</span>
        </div>
        <p className="text-sm font-medium leading-relaxed opacity-70">Empowering future scholars with a fusion of traditional Islamic sciences and modern academic excellence.</p>
        <div className="flex space-x-4">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-duii-secondary hover:text-duii-primary transition-all cursor-pointer"><ICONS.Facebook /></div>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-duii-secondary hover:text-duii-primary transition-all cursor-pointer"><ICONS.Twitter /></div>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-duii-secondary hover:text-duii-primary transition-all cursor-pointer"><ICONS.Instagram /></div>
        </div>
      </div>

      <div>
        <h4 className="font-black uppercase text-xs tracking-widest text-white mb-8">Navigation</h4>
        <ul className="space-y-4">
          {['Home', 'About Us', 'Courses', 'Admission', 'Gallery', 'Contact'].map(item => (
            <li key={item}><Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-bold opacity-60 hover:opacity-100 hover:text-duii-secondary transition-all"># {item}</Link></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-black uppercase text-xs tracking-widest text-white mb-8">Academic Streams</h4>
        <ul className="space-y-4">
          {['General Studies', 'Arabic Studies', 'Hifjul Quran', 'Najera', 'NCTB Curriculum'].map(item => (
            <li key={item} className="text-sm font-bold opacity-60">» {item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-black uppercase text-xs tracking-widest text-white mb-8">Connect</h4>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="text-duii-secondary p-2 bg-white/5 rounded-lg"><ICONS.Phone /></div>
            <div>
              <p className="text-[10px] font-black uppercase opacity-50 mb-1">Administrative Office</p>
              <p className="text-sm font-black text-white">+880 1234 56789</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="text-duii-secondary p-2 bg-white/5 rounded-lg"><ICONS.Mail /></div>
            <div>
              <p className="text-[10px] font-black uppercase opacity-50 mb-1">Electronic Mail</p>
              <p className="text-sm font-black text-white">office@duii.edu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
      <p className="text-[10px] font-black uppercase tracking-[0.2em]">© 2024 DARUL ULUM ISLAMIC INSTITUTE.</p>
      <div className="flex space-x-8 text-[10px] font-black uppercase tracking-widest">
        <a href="#" className="hover:text-white">Privacy Policy</a>
        <a href="#" className="hover:text-white">Terms of Use</a>
      </div>
    </div>

    <div className="absolute top-0 right-0 opacity-5 transform rotate-45 scale-150 pointer-events-none">
       <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></svg>
    </div>
  </footer>
);

const App: React.FC = () => {
  const KEY_USERS = 'duii_users_v3';
  const KEY_COURSES = 'duii_courses_v3';
  const KEY_SECTIONS = 'duii_sections_v3';
  const KEY_ANNOUNCEMENTS = 'duii_announcements_v3';
  const KEY_ACTIVE_USER = 'duii_active_user_v3';
  const KEY_THEME = 'duii_theme_v3';

  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [themeMode, setThemeMode] = useState<ThemeMode>('device');
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginStep, setLoginStep] = useState<'ROLE' | 'CREDENTIALS'>('ROLE');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [userIdInput, setUserIdInput] = useState('');
  const [passcodeInput, setPasscodeInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const location = useLocation();

  useEffect(() => {
    const loadData = (key: string, mock: any) => {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : mock;
    };

    setUsers(loadData(KEY_USERS, MOCK_USERS));
    setCourses(loadData(KEY_COURSES, MOCK_COURSES));
    setSections(loadData(KEY_SECTIONS, MOCK_SECTIONS));
    setAnnouncements(loadData(KEY_ANNOUNCEMENTS, MOCK_ANNOUNCEMENTS));

    const savedUser = localStorage.getItem(KEY_ACTIVE_USER);
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    const savedTheme = localStorage.getItem(KEY_THEME) as ThemeMode;
    if (savedTheme) setThemeMode(savedTheme);
  }, []);

  useEffect(() => {
    const applyTheme = () => {
      const root = window.document.documentElement;
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      root.classList.remove('light', 'dark');
      
      if (themeMode === 'dark') {
        root.classList.add('dark');
      } else if (themeMode === 'light') {
        root.classList.add('light');
      } else {
        if (systemDark) root.classList.add('dark');
        else root.classList.add('light');
      }
      
      localStorage.setItem(KEY_THEME, themeMode);
    };

    applyTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = () => { if (themeMode === 'device') applyTheme(); };
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, [themeMode]);

  useEffect(() => { localStorage.setItem(KEY_USERS, JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem(KEY_COURSES, JSON.stringify(courses)); }, [courses]);
  useEffect(() => { localStorage.setItem(KEY_SECTIONS, JSON.stringify(sections)); }, [sections]);
  useEffect(() => { localStorage.setItem(KEY_ANNOUNCEMENTS, JSON.stringify(announcements)); }, [announcements]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const foundUser = users.find(u => u.id.toLowerCase() === userIdInput.toLowerCase() && u.passcode === passcodeInput && u.role === selectedRole);
    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem(KEY_ACTIVE_USER, JSON.stringify(foundUser));
      setShowLoginModal(false);
    } else {
      setLoginError('Authentication failed. Check ID and Passcode.');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(KEY_ACTIVE_USER);
    setLoginStep('ROLE');
    setSelectedRole(null);
    setUserIdInput('');
    setPasscodeInput('');
  };

  if (currentUser) {
    const pageTitle = location.pathname.split('/')[1] || 'Dashboard';
    return (
      <div className="flex h-screen bg-duii-bg dark:bg-[#1a1005] overflow-hidden">
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-[#251808] border-r border-duii-secondary/20 transition-all duration-300 flex flex-col z-30 shadow-xl`}>
          <div className="p-6 flex items-center space-x-3">
            <div className="bg-duii-primary p-2 rounded-lg text-duii-secondary border border-duii-secondary/30">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            {isSidebarOpen && <span className="font-black text-sm uppercase tracking-tighter text-duii-primary dark:text-duii-secondary">Darul Ulum</span>}
          </div>

          <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto mt-4">
            <SidebarItem to="/portal" icon={<ICONS.Dashboard />} label="Overview" isOpen={isSidebarOpen} />
            <SidebarItem to="/portal/courses" icon={<ICONS.Book />} label="Curriculum" isOpen={isSidebarOpen} />
            <SidebarItem to="/portal/attendance" icon={<ICONS.CheckCircle />} label="Attendance" isOpen={isSidebarOpen} />
            <SidebarItem to="/portal/assignments" icon={<ICONS.Calendar />} label="Grading" isOpen={isSidebarOpen} />
            <SidebarItem to="/portal/announcements" icon={<ICONS.Bell />} label="Notices" isOpen={isSidebarOpen} />
            <SidebarItem to="/portal/payments" icon={<ICONS.DollarSign />} label="Billing" isOpen={isSidebarOpen} />
            <SidebarItem to="/portal/directory" icon={<ICONS.Users />} label="Directory" isOpen={isSidebarOpen} />
            <SidebarItem to="/portal/ai-assistant" icon={<ICONS.MessageSquare />} label="AI Tutor" isOpen={isSidebarOpen} />
            {currentUser.role === UserRole.ADMIN && (
              <SidebarItem to="/portal/settings" icon={<ICONS.Settings />} label="Control" isOpen={isSidebarOpen} />
            )}
            <Link to="/" className="flex items-center space-x-3 p-3.5 rounded-xl text-slate-400 hover:bg-duii-bg dark:hover:bg-white/5 hover:text-duii-primary transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              {isSidebarOpen && <span className="font-black text-[10px] uppercase tracking-wider">Public Site</span>}
            </Link>
          </nav>

          <div className="p-4 border-t border-duii-secondary/10 flex items-center justify-between">
            <button onClick={logout} className="flex items-center space-x-3 p-3 text-slate-400 hover:text-red-700 font-bold text-xs uppercase transition-colors">
              <ICONS.LogOut />
              {isSidebarOpen && <span>Sign Out</span>}
            </button>
            {isSidebarOpen && <ThemeToggle currentTheme={themeMode} setTheme={setThemeMode} />}
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-duii-bg/50 dark:bg-transparent">
          <header className="h-20 bg-white/90 dark:bg-[#251808]/90 backdrop-blur-md border-b border-duii-secondary/20 flex items-center justify-between px-8 sticky top-0 z-20">
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2.5 hover:bg-duii-bg dark:hover:bg-white/5 rounded-xl text-duii-primary transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
              <h2 className="text-sm font-black text-duii-primary dark:text-white uppercase tracking-widest">{pageTitle}</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-black text-duii-primary dark:text-white uppercase">{currentUser.name}</span>
                <span className="text-[9px] font-bold text-duii-secondary uppercase tracking-widest">{currentUser.role} Level</span>
              </div>
              <img src={currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=3f2305&color=c49a6c`} className="w-10 h-10 rounded-xl ring-2 ring-duii-secondary/30" alt="" />
            </div>
          </header>

          <div className="p-8">
            <Routes>
              <Route path="/portal" element={<Dashboard user={currentUser} users={users} courses={courses} sections={sections} announcements={announcements} />} />
              <Route path="/portal/courses" element={<CourseManagement user={currentUser} courses={courses} setCourses={setCourses} sections={sections} setSections={setSections} teachers={users.filter(u => u.role === UserRole.TEACHER)} />} />
              <Route path="/portal/attendance" element={<AttendancePage user={currentUser} />} />
              <Route path="/portal/assignments" element={<AssignmentsPage user={currentUser} />} />
              <Route path="/portal/announcements" element={<AnnouncementsPage user={currentUser} announcements={announcements} setAnnouncements={setAnnouncements} />} />
              <Route path="/portal/payments" element={<PaymentsPage user={currentUser} />} />
              <Route path="/portal/directory" element={<DirectoryPage user={currentUser} />} />
              <Route path="/portal/ai-assistant" element={<AIAssistantPage user={currentUser} />} />
              <Route path="/portal/settings" element={<SettingsPage user={currentUser} users={users} setUsers={setUsers} />} />
              <Route path="*" element={<Navigate to="/portal" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-duii-bg dark:bg-[#1a1005] font-sans selection:bg-duii-secondary/30 selection:text-duii-primary theme-transition">
      <PublicNavbar onLoginClick={() => setShowLoginModal(true)} currentTheme={themeMode} setTheme={setThemeMode} />

      <main className="text-slate-900 dark:text-[#f8f4e1]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/public-courses" element={<PublicCoursesPage />} />
          <Route path="/admission" element={<PublicAdmissionPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <PublicFooter />

      {showLoginModal && (
        <div className="fixed inset-0 bg-duii-primary/60 dark:bg-black/60 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#251808] rounded-[3rem] shadow-2xl p-10 w-full max-w-md border border-duii-secondary/10 relative overflow-hidden animate-in zoom-in duration-300">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-duii-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div className="flex flex-col items-center mb-10">
              <div className="bg-duii-primary p-4 rounded-2xl shadow-xl mb-6 border-2 border-duii-secondary">
                <svg className="w-10 h-10 text-duii-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h1 className="text-3xl font-black text-duii-primary dark:text-duii-secondary tracking-tighter uppercase">Portal Access</h1>
              <p className="text-duii-secondary font-bold text-[10px] uppercase tracking-[0.25em]">Authenticated Entry</p>
            </div>
            
            {loginStep === 'ROLE' ? (
              <div className="space-y-3">
                {[UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT].map((role) => (
                  <button key={role} onClick={() => { setSelectedRole(role); setLoginStep('CREDENTIALS'); }} className="w-full flex items-center space-x-4 p-4 border border-slate-100 dark:border-white/5 rounded-2xl hover:border-duii-secondary hover:bg-duii-bg/30 dark:hover:bg-white/5 transition-all text-left group">
                    <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl text-slate-400 group-hover:text-duii-primary group-hover:bg-duii-secondary/20 transition-all"><ICONS.Users /></div>
                    <div className="font-bold text-slate-800 dark:text-white uppercase text-xs tracking-wider">{role} Portal</div>
                  </button>
                ))}
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                <button type="button" onClick={() => setLoginStep('ROLE')} className="text-[10px] font-black text-duii-secondary uppercase mb-4 flex items-center hover:translate-x-[-4px] transition-transform"><svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg> Select Role</button>
                <div className="space-y-4">
                  <input type="text" value={userIdInput} onChange={(e) => setUserIdInput(e.target.value)} required className="w-full px-5 py-4 bg-duii-bg/10 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:border-duii-primary outline-none font-bold dark:text-white" placeholder="Institutional ID" />
                  <input type="password" value={passcodeInput} onChange={(e) => setPasscodeInput(e.target.value)} required className="w-full px-5 py-4 bg-duii-bg/10 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:border-duii-primary outline-none font-bold tracking-[0.4em] dark:text-white" placeholder="••••••" />
                </div>
                {loginError && <div className="text-red-500 text-[10px] font-bold text-center bg-red-50 dark:bg-red-900/20 py-2 rounded-lg">{loginError}</div>}
                <button type="submit" className="w-full py-4 bg-duii-primary text-duii-secondary rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl shadow-duii-primary/20">Enter Portal</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
