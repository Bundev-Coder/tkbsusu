import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, MapPin, Sparkles, Heart, Cloud, Star, BookOpen, Coffee, Music,
  Palette, Calculator, Atom, Laptop, Globe, Activity, Leaf, Sun, CloudSun,
  Moon, CalendarDays, X, Flame, GraduationCap
} from 'lucide-react';

// ==========================================
// HELPER: ICONS
// ==========================================
const getSubjectIcon = (iconName) => {
  switch (iconName) {
    case 'palette':    return <Palette className="w-5 h-5" />;
    case 'book':       return <BookOpen className="w-5 h-5" />;
    case 'coffee':     return <Coffee className="w-5 h-5" />;
    case 'music':      return <Music className="w-5 h-5" />;
    case 'users':      return <Heart className="w-5 h-5" />;
    case 'calculator': return <Calculator className="w-5 h-5" />;
    case 'atom':       return <Atom className="w-5 h-5" />;
    case 'laptop':     return <Laptop className="w-5 h-5" />;
    case 'globe':      return <Globe className="w-5 h-5" />;
    case 'activity':   return <Activity className="w-5 h-5" />;
    case 'leaf':       return <Leaf className="w-5 h-5" />;
    case 'graduation': return <GraduationCap className="w-5 h-5" />;
    default:           return <Star className="w-5 h-5" />;
  }
};

// ==========================================
// COMPONENT: FloatingDecoration
// ==========================================
const FloatingDecoration = ({ children, delay, duration, yOffset, xOffset, scale = 1 }) => (
  <motion.div
    className="absolute text-pink-300/40 pointer-events-none"
    style={{ top: yOffset, left: xOffset, scale }}
    animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
    transition={{ duration: duration, repeat: Infinity, ease: "easeInOut", delay: delay }}
  >
    {children}
  </motion.div>
);

