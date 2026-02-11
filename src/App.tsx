import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toPng } from 'html-to-image';
import { cn } from './utils/cn';

// Ramadan Messages
const ramadanMessages = [
  "May Allah accept your fasting and prayers",
  "Wishing you a blessed and peaceful Ramadan",
  "May this holy month bring you countless blessings",
  "Ramadan Mubarak to you and your family",
  "May your heart be filled with peace and joy",
  "Wishing you a month of blessings and forgiveness",
  "May Allah shower His blessings upon you",
  "May this Ramadan be the best one yet",
  "Sending you warm wishes for a blessed Ramadan",
  "May your prayers be answered this Ramadan"
];

// Card Templates
const templates = [
  {
    id: 'elegant',
    name: 'Elegant Blue',
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    accent: '#d4af37',
    pattern: 'islamic-1'
  },
  {
    id: 'royal',
    name: 'Royal Purple',
    bg: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #0f0530 100%)',
    accent: '#ffd700',
    pattern: 'islamic-2'
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    bg: 'linear-gradient(135deg, #0a2e1a 0%, #1b4e2d 50%, #05301a 100%)',
    accent: '#50c878',
    pattern: 'stars'
  },
  {
    id: 'warm',
    name: 'Warm Gold',
    bg: 'linear-gradient(135deg, #2a1f0a 0%, #3d2e14 50%, #1a1405 100%)',
    accent: '#f4a830',
    pattern: 'geometric'
  }
];

// Floating Lanterns Animation Component
function FloatingLanterns({ active }: { active: boolean }) {
  const [lanterns, setLanterns] = useState<Array<{ id: number; x: number; delay: number; duration: number; size: number }>>([]);

  useEffect(() => {
    if (active) {
      const newLanterns = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 4 + Math.random() * 3,
        size: 20 + Math.random() * 30
      }));
      setLanterns(newLanterns);
      
      const timer = setTimeout(() => setLanterns([]), 6000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {lanterns.map((lantern) => (
          <motion.div
            key={lantern.id}
            initial={{ 
              bottom: -100, 
              left: `${lantern.x}%`,
              opacity: 0,
              scale: 0.5
            }}
            animate={{ 
              bottom: '110%',
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.8]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: lantern.duration,
              ease: 'easeOut',
              delay: lantern.delay
            }}
            className="absolute"
            style={{ width: lantern.size }}
          >
            <svg viewBox="0 0 64 96" fill="none" className="w-full h-auto drop-shadow-2xl">
              {/* Glow effect */}
              <ellipse cx="32" cy="60" rx="24" ry="24" fill="url(#glow)" opacity="0.6"/>
              
              {/* Lantern body */}
              <path
                d="M20 40 C20 28 24 24 32 24 C40 24 44 28 44 40 L44 72 C44 80 40 88 32 88 C24 88 20 80 20 72 Z"
                fill="url(#lanternGradient)"
                stroke="#ffd700"
                strokeWidth="2"
              />
              
              {/* Lantern top */}
              <rect x="26" y="16" width="12" height="8" rx="2" fill="#ffd700"/>
              
              {/* Handle */}
              <path d="M24 16 C24 8 40 8 40 16" stroke="#ffd700" strokeWidth="2" fill="none"/>
              
              {/* Lantern bottom */}
              <ellipse cx="32" cy="72" rx="8" ry="4" fill="#ffd700" opacity="0.5"/>
              
              {/* Light inside */}
              <ellipse cx="32" cy="50" rx="10" ry="12" fill="#fff8dc" opacity="0.4"/>
              
              {/* Decorations */}
              <path d="M28 44 L36 44 M28 52 L36 52 M28 60 L36 60" stroke="#ffd700" strokeWidth="1" opacity="0.6"/>
              
              <defs>
                <linearGradient id="lanternGradient" x1="20" y1="24" x2="44" y2="88">
                  <stop offset="0%" stopColor="#ff6b35"/>
                  <stop offset="50%" stopColor="#f7c948"/>
                  <stop offset="100%" stopColor="#ff6b35"/>
                </linearGradient>
                <radialGradient id="glow">
                  <stop offset="0%" stopColor="#ffd700"/>
                  <stop offset="100%" stopColor="transparent"/>
                </radialGradient>
              </defs>
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Sparkle Stars Component
function SparkleStars({ active }: { active: boolean }) {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (active) {
      const newStars = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2
      }));
      setStars(newStars);
      
      const timer = setTimeout(() => setStars([]), 4000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0, 1.5, 1, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5,
              delay: star.delay
            }}
            className="absolute"
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" className="drop-shadow-lg">
              <motion.path
                d="M12 2 L14 8 L20 10 L14 12 L12 18 L10 12 L4 10 L10 8 Z"
                fill="#ffd700"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Background Music Player Component
function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  return (
    <>
      {showPrompt && !isPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-amber-500/90 to-amber-600/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-amber-400/30"
        >
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎵</div>
            <div>
              <p className="text-white font-bold text-sm">Play Background Music</p>
              <p className="text-white/70 text-xs">Beautiful Ramadan Nasheed</p>
            </div>
            <button
              onClick={() => { setIsPlaying(true); setShowPrompt(false); }}
              className="ml-2 px-4 py-2 bg-white text-amber-600 font-bold rounded-xl hover:bg-amber-100 transition-all"
            >
              ▶ Play
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className="text-white/50 hover:text-white ml-2"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}

      {isPlaying && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsPlaying(false)}
          className="fixed bottom-4 right-4 z-50 w-14 h-14 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border-2 border-amber-400/50"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            🎵
          </motion.div>
        </motion.button>
      )}

      {isPlaying && (
        <div className="fixed bottom-0 right-0 opacity-0 pointer-events-none">
          <iframe
            width="1"
            height="1"
            src="https://www.youtube.com/embed/MFMFVupioMY?autoplay=1&loop=1&playlist=MFMFVupioMY"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}
    </>
  );
}

