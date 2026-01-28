
import React, { useState } from 'react';
import { ICONS } from '../constants';

const PublicCoursesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'GENERAL' | 'ARABIC'>('GENERAL');

  const generalClasses = [
    { title: 'Kindergarten', books: 'Bangla, English, Math, Drawing', curriculum: 'NCTB/Foundation', medium: 'Bangla & English' },
    { title: 'Class 01', books: 'Bangla, English, Math, Elementary Science', curriculum: 'NCTB', medium: 'Mixed' },
    { title: 'Class 02', books: 'Bangla, English, Math, BGS', curriculum: 'NCTB', medium: 'Mixed' },
    { title: 'Class 03', books: 'Bangla, English, Math, BGS, Science', curriculum: 'NCTB', medium: 'Bangla Medium' },
    { title: 'Class 04', books: 'Standard Primary Modules', curriculum: 'NCTB', medium: 'Bangla Medium' },
    { title: 'Class 05', books: 'PECE Preparation Modules', curriculum: 'NCTB', medium: 'Bangla Medium' },
    { title: 'Class 06', books: 'Advanced Core Subjects', curriculum: 'NCTB', medium: 'English/Bangla' },
    { title: 'Class 07', books: 'NCTB Core + Arabic Language', curriculum: 'NCTB', medium: 'Mixed' },
    { title: 'Class 08', books: 'JSC Prep Curriculum', curriculum: 'NCTB', medium: 'Bangla Medium' },
    { title: 'Class 09', books: 'Science/Arts/Commerce Branches', curriculum: 'NCTB', medium: 'Bangla Medium' },
  ];

  const arabicClasses = [
    { title: 'Nurani Maktab', books: 'Quran Foundation, Noorani Qaida', curriculum: 'Wifaqul Madaris', medium: 'Arabic/Bengali' },
    { title: 'Najera', books: 'Quran Recitation (Nazirah), Tajweed', curriculum: 'Institutional', medium: 'Arabic' },
    { title: 'Hifjul Quran', books: 'Memorization of 30 Juz, Tajweed Mastery', curriculum: 'Traditional', medium: 'Arabic' },
    { title: 'Mizan', books: 'Mizan as-Sarf, Munshaib, Basics', curriculum: 'Dars-e-Nizami', medium: 'Arabic/Urdu/Bengali' },
    { title: 'Nahw-mir', books: 'Advanced Arabic Syntax, Nahw-mir Text', curriculum: 'Dars-e-Nizami', medium: 'Arabic/Bengali' },
    { title: 'Hidayatun-Nahw', books: 'Philosophical Syntax, Advanced Nahw', curriculum: 'Dars-e-Nizami', medium: 'Arabic' },
  ];

  return (
    <div className="pt-32 pb-32 px-8 min-h-screen bg-duii-cream/30 dark:bg-duii-dark-bg transition-colors duration-700">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-6">
          <span className="text-[10px] font-black text-duii-secondary uppercase tracking-[0.5em] block animate-fade-up">Curriculum Portal</span>
          <h1 className="text-5xl md:text-7xl font-serif text-duii-primary dark:text-white tracking-tight animate-fade-up">Academic <span className="text-duii-secondary font-sans font-black uppercase italic">Excellence</span></h1>
          <p className="text-duii-secondary font-bold text-xs uppercase tracking-[0.3em] animate-fade-up stagger-1">Comprehensive Educational Streams</p>
        </div>

        <div className="flex justify-center animate-fade-up stagger-2">
          <div className="bg-white dark:bg-duii-dark-surface p-2 rounded-[2.5rem] shadow-xl border border-duii-secondary/10 flex overflow-hidden">
            <button 
              onClick={() => setActiveTab('GENERAL')}
              className={`px-8 md:px-16 py-5 rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all duration-500 ${
                activeTab === 'GENERAL' ? 'bg-duii-primary text-duii-secondary shadow-lg' : 'text-slate-400 hover:text-duii-primary dark:hover:text-white'
              }`}
            >
              General Studies
            </button>
            <button 
              onClick={() => setActiveTab('ARABIC')}
              className={`px-8 md:px-16 py-5 rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all duration-500 ${
                activeTab === 'ARABIC' ? 'bg-duii-primary text-duii-secondary shadow-lg' : 'text-slate-400 hover:text-duii-primary dark:hover:text-white'
              }`}
            >
              Arabic Studies
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {(activeTab === 'GENERAL' ? generalClasses : arabicClasses).map((cls, idx) => (
            <div key={idx} className="h-72 perspective group cursor-pointer animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="relative w-full h-full duration-1000 preserve-3d group-hover:rotate-y-180 transition-all">
                {/* Front Card */}
                <div className="absolute inset-0 backface-hidden bg-white dark:bg-duii-dark-card rounded-[3rem] border border-duii-secondary/20 dark:border-white/5 shadow-sm p-10 flex flex-col items-center justify-center text-center space-y-6 group-hover:border-duii-secondary/40 transition-colors">
                  <div className="w-20 h-20 bg-duii-bg dark:bg-duii-dark-surface rounded-[2rem] flex items-center justify-center text-duii-primary dark:text-duii-secondary transition-transform group-hover:scale-110 duration-500">
                    <ICONS.Book />
                  </div>
                  <h3 className="text-xl font-black text-duii-primary dark:text-white uppercase tracking-tight leading-tight">{cls.title}</h3>
                  <div className="flex items-center space-x-2 text-duii-secondary opacity-60">
                    <div className="w-1 h-1 bg-duii-secondary rounded-full"></div>
                    <span className="text-[9px] font-black uppercase tracking-widest">Details</span>
                    <div className="w-1 h-1 bg-duii-secondary rounded-full"></div>
                  </div>
                </div>
                {/* Back Card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-duii-primary dark:bg-duii-dark-surface text-duii-secondary rounded-[3rem] p-10 flex flex-col justify-center space-y-6 shadow-2xl border-2 border-duii-secondary/30 overflow-hidden">
                  <h4 className="text-xs font-black uppercase border-b border-duii-secondary/20 pb-4 text-white tracking-widest">Course Registry</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 opacity-50"><ICONS.Clipboard /></div>
                      <div>
                        <p className="text-[8px] font-black uppercase opacity-50 tracking-widest mb-1">Assigned Modules</p>
                        <p className="text-[10px] font-bold leading-tight text-white/90">{cls.books}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 opacity-50"><ICONS.Layout /></div>
                      <div>
                        <p className="text-[8px] font-black uppercase opacity-50 tracking-widest mb-1">Curriculum Framework</p>
                        <p className="text-[10px] font-bold leading-tight text-white/90">{cls.curriculum}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 opacity-50"><ICONS.Activity /></div>
                      <div>
                        <p className="text-[8px] font-black uppercase opacity-50 tracking-widest mb-1">Instructional Medium</p>
                        <p className="text-[10px] font-bold leading-tight text-white/90">{cls.medium}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        .perspective { perspective: 1500px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default PublicCoursesPage;
