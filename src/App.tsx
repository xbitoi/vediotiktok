import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, CheckCircle2, Loader2, X, Plus, Play, BarChart2, 
  Users, Settings, LogOut, Video, LayoutDashboard, Lock, 
  MessageCircle, Share2, AlertTriangle, Info, Check, Image as ImageIcon
} from 'lucide-react';

// TikTok Logo SVG
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 448 512" fill="currentColor">
    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
  </svg>
);

const FAKE_VIDEOS = [
  { id: 1, title: 'Summer Vibes 2024 ☀️ #summer #travel', views: '1.2M', likes: '250K', comments: '12K', shares: '5K', date: '2 days ago', thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=600&fit=crop' },
  { id: 2, title: 'New Dance Challenge! Try it out 💃 @user', views: '850K', likes: '120K', comments: '4.5K', shares: '2.1K', date: '5 days ago', thumbnail: 'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?w=400&h=600&fit=crop' },
  { id: 3, title: 'Quick Recipe Tutorial 🍝 #cooking', views: '2.1M', likes: '400K', comments: '22K', shares: '15K', date: '1 week ago', thumbnail: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=600&fit=crop' },
];

export default function App() {
  const [authState, setAuthState] = useState<'logged_out' | 'authorizing' | 'logged_in'>('logged_out');

  if (authState === 'logged_out') {
    return <LoginScreen onConnect={() => setAuthState('authorizing')} />;
  }

  if (authState === 'authorizing') {
    return <TikTokAuthModal onAuthorize={() => setAuthState('logged_in')} onCancel={() => setAuthState('logged_out')} />;
  }

  return <Dashboard onLogout={() => setAuthState('logged_out')} />;
}

function LoginScreen({ onConnect }: { onConnect: () => void }) {
  const [legalView, setLegalView] = useState<'none' | 'terms' | 'policy'>('none');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200">
            <LayoutDashboard className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          SocialSync Pro
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 max-w-sm mx-auto">
          The all-in-one platform for creators to manage, schedule, and analyze their social media presence.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          
          <div className="mb-8 p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex items-start">
            <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3 shrink-0" />
            <div className="text-sm text-blue-800">
              <span className="font-semibold block mb-1">Developer Sandbox Mode</span>
              This application is currently pending TikTok API approval. Logging in is restricted to authorized test accounts.
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                defaultValue="warda_53@gmail.com" 
                className="w-full border border-slate-300 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                defaultValue="password123" 
                className="w-full border border-slate-300 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors" 
              />
            </div>
            <button
              onClick={onConnect}
              className="w-full flex justify-center items-center py-3.5 px-4 bg-indigo-600 text-white rounded-xl shadow-sm text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all group mt-2"
            >
              <TikTokIcon className="w-5 h-5 mr-2.5 text-white group-hover:scale-110 transition-transform" />
              Login & Connect TikTok
            </button>
          </div>
        </div>
        
        <p className="mt-6 text-center text-xs text-slate-400">
          By connecting your account, you agree to our{' '}
          <button onClick={() => setLegalView('terms')} className="text-indigo-600 hover:underline font-medium">Terms of Service</button>
          {' '}and{' '}
          <button onClick={() => setLegalView('policy')} className="text-indigo-600 hover:underline font-medium">Privacy Policy</button>.
        </p>
      </div>

      <AnimatePresence>
        {legalView === 'terms' && (
          <LegalModal 
            title="Terms of Service" 
            onClose={() => setLegalView('none')}
            content={
              <>
                <h3 className="font-bold text-slate-900 mb-2">1. Acceptance of Terms</h3>
                <p className="mb-4">By accessing SocialSync Pro, you agree to be bound by these Terms of Service, as well as the official <strong>TikTok Developer Terms of Service</strong>. If you do not agree, you may not use our API integration.</p>
                
                <h3 className="font-bold text-slate-900 mb-2">2. API Usage & Sandbox Environment</h3>
                <p className="mb-4">This application currently operates in a <strong>Developer Sandbox</strong>. It utilizes the <strong>TikTok Login Kit</strong> for authentication, the <strong>Display API</strong> to fetch public video metadata, and the <strong>Content Posting API</strong> (Direct Post) for video uploads. Access is restricted to authorized test accounts (@warda_53).</p>
                
                <h3 className="font-bold text-slate-900 mb-2">3. Content Restrictions</h3>
                <p className="mb-4">When using the Content Posting API, you agree that all uploaded media complies with TikTok's Community Guidelines. You must not upload content that infringes on intellectual property rights or violates the TikTok API Developer Agreement.</p>
                
                <h3 className="font-bold text-slate-900 mb-2">4. Rate Limiting & Quotas</h3>
                <p className="mb-4">As a Sandbox application, API requests are subject to strict rate limits (e.g., requests per second/minute) enforced by the TikTok Open API platform. Excessive requests may result in temporary suspension of your Sandbox access token.</p>
              </>
            }
          />
        )}
        {legalView === 'policy' && (
          <LegalModal 
            title="Privacy Policy" 
            onClose={() => setLegalView('none')}
            content={
              <>
                <h3 className="font-bold text-slate-900 mb-2">1. Data Collection via Login Kit</h3>
                <p className="mb-4">Upon authorization through the <strong>TikTok Login Kit</strong>, we request the <code>user.info.basic</code> scope. This grants us temporary access to your public profile data, including your Display Name, Avatar URL, and Profile Link.</p>
                
                <h3 className="font-bold text-slate-900 mb-2">2. Video Data & Display API</h3>
                <p className="mb-4">We utilize the <strong>TikTok Display API</strong> (<code>video.list</code> scope) to retrieve metadata for your public videos (views, likes, comments). This data is used solely to populate your SocialSync Pro dashboard.</p>
                
                <h3 className="font-bold text-slate-900 mb-2">3. Data Storage & Security</h3>
                <p className="mb-4">Because this is a client-side Sandbox demonstration, <strong>we do not store your TikTok Access Tokens, Refresh Tokens, or video data on external servers</strong>. All data fetched from <code>open.tiktokapis.com</code> is processed locally in your browser session and is cleared upon logout.</p>
                
                <h3 className="font-bold text-slate-900 mb-2">4. Third-Party Sharing</h3>
                <p className="mb-4">We do not share your data with any third parties. Data is exchanged directly and securely between your browser and TikTok's official API endpoints.</p>
              </>
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TikTokAuthModal({ onAuthorize, onCancel }: { onAuthorize: () => void, onCancel: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      onAuthorize();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-[400px] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col"
      >
        {/* Fake Browser Header */}
        <div className="bg-[#F1F5F9] px-4 py-3 border-b border-slate-200 flex items-center shrink-0">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
          </div>
          <div className="flex-1 bg-white px-3 py-1.5 rounded-md text-xs text-slate-600 flex items-center justify-center shadow-sm border border-slate-200/60">
            <Lock className="w-3 h-3 mr-1.5 text-slate-400" />
            <span className="truncate">https://www.tiktok.com/v2/auth/authorize/</span>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex justify-center mb-5">
            <TikTokIcon className="w-12 h-12 text-black" />
          </div>
          
          <h2 className="text-xl font-bold text-center text-slate-900 mb-1">Authorize SocialSync Pro</h2>
          <p className="text-sm text-center text-slate-500 mb-6 px-4">
            SocialSync Pro would like to access your TikTok account <span className="font-semibold text-slate-700">@warda_53</span>.
          </p>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">This app will be able to:</h3>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mt-0.5 bg-white p-1 rounded-full shadow-sm border border-slate-200 mr-3 shrink-0">
                  <Check className="w-3.5 h-3.5 text-slate-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Read your profile info</p>
                  <p className="text-xs text-slate-500 mt-0.5">Avatar, display name, and profile link.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="mt-0.5 bg-white p-1 rounded-full shadow-sm border border-slate-200 mr-3 shrink-0">
                  <Video className="w-3.5 h-3.5 text-slate-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Read your public videos</p>
                  <p className="text-xs text-slate-500 mt-0.5">View your public videos and their stats.</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="mt-0.5 bg-white p-1 rounded-full shadow-sm border border-slate-200 mr-3 shrink-0">
                  <Upload className="w-3.5 h-3.5 text-slate-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Upload videos</p>
                  <p className="text-xs text-slate-500 mt-0.5">Post videos directly to your TikTok account.</p>
                </div>
              </li>
            </ul>
          </div>

          <p className="text-xs text-slate-400 text-center mb-6 px-2">
            You can remove this access at any time in your TikTok settings.
          </p>

          <div className="flex flex-col gap-2.5">
            <button 
              onClick={handleAuth}
              disabled={isLoading}
              className="w-full flex justify-center items-center px-4 py-3.5 bg-[#FE2C55] text-white rounded-xl font-semibold hover:bg-[#E6284D] transition-colors disabled:opacity-80 relative overflow-hidden"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Authorize'
              )}
            </button>
            <button 
              onClick={onCancel}
              disabled={isLoading}
              className="w-full px-4 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [videos, setVideos] = useState(FAKE_VIDEOS);

  const handleUploadComplete = (newVideo: any) => {
    setVideos([newVideo, ...videos]);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-10">
        <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight">SocialSync</span>
        </div>
        
        <div className="flex-1 py-6 flex flex-col gap-1 px-3 overflow-y-auto">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Platform</div>
          <NavItem icon={<Video className="w-5 h-5" />} label="TikTok Manager" active />
          <NavItem icon={<BarChart2 className="w-5 h-5" />} label="Analytics" />
          <NavItem icon={<Users className="w-5 h-5" />} label="Audience" />
          
          <div className="px-3 mt-6 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Settings</div>
          <NavItem icon={<Settings className="w-5 h-5" />} label="Preferences" />
        </div>
        
        <div className="p-4 border-t border-slate-100 shrink-0">
          <div className="flex items-center p-3 bg-slate-50 rounded-xl border border-slate-100 mb-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm mr-3">
              TU
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">@warda_53</p>
              <p className="text-xs text-slate-500 truncate">Sandbox Account</p>
            </div>
          </div>
          <button onClick={onLogout} className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0 sticky top-0 z-20">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-slate-800 mr-4">Content Dashboard</h1>
            <span className="hidden sm:flex items-center px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-md border border-amber-200">
              <AlertTriangle className="w-3 h-3 mr-1.5" />
              API Sandbox Mode
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200 text-sm active:scale-95"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </button>
          </div>
        </header>

        {/* Content Grid */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            
            {/* API Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mr-4 shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Login Kit</p>
                  <p className="text-lg font-bold text-slate-900">Connected</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4 shrink-0">
                  <BarChart2 className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Display API</p>
                  <p className="text-lg font-bold text-slate-900">Active</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mr-4 shrink-0">
                  <Upload className="w-6 h-6 text-indigo-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Content Posting API</p>
                  <p className="text-lg font-bold text-slate-900">Ready</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Recent Videos</h3>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View all</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {isUploadModalOpen && (
          <UploadModal 
            onClose={() => setIsUploadModalOpen(false)} 
            onComplete={handleUploadComplete} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`flex items-center w-full px-3 py-2.5 rounded-xl transition-all ${active ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}>
      <span className={`mr-3 ${active ? 'text-indigo-600' : 'text-slate-400'}`}>{icon}</span>
      {label}
    </button>
  );
}

function VideoCard({ video }: { video: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-[9/16] bg-slate-900 overflow-hidden">
        {video.videoUrl ? (
          <video 
            src={video.videoUrl} 
            controls 
            className="w-full h-full object-contain bg-black"
            playsInline
          />
        ) : (
          <>
            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 cursor-pointer" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 pointer-events-none" />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
              <div className="flex items-center gap-4 text-white text-sm font-medium">
                <span className="flex items-center gap-1.5"><Play className="w-4 h-4" /> {video.views}</span>
                <span className="flex items-center gap-1.5"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> {video.likes}</span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-slate-900 line-clamp-2 leading-snug flex-1">{video.title}</h3>
        <p className="text-xs text-slate-500 mt-3 font-medium">{video.date} • Published</p>
      </div>
    </motion.div>
  );
}

function UploadModal({ onClose, onComplete }: { onClose: () => void, onComplete: (video: any) => void }) {
  const [step, setStep] = useState<'select' | 'details' | 'uploading' | 'success'>('select');
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Intentionally not revoking the object URL here so it can be played in the dashboard
  }, [videoPreviewUrl]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create a preview URL for the selected video
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);
      
      setStep('details');
    }
  };

  const startUpload = () => {
    setStep('uploading');
    setProgress(0);
    
    // Simulate realistic upload phases
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 5 + 1;
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => setStep('success'), 800);
      } else {
        setProgress(currentProgress);
      }
    }, 200);
  };

  const handleFinish = () => {
    onComplete({
      id: Date.now(),
      title: caption || selectedFile?.name.replace(/\.[^/.]+$/, "") || 'New Video',
      views: '0',
      likes: '0',
      date: 'Just now',
      // Generate a random gradient placeholder if no real thumbnail can be extracted
      thumbnail: `https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop`,
      videoUrl: videoPreviewUrl
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={step === 'uploading' ? undefined : onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center mr-3">
              <Upload className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">Create Post</h2>
              <p className="text-xs text-slate-500 font-medium">via TikTok Content Posting API</p>
            </div>
          </div>
          {step !== 'uploading' && (
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-6 sm:p-8 flex-1 overflow-y-auto bg-slate-50/50">
          {step === 'select' && (
            <div 
              className="border-2 border-dashed border-slate-300 bg-white rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-indigo-50/50 hover:border-indigo-400 transition-all cursor-pointer group min-h-[400px]"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="video/mp4,video/quicktime,video/webm" 
                onChange={handleFileSelect}
              />
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-100 transition-all duration-300 shadow-sm">
                <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Select video to upload</h3>
              <p className="text-sm text-slate-500 mb-8 max-w-sm">
                Drag and drop a file here, or click to browse. Supports MP4, MOV, WebM. Max 50MB for Sandbox.
              </p>
              
              <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-md">
                Select File
              </button>
            </div>
          )}

          {step === 'details' && (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Video Preview Column */}
              <div className="w-full md:w-64 shrink-0 flex flex-col items-center">
                <div className="w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative">
                  {videoPreviewUrl ? (
                    <video 
                      src={videoPreviewUrl} 
                      className="w-full h-full object-contain bg-black"
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                      <ImageIcon className="w-10 h-10 text-slate-300" />
                    </div>
                  )}
                  
                  {/* Fake TikTok UI Overlay for realism */}
                  <div className="absolute right-2 bottom-20 flex flex-col gap-4 items-center opacity-80">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30"><div className="w-8 h-8 bg-slate-300 rounded-full overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" /></div></div>
                    <div className="flex flex-col items-center"><div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-1"><svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div><span className="text-[10px] text-white font-bold drop-shadow-md">0</span></div>
                    <div className="flex flex-col items-center"><div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-1"><MessageCircle className="w-4 h-4 text-white fill-white" /></div><span className="text-[10px] text-white font-bold drop-shadow-md">0</span></div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-12">
                    <p className="text-white text-sm font-bold truncate drop-shadow-md">@warda_53</p>
                    <p className="text-white text-xs truncate mt-1 drop-shadow-md">{caption || 'Your caption will appear here...'}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3 font-medium text-center">Video Preview</p>
              </div>

              {/* Details Column */}
              <div className="flex-1 flex flex-col">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Caption</label>
                    <div className="relative">
                      <textarea 
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors resize-none"
                        rows={4}
                        placeholder="Add a caption, #hashtags, or @mentions..."
                        maxLength={2200}
                      />
                      <span className="absolute bottom-3 right-3 text-xs text-slate-400 font-medium">
                        {caption.length}/2200
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Who can watch this video</label>
                    <select className="w-full border border-slate-300 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors font-medium text-slate-700 appearance-none cursor-pointer">
                      <option value="public">🌍 Public - Anyone on TikTok</option>
                      <option value="friends">👥 Friends - Followers that you follow back</option>
                      <option value="private">🔒 Private - Only me</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <label className="block text-sm font-bold text-slate-900 mb-3">Allow users to:</label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors flex-1 min-w-[120px]">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                        <span className="ml-2.5 text-sm font-medium text-slate-700">Comment</span>
                      </label>
                      <label className="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors flex-1 min-w-[120px]">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                        <span className="ml-2.5 text-sm font-medium text-slate-700">Duet</span>
                      </label>
                      <label className="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors flex-1 min-w-[120px]">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                        <span className="ml-2.5 text-sm font-medium text-slate-700">Stitch</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 flex justify-end gap-3">
                  <button onClick={() => setStep('select')} className="px-5 py-2.5 border border-slate-300 bg-white text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                    Back
                  </button>
                  <button onClick={startUpload} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 flex items-center">
                    <TikTokIcon className="w-4 h-4 mr-2" />
                    Post to TikTok
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'uploading' && (
            <div className="flex flex-col items-center justify-center text-center py-16 min-h-[400px]">
              <div className="w-32 h-32 relative mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                  <motion.circle 
                    cx="50" cy="50" r="45" fill="none" stroke="#4f46e5" strokeWidth="6" strokeLinecap="round"
                    initial={{ strokeDasharray: "0 283" }}
                    animate={{ strokeDasharray: `${(progress / 100) * 283} 283` }}
                    transition={{ duration: 0.2 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tighter">{Math.round(progress)}%</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {progress < 30 ? 'Uploading to servers...' : progress < 70 ? 'Processing video...' : 'Publishing to TikTok...'}
              </h3>
              <p className="text-slate-500 font-medium max-w-[300px] truncate mb-6">
                {selectedFile?.name || 'video.mp4'}
              </p>
              
              <div className="flex items-center text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                Executing Content Posting API Request
              </div>
            </div>
          )}

          {step === 'success' && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center text-center py-16 min-h-[400px]"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center relative shadow-xl shadow-green-200">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <h3 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Post Published!</h3>
              <p className="text-slate-600 mb-10 max-w-md text-lg">
                Your video has been successfully published to your TikTok account via the Content Posting API.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <button 
                  onClick={handleFinish}
                  className="flex-1 px-6 py-3.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-lg"
                >
                  Back to Dashboard
                </button>
                <button 
                  onClick={handleFinish}
                  className="flex-1 px-6 py-3.5 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center"
                >
                  <TikTokIcon className="w-4 h-4 mr-2" />
                  View on TikTok
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function LegalModal({ title, content, onClose }: { title: string, content: React.ReactNode, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[80vh]"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 shrink-0">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
              <Info className="w-4 h-4 text-indigo-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 sm:p-8 overflow-y-auto text-sm text-slate-600 leading-relaxed">
          {content}
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end shrink-0">
          <button onClick={onClose} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
            I Understand
          </button>
        </div>
      </motion.div>
    </div>
  );
}
