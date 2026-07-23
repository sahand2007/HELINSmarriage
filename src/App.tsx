/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import kurdishCoupleArt from './assets/images/kurdish_groom_bride_art_1784802229558.jpg';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  Volume2, 
  VolumeX, 
  Music, 
  Phone, 
  Share2, 
  Send, 
  CheckCircle2, 
  Copy, 
  Sparkles, 
  ExternalLink,
  Navigation,
  MessageCircle,
  X,
  Play,
  Pause,
  ArrowDown
} from 'lucide-react';

const toKurdishDigits = (str: string | number) => {
  const kurdishDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(str).replace(/[0-9]/g, (w) => kurdishDigits[parseInt(w, 10)]);
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState('1');
  const [rsvpNote, setRsvpNote] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [deviceTime, setDeviceTime] = useState('');

  // Update dynamic device time for user's phone clock (12-hour format)
  useEffect(() => {
    const updateDeviceTime = () => {
      const now = new Date();
      let hoursNum = now.getHours() % 12;
      if (hoursNum === 0) hoursNum = 12;
      const hours = String(hoursNum).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setDeviceTime(toKurdishDigits(`${hours}:${minutes}`));
    };
    updateDeviceTime();
    const interval = setInterval(updateDeviceTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  // Auto-scroll logic: smoothly scrolls down the page step-by-step
  useEffect(() => {
    if (!isOpen || !isAutoScrolling) return;

    const scrollInterval = setInterval(() => {
      const maxScroll = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      ) - window.innerHeight;

      if (window.scrollY >= maxScroll - 15) {
        setIsAutoScrolling(false); // Stop when reached bottom
      } else {
        window.scrollBy({ top: 1.5, behavior: 'smooth' });
      }
    }, 40); // Gentle smooth scrolling

    return () => clearInterval(scrollInterval);
  }, [isOpen, isAutoScrolling]);

  // Target event date: July 24, 2026 at 20:00 (8:00 PM)
  const targetDate = new Date('2026-07-24T20:00:00');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenEnvelope = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    setIsPlaying(true);

    // Wait 1.1s for flap 3D animation before showing full card
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      // Automatically start gentle auto-scroll after opening card
      setTimeout(() => {
        setIsAutoScrolling(true);
      }, 800);
    }, 1100);
  };

  const toggleMusic = () => {
    setIsPlaying(prev => !prev);
  };

  const customShareUrl = "https://helen.helensmarriage.workers.dev/";

  const copyLink = () => {
    navigator.clipboard.writeText(customShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitted(true);
    setTimeout(() => {
      setShowRsvpModal(false);
      setRsvpSubmitted(false);
      setRsvpName('');
      setRsvpNote('');
    }, 2500);
  };

  const mapsUrl = "https://www.google.com/maps/place/35.653970,+45.156908/@35.6539026,45.1567809,18z/data=!3m1!1e3!4m4!3m3!8m2!3d35.6539702!4d45.1569077";

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-2 sm:p-4 text-neutral-800 font-kurdish relative selection:bg-pink-300">
      
      {/* Floating Ambient Pink Petals */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="petal text-pink-400/40" 
            style={{
              left: `${(i * 8) + 4}%`,
              animationDelay: `${i * 0.9}s`,
              animationDuration: `${7 + (i % 5)}s`,
              fontSize: `${14 + (i % 10)}px`
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* Background YouTube Audio Stream Frame for requested video https://youtu.be/actv-AFgtyM */}
      {isPlaying && (
        <iframe 
          className="hidden" 
          title="Background YouTube Music" 
          src="https://www.youtube.com/embed/actv-AFgtyM?autoplay=1&loop=1&playlist=actv-AFgtyM&controls=0&enablejsapi=1"
          allow="autoplay"
        />
      )}

      {/* Mobile Phone Mockup Frame Container (Matching Video Layout) */}
      <div className="w-full max-w-md bg-[#fcf8f5] min-h-[850px] shadow-2xl rounded-3xl overflow-hidden relative border border-pink-200/50 flex flex-col my-auto transition-all duration-700">
        
        {/* Decorative Top Phone Notch / Header bar */}
        <div className="w-full bg-[#fdfaf6] px-6 pt-3 pb-2 flex justify-between items-center text-xs text-neutral-400 border-b border-pink-100/60 z-20">
          <span className="font-semibold text-pink-800/80 tracking-wider font-sans">{deviceTime || '١٠:٤٤'}</span>
          <div className="flex items-center gap-1.5 text-pink-700/60">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
            <span className="text-[11px] font-medium text-pink-900/80">بانگهێشتنامەی دیجیتاڵی 💍</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-neutral-400">
            <div className="w-2.5 h-2.5 bg-pink-500 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>

        {/* Floating Controls: Sound & Auto-Scroll Button */}
        <div className="fixed sm:absolute bottom-6 left-6 z-50 flex items-center gap-2">
          {/* Music Controller */}
          <button
            onClick={toggleMusic}
            className="bg-gradient-to-r from-amber-400 to-pink-500 text-white p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white/80 group"
            title="دەنگ (مۆسیقا)"
          >
            {isPlaying ? (
              <div className="flex items-center gap-1">
                <span className="w-1 h-3 bg-white animate-bounce rounded-full"></span>
                <span className="w-1 h-4 bg-white animate-bounce delay-100 rounded-full"></span>
                <span className="w-1 h-2 bg-white animate-bounce delay-200 rounded-full"></span>
                <Volume2 className="w-5 h-5 mr-1" />
              </div>
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>

          {/* Auto-Scroll Toggle Button (Appears when invitation is opened) */}
          {isOpen && (
            <button
              onClick={() => setIsAutoScrolling(prev => !prev)}
              className={`px-3.5 py-2.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 border-2 border-white/80 text-xs font-bold ${
                isAutoScrolling 
                  ? 'bg-rose-500 text-white ring-2 ring-pink-300 animate-pulse' 
                  : 'bg-white/95 text-neutral-800 hover:bg-pink-50'
              }`}
              title="ڕۆشتنی هێواش (Auto Scroll)"
            >
              <ArrowDown className={`w-4 h-4 ${isAutoScrolling ? 'animate-bounce text-white' : 'text-pink-500'}`} />
              <span>{isAutoScrolling ? 'وەستاندنی ڕۆشتن' : 'ڕۆشتنی هێواش'}</span>
            </button>
          )}
        </div>

        {/* ---------------------------------------------------------------------------------- */}
        {/* SECTION 1: 3D EMBOSSED PINK FLORAL ENVELOPE OPENER (When isOpen === false) */}
        {/* ---------------------------------------------------------------------------------- */}
        {!isOpen ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#fdfbf7] via-[#faf3ed] to-[#f7e9e3] relative overflow-hidden">
            
            {/* Soft Background Rays */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-200/40 via-transparent to-transparent pointer-events-none"></div>

            {/* Title above Envelope */}
            <div className="text-center mb-8 z-10 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 text-pink-800 text-xs font-semibold mb-3 border border-pink-200 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                <span>بانگهێشتنامەی مارەبڕین</span>
              </div>
              <h1 className="text-2xl font-bold text-neutral-800 font-calligraphy tracking-wide">
                ژیلوان <span className="text-pink-500 text-xl font-sans">❤️</span> هێلین
              </h1>
              <p className="text-xs text-neutral-500 mt-1">تکایە کلیک لەسەر نامەکە بکە بۆ کردنەوەی</p>
            </div>

            {/* Realistic Embossed Paper Envelope with 4-Flap 3D Unfolding Animation */}
            <div 
              onClick={handleOpenEnvelope}
              className={`w-full max-w-xs h-72 rounded-2xl relative cursor-pointer group shadow-2xl transition-all duration-700 flex items-center justify-center border-2 border-pink-200/80 bg-[#fdfbf8] perspective-1000 ${isOpening ? 'scale-105 opacity-90' : 'hover:scale-[1.02] active:scale-98'}`}
            >
              {/* Embossed Paper Texture Overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-90 overflow-hidden">
                <img 
                  src="/src/assets/images/pink_floral_envelope_1784801774874.jpg" 
                  alt="Pink Floral Envelope" 
                  className="w-full h-full object-cover rounded-2xl filter brightness-105 opacity-90 group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* 4 Interactive Unfolding Flaps (Top, Bottom, Left, Right) */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden transform-style-3d">
                
                {/* Top Flap (Rotates Upwards on click) */}
                <div 
                  className={`absolute top-0 inset-x-0 w-full h-36 origin-top transition-transform duration-1000 ease-in-out z-30 ${isOpening ? '-rotate-x-180 opacity-20' : ''}`}
                >
                  <svg className="w-full h-full drop-shadow-md text-[#fffcf9]" viewBox="0 0 300 150" fill="currentColor">
                    <path d="M0,0 L150,110 L300,0 Z" fill="#ffffff" fillOpacity="0.95" stroke="#f472b6" strokeWidth="1" strokeOpacity="0.4" />
                    <path d="M110,25 Q130,45 150,70 Q170,45 190,25" fill="none" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                  </svg>
                </div>

                {/* Bottom Flap (Rotates Downwards) */}
                <div 
                  className={`absolute bottom-0 inset-x-0 w-full h-36 origin-bottom transition-transform duration-1000 ease-in-out z-20 ${isOpening ? 'rotate-x-180 opacity-20' : ''}`}
                >
                  <svg className="w-full h-full drop-shadow-md" viewBox="0 0 300 150" fill="currentColor">
                    <path d="M0,150 L150,40 L300,150 Z" fill="#fdf8f4" fillOpacity="0.95" stroke="#f472b6" strokeWidth="1" strokeOpacity="0.3" />
                  </svg>
                </div>

                {/* Left Flap */}
                <div 
                  className={`absolute left-0 inset-y-0 h-full w-36 origin-left transition-transform duration-1000 ease-in-out z-10 ${isOpening ? '-rotate-y-180 opacity-20' : ''}`}
                >
                  <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 150 300" fill="currentColor">
                    <path d="M0,0 L110,150 L0,300 Z" fill="#fdfbf8" fillOpacity="0.9" stroke="#f472b6" strokeWidth="1" strokeOpacity="0.2" />
                  </svg>
                </div>

                {/* Right Flap */}
                <div 
                  className={`absolute right-0 inset-y-0 h-full w-36 origin-right transition-transform duration-1000 ease-in-out z-10 ${isOpening ? 'rotate-y-180 opacity-20' : ''}`}
                >
                  <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 150 300" fill="currentColor">
                    <path d="M150,0 L40,150 L150,300 Z" fill="#fdfbf8" fillOpacity="0.9" stroke="#f472b6" strokeWidth="1" strokeOpacity="0.2" />
                  </svg>
                </div>

              </div>

              {/* Inside Card Peek / Golden Sparkle when opening */}
              {isOpening && (
                <div className="absolute inset-4 bg-gradient-to-tr from-pink-100 via-rose-50 to-amber-100 rounded-xl shadow-inner z-0 flex items-center justify-center animate-pulse">
                  <span className="text-pink-600 font-bold font-calligraphy text-lg">بۆنەکە کرایەوە...</span>
                </div>
              )}

              {/* Center Wax Seal / Heart Button (Click Trigger) */}
              <div className={`z-40 flex flex-col items-center transition-all duration-500 ${isOpening ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 text-white flex items-center justify-center shadow-xl ring-4 ring-pink-100 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Heart className="w-8 h-8 fill-white text-white animate-pulse" />
                </div>
                <div className="mt-4 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 text-pink-800 text-xs font-bold shadow-md flex items-center gap-2 group-hover:bg-pink-500 group-hover:text-white transition-all">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:text-white" />
                  <span>کردنەوەی بانگهێشتنامە</span>
                </div>
              </div>
            </div>

            {/* Bottom Instructions */}
            <div className="mt-8 text-center text-xs text-neutral-500 z-10 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
              <span>بە هیواین ساتێکی خۆش بەسەر ببەن</span>
            </div>

          </div>
        ) : (
          /* ---------------------------------------------------------------------------------- */
          /* SECTION 2: MAIN INVITATION CARD CONTENT (Matching Video Layout 100%) */
          /* ---------------------------------------------------------------------------------- */
          <div className="flex-1 overflow-y-auto bg-islamic-pattern scroll-smooth pb-12 animate-fade-in">
            
            {/* Top Ornamental Header Banner */}
            <div className="relative pt-8 pb-4 text-center px-6 bg-gradient-to-b from-pink-100/70 via-pink-50/40 to-transparent">
              
              {/* Arch Flower Vector Decoration */}
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto rounded-full mb-3 opacity-60"></div>

              <div className="inline-block px-4 py-1 rounded-full bg-pink-100/90 border border-pink-300 text-pink-800 text-xs font-bold mb-3 shadow-xs">
                ✨ ئاهەنگی مارەبڕین ✨
              </div>

              {/* Title Calligraphy: "نامەی مارەبڕین" */}
              <h2 className="text-3xl font-extrabold text-pink-900 font-calligraphy tracking-wider drop-shadow-xs">
                نامەی مارەبڕین
              </h2>

              <div className="w-16 h-0.5 bg-pink-300 mx-auto my-3 rounded-full"></div>

              {/* Groom and Bride Names */}
              <div className="mt-4 flex items-center justify-center gap-3 text-2xl sm:text-3xl font-bold font-calligraphy text-neutral-800">
                <span className="text-pink-950 font-extrabold tracking-wide">ژیلوان</span>
                <span className="text-rose-500 animate-pulse text-2xl">❤️</span>
                <span className="text-pink-950 font-extrabold tracking-wide">هێلین</span>
              </div>

              {/* Date Header: Friday 24/7/2026 */}
              <p className="mt-2 text-xs sm:text-sm text-pink-800/90 font-medium bg-white/70 py-1.5 px-4 rounded-full inline-block border border-pink-200/80 shadow-2xs">
                ٢٠٢٦/٧/٢٤ - هەینی - ٨:٠٠ی ئێوارە
              </p>
            </div>

            {/* Floral Arch Gazebo & Islamic Pattern Card Frame */}
            <div className="px-4 py-2">
              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-pink-200/80 shadow-lg relative overflow-hidden">
                
                {/* Background Arch SVG Outline */}
                <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                  <svg className="w-full h-full text-pink-900" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M10,90 L10,40 Q50,0 90,40 L90,90 Z" />
                  </svg>
                </div>

                {/* Pink Floral Arch Illustration Header */}
                <div className="relative w-full h-44 rounded-xl bg-gradient-to-b from-pink-100/80 to-rose-50/40 flex items-center justify-center mb-6 overflow-hidden border border-pink-200">
                  <div className="absolute inset-0 bg-[radial-gradient(#f472b6_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
                  
                  {/* Floral Pink Dome Illustration SVG */}
                  <svg className="w-40 h-40 text-pink-400 drop-shadow-md" viewBox="0 0 200 200" fill="none" stroke="currentColor">
                    {/* Arch Dome */}
                    <path d="M 40,170 L 40,90 A 60,60 0 0,1 160,90 L 160,170" stroke="#f472b6" strokeWidth="4" fill="none" />
                    <path d="M 50,170 L 50,95 A 50,50 0 0,1 150,95 L 150,170" stroke="#fbcfe8" strokeWidth="2" fill="none" />
                    {/* Pink Flowers on Arch */}
                    <circle cx="100" cy="30" r="12" fill="#f472b6" opacity="0.9" />
                    <circle cx="92" cy="25" r="8" fill="#fda4af" />
                    <circle cx="108" cy="25" r="8" fill="#fda4af" />
                    <circle cx="60" cy="50" r="10" fill="#f472b6" />
                    <circle cx="140" cy="50" r="10" fill="#f472b6" />
                    <circle cx="42" cy="85" r="9" fill="#fb7185" />
                    <circle cx="158" cy="85" r="9" fill="#fb7185" />
                    {/* Couple Silhouette inside Arch */}
                    <path d="M 85,170 C 85,135 75,130 85,115 C 87,110 93,110 95,115 C 105,130 95,135 95,170 Z" fill="#1e293b" /> {/* Groom in Black Suit */}
                    <path d="M 105,170 C 100,140 108,130 115,115 C 117,110 123,110 125,115 C 132,130 140,140 135,170 Z" fill="#f472b6" /> {/* Bride in Pink Dress */}
                  </svg>

                  {/* Sparkle Glows */}
                  <div className="absolute top-3 right-4 text-pink-400 text-xs">✨</div>
                  <div className="absolute bottom-3 left-4 text-pink-400 text-xs">💖</div>
                </div>

                {/* Quranic Verse Box */}
                <div className="bg-gradient-to-br from-amber-50/60 via-pink-50/40 to-amber-50/60 p-4 rounded-xl border border-amber-200/70 text-center mb-6 shadow-2xs">
                  <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-calligraphy font-semibold tracking-wide">
                    «وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً»
                  </p>
                  <span className="block text-[11px] text-amber-800/80 mt-1 font-medium">[سورة الروم: ٢١]</span>
                </div>

                {/* Couple Blessing Note */}
                <div className="text-center space-y-2 mb-6 px-2">
                  <h3 className="text-lg font-bold text-pink-950 font-calligraphy">ژیلوان و هێلین</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    ڕێگایان هەمیشە گوڵڕێژ، دڵیان هەمیشە پڕ لە ئەڤین، خۆشەویستییان بەخشندەیی بۆ نامەی مارەبڕین.
                  </p>
                </div>

                {/* Groom & Bride Kurdish Clothes Illustration Card */}
                <div className="my-6 p-2 rounded-2xl bg-gradient-to-br from-pink-50 via-white to-rose-50 border border-pink-200/90 shadow-md text-center">
                  <div className="relative w-full rounded-xl overflow-hidden border border-pink-200/80 shadow-sm">
                    <img 
                      src={kurdishCoupleArt} 
                      alt="ژیلوان و هێلین بە جلی کوردی"
                      className="w-full h-auto block object-contain"
                    />
                  </div>
                  <p className="text-xs text-neutral-600 font-semibold pt-2 pb-1">
                    بووک و زاوا بە بەرگی ڕەسەنی کوردی
                  </p>
                </div>

              </div>
            </div>

            {/* ---------------------------------------------------------------------------------- */}
            {/* SECTION 3: LOCATION & GOOGLE MAPS (Exact Match to Video Map Section) */}
            {/* ---------------------------------------------------------------------------------- */}
            <div className="px-4 py-3">
              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-pink-200/80 shadow-lg text-center">
                
                {/* Section Title */}
                <div className="inline-flex items-center justify-center gap-2 text-pink-800 font-bold mb-1">
                  <MapPin className="w-5 h-5 text-rose-500" />
                  <span className="text-lg font-calligraphy">شوێن</span>
                </div>

                <h3 className="text-xl font-extrabold text-neutral-900 mb-2">لە ماڵی بووک</h3>
                <p className="text-xs text-neutral-500 mb-4 font-sans dir-ltr">35.653970, 45.156908 - Hajiawai Khwaroo</p>

                {/* Google Maps Interactive Container */}
                <div className="w-full h-48 rounded-xl overflow-hidden border border-neutral-200 shadow-inner relative group mb-4">
                  {/* Google Map Embedded Frame */}
                  <iframe 
                    title="Location Map"
                    src="https://maps.google.com/maps?q=35.653970,45.156908&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 filter saturate-110"
                    loading="lazy"
                  />
                  
                  {/* Pin overlay with custom badge */}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-pink-900 border border-pink-200 shadow-md flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                    <span>ماڵی بووک (حاجیاوای خواروو)</span>
                  </div>
                </div>

                {/* Direct Google Maps Action Button (Exact Match to Video: "دەستنیشانکردنی شوێن") */}
                <a 
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-98"
                >
                  <Navigation className="w-4 h-4 fill-white group-hover:rotate-12 transition-transform" />
                  <span>دەستنیشانکردنی شوێن</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80 mr-auto" />
                </a>

              </div>
            </div>

            {/* ---------------------------------------------------------------------------------- */}
            {/* SECTION 4: COUNTDOWN TIMER (Exact Match to Video Calendar & Grid) */}
            {/* ---------------------------------------------------------------------------------- */}
            <div className="px-4 py-3">
              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-pink-200/80 shadow-lg text-center">
                
                {/* Big Date Display Box (Matching Video Badge: "مانگی ٧ - ٢٤") */}
                <div className="bg-gradient-to-b from-pink-50 to-rose-50/50 rounded-xl p-4 border border-pink-200 mb-6 relative">
                  <div className="absolute top-2 left-3 bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ٢٠٢٦
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 my-2">
                    <div className="text-center px-3 py-1 bg-white/80 rounded-lg border border-pink-200 shadow-2xs">
                      <span className="text-xs text-neutral-500 block">مانگی</span>
                      <span className="text-lg font-bold text-pink-700">٧</span>
                    </div>

                    <div className="text-4xl font-extrabold text-pink-900 font-sans tracking-tight">
                      ٢٤
                    </div>

                    <div className="text-center px-3 py-1 bg-white/80 rounded-lg border border-pink-200 shadow-2xs">
                      <span className="text-xs text-neutral-500 block">ڕۆژی</span>
                      <span className="text-lg font-bold text-pink-700">هەینی</span>
                    </div>
                  </div>

                  <div className="text-xs text-pink-900 font-semibold mt-1">
                    کاتژمێر ٨:٠٠ی ئێوارە
                  </div>
                </div>

                {/* Countdown Headline */}
                <div className="text-xs sm:text-sm font-bold text-neutral-700 mb-4 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-pink-500 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>کاتی ماوە بۆ دەستپێکردنی ئاهەنگەکە</span>
                </div>

                {/* 4 Grid Timer Counters (Days, Hours, Minutes, Seconds) */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  
                  {/* Days */}
                  <div className="bg-gradient-to-b from-white to-pink-50 p-2.5 rounded-xl border border-pink-200 shadow-xs">
                    <span className="text-xl sm:text-2xl font-bold text-pink-900 block font-sans">
                      {toKurdishDigits(String(timeLeft.days).padStart(2, '0'))}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-medium">ڕۆژ</span>
                  </div>

                  {/* Hours */}
                  <div className="bg-gradient-to-b from-white to-pink-50 p-2.5 rounded-xl border border-pink-200 shadow-xs">
                    <span className="text-xl sm:text-2xl font-bold text-pink-900 block font-sans">
                      {toKurdishDigits(String(timeLeft.hours).padStart(2, '0'))}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-medium">کاتژمێر</span>
                  </div>

                  {/* Minutes */}
                  <div className="bg-gradient-to-b from-white to-pink-50 p-2.5 rounded-xl border border-pink-200 shadow-xs">
                    <span className="text-xl sm:text-2xl font-bold text-pink-900 block font-sans">
                      {toKurdishDigits(String(timeLeft.minutes).padStart(2, '0'))}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-medium">خولەک</span>
                  </div>

                  {/* Seconds */}
                  <div className="bg-gradient-to-b from-white to-pink-50 p-2.5 rounded-xl border border-pink-200 shadow-xs">
                    <span className="text-xl sm:text-2xl font-bold text-rose-600 block font-sans animate-pulse">
                      {toKurdishDigits(String(timeLeft.seconds).padStart(2, '0'))}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-medium">چرکە</span>
                  </div>

                </div>

              </div>
            </div>

            {/* ---------------------------------------------------------------------------------- */}
            {/* SECTION 5: CONTACT & RSVP (Exact Match to Video "پەیوەندی") */}
            {/* ---------------------------------------------------------------------------------- */}
            <div className="px-4 py-3">
              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-pink-200/80 shadow-lg text-center">
                
                <div className="inline-flex items-center justify-center gap-2 text-pink-800 font-bold mb-2">
                  <Phone className="w-5 h-5 text-pink-500" />
                  <span className="text-lg font-calligraphy">پەیوەندی</span>
                </div>

                <p className="text-xs text-neutral-600 mb-4">
                  بۆ هەر پرسیار و زانیارییەک لە خزمەتتاندابین
                </p>

                <button 
                  onClick={() => setShowRsvpModal(true)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm shadow-md hover:from-pink-600 hover:to-rose-600 transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>پەیوەندی کردن / ناردنی پیرۆزبایی</span>
                </button>

              </div>
            </div>

            {/* ---------------------------------------------------------------------------------- */}
            {/* SECTION 6: SHARE BUTTONS & FOOTER CREDITS */}
            {/* ---------------------------------------------------------------------------------- */}
            <div className="px-4 pt-2 pb-6 text-center space-y-4">
              
              {/* Share buttons */}
              <div className="flex items-center justify-center gap-2">
                <button 
                  onClick={copyLink}
                  className="px-4 py-2 rounded-full bg-white/80 border border-pink-200 text-neutral-700 text-xs font-semibold shadow-2xs hover:bg-pink-50 transition-all flex items-center gap-1.5"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-pink-500" />}
                  <span>{copied ? 'کۆپیکرا!' : 'کۆپیکردنی بەستەر'}</span>
                </button>

                <a 
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent('بانگهێشتنامەی مارەبڕینی ژیلوان و هێلین 💍 ' + customShareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-emerald-500 text-white shadow-xs hover:bg-emerald-600 transition-all"
                  title="وەتسئاپ"
                >
                  <Send className="w-4 h-4" />
                </a>
              </div>

              <div className="pt-2 border-t border-pink-200/40">
              </div>

            </div>

          </div>
        )}

      </div>

      {/* ---------------------------------------------------------------------------------- */}
      {/* RSVP / CONTACT MODAL POPUP */}
      {/* ---------------------------------------------------------------------------------- */}
      {showRsvpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-pink-200 relative text-right">
            
            <button 
              onClick={() => setShowRsvpModal(false)}
              className="absolute top-4 left-4 text-neutral-400 hover:text-neutral-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-pink-900 font-calligraphy mb-1">
              پەیوەندی و پیرۆزبایی
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              ناوی خۆت و پەیامەکەت بنووسە بۆ بووک و زاوا
            </p>

            {rsvpSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-neutral-800">پەیامەکەت بە سەرکەوتوویی گەیشت!</h4>
                <p className="text-xs text-neutral-500">سوپاس بۆ بەشداریکردنتان لە خۆشییەکانمان</p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">ناوی تەواوت:</label>
                  <input 
                    type="text" 
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="نموونە: ئاری عومەر"
                    className="w-full p-2.5 rounded-xl border border-neutral-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-right"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">ژمارەی میوانەکان:</label>
                  <select 
                    value={rsvpGuests}
                    onChange={(e) => setRsvpGuests(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-right bg-white"
                  >
                    <option value="1">١ کەس</option>
                    <option value="2">٢ کەس</option>
                    <option value="3">٣ کەس</option>
                    <option value="4+">٤ کەس یان زیاتر</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">پەیامی پیرۆزبایی (ئارەزوومەندانە):</label>
                  <textarea 
                    rows={3}
                    value={rsvpNote}
                    onChange={(e) => setRsvpNote(e.target.value)}
                    placeholder="پیرۆزبایی گەرمتان بنووسن..."
                    className="w-full p-2.5 rounded-xl border border-neutral-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-right"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-pink-500 text-white font-bold hover:bg-pink-600 transition-all shadow-md mt-2"
                >
                  ناردنی پیرۆزبایی
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
