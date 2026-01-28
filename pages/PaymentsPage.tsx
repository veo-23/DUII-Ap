
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface PaymentsPageProps {
  user: User;
}

const PaymentsPage: React.FC<PaymentsPageProps> = ({ user }) => {
  const [activeGateway, setActiveGateway] = useState<'BKASH' | 'NAGAD' | 'ROCKET'>('BKASH');
  const [amount, setAmount] = useState('5000');
  const [couponCode, setCouponCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const gateways = [
    { id: 'BKASH', name: 'bKash', color: 'bg-[#e2136e]', logo: 'https://seeklogo.com/images/B/bkash-logo-0CBB057774-seeklogo.com.png' },
    { id: 'NAGAD', name: 'Nagad', color: 'bg-[#f47421]', logo: 'https://seeklogo.com/images/N/nagad-logo-7A70BB6666-seeklogo.com.png' },
    { id: 'ROCKET', name: 'Rocket', color: 'bg-[#8c3494]', logo: 'https://seeklogo.com/images/D/dutch-bangla-rocket-logo-B4D1CC458D-seeklogo.com.png' },
  ];

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Transaction initiated. Please complete the process on your mobile device.');
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-duii-primary uppercase tracking-tight">Financial Services</h1>
          <p className="text-duii-secondary text-xs font-bold uppercase tracking-widest mt-1">Darul Ulum Billing Department</p>
        </div>
        <div className="bg-red-50 px-4 py-2 rounded-xl border border-red-100 flex items-center space-x-2">
          <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Balance:</span>
          <span className="text-red-700 font-black text-sm">12,500 BDT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-duii-secondary/20 shadow-sm">
            <h3 className="font-black text-duii-primary uppercase text-sm tracking-widest mb-8 border-b border-duii-secondary/10 pb-4">Secure Gateway Selection</h3>
            <div className="grid grid-cols-3 gap-4">
              {gateways.map(gw => (
                <button
                  key={gw.id}
                  onClick={() => setActiveGateway(gw.id as any)}
                  className={`relative p-5 rounded-[2rem] border-2 transition-all flex flex-col items-center justify-center space-y-3 ${
                    activeGateway === gw.id 
                      ? 'border-duii-secondary bg-duii-bg/30 ring-4 ring-duii-secondary/10' 
                      : 'border-duii-bg bg-duii-bg/10 hover:border-duii-secondary/20'
                  }`}
                >
                  <div className={`w-12 h-12 ${gw.color} rounded-2xl flex items-center justify-center overflow-hidden`}>
                     <img src={gw.logo} alt={gw.name} className="w-8 h-8 object-contain brightness-0 invert" />
                  </div>
                  <span className="font-black text-[10px] uppercase text-slate-700 tracking-tighter">{gw.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-duii-secondary uppercase tracking-widest mb-2">Contribution Amount</label>
                  <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-5 py-4 bg-duii-bg/10 border border-slate-200 rounded-2xl focus:border-duii-primary outline-none font-black text-lg text-duii-primary"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-duii-secondary uppercase tracking-widest mb-2">Institutional Coupon</label>
                  <div className="flex space-x-2">
                    <input 
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="CODE"
                      className="flex-1 px-5 py-4 bg-duii-bg/10 border border-slate-200 rounded-2xl focus:border-duii-primary outline-none uppercase font-black text-sm"
                    />
                    <button className="px-6 py-4 bg-duii-primary text-duii-secondary rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black">Apply</button>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-duii-bg/30 rounded-[2rem] space-y-3 border border-duii-secondary/10">
                <div className="flex justify-between text-[10px] font-black uppercase text-duii-secondary/60">
                  <span>Standard Amount</span>
                  <span>{amount} BDT</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase text-duii-secondary/60">
                  <span>Merchant Fee (1.5%)</span>
                  <span>{(parseInt(amount) * 0.015).toFixed(2)} BDT</span>
                </div>
                <div className="h-px bg-duii-secondary/10 my-2"></div>
                <div className="flex justify-between text-xl font-black text-duii-primary uppercase">
                  <span>Total Payable</span>
                  <span className="text-duii-secondary">{(parseInt(amount) * 1.015).toFixed(2)} BDT</span>
                </div>
              </div>

              <button 
                onClick={handlePay}
                disabled={isProcessing}
                className={`w-full py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] text-duii-secondary shadow-2xl transition-all ${
                  isProcessing ? 'bg-slate-300 cursor-not-allowed' : 'bg-duii-primary hover:bg-black shadow-duii-primary/20'
                }`}
              >
                {isProcessing ? 'Validating...' : `Process ${gateways.find(g => g.id === activeGateway)?.name} Transaction`}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-duii-secondary/20 shadow-sm">
            <h3 className="font-black text-duii-primary uppercase text-sm mb-8 tracking-widest">Recent Archive</h3>
            <div className="space-y-4">
              {[
                { type: 'Tuition Fee', date: 'Jan 15, 2024', amount: '15,000', status: 'PAID' },
                { type: 'Exam Board', date: 'Dec 20, 2023', amount: '2,500', status: 'PAID' },
                { type: 'Resource Fee', date: 'Dec 05, 2023', amount: '200', status: 'FAILED' },
              ].map((txn, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-duii-bg/20 rounded-2xl border border-duii-secondary/10">
                  <div>
                    <h4 className="font-black text-duii-primary text-[10px] uppercase">{txn.type}</h4>
                    <p className="text-[8px] text-duii-secondary/70 uppercase font-black mt-0.5">{txn.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-duii-primary text-xs">{txn.amount} BDT</div>
                    <div className={`text-[8px] font-black uppercase tracking-tighter ${txn.status === 'PAID' ? 'text-emerald-500' : 'text-red-500'}`}>
                      {txn.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 text-duii-secondary font-black text-[9px] uppercase tracking-widest hover:underline">
              Export Institutional Statement
            </button>
          </div>

          <div className="p-8 bg-duii-primary rounded-[3rem] text-duii-secondary shadow-xl border border-duii-secondary/20">
            <h3 className="font-black mb-2 uppercase text-xs tracking-widest">Billing Support</h3>
            <p className="text-[10px] text-duii-secondary/70 mb-8 leading-relaxed font-bold">For any discrepancies in transaction status, please visit the main administrative office.</p>
            <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/10">
              <span className="font-black text-xs uppercase tracking-[0.2em]">+880 1234 5678</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
