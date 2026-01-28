
import React from 'react';
import { Link } from 'react-router-dom';
import { ICONS } from '../constants';

const LandingPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-duii-primary/50 dark:bg-duii-dark-bg/70 mix-blend-multiply z-10 transition-colors duration-700"></div>
          <img 
            src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover scale-100 dark:scale-110 transition-transform duration-[20s] ease-linear" 
            alt="Islamic Architecture" 
            style={{ animation: 'zoomOut 20s infinite alternate' }}
          />
        </div>
        
        <div className="relative z-20 max-w-5xl text-center space-y-10">
          <div className="inline-block px-5 py-2 bg-duii-secondary/30 backdrop-blur-xl border border-duii-secondary/40 rounded-full animate-fade-up">
            <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Illuminating Paths with Traditional Wisdom</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tight leading-[0.95] drop-shadow-2xl animate-scale-in">
            Darul Ulum <br /><span className="text-duii-secondary font-sans font-black uppercase italic">Islamic</span> Institute
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-lg animate-fade-up stagger-2">
            A sanctuary where scholarly tradition meets academic rigor. Discover an educational experience rooted in the eternal values of the Quran and Sunnah.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up stagger-3">
            <Link to="/admission" className="w-full sm:w-auto px-12 py-5 bg-duii-secondary text-duii-primary rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:scale-105 transition-all shadow-2xl">
              Apply For Admission
            </Link>
            <Link to="/public-courses" className="w-full sm:w-auto px-12 py-5 bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white/20 hover:scale-105 transition-all">
              Explore Courses
            </Link>
          </div>
        </div>

        {/* Dynamic Background Elements */}
        <div className="absolute -bottom-24 -left-24 w-[40rem] h-[40rem] border-[1px] border-duii-secondary/20 rounded-full animate-float blur-sm"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-duii-secondary/10 rounded-[10rem] rotate-12 animate-float blur-3xl" style={{ animationDelay: '-3s' }}></div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-white dark:bg-duii-dark-surface px-8 border-b border-duii-secondary/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
          {[
            { label: 'Enrolled Scholars', value: '180+', sub: 'Diverse Student Body', icon: <ICONS.Users /> },
            { label: 'Distinguished Faculty', value: '25+', sub: 'Expert Instructors', icon: <ICONS.Award /> },
            { label: 'Legacy of Knowledge', value: '6+', sub: 'Years of Excellence', icon: <ICONS.Sprout /> }
          ].map((stat, idx) => (
            <div key={idx} className="text-center space-y-4 group animate-fade-up" style={{ animationDelay: `${idx * 0.2}s` }}>
              <div className="text-duii-secondary/20 group-hover:text-duii-secondary transition-colors duration-500 mb-2 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-7xl font-black text-duii-primary dark:text-duii-secondary tracking-tighter transition-transform group-hover:scale-110 duration-700">{stat.value}</div>
              <div className="text-xs font-black uppercase tracking-[0.3em] text-duii-secondary dark:text-white/60">{stat.label}</div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{stat.sub}</p>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#c49a6c 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-40 px-8 bg-duii-bg/30 dark:bg-duii-dark-bg transition-colors duration-700">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <span className="text-[10px] font-black text-duii-secondary uppercase tracking-[0.5em] block animate-fade-up">Our Philosophy</span>
            <h2 className="text-5xl font-serif text-duii-primary dark:text-white tracking-tight leading-tight animate-fade-up stagger-1">Foundations of Our <span className="text-duii-secondary font-sans italic">Sanctuary</span></h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              { title: 'Authenticity', text: 'Preserving the sacred tradition of Quranic and Hadith studies through verified lineages of knowledge.', icon: <ICONS.ShieldCheck /> },
              { title: 'Academic Brilliance', text: 'Fusing the NCTB curriculum with classical methodologies to produce balanced intellectuals.', icon: <ICONS.Award /> },
              { title: 'Character Building', text: 'Focusing on Tazkiyah and Adab as the primary indicators of a true student of knowledge.', icon: <ICONS.Sprout /> }
            ].map((value, idx) => (
              <div key={idx} className="bg-white dark:bg-duii-dark-card p-14 rounded-[4rem] border border-duii-secondary/10 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 group flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: `${idx * 0.2}s` }}>
                <div className="w-20 h-20 bg-duii-bg dark:bg-duii-dark-surface rounded-3xl flex items-center justify-center text-duii-secondary mb-8 group-hover:bg-duii-primary group-hover:text-duii-secondary transition-all duration-500 transform group-hover:rotate-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-black text-duii-primary dark:text-duii-secondary uppercase tracking-tight mb-4">{value.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-40 px-8 bg-duii-primary dark:bg-duii-dark-surface relative overflow-hidden transition-colors duration-700">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6 mb-24">
            <h2 className="text-5xl font-serif text-white uppercase tracking-tight animate-fade-up">Community <span className="text-duii-secondary font-sans italic">Voices</span></h2>
            <p className="text-duii-secondary font-bold text-xs uppercase tracking-[0.3em] animate-fade-up stagger-1">Testimonials from Students & Parents</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { author: 'Br. Ahmed Ali', role: 'Institutional Guardian', content: 'The integration of Hifjul Quran with modern academic standards at DUII is unparalleled. My children are flourishing both spiritually and intellectually.' },
              { author: 'Sr. Fatima Hasan', role: 'Advanced Student', content: 'The mentors here don’t just deliver lectures; they nurture souls. Darul Ulum is more than an institute; it is a home for the heart.' }
            ].map((review, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-2xl border border-white/10 p-14 rounded-[4rem] space-y-8 hover:bg-white/10 transition-all duration-700 group animate-fade-up" style={{ animationDelay: `${idx * 0.3}s` }}>
                <div className="text-duii-secondary flex space-x-1 group-hover:scale-110 transition-transform">
                  {[1,2,3,4,5].map(s => <svg key={s} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                </div>
                <p className="text-white text-xl font-medium leading-relaxed italic opacity-90">"{review.content}"</p>
                <div className="pt-6 border-t border-white/10">
                  <div className="font-black text-duii-secondary uppercase text-sm tracking-widest">{review.author}</div>
                  <div className="text-white/40 text-[11px] font-bold uppercase mt-2">{review.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Islamic Geometric Pattern Decor */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <svg className="w-full h-full" fill="currentColor" viewBox="0 0 100 100">
             <pattern id="premium-grid" width="20" height="20" patternUnits="userSpaceOnUse">
               <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.2"/>
             </pattern>
             <rect width="100%" height="100%" fill="url(#premium-grid)" />
           </svg>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-8 text-center bg-white dark:bg-duii-dark-bg transition-colors duration-700 relative">
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <h2 className="text-5xl md:text-7xl font-serif text-duii-primary dark:text-white tracking-tight leading-tight animate-fade-up">Begin Your Sacred <br /><span className="text-duii-secondary font-sans font-black uppercase italic">Journey</span></h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-[0.4em] animate-fade-up stagger-1">Enrollment for the 2024-25 session is now open</p>
          <div className="animate-fade-up stagger-2">
            <Link to="/contact" className="inline-block px-14 py-6 bg-duii-primary text-duii-secondary rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:bg-black hover:scale-105 transition-all shadow-2xl shadow-duii-primary/20">
              Reserve Your Seat
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
           <svg className="w-[50rem] h-[50rem]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></svg>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
