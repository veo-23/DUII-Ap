
import React, { useState } from 'react';

const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'ACADEMICS' | 'CAMPUS' | 'EVENTS'>('ALL');

  const images = [
    { url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb', category: 'CAMPUS', title: 'Main Prayer Hall' },
    { url: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0', category: 'ACADEMICS', title: 'Hadith Study Session' },
    { url: 'https://images.unsplash.com/photo-1577985051167-0d49e05343c9', category: 'EVENTS', title: 'Annual Convocation' },
    { url: 'https://images.unsplash.com/photo-1491309055486-24ae511c15c7', category: 'CAMPUS', title: 'Garden Library' },
    { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7', category: 'ACADEMICS', title: 'Modern Computer Lab' },
    { url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420', category: 'EVENTS', title: 'Qirat Competition' }
  ];

  const filtered = filter === 'ALL' ? images : images.filter(i => i.category === filter);

  return (
    <div className="pt-32 pb-24 px-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black text-duii-primary uppercase tracking-tight">Visual Journal</h1>
          <p className="text-duii-secondary font-bold text-xs uppercase tracking-[0.3em]">Institutional Moments</p>
        </div>

        <div className="flex justify-center flex-wrap gap-4">
          {['ALL', 'ACADEMICS', 'CAMPUS', 'EVENTS'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === cat ? 'bg-duii-primary text-duii-secondary shadow-lg' : 'bg-white text-slate-400 hover:text-duii-primary shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((img, idx) => (
            <div key={idx} className="group relative rounded-[3rem] overflow-hidden shadow-xl aspect-square bg-duii-bg animate-in fade-in zoom-in duration-500">
              <img src={`${img.url}?auto=format&fit=crop&q=80&w=600`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={img.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-duii-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-10 flex flex-col justify-end text-white">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-duii-secondary mb-2">{img.category}</span>
                <h3 className="text-xl font-black uppercase tracking-tight leading-none">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
