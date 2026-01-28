
import React from 'react';
import { ICONS } from '../constants';

const ContactPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-8 bg-duii-cream/20 dark:bg-transparent">
      <div className="max-w-7xl mx-auto space-y-20 md:space-y-24">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-duii-primary dark:text-white uppercase tracking-tight">Institutional Contact</h1>
          <p className="text-duii-secondary font-bold text-xs uppercase tracking-[0.3em]">Global Communications Hub</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
          {/* Main Campus */}
          <div className="bg-white dark:bg-[#251808] p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] border border-duii-secondary/10 dark:border-white/5 shadow-2xl space-y-8 flex flex-col">
            <div className="space-y-4">
              <span className="px-4 py-1.5 bg-duii-primary text-duii-secondary rounded-full text-[9px] font-black uppercase tracking-widest">Primary Establishment</span>
              <h2 className="text-3xl font-black text-duii-primary dark:text-white uppercase tracking-tighter">Main Campus Hub</h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">House #50, Road #09, Pc Culture Housing Society, Shakher tek, Adabor, Dhaka-1207</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <div className="p-5 bg-duii-bg/20 dark:bg-white/5 rounded-2xl flex flex-col items-center text-center">
                <div className="text-duii-secondary mb-2"><ICONS.Phone /></div>
                <p className="text-[9px] font-black uppercase opacity-50 mb-1">Telephony</p>
                <p className="text-xs font-black dark:text-white/80">+880 1234 5678</p>
              </div>
              <div className="p-5 bg-duii-bg/20 dark:bg-white/5 rounded-2xl flex flex-col items-center text-center">
                <div className="text-emerald-500 mb-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.82c1.516.903 3.125 1.379 4.773 1.381 5.419.002 9.829-4.41 9.831-9.829.001-2.625-1.022-5.093-2.882-6.954-1.859-1.859-4.326-2.881-6.951-2.882-5.42 0-9.829 4.41-9.832 9.83-.001 1.747.463 3.448 1.341 4.935l-.837 3.051 3.129-.821zm10.217-7.237c-.244-.122-1.443-.712-1.667-.793-.224-.081-.387-.122-.55.122-.163.244-.63.793-.772.956-.143.163-.285.183-.529.061-.244-.122-1.029-.379-1.961-1.211-.724-.645-1.213-1.442-1.355-1.686-.143-.244-.015-.376.107-.497.11-.11.244-.285.366-.427.122-.143.163-.244.244-.407.081-.163.041-.305-.02-.427-.061-.122-.55-1.322-.753-1.811-.197-.477-.397-.413-.55-.422-.143-.007-.306-.008-.468-.008-.163 0-.427.061-.65.285-.224.224-.855.834-.855 2.035 0 1.201.875 2.361.996 2.524.122.163 1.722 2.628 4.171 3.687.582.252 1.036.402 1.391.515.585.186 1.117.159 1.537.096.469-.07 1.443-.59 1.647-1.159.204-.569.204-1.058.143-1.159-.061-.102-.224-.163-.468-.285z"/></svg>
                </div>
                <p className="text-[9px] font-black uppercase opacity-50 mb-1">WhatsApp</p>
                <p className="text-xs font-black dark:text-white/80">+880 1234 5678</p>
              </div>
              <div className="p-5 bg-duii-bg/20 dark:bg-white/5 rounded-2xl flex flex-col items-center text-center">
                <div className="text-duii-primary dark:text-duii-secondary mb-2"><ICONS.Facebook /></div>
                <p className="text-[9px] font-black uppercase opacity-50 mb-1">Social Hub</p>
                <p className="text-xs font-black dark:text-white/80">fb/duii.dhaka</p>
              </div>
            </div>

            <div className="flex-1 min-h-[300px] rounded-[2.5rem] overflow-hidden border-4 border-duii-bg dark:border-white/5 shadow-inner bg-duii-bg dark:bg-black">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d813.2566719424705!2d90.3549897272324!3d23.768821772888085!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c13000d76d37%3A0xea9e4ebabd027fc3!2sDarul%20Uloom%20Islamic%20Institute!5e0!3m2!1sen!2sbd!4v1764857744216!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                className="opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500"
              ></iframe>
            </div>
          </div>

          {/* Satellite Campus */}
          <div className="bg-white dark:bg-[#251808] p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] border border-duii-secondary/10 dark:border-white/5 shadow-2xl space-y-8 flex flex-col">
            <div className="space-y-4">
              <span className="px-4 py-1.5 bg-duii-secondary text-duii-primary rounded-full text-[9px] font-black uppercase tracking-widest">Regional Annex</span>
              <h2 className="text-3xl font-black text-duii-primary dark:text-white uppercase tracking-tighter">Satellite Campus</h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Road #07, Pc Culture Housing Society, Shakher tek, Adabor, Dhaka-1207</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <div className="p-5 bg-duii-bg/20 dark:bg-white/5 rounded-2xl flex flex-col items-center text-center">
                <div className="text-duii-secondary mb-2"><ICONS.Phone /></div>
                <p className="text-[9px] font-black uppercase opacity-50 mb-1">Telephony</p>
                <p className="text-xs font-black dark:text-white/80">+880 1234 5678</p>
              </div>
              <div className="p-5 bg-duii-bg/20 dark:bg-white/5 rounded-2xl flex flex-col items-center text-center">
                <div className="text-emerald-500 mb-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.82c1.516.903 3.125 1.379 4.773 1.381 5.419.002 9.829-4.41 9.831-9.829.001-2.625-1.022-5.093-2.882-6.954-1.859-1.859-4.326-2.881-6.951-2.882-5.42 0-9.829 4.41-9.832 9.83-.001 1.747.463 3.448 1.341 4.935l-.837 3.051 3.129-.821zm10.217-7.237c-.244-.122-1.443-.712-1.667-.793-.224-.081-.387-.122-.55.122-.163.244-.63.793-.772.956-.143.163-.285.183-.529.061-.244-.122-1.029-.379-1.961-1.211-.724-.645-1.213-1.442-1.355-1.686-.143-.244-.015-.376.107-.497.11-.11.244-.285.366-.427.122-.143.163-.244.244-.407.081-.163.041-.305-.02-.427-.061-.122-.55-1.322-.753-1.811-.197-.477-.397-.413-.55-.422-.143-.007-.306-.008-.468-.008-.163 0-.427.061-.65.285-.224.224-.855.834-.855 2.035 0 1.201.875 2.361.996 2.524.122.163 1.722 2.628 4.171 3.687.582.252 1.036.402 1.391.515.585.186 1.117.159 1.537.096.469-.07 1.443-.59 1.647-1.159.204-.569.204-1.058.143-1.159-.061-.102-.224-.163-.468-.285z"/></svg>
                </div>
                <p className="text-[9px] font-black uppercase opacity-50 mb-1">WhatsApp</p>
                <p className="text-xs font-black dark:text-white/80">+880 1234 5678</p>
              </div>
              <div className="p-5 bg-duii-bg/20 dark:bg-white/5 rounded-2xl flex flex-col items-center text-center">
                <div className="text-duii-secondary mb-2"><ICONS.Mail /></div>
                <p className="text-[9px] font-black uppercase opacity-50 mb-1">Electronic Mail</p>
                <p className="text-xs font-black dark:text-white/80">annex@duii.edu</p>
              </div>
            </div>

            <div className="flex-1 min-h-[300px] rounded-[2.5rem] overflow-hidden border-4 border-duii-bg dark:border-white/5 shadow-inner bg-duii-bg dark:bg-black">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d228.2135619606429!2d90.35525717783018!3d23.76816099694527!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1764858000056!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                className="opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