// Islamic Pattern SVG
function IslamicPattern({ color, opacity = 0.1 }: { color: string; opacity?: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity }}>
      <defs>
        <pattern id="islamic-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path
            d="M30 0 L60 30 L30 60 L0 30 Z"
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
          <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
    </svg>
  );
}

// Stars Pattern
function StarsPattern({ color, opacity = 0.1 }: { color: string; opacity?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ opacity }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill={color}>
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// Toast Component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className={cn(
        "fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl shadow-2xl z-50",
        "backdrop-blur-xl border",
        type === 'success' && 'bg-emerald-500/90 border-emerald-400/30 text-white',
        type === 'error' && 'bg-red-500/90 border-red-400/30 text-white',
        type === 'info' && 'bg-blue-500/90 border-blue-400/30 text-white'
      )}
    >
      <p className="text-sm font-medium">{message}</p>
    </motion.div>
  );
}

// Ramadan Card Component
function RamadanCard({ name, template, isPreview = false, message }: { name: string; template: typeof templates[0]; isPreview?: boolean; message: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl",
        isPreview ? "w-full max-w-md aspect-[4/5]" : "w-[400px] aspect-[4/5]"
      )}
      style={{ background: template.bg }}
    >
      {/* Patterns */}
      {template.pattern === 'islamic-1' && <IslamicPattern color={template.accent} opacity={0.08} />}
      {template.pattern === 'islamic-2' && <IslamicPattern color={template.accent} opacity={0.1} />}
      {template.pattern === 'stars' && <StarsPattern color={template.accent} opacity={0.15} />}
      
      {template.pattern === 'geometric' && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${template.accent} 0, ${template.accent} 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px'
          }} />
        </div>
      )}

      {/* Top Decoration */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
        <div 
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: template.accent }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
        {/* School Logo/Name */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: `${template.accent}15` }}>
            <span className="text-2xl">🏫</span>
            <p className="text-sm font-semibold" style={{ color: template.accent }}>
              Skaka International School
            </p>
          </div>
        </motion.div>

        {/* Moon Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1 }}
          className="mb-4"
        >
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${template.accent}20` }}
          >
            <svg width="56" height="56" viewBox="0 0 24 24" fill={template.accent}>
              <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
              <circle cx="17" cy="7" r="1" fill={template.accent}/>
              <circle cx="19" cy="10" r="0.5" fill={template.accent}/>
            </svg>
          </div>
        </motion.div>

        {/* Greeting Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p 
            className="text-sm uppercase tracking-[0.2em] mb-3"
            style={{ color: template.accent }}
          >
            Ramadan Mubarak
          </p>
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ color: template.accent }}
          >
            رمضان مبارك
          </h1>
          <p className="text-white/70 text-base">
            Blessed Ramadan
          </p>
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5 }}
          className="w-32 h-0.5 my-4"
          style={{ backgroundColor: template.accent }}
        />

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-4"
        >
          <p className="text-white/60 text-sm mb-1">Warm Wishes To</p>
          <h2 
            className="text-2xl font-bold"
            style={{ color: template.accent }}
          >
            {name}
          </h2>
        </motion.div>

        {/* Ramadan Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-auto"
        >
          <p className="text-white/60 text-xs mb-2 px-4 italic">
            "{message}"
          </p>
          <div className="flex items-center justify-center gap-2 text-white/50 text-xs">
            <span>🌙</span>
            <span>Every good wish for you</span>
            <span>⭐</span>
          </div>
        </motion.div>

        {/* Lantern Decorations */}
        <div className="absolute bottom-12 left-8 opacity-20">
          <svg width="32" height="48" viewBox="0 0 40 60" fill={template.accent}>
            <path d="M20 0 L25 10 L30 25 C30 35 25 45 20 50 C15 45 10 35 10 25 L15 10 Z"/>
            <circle cx="20" cy="35" r="8" fill="none" stroke={template.accent} strokeWidth="2"/>
          </svg>
        </div>
        <div className="absolute bottom-12 right-8 opacity-20 scale-x-[-1]">
          <svg width="32" height="48" viewBox="0 0 40 60" fill={template.accent}>
            <path d="M20 0 L25 10 L30 25 C30 35 25 45 20 50 C15 45 10 35 10 25 L15 10 Z"/>
            <circle cx="20" cy="35" r="8" fill="none" stroke={template.accent} strokeWidth="2"/>
          </svg>
        </div>
      </div>

      {/* Corner Decorations */}
      <div 
        className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 rounded-tl-2xl opacity-30"
        style={{ borderColor: template.accent }}
      />
      <div 
        className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 rounded-tr-2xl opacity-30"
        style={{ borderColor: template.accent }}
      />
      <div 
        className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 rounded-bl-2xl opacity-30"
        style={{ borderColor: template.accent }}
      />
      <div 
        className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 rounded-br-2xl opacity-30"
        style={{ borderColor: template.accent }}
      />
    </div>
  );
}

