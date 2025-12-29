import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Ticket, MapPin, Calendar, Music, Star, Zap, ShoppingBag, Utensils, PlayCircle, Clock, ExternalLink, Menu, X } from 'lucide-react';

/**
 * 🔗 遷移先リンク定数設定
 */
const EXTERNAL_LINKS = {
  TICKET: "https://fes.nijisanji.jp/2026/",
  ACCESS: "https://fes.nijisanji.jp/2026/",
  VACHSS: "https://fes.nijisanji.jp/2026/",
  CONCERTO: "https://fes.nijisanji.jp/2026/",
  ATTRACTION: "https://fes.nijisanji.jp/2026/",
  GOODS: "https://fes.nijisanji.jp/2026/",
  FOOD: "https://fes.nijisanji.jp/2026/",
  TIMETABLE: "https://fes.nijisanji.jp/2026/",
  MOVIE: "https://fes.nijisanji.jp/2026/",
};

/**
 * 🎨 アニメーションコンポーネント (Scroll Reveal)
 * type: 'up' | 'left' | 'right' | 'zoom'
 */
const Reveal = ({ 
  children, 
  className = "", 
  delay = 0, 
  type = 'up',
  threshold = 0.2
}: { 
  children: React.ReactNode, 
  className?: string, 
  delay?: number, 
  type?: 'up' | 'left' | 'right' | 'zoom',
  threshold?: number
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: threshold });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  const getTransformClass = () => {
    switch(type) {
      case 'left': return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20';
      case 'right': return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20';
      case 'zoom': return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90';
      default: return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20';
    }
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${getTransformClass()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const NijiFes2026LP = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ハーフトーンパターンのSVG
  const HalftonePattern = ({ color = "currentColor", opacity = 0.1 }) => (
    <svg width="100%" height="100%" className={`absolute inset-0 z-0 pointer-events-none text-${color}`} style={{ opacity }}>
      <defs>
        <pattern id="halftone" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#halftone)" />
    </svg>
  );

  // 集中線のSVG
  const SpeedLines = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[repeating-conic-gradient(from_0deg,transparent_0deg,transparent_2deg,#fff_2.5deg,transparent_3deg)] animate-[spin_20s_linear_infinite]"></div>
    </div>
  );

  const handleLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-[#FACC15] selection:text-black overflow-x-hidden">
      {/* --- Styles --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Noto+Sans+JP:wght@400;700;900&display=swap');
        
        .font-comic { font-family: 'Bangers', cursive; }
        .font-jp { font-family: 'Noto Sans JP', sans-serif; }
        
        .comic-border {
          border: 4px solid #000;
          box-shadow: 8px 8px 0px 0px #000;
        }
        
        .comic-border-sm {
          border: 3px solid #000;
          box-shadow: 4px 4px 0px 0px #000;
        }
        
        .comic-text-shadow {
          text-shadow: 4px 4px 0px #000;
        }

        .text-outline {
          -webkit-text-stroke: 2px black;
        }

        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
        
        .clip-diagonal-reverse {
          clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
        }
      `}</style>

      {/* --- Navigation (Fixed) --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 md:py-6 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto bg-[#FACC15] border-4 border-black px-4 py-2 transform -rotate-2 shadow-[4px_4px_0_#000]">
          <span className="font-comic text-2xl text-black tracking-wider">NIJISANJI FES 2026</span>
        </div>
        
        <div className="pointer-events-auto">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-white text-black p-3 border-4 border-black shadow-[4px_4px_0_#000] hover:translate-y-1 hover:shadow-none transition-all"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu Overlay --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0f172a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 animate-fade-in">
          {Object.entries(EXTERNAL_LINKS).map(([key, url], idx) => (
             <a key={key} href={url} target="_blank" rel="noreferrer" className="font-comic text-4xl text-white hover:text-[#FACC15] hover:scale-110 transition-all">
               {key}
             </a>
          ))}
        </div>
      )}

      {/* =========================================
          SECTION 1: HERO (Cover Page)
          ========================================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FACC15]">
        <HalftonePattern color="black" opacity={0.05} />
        <SpeedLines />
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[#f97316] transform skew-x-[-20deg] translate-x-1/3 border-l-8 border-black"></div>
        
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full">
          <Reveal type="zoom" delay={0}>
            <div className="inline-block relative">
              <h1 className="font-comic text-[12vw] md:text-[10rem] leading-[0.85] text-[#22d3ee] drop-shadow-[8px_8px_0_#000] text-outline transform -rotate-2">
                NIJISANJI<br/>
                <span className="text-white block translate-x-8">FES 2026</span>
              </h1>
              <div className="absolute -top-12 -right-12 md:-top-20 md:-right-24 animate-bounce">
                <Zap className="w-24 h-24 md:w-40 md:h-40 text-[#f43f5e] drop-shadow-[4px_4px_0_#000] fill-current stroke-black stroke-2" />
              </div>
            </div>
          </Reveal>

          <Reveal type="up" delay={300}>
            <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-6">
              <div className="bg-black text-white px-8 py-4 transform skew-x-[-10deg] border-4 border-white shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
                <p className="font-jp font-black text-2xl md:text-3xl tracking-widest skew-x-[10deg]">2026.05.16-17</p>
              </div>
              <div className="bg-white text-black px-8 py-4 transform skew-x-[-10deg] border-4 border-black shadow-[8px_8px_0_#000]">
                <p className="font-jp font-black text-2xl md:text-3xl tracking-widest skew-x-[10deg]">MAKUHARI MESSE</p>
              </div>
            </div>
          </Reveal>

          <Reveal type="up" delay={600}>
             <div className="mt-16 animate-pulse">
                <p className="font-comic text-2xl text-black">SCROLL TO START!</p>
                <div className="w-1 h-12 bg-black mx-auto mt-2"></div>
             </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================
          SECTION 2: TICKET (News Ticker style)
          ========================================= */}
      <section className="bg-black py-12 relative z-20 border-y-8 border-black">
        <div className="container mx-auto px-4 max-w-5xl">
          <div onClick={() => handleLink(EXTERNAL_LINKS.TICKET)} className="cursor-pointer group">
            <Reveal type="left">
              <div className="bg-[#f43f5e] p-2 transform -rotate-1 group-hover:rotate-0 transition-transform duration-300">
                <div className="bg-white border-4 border-black p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 comic-shadow">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                       <span className="bg-[#FACC15] border-2 border-black px-3 py-1 font-comic font-bold text-black rotate-[-3deg]">LATEST NEWS</span>
                       <Ticket className="text-[#f43f5e]" />
                    </div>
                    <h2 className="font-jp font-black text-2xl md:text-4xl text-black leading-tight">
                      総合ファンクラブ先行抽選受付開始！
                    </h2>
                    <p className="font-jp font-bold text-gray-500 mt-2">2026.2.4 [Wed] 18:00 START</p>
                  </div>
                  <div className="bg-black text-white font-comic text-2xl px-8 py-4 rounded-full border-4 border-[#f43f5e] group-hover:bg-[#f43f5e] group-hover:text-white group-hover:border-black transition-colors">
                    GET TICKET!
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: VACHSS STAGE (Full Height)
          ========================================= */}
      <section className="relative min-h-[90vh] flex items-center bg-[#1e1b4b] clip-diagonal pb-32">
        <HalftonePattern color="#a855f7" opacity={0.1} />
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
          {/* Left: Text Info */}
          <div className="w-full md:w-1/2 pt-20 md:pt-0">
             <Reveal type="right">
                <div className="inline-block bg-[#a855f7] px-4 py-2 border-2 border-black rotate-[-5deg] mb-6 shadow-[4px_4px_0_#000]">
                  <span className="font-comic text-xl text-black font-bold">DAY 1 - 05.14 [THU]</span>
                </div>
                <h2 className="font-comic text-8xl md:text-9xl text-white comic-text-shadow leading-none mb-6">
                  VACHSS<br/><span className="text-[#a855f7]">LIVE</span>
                </h2>
                <div className="bg-black/80 backdrop-blur-md p-6 border-l-8 border-[#a855f7] mb-8">
                  <h3 className="font-comic text-3xl text-[#a855f7] mb-2">"THE TAKEOVER"</h3>
                  <p className="font-jp text-gray-300 leading-relaxed">
                    剣持刀也 / 葛葉 / 叶 / 夢追翔。<br/>
                    最強の4人が揃うとき、幕張は伝説の目撃者となる。<br/>
                    一夜限りのステージジャックを見逃すな。
                  </p>
                </div>
                <button 
                  onClick={() => handleLink(EXTERNAL_LINKS.VACHSS)}
                  className="bg-white text-black font-comic text-2xl px-8 py-3 border-4 border-black hover:bg-[#a855f7] hover:text-white transition-colors shadow-[6px_6px_0_#000]"
                >
                  VIEW DETAILS
                </button>
             </Reveal>
          </div>

          {/* Right: Visual Area */}
          <div className="w-full md:w-1/2 flex justify-center items-center relative">
             <Reveal type="zoom" delay={200}>
               {/* Decorative Shapes */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#a855f7] rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
               
               {/* Main Visual Frame */}
               <div className="relative w-full max-w-md aspect-[3/4] bg-gray-900 border-4 border-black transform rotate-3 shadow-[12px_12px_0_rgba(0,0,0,0.5)] overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-black"></div>
                 {/* Placeholders for characters */}
                                     <img src='https://fes.nijisanji.jp/2026/images/specialStage/img01.webp'></img>
                 
                 <div className="absolute inset-0 flex items-center justify-center">
                                        <img src='https://fes.nijisanji.jp/2026/images/specialStage/img01.webp'></img>
                    <Music size={120} className="text-[#a855f7]/20 group-hover:scale-125 transition-transform duration-700" />
                 </div>
            
                 <div className="absolute bottom-4 left-4 right-4 bg-white border-2 border-black p-2 text-center transform -rotate-2">
                   <span className="font-comic text-black text-xl">SPECIAL LIVE STAGE</span>
                 </div>
               </div>
             </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: 8th ANNIVERSARY (Full Height)
          ========================================= */}
      <section className="relative min-h-[90vh] flex items-center bg-white -mt-20 pt-32 pb-20 overflow-hidden">
        <HalftonePattern color="#3b82f6" opacity={0.1} />
        
        {/* Slanted Background */}
        <div className="absolute inset-0 bg-[#eff6ff] transform skew-y-3 origin-top-left -z-10"></div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row-reverse items-center gap-12">
          {/* Right: Text Info */}
          <div className="w-full md:w-1/2 text-right md:text-right">
             <Reveal type="left">
                <div className="inline-block bg-[#3b82f6] px-4 py-2 border-2 border-black rotate-[3deg] mb-6 shadow-[4px_4px_0_#000]">
                  <span className="font-comic text-xl text-white font-bold">DAY 2&3 - 05.16-17</span>
                </div>
                <h2 className="font-comic text-7xl md:text-9xl text-black comic-text-shadow leading-none mb-6">
                  8th ANNIV.<br/><span className="text-[#3b82f6]">CONCERTO</span>
                </h2>
                <div className="bg-white/80 backdrop-blur-md p-6 border-r-8 border-[#3b82f6] mb-8 inline-block text-left shadow-[8px_8px_0_rgba(0,0,0,0.1)]">
                  <h3 className="font-comic text-3xl text-[#3b82f6] mb-2">"THE GRAND FINALE"</h3>
                  <p className="font-jp text-gray-600 leading-relaxed">
                    にじさんじ8周年を彩る、珠玉の音楽ステージ。<br/>
                    過去最大級のライバー数で奏でるハーモニー。<br/>
                    この感動は、会場でしか味わえない。
                  </p>
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => handleLink(EXTERNAL_LINKS.CONCERTO)}
                    className="bg-black text-white font-comic text-2xl px-8 py-3 border-4 border-black hover:bg-[#3b82f6] hover:text-white transition-colors shadow-[6px_6px_0_#3b82f6]"
                  >
                    VIEW DETAILS
                  </button>
                </div>
             </Reveal>
          </div>

          {/* Left: Visual Area (Stacked Cards) */}
          <div className="w-full md:w-1/2 relative min-h-[400px]">
             <Reveal type="zoom" delay={200}>
               <div className="relative w-full max-w-md mx-auto">
                 {/* Card 1 */}
                 <div className="absolute top-0 left-0 w-full h-80 bg-[#3b82f6] border-4 border-black rounded-xl transform -rotate-6 z-10 shadow-lg"><img src="https://fes.nijisanji.jp/2026/images/specialStage/img03.webp" alt="" /></div>
                 {/* Card 2 */}
                 <div className="absolute top-4 left-4 w-full h-80 bg-[#60a5fa] border-4 border-black rounded-xl transform -rotate-3 z-20 shadow-lg"><img src="https://fes.nijisanji.jp/2026/images/specialStage/img03.webp" alt="" /></div>
                 {/* Card 3 (Main) */}
                 <div className="relative w-full h-80 bg-white border-4 border-black rounded-xl z-30 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#e0f2fe_0,#e0f2fe_10px,#fff_10px,#fff_20px)]"><img src="https://fes.nijisanji.jp/2026/images/specialStage/img03.webp" alt="" /></div>
                    <Star size={100} className="text-[#3b82f6] animate-[spin_10s_linear_infinite]" />
                    <div className="absolute bottom-0 w-full bg-black text-white text-center py-2 font-comic text-xl">
                      8th ANNIVERSARY
                    </div>
                 </div>
               </div>
             </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 5: ATTRACTIONS & FOOD (Split)
          ========================================= */}
      <section className="bg-[#22c55e] py-20 border-y-8 border-black relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>
         
         <div className="container mx-auto px-4">
            <Reveal type="up">
              <div className="text-center mb-16">
                 <span className="font-comic text-5xl md:text-7xl text-white comic-text-shadow">ENJOY THE FES!</span>
              </div>
            </Reveal>

            <div className="flex flex-col gap-12 max-w-6xl mx-auto">
               
               {/* Row 1: Attractions */}
               <div className="flex flex-col md:flex-row gap-0 md:gap-8 group cursor-pointer" onClick={() => handleLink(EXTERNAL_LINKS.ATTRACTION)}>
                  {/* Image Part */}
                  <Reveal type="left" className="w-full md:w-1/2" >
                    <div className="h-64 md:h-80 bg-black border-4 border-black relative overflow-hidden">
                       <div className="absolute inset-0 bg-gray-800 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <MapPin size={80} className="text-[#22c55e]" />
                       </div>
                       <div className="absolute top-4 left-4 bg-[#FACC15] border-2 border-black px-3 font-comic">SNAP!</div>
                    </div>
                  </Reveal>
                  {/* Text Part */}
                  <Reveal  type="right" delay={100} className="w-full md:w-1/2 bg-white border-4 border-black p-8 shadow-[8px_8px_0_rgba(0,0,0,0.5)] -mt-4 md:mt-0 md:-ml-8 z-10 transform md:rotate-1 group-hover:rotate-0 transition-transform" >
                     <h3 className="font-comic text-4xl mb-2 text-[#22c55e] drop-shadow-[2px_2px_0_#000]">ATTRACTIONS</h3>
                     <h4 className="font-jp font-bold text-xl mb-4 text-[#22c55e] drop-shadow-[2px_2px_0_#000]" >リアルヒーローパトロール</h4>
                     <p className="font-jp text-sm text-gray-600">
                        会場内のどこかでライバーと遭遇？！憧れのヒーローが目の前に現れる奇跡体験。<br/>
                        ※整理券の配布状況は公式Xをご確認ください。
                     </p>
                     <div className="mt-4 flex justify-end">
                        <ArrowRight className="bg-black text-white rounded-full p-2 w-10 h-10" />
                     </div>
                  </Reveal>
               </div>

               {/* Row 2: Food (Reverse) */}
               <div className="flex flex-col md:flex-row-reverse gap-0 md:gap-8 group cursor-pointer" onClick={() => handleLink(EXTERNAL_LINKS.FOOD)}>
                  {/* Image Part */}
                  <Reveal type="right" className="w-full md:w-1/2">
                    <div className="h-64 md:h-80 bg-[#eab308] border-4 border-black relative overflow-hidden">
                       <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_20px,rgba(0,0,0,0.1)_20px,rgba(0,0,0,0.1)_40px)]"></div>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <Utensils size={80} className="text-white drop-shadow-[4px_4px_0_#000]" />
                       </div>
                       <div className="absolute bottom-4 right-4 bg-white border-2 border-black px-3 font-comic text-[#eab308]">YUMMY!</div>
                    </div>
                  </Reveal>
                  {/* Text Part */}
                  <Reveal type="left" delay={100} className="w-full md:w-1/2 bg-white border-4 border-black p-8 shadow-[8px_8px_0_rgba(0,0,0,0.5)] -mt-4 md:mt-0 md:-mr-8 z-10 transform md:-rotate-1 group-hover:rotate-0 transition-transform">
                     <h3 className="font-comic text-4xl mb-2 text-[#eab308] drop-shadow-[2px_2px_0_#000]">COLLAB FOOD</h3>
                     <h4 className="font-jp font-bold text-xl mb-4 text-[#eab308] drop-shadow-[2px_2px_0_#000]">オリジナルフード＆ドリンク</h4>
                     <p className="font-jp text-sm text-gray-600">
                        ライバーの個性が爆発！見た目も味も楽しめるスペシャルメニュー。<br/>
                        全メニュー制覇を目指せ！
                     </p>
                     <div className="mt-4 flex justify-end">
                        <ArrowRight className="bg-black text-white rounded-full p-2 w-10 h-10" />
                     </div>
                  </Reveal>
               </div>
            </div>
         </div>
      </section>

      {/* =========================================
          SECTION 6: GOODS & MOVIE (Grid-ish)
          ========================================= */}
      <section className="bg-[#0f172a] py-20 relative">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Goods */}
              <Reveal type="up" className="cursor-pointer" delay={0}>
                 <div onClick={() => handleLink(EXTERNAL_LINKS.GOODS)} className="h-full bg-[#ec4899] p-2 border-4 border-black rounded-2xl transform hover:-translate-y-2 transition-transform">
                    <div className="h-full bg-[#111] border-4 border-black rounded-xl p-8 flex flex-col items-center text-center relative overflow-hidden">
                       <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#ec4899] rounded-full blur-3xl opacity-20"></div>
                       <ShoppingBag size={64} className="text-[#ec4899] mb-4" />
                       <h3 className="font-comic text-5xl text-white mb-2">OFFICIAL STORE</h3>
                       <p className="font-jp text-gray-400 mb-6">限定グッズを手に入れよう！事前通販受付中。</p>
                       <span className="font-comic text-xl bg-[#ec4899] text-white px-6 py-2 border-2 border-white rounded-full">BUY NOW</span>
                    </div>
                 </div>
              </Reveal>

              {/* Movie */}
              <Reveal type="up" className="cursor-pointer" delay={200}>
                 <div onClick={() => handleLink(EXTERNAL_LINKS.MOVIE)} className="h-full bg-[#06b6d4] p-2 border-4 border-black rounded-2xl transform hover:-translate-y-2 transition-transform">
                    <div className="h-full bg-gray-900 border-4 border-black rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                       <div className="absolute inset-0 bg-[url('https://placehold.co/600x400/000/fff?text=Movie')] bg-cover opacity-50 group-hover:scale-105 transition-transform duration-700"></div>
                       <div className="relative z-10">
                          <PlayCircle size={80} className="text-white mb-4 drop-shadow-[4px_4px_0_#000] group-hover:text-[#22d3ee] transition-colors" />
                          <h3 className="font-comic text-4xl text-white drop-shadow-md">WATCH TEASER</h3>
                       </div>
                    </div>
                 </div>
              </Reveal>
           </div>
        </div>
      </section>

      {/* =========================================
          FOOTER
          ========================================= */}
      <footer className="bg-black text-white py-12 border-t-8 border-[#FACC15]">
         <div className="container mx-auto px-4 text-center">
            <h2 className="font-comic text-6xl text-[#333] mb-8 select-none">NIJISANJI FES</h2>
            

            <p className="font-jp text-xs text-gray-500">
               ※本サイトはデザインコンセプトモデルであり、公式サイトではありません。<br/>
               © ishibashi keita
            </p>
         </div>
      </footer>
      
      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden animate-bounce">
         <button onClick={() => handleLink(EXTERNAL_LINKS.TICKET)} className="bg-[#f43f5e] text-white border-4 border-black rounded-full p-4 shadow-[4px_4px_0_#000]">
            <Ticket size={24} />
         </button>
      </div>

    </div>
  );
};

export default NijiFes2026LP;