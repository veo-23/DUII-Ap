
import React from 'react';
import { ICONS } from '../constants';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-block px-4 py-2 bg-duii-secondary/10 dark:bg-duii-secondary/5 rounded-full">
            <span className="text-[10px] font-black text-duii-primary dark:text-duii-secondary uppercase tracking-[0.3em]">Our Legacy</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-duii-primary dark:text-white uppercase tracking-tight leading-[1.1]">
            Foundation of <br /><span className="text-duii-secondary">Academic Excellence</span>
          </h1>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              Darul Ulum Islamic Institute was founded with a singular purpose: to bridge the gap between traditional Islamic heritage and modern educational demands. 
            </p>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Located in the heart of Dhaka, we provide a holistic environment where students can master the Quranic sciences while excelling in mathematics, technology, and literature. Our methodology is rooted in the "Middle Path," promoting moderation and intellectual curiosity.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-100 dark:border-white/5">
              <div>
                <h4 className="text-[10px] font-black text-duii-primary dark:text-duii-secondary uppercase mb-2 tracking-widest">Established</h4>
                <p className="text-3xl font-black text-duii-secondary dark:text-white tracking-tighter">2018</p>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-duii-primary dark:text-duii-secondary uppercase mb-2 tracking-widest">Location</h4>
                <p className="text-xl font-black text-duii-secondary dark:text-white tracking-tighter">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
          <div className="aspect-square bg-duii-bg dark:bg-[#251808] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white dark:border-white/5 order-1 lg:order-2">
            <img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Campus Life" />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="bg-duii-primary p-10 md:p-20 rounded-[3rem] md:rounded-[4rem] text-duii-secondary space-y-6 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="mb-6 transform transition-transform group-hover:scale-110 duration-500">
                <ICONS.ShieldCheck />
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">Our Mission</h3>
              <p className="text-base md:text-lg font-medium leading-relaxed opacity-80 italic">"To nurture enlightened individuals who embody the values of Islam, demonstrate academic brilliance, and serve as beacons of progress."</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-duii-secondary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
          </div>
          <div className="bg-duii-secondary p-10 md:p-20 rounded-[3rem] md:rounded-[4rem] text-duii-primary space-y-6 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="mb-6 transform transition-transform group-hover:scale-110 duration-500">
                <ICONS.Award />
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">Our Vision</h3>
              <p className="text-base md:text-lg font-medium leading-relaxed opacity-80 italic">"To be a globally recognized center for Islamic education where tradition and innovation coexist, creating a legacy of wisdom."</p>
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-duii-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