// Main App
export function App() {
  const [name, setName] = useState('');
  const [step, setStep] = useState<'input' | 'result'>('input');
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [randomMessage, setRandomMessage] = useState(ramadanMessages[0]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Check URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlName = params.get('name');
    const urlTemplate = params.get('template');
    
    if (urlName) {
      setName(decodeURIComponent(urlName));
      if (urlTemplate) {
        const template = templates.find(t => t.id === urlTemplate);
        if (template) setSelectedTemplate(template);
      }
      setRandomMessage(ramadanMessages[Math.floor(Math.random() * ramadanMessages.length)]);
      setTimeout(() => {
        setStep('result');
        setShowAnimation(true);
      }, 500);
    }
  }, []);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  }, []);

  const handleGenerate = () => {
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      showToast('⚠️ Please enter your name first', 'error');
      return;
    }
    
    if (trimmedName.length < 2) {
      showToast('⚠️ Name is too short', 'error');
      return;
    }

    // Set random message
    setRandomMessage(ramadanMessages[Math.floor(Math.random() * ramadanMessages.length)]);
    setShowAnimation(true);
    
    setTimeout(() => {
      setStep('result');
      
      // Update URL
      const url = new URL(window.location.href);
      url.searchParams.set('name', encodeURIComponent(trimmedName));
      url.searchParams.set('template', selectedTemplate.id);
      window.history.replaceState({}, '', url.toString());
    }, 500);
  };

  const handleDownload = async () => {
    if (isDownloading || !cardRef.current) return;

    setIsDownloading(true);
    showToast('⏳ Preparing your card...', 'info');

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = `Skaka-Ramadan-Card-${name.trim()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('✅ Card downloaded successfully!', 'success');
    } catch (error) {
      console.error('Download error:', error);
      showToast('❌ Error downloading card', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleReset = () => {
    setStep('input');
    setName('');
    setRandomMessage(ramadanMessages[0]);
    
    const url = new URL(window.location.href);
    url.searchParams.delete('name');
    url.searchParams.delete('template');
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <FloatingLanterns active={showAnimation} />
      <SparkleStars active={showAnimation} />
      <BackgroundMusic />
      
      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>

      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glowing Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* School Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-full border border-amber-400/30 mb-6"
          >
            <span className="text-3xl">🏫</span>
            <div className="text-left">
              <h2 className="text-lg font-bold text-amber-400">Skaka International School</h2>
              <p className="text-xs text-white/50">Excellence in Education</p>
            </div>
            <span className="text-3xl">🌟</span>
          </motion.div>

          <div className="inline-flex items-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl"
            >
              🌙
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Ramadan Greeting Card
            </h1>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl"
            >
              ⭐
            </motion.div>
          </div>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Create a beautiful personalized Ramadan greeting card and share it with your friends and family
          </p>
        </motion.header>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {step === 'input' ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Input Section */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    Create Your Card
                  </h2>

                  {/* Name Input */}
                  <div className="mb-6">
                    <label className="block text-white/80 text-sm mb-2 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name here..."
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all"
                      onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                  </div>

                  {/* Template Selection */}
                  <div className="mb-6">
                    <label className="block text-white/80 text-sm mb-4 font-medium">
                      Choose Design Style
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {templates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => setSelectedTemplate(template)}
                          className={cn(
                            "relative p-4 rounded-2xl border-2 transition-all overflow-hidden group",
                            selectedTemplate.id === template.id
                              ? "border-amber-400 ring-2 ring-amber-400/30"
                              : "border-white/10 hover:border-white/30"
                          )}
                        >
                          <div 
                            className="absolute inset-0 opacity-50"
                            style={{ background: template.bg }}
                          />
                          <div className="relative z-10">
                            <div 
                              className="w-6 h-6 rounded-full mx-auto mb-2"
                              style={{ backgroundColor: template.accent }}
                            />
                            <p className="text-white text-sm font-medium">{template.name}</p>
                          </div>
                          {selectedTemplate.id === template.id && (
                            <motion.div
                              layoutId="selected"
                              className="absolute inset-0 border-2 border-amber-400 rounded-2xl"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={handleGenerate}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span>✨</span>
                    Generate Card
                    <span>🌙</span>
                  </button>
                </div>

                {/* Preview Section */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-2xl">👁️</span>
                    Card Preview
                  </h2>
                  <div className="flex justify-center">
                    <RamadanCard 
                      name={name.trim() || 'Your Name'} 
                      template={selectedTemplate}
                      isPreview
                      message={randomMessage}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-xl mx-auto"
            >
              {/* Card Result */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-6">
                <div className="flex justify-center" ref={cardRef}>
                  <RamadanCard 
                    name={name.trim()} 
                    template={selectedTemplate}
                    message={randomMessage}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={cn(
                    "flex-1 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2",
                    isDownloading 
                      ? "opacity-50 cursor-not-allowed" 
                      : "hover:from-emerald-400 hover:to-emerald-500 hover:scale-[1.02] active:scale-[0.98]"
                  )}
                >
                  <span>📥</span>
                  {isDownloading ? 'Downloading...' : 'Download Card'}
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-2xl border border-white/10 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>🔄</span>
                  Create New Card
                </button>
              </div>

              {/* Share Info */}
              <div className="mt-6 text-center">
                <p className="text-white/40 text-sm">
                  💡 Share your beautiful Ramadan card with friends and family!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16 pb-8"
        >
          <div className="inline-flex flex-col items-center gap-3">
            <div className="flex items-center gap-4 text-white/30 text-sm">
              <span>🌙</span>
              <span>Made with ❤️ for Ramadan 1446H</span>
              <span>🌙</span>
            </div>
            <div className="flex items-center gap-2 text-amber-400/60 text-sm font-medium">
              <span>🏫</span>
              <span>Skaka International School - Ramadan Mubarak</span>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
