
import React, { useState, useEffect } from 'react';
import { User, UserRole, PaymentConfig, Coupon } from '../types';

interface SettingsPageProps {
  user: User;
  users: User[];
  setUsers: (users: User[] | ((prev: User[]) => User[])) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ user, users, setUsers }) => {
  const [activeTab, setActiveTab] = useState<'USERS' | 'PAYMENTS' | 'COUPONS'>('USERS');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'ALL'>('ALL');

  const KEY_PAYMENT_CONFIG = 'duii_payment_config_v3';
  const KEY_COUPONS = 'duii_coupons_v3';

  const [gatewayConfig, setGatewayConfig] = useState<PaymentConfig>({
    gateway: 'BKASH',
    merchantNumber: '01712345678',
    apiKey: 'sk_test_...duii_prod'
  });

  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    const savedConfig = localStorage.getItem(KEY_PAYMENT_CONFIG);
    if (savedConfig) setGatewayConfig(JSON.parse(savedConfig));

    const savedCoupons = localStorage.getItem(KEY_COUPONS);
    if (savedCoupons) setCoupons(JSON.parse(savedCoupons));
  }, []);

  useEffect(() => { localStorage.setItem(KEY_PAYMENT_CONFIG, JSON.stringify(gatewayConfig)); }, [gatewayConfig]);
  useEffect(() => { localStorage.setItem(KEY_COUPONS, JSON.stringify(coupons)); }, [coupons]);

  const [formData, setFormData] = useState({
    name: '',
    role: UserRole.STUDENT,
    id: '',
    passcode: '',
    department: '',
    batch: ''
  });

  const [couponForm, setCouponForm] = useState({
    code: '',
    value: 0,
    type: 'PERCENT' as 'PERCENT' | 'FIXED'
  });

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.name) return;

    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
      alert(`Profile ${formData.name} updated.`);
    } else {
      if (users.find(u => u.id === formData.id)) return alert("ID exists.");
      const newUser: User = {
        ...formData,
        email: `${formData.id.toLowerCase()}@duii.edu`,
        phone: '01XXXX-XXXXX',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=3f2305&color=c49a6c`
      };
      setUsers(prev => [...prev, newUser]);
      alert(`User ${formData.name} registered.`);
    }
    resetForm();
  };

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponForm.code || couponForm.value <= 0) return;
    
    const newCoupon: Coupon = {
      id: Math.random().toString(36).substr(2, 9),
      code: couponForm.code.toUpperCase(),
      discountType: couponForm.type,
      value: couponForm.value,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    setCoupons(prev => [newCoupon, ...prev]);
    setCouponForm({ code: '', value: 0, type: 'PERCENT' });
    alert(`Coupon ${newCoupon.code} generated successfully.`);
  };

  const handlePaymentSync = () => {
    alert("Banking Gateways Synchronized with Institutional Servers.");
  };

  const resetForm = () => {
    setFormData({ name: '', role: UserRole.STUDENT, id: '', passcode: '', department: '', batch: '' });
    setEditingUser(null);
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (user.role !== UserRole.ADMIN) return <div className="p-20 text-center font-black uppercase text-duii-primary">Access Restricted</div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-duii-primary uppercase tracking-tight">Institutional Controls</h1>
          <p className="text-duii-secondary font-bold text-xs uppercase tracking-widest mt-1">Master Management Interface</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-2xl border border-duii-secondary/20 shadow-sm">
          {(['USERS', 'PAYMENTS', 'COUPONS'] as const).map((tab) => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === tab ? 'bg-duii-primary text-duii-secondary shadow-lg' : 'text-slate-400 hover:text-duii-primary'}`}>{tab}</button>
          ))}
        </div>
      </div>

      {activeTab === 'USERS' && (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-duii-secondary/10 shadow-sm">
            <h3 className="text-xl font-black text-duii-primary uppercase mb-6">{editingUser ? 'Modify Record' : 'Enrollment Form'}</h3>
            <form onSubmit={handleUserSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Full Name" className="p-4 bg-duii-bg/10 rounded-2xl outline-none font-bold text-sm border-2 border-transparent focus:border-duii-primary transition-all" required />
              <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as any})} className="p-4 bg-duii-bg/10 rounded-2xl font-bold outline-none text-sm border-2 border-transparent focus:border-duii-primary transition-all">
                <option value={UserRole.STUDENT}>Student</option>
                <option value={UserRole.TEACHER}>Faculty</option>
                <option value={UserRole.ADMIN}>Admin</option>
              </select>
              <input type="text" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} placeholder="Institutional ID" className="p-4 bg-duii-bg/10 rounded-2xl font-bold outline-none text-sm border-2 border-transparent focus:border-duii-primary transition-all" required disabled={!!editingUser} />
              <input type="password" value={formData.passcode} onChange={e => setFormData({...formData, passcode: e.target.value})} placeholder="Access Passcode" className="p-4 bg-duii-bg/10 rounded-2xl font-bold outline-none text-sm border-2 border-transparent focus:border-duii-primary transition-all" required />
              <input type="text" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} placeholder="Department / Faculty" className="p-4 bg-duii-bg/10 rounded-2xl font-bold outline-none text-sm border-2 border-transparent focus:border-duii-primary transition-all" />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 p-4 bg-duii-primary text-duii-secondary rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-lg shadow-duii-primary/10">
                  {editingUser ? 'Update Record' : 'Register User'}
                </button>
                {editingUser && (
                  <button type="button" onClick={resetForm} className="p-4 bg-slate-100 text-slate-500 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
                )}
              </div>
            </form>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 px-2">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search Registry by Name or ID..." 
                  className="w-full pl-12 pr-4 py-4 bg-white border border-duii-secondary/20 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-duii-primary outline-none transition-all shadow-sm"
                />
                <div className="absolute left-4 top-4 text-duii-secondary/50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
              </div>
              <div className="md:w-64">
                <select 
                  value={roleFilter} 
                  onChange={e => setRoleFilter(e.target.value as any)} 
                  className="w-full p-4 bg-white border border-duii-secondary/20 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-duii-primary transition-all shadow-sm"
                >
                  <option value="ALL">All Roles</option>
                  <option value={UserRole.ADMIN}>Administrators</option>
                  <option value={UserRole.TEACHER}>Faculty Members</option>
                  <option value={UserRole.STUDENT}>Active Students</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-duii-secondary/10 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-duii-bg/20 text-[10px] font-black text-duii-secondary uppercase tracking-[0.2em]">
                      <th className="px-8 py-6">Institutional Identity</th>
                      <th className="px-8 py-6">Authority Level</th>
                      <th className="px-8 py-6">Institutional ID</th>
                      <th className="px-8 py-6 text-right">Administrative Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-duii-secondary/5">
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-duii-bg/5 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-3">
                            <img src={u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=3f2305&color=c49a6c`} className="w-8 h-8 rounded-lg shadow-sm" alt="" />
                            <div>
                              <div className="font-black text-duii-primary text-sm uppercase tracking-tight">{u.name}</div>
                              <div className="text-[9px] text-slate-400 font-bold uppercase">{u.department || 'No Dept.'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${
                            u.role === UserRole.ADMIN ? 'bg-amber-50 border-amber-200 text-amber-700' :
                            u.role === UserRole.TEACHER ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                            'bg-slate-50 border-slate-200 text-slate-700'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-8 py-6 font-mono text-xs font-bold text-slate-500">{u.id}</td>
                        <td className="px-8 py-6 text-right space-x-2">
                          <button 
                            type="button"
                            onClick={(e) => { 
                              e.preventDefault();
                              e.stopPropagation();
                              setEditingUser(u); 
                              setFormData({name: u.name, role: u.role, id: u.id, passcode: u.passcode, department: u.department || '', batch: u.batch || ''}); 
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }} 
                            className="p-2.5 bg-duii-bg rounded-xl text-duii-primary hover:bg-duii-secondary hover:text-white transition-all shadow-sm"
                            title="Edit Record"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                          </button>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if(window.confirm(`Permanently remove ${u.name} from registry?`)) {
                                setUsers(prev => prev.filter(x => x.id !== u.id));
                              }
                            }} 
                            disabled={u.id === 'Admin'} 
                            className="p-2.5 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white disabled:opacity-20 transition-all shadow-sm"
                            title="Delete Record"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-8 py-20 text-center text-slate-300 font-bold text-xs uppercase tracking-[0.3em]">
                          No records match your institutional search parameters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'PAYMENTS' && (
        <div className="bg-white p-8 rounded-[2.5rem] border border-duii-secondary/10 shadow-sm max-w-2xl mx-auto">
          <h3 className="text-xl font-black text-duii-primary uppercase mb-8 border-b border-duii-bg pb-4">Secure Gateway API Configuration</h3>
          <div className="space-y-8">
            <div>
              <label className="block text-[10px] font-black text-duii-secondary uppercase mb-3 tracking-widest">Selected Banking Partner</label>
              <div className="grid grid-cols-3 gap-4">
                {(['BKASH', 'NAGAD', 'ROCKET'] as const).map(p => (
                  <button key={p} type="button" onClick={() => setGatewayConfig({...gatewayConfig, gateway: p})} className={`p-5 rounded-2xl border-2 font-black text-xs transition-all uppercase tracking-tighter ${gatewayConfig.gateway === p ? 'border-duii-primary bg-duii-bg/40 text-duii-primary shadow-inner' : 'border-slate-50 text-slate-400 bg-slate-50/50 hover:bg-slate-100'}`}>{p}</button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-duii-secondary uppercase mb-1 tracking-widest px-1">Merchant Reference ID</label>
                <input type="text" value={gatewayConfig.merchantNumber} onChange={e => setGatewayConfig({...gatewayConfig, merchantNumber: e.target.value})} placeholder="e.g. 017XXXXXXXX" className="w-full p-4 bg-duii-bg/10 rounded-2xl font-black outline-none border-2 border-transparent focus:border-duii-primary transition-all" />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-duii-secondary uppercase mb-1 tracking-widest px-1">Institutional Private Key</label>
                <input type="password" value={gatewayConfig.apiKey} onChange={e => setGatewayConfig({...gatewayConfig, apiKey: e.target.value})} placeholder="sk_test_..." className="w-full p-4 bg-duii-bg/10 rounded-2xl font-black tracking-widest outline-none border-2 border-transparent focus:border-duii-primary transition-all" />
              </div>
            </div>
            <button type="button" onClick={handlePaymentSync} className="w-full p-5 bg-duii-primary text-duii-secondary rounded-2xl font-black uppercase text-xs tracking-[0.3em] shadow-xl shadow-duii-primary/20 hover:bg-black transition-all">Synchronize Institutional APIs</button>
          </div>
        </div>
      )}

      {activeTab === 'COUPONS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-duii-secondary/10 shadow-sm">
            <h3 className="text-xl font-black text-duii-primary uppercase mb-6">Create Promotional Incentive</h3>
            <form onSubmit={handleCouponSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-duii-secondary uppercase mb-1 tracking-widest px-1">Unique Voucher Code</label>
                <input type="text" value={couponForm.code} onChange={e => setCouponForm({...couponForm, code: e.target.value})} placeholder="e.g. RAMADAN2024" className="w-full p-4 bg-duii-bg/10 rounded-2xl font-black uppercase border-2 border-transparent focus:border-duii-primary transition-all outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-duii-secondary uppercase mb-1 tracking-widest px-1">Incentive Value & Unit</label>
                <div className="flex gap-4">
                  <input type="number" value={couponForm.value} onChange={e => setCouponForm({...couponForm, value: parseInt(e.target.value)})} placeholder="Value" className="flex-1 p-4 bg-duii-bg/10 rounded-2xl font-black border-2 border-transparent focus:border-duii-primary transition-all outline-none" required />
                  <select value={couponForm.type} onChange={e => setCouponForm({...couponForm, type: e.target.value as any})} className="p-4 bg-duii-bg/10 rounded-2xl font-black outline-none border-2 border-transparent focus:border-duii-primary transition-all">
                    <option value="PERCENT">% (Percentage)</option>
                    <option value="FIXED">BDT (Fixed Amount)</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full p-5 bg-duii-primary text-duii-secondary rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-duii-primary/10 hover:bg-black transition-all">Generate Formal Voucher</button>
            </form>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-duii-secondary/10 shadow-sm overflow-hidden flex flex-col">
            <h3 className="text-xl font-black text-duii-primary uppercase mb-6">Active Voucher Catalog</h3>
            <div className="space-y-3 flex-1 overflow-y-auto pr-2">
              {coupons.length > 0 ? coupons.map(c => (
                <div key={c.id} className="p-5 bg-duii-bg/30 rounded-[1.5rem] border border-duii-secondary/10 flex justify-between items-center group hover:bg-white hover:border-duii-secondary/30 transition-all">
                  <div>
                    <div className="font-black text-duii-primary tracking-tight text-base uppercase">{c.code}</div>
                    <div className="text-[10px] font-black text-duii-secondary uppercase tracking-[0.2em] mt-1">
                      {c.value}{c.discountType === 'PERCENT' ? '%' : ' BDT'} Institutional Credit
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={(e) => { 
                      e.preventDefault();
                      e.stopPropagation(); 
                      if (window.confirm("Retire this incentive code?")) {
                        setCoupons(prev => prev.filter(x => x.id !== c.id));
                      }
                    }} 
                    className="p-3 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="Retire Voucher"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              )) : (
                <div className="flex flex-col items-center justify-center h-full py-10 opacity-30">
                  <svg className="w-16 h-16 text-duii-secondary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-center">No active incentive programs found in registry.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