// ==========================================
// MAIN APP COMPONENT
// ==========================================
function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(1);
  const [isFullView, setIsFullView] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    setSelectedDay(new Date().getDay());
    return () => clearInterval(timer);
  }, []);

  const isCurrentlyHappening = (dayId, startStr, endStr) => {
    const currentDayId = currentTime.getDay();
    if (dayId !== currentDayId) return false;
    const currentMins = currentTime.getHours() * 60 + currentTime.getMinutes();
    const [startH, startM] = startStr.split(':').map(Number);
    const [endH, endM] = endStr.split(':').map(Number);
    return currentMins >= (startH * 60 + startM) && currentMins <= (endH * 60 + endM);
  };

  const dayClasses = SCHEDULE_DATA[selectedDay] || [];
  const morningClasses   = dayClasses.filter(sub => parseInt(sub.start.split(':')[0]) < 12);
  const afternoonClasses = dayClasses.filter(sub => parseInt(sub.start.split(':')[0]) >= 12 && parseInt(sub.start.split(':')[0]) < 17);
  const eveningClasses   = dayClasses.filter(sub => parseInt(sub.start.split(':')[0]) >= 17);

  const getCardStyle = (isActive, isExtra, isReview) => {
    if (isActive) {
      if (isReview) return { wrapper: 'bg-white shadow-xl shadow-amber-100 ring-4 ring-amber-400 scale-[1.02]', time: 'text-amber-600', badge: 'bg-amber-500', iconWrap: 'bg-amber-100 text-amber-600', decor: 'text-amber-100' };
      if (isExtra) return { wrapper: 'bg-white shadow-xl shadow-indigo-100 ring-4 ring-indigo-400 scale-[1.02]', time: 'text-indigo-600', badge: 'bg-indigo-500', iconWrap: 'bg-indigo-100 text-indigo-600', decor: 'text-indigo-100' };
      return { wrapper: 'bg-white shadow-xl shadow-pink-100 ring-4 ring-pink-300 scale-[1.02]', time: 'text-pink-500', badge: 'bg-pink-500', iconWrap: 'bg-pink-100 text-pink-500', decor: 'text-pink-50' };
    } else {
      if (isReview) return { wrapper: 'bg-amber-50/60 shadow-sm border-amber-200 hover:shadow-md hover:bg-amber-50', time: 'text-amber-600', badge: '', iconWrap: 'bg-white text-amber-500', decor: 'text-amber-100/50' };
      if (isExtra) return { wrapper: 'bg-indigo-50/60 shadow-sm border-indigo-100 hover:shadow-md hover:bg-indigo-50', time: 'text-indigo-500', badge: '', iconWrap: 'bg-white text-indigo-400', decor: 'text-indigo-100/50' };
      return { wrapper: 'bg-white/80 shadow-sm border-white/60 hover:shadow-md hover:bg-white', time: 'text-teal-600', badge: '', iconWrap: 'bg-teal-50 text-teal-500', decor: 'text-pink-50/50' };
    }
  };

  const renderSubjectCard = (subject, index) => {
    const isActive = isCurrentlyHappening(selectedDay, subject.start, subject.end);
    const { isExtra, isReview } = subject;
    const styles = getCardStyle(isActive, isExtra, isReview);

    return (
      <motion.div
        key={subject.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`relative overflow-hidden rounded-3xl p-5 md:p-6 transition-all duration-500 border border-transparent ${styles.wrapper}`}
      >
        {isActive && (
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -z-10 opacity-70 animate-pulse ${isReview ? 'bg-amber-200' : isExtra ? 'bg-indigo-200' : 'bg-pink-100'}`} />
        )}

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`font-bold text-lg md:text-xl ${styles.time}`}>
                {subject.start} - {subject.end}
              </span>

              {isReview && (
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <Flame className="w-3 h-3" /> Ôn thi TN
                </span>
              )}

              {isExtra && !isReview && (
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <Moon className="w-3 h-3" /> Học thêm
                </span>
              )}

              {isActive && (
                <span className={`text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse flex items-center gap-1 ${styles.badge}`}>
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  Đang diễn ra
                </span>
              )}
            </div>

            <h3 className={`text-xl font-bold mb-3 ${isActive ? 'text-gray-800' : 'text-gray-700'}`}>
              {subject.name}
            </h3>

            <div className={`flex items-center gap-2 text-sm font-medium w-max px-3 py-1.5 rounded-lg
              ${isReview ? 'bg-amber-100/50 text-amber-700' : isExtra ? 'bg-indigo-100/50 text-indigo-600' : 'bg-gray-50/80 text-gray-500'}
            `}>
              <MapPin className={`w-4 h-4 ${isReview ? 'text-amber-500' : isExtra ? 'text-indigo-400' : 'text-pink-400'}`} />
              {subject.room}
            </div>
          </div>

          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner ${styles.iconWrap}`}>
            {getSubjectIcon(subject.icon)}
          </div>
        </div>

        <div className={`absolute -bottom-4 -right-4 pointer-events-none ${styles.decor}`}>
          <Cloud className="w-24 h-24" fill="currentColor" />
        </div>
      </motion.div>
    );
  };

  // --- FULL-WEEK VIEW: small card renderer ---
  const renderSmallCard = (sub) => {
    let bgClass   = 'bg-white border-gray-100 hover:border-pink-200';
    let timeClass = 'bg-pink-50 text-pink-500';

    if (sub.isReview) {
      bgClass   = 'bg-amber-50/50 border-amber-200 hover:border-amber-400';
      timeClass = 'bg-amber-100 text-amber-600';
    } else if (sub.isExtra) {
      bgClass   = 'bg-indigo-50/80 border-indigo-200 hover:border-indigo-400';
      timeClass = 'bg-indigo-100 text-indigo-600';
    }

    return (
      <div key={sub.id} className={`p-3 rounded-2xl text-sm border shadow-sm transition-colors ${bgClass}`}>
        <div className={`font-bold text-xs mb-1 w-max px-2 py-0.5 rounded-lg ${timeClass}`}>
          {sub.start} - {sub.end}
        </div>
        <div className="font-bold text-gray-800 leading-tight mb-1">
          {sub.name}
          {sub.isReview && <span className="text-amber-500 text-[10px] ml-1 flex inline-flex items-center"><Flame className="w-3 h-3" /></span>}
          {sub.isExtra && !sub.isReview && <span className="text-indigo-400 text-[10px] ml-1">(Thêm)</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-teal-50 to-yellow-50 text-gray-700 relative overflow-hidden font-sans">

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');
        body { font-family: 'Quicksand', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Floating decorations */}
      <FloatingDecoration yOffset="10%" xOffset="5%"  duration={4}   delay={0}   scale={1.5}><Cloud fill="currentColor" /></FloatingDecoration>
      <FloatingDecoration yOffset="20%" xOffset="85%" duration={5}   delay={1}   scale={1.2}><Star  fill="currentColor" /></FloatingDecoration>
      <FloatingDecoration yOffset="70%" xOffset="10%" duration={6}   delay={2}   scale={0.8}><Heart fill="currentColor" /></FloatingDecoration>
      <FloatingDecoration yOffset="80%" xOffset="80%" duration={4.5} delay={0.5} scale={1.8}><Cloud fill="currentColor" /></FloatingDecoration>

      <div className="max-w-md mx-auto relative z-10 p-5 md:max-w-2xl md:p-8 min-h-screen flex flex-col">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 pt-4">
          <div className="inline-block bg-white/60 backdrop-blur-md px-6 py-2 rounded-full mb-3 shadow-sm border border-white/50">
            <span className="text-sm font-medium text-pink-500 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              {currentTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} • {currentTime.toLocaleDateString('vi-VN')}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <Sparkles className="text-yellow-400 w-8 h-8" />
            Thời Khóa Biểu <span className="text-pink-400">Su Su</span>
          </h1>

          {/* LỜI CHÚC MỖI NGÀY */}
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedDay}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="text-pink-500/80 mt-3 text-sm md:text-base font-semibold"
            >
              {DAILY_QUOTES[selectedDay]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* DAY SELECTOR */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2 -mx-2 px-2 md:justify-center">
          {DAYS_OF_WEEK.map((day) => {
            const isToday    = new Date().getDay() === day.id;
            const isSelected = selectedDay === day.id;
            return (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`flex-shrink-0 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 relative
                  ${isSelected ? 'bg-pink-400 text-white shadow-lg shadow-pink-200/50 scale-105' : 'bg-white/80 text-gray-500 hover:bg-pink-100/50 hover:text-pink-500'}
                `}
              >
                {day.name}
                {isToday && !isSelected && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-white animate-pulse" />}
              </button>
            );
          })}
        </div>

        {/* DAILY SCHEDULE */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div key={selectedDay} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-4 pb-10">
              {dayClasses.length === 0 ? (
                <div className="bg-white/70 backdrop-blur-xl border-2 border-dashed border-pink-200 rounded-3xl p-10 text-center shadow-sm flex flex-col items-center justify-center h-64">
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-5xl mb-4">🧸</motion.div>
                  <h2 className="text-2xl font-bold text-pink-500 mb-2">Trống lịch rồi!</h2>
                  <p className="text-gray-500 font-medium">Nghỉ ngơi thôi Su Su ơi! ✨ Hãy nạp lại năng lượng nhé.</p>
                </div>
              ) : (
                <>
                  {morningClasses.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4 px-2">
                        <Sun className="w-6 h-6 text-orange-400" />
                        <h3 className="font-bold text-orange-400 uppercase tracking-widest text-sm">Buổi Sáng</h3>
                        <div className="h-px bg-orange-200 flex-1 ml-2"></div>
                      </div>
                      <div className="space-y-4">{morningClasses.map((subject, index) => renderSubjectCard(subject, index))}</div>
                    </div>
                  )}

                  {afternoonClasses.length > 0 && (
                    <div className="mb-6 mt-8">
                      <div className="flex items-center gap-2 mb-4 px-2">
                        <CloudSun className="w-6 h-6 text-teal-500" />
                        <h3 className="font-bold text-teal-600 uppercase tracking-widest text-sm">Buổi Chiều</h3>
                        <div className="h-px bg-teal-200 flex-1 ml-2"></div>
                      </div>
                      <div className="space-y-4">{afternoonClasses.map((subject, index) => renderSubjectCard(subject, index))}</div>
                    </div>
                  )}

                  {eveningClasses.length > 0 && (
                    <div className="mb-6 mt-8">
                      <div className="flex items-center gap-2 mb-4 px-2">
                        <Moon className="w-6 h-6 text-indigo-500" />
                        <h3 className="font-bold text-indigo-500 uppercase tracking-widest text-sm">Buổi Tối</h3>
                        <div className="h-px bg-indigo-200 flex-1 ml-2"></div>
                      </div>
                      <div className="space-y-4">{eveningClasses.map((subject, index) => renderSubjectCard(subject, index))}</div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* FULL WEEK BUTTON */}
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsFullView(true)} className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-pink-400 to-pink-500 text-white p-4 rounded-full shadow-xl shadow-pink-300/50 flex items-center justify-center gap-2 border-2 border-white">
        <CalendarDays className="w-6 h-6" />
        <span className="hidden md:inline font-bold pr-2">Cả tuần</span>
      </motion.button>

      {/* FULL WEEK MODAL */}
      <AnimatePresence>
        {isFullView && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFullView(false)} className="absolute inset-0 bg-pink-100/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", bounce: 0.3 }} className="relative bg-white/90 backdrop-blur-xl rounded-[2rem] w-full max-w-7xl h-full max-h-[85vh] flex flex-col shadow-2xl border-4 border-white overflow-hidden">
              <div className="p-5 border-b border-pink-100 flex justify-between items-center bg-white/50 relative z-10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-pink-400" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">Thời Khóa Biểu Cả Tuần</h2>
                </div>
                <button onClick={() => setIsFullView(false)} className="p-2 bg-pink-50 hover:bg-pink-100 text-pink-500 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-b from-white/50 to-pink-50/30">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 h-full">
                  {[...DAYS_OF_WEEK.filter(d => d.id !== 0), DAYS_OF_WEEK.find(d => d.id === 0)].map(day => {
                    const dClasses = SCHEDULE_DATA[day.id] || [];
                    return (
                      <div key={day.id} className="bg-white/60 rounded-3xl p-3 border border-pink-100 shadow-sm flex flex-col min-w-[150px]">
                        <h3 className={`text-center font-bold mb-3 py-2 rounded-2xl ${day.id === 0 ? 'bg-red-50 text-red-500' : 'bg-teal-50 text-teal-600'}`}>{day.name}</h3>
                        <div className="flex-1 space-y-2 overflow-y-auto hide-scrollbar pr-1">
                          {dClasses.length > 0 ? (
                            <>
                              {dClasses.filter(s => parseInt(s.start.split(':')[0]) < 12).length > 0 && (
                                <div className="mb-3">
                                  <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-2 flex items-center gap-1 bg-orange-50 w-max px-2 py-1 rounded-md"><Sun className="w-3 h-3" /> Sáng</div>
                                  <div className="space-y-2">{dClasses.filter(s => parseInt(s.start.split(':')[0]) < 12).map(renderSmallCard)}</div>
                                </div>
                              )}
                              {dClasses.filter(s => parseInt(s.start.split(':')[0]) >= 12 && parseInt(s.start.split(':')[0]) < 17).length > 0 && (
                                <div className="mt-3">
                                  <div className="text-[10px] font-bold text-teal-500 uppercase tracking-wider mb-2 flex items-center gap-1 bg-teal-50 w-max px-2 py-1 rounded-md"><CloudSun className="w-3 h-3" /> Chiều</div>
                                  <div className="space-y-2">{dClasses.filter(s => parseInt(s.start.split(':')[0]) >= 12 && parseInt(s.start.split(':')[0]) < 17).map(renderSmallCard)}</div>
                                </div>
                              )}
                              {dClasses.filter(s => parseInt(s.start.split(':')[0]) >= 17).length > 0 && (
                                <div className="mt-3">
                                  <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-2 flex items-center gap-1 bg-indigo-50 w-max px-2 py-1 rounded-md"><Moon className="w-3 h-3" /> Tối</div>
                                  <div className="space-y-2">{dClasses.filter(s => parseInt(s.start.split(':')[0]) >= 17).map(renderSmallCard)}</div>
                                </div>
                              )}
                            </>
                          ) : <div className="text-center text-gray-400 text-xs py-4 flex flex-col items-center gap-1"><Cloud className="w-6 h-6 text-gray-200" /> Trống lịch</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- RENDER ---
const root = createRoot(document.getElementById('root'));
root.render(<App />);
