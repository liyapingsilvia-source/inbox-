import React, { useState } from 'react';
import {
  MoreHorizontal, Grid3X3, Lock, Bookmark, Heart, Plus, User, UserPlus, Footprints,
  Pen, Menu, ChevronDown, CheckCircle2, GraduationCap, Phone, Mail, MapPin, Clock,
  ShoppingCart, ShoppingBag, Repeat, Music, PlayCircle, Settings,
  Signal, Wifi, BatteryFull
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';

const CustomMusicIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.3984 0.893753C13.2109 0.658661 15.1889 0.711855 16.8066 1.35469C16.8496 1.37173 17.1192 1.46357 17.3848 1.66621L17.498 1.75996L17.6572 1.92305C17.7569 2.03832 17.8438 2.16673 17.9141 2.30196L18.0068 2.50996L18.0527 2.65254C18.144 2.98289 18.128 3.28687 18.1279 3.32832V13.7492H18.1123C18.1187 13.8383 18.123 13.9281 18.123 14.0188C18.123 16.0564 16.4712 17.7081 14.4336 17.7082C12.3959 17.7082 10.7442 16.0564 10.7441 14.0188C10.7442 11.9811 12.3959 10.3293 14.4336 10.3293C14.671 10.3293 14.903 10.3529 15.1279 10.3957V3.96211C14.2225 3.73799 13.0545 3.70457 11.7842 3.86934C10.4594 4.0412 9.15769 4.41265 8.12793 4.87617V14.7912H8.12012C8.12023 14.8032 8.12109 14.8153 8.12109 14.8273C8.12109 16.8787 6.45854 18.5412 4.40723 18.5412C2.35593 18.5412 0.693359 16.8786 0.693359 14.8273C0.693427 12.7761 2.35597 11.1135 4.40723 11.1135C4.65385 11.1135 4.89476 11.1379 5.12793 11.1838V4.342C5.12784 4.2991 5.1102 3.9383 5.22949 3.58614L5.30664 3.39278C5.39489 3.2038 5.51499 3.02822 5.6582 2.87813L5.75586 2.7834C5.98698 2.57681 6.23216 2.46296 6.26758 2.44453C7.71029 1.68958 9.56427 1.13167 11.3984 0.893753Z" fill="currentColor" />
  </svg>
);

const CustomShopIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.99936 0.625122C12.2094 0.625283 14.0753 2.2679 14.3558 4.46008L14.7718 7.70911H16.4876C17.2697 7.70911 17.6611 7.70937 17.9447 7.86731C18.1937 8.00598 18.3884 8.22527 18.4955 8.48938C18.6174 8.79023 18.569 9.17902 18.473 9.9552L17.9378 14.2804C17.733 15.9361 17.6303 16.7647 17.2416 17.3888C16.8988 17.9387 16.4026 18.3769 15.8148 18.6495C15.1477 18.959 14.3135 18.9591 12.6449 18.9591H7.35679C5.6882 18.9591 4.85398 18.9589 4.18686 18.6495C3.59907 18.3769 3.10287 17.9387 2.76011 17.3888C2.37128 16.7647 2.2687 15.9362 2.06382 14.2804L1.52866 9.9552C1.43262 9.17902 1.38427 8.79023 1.5062 8.48938C1.61329 8.2253 1.80802 8.00597 2.05698 7.86731C2.34052 7.70948 2.73138 7.70911 3.51304 7.70911H5.2269L5.64194 4.46008C5.9224 2.26787 7.7893 0.625305 9.99936 0.625122ZM9.99936 3.54114C9.25708 3.54132 8.62975 4.09391 8.5355 4.8302L8.16733 7.70911H11.8304L11.4623 4.8302C11.368 4.09394 10.7416 3.5413 9.99936 3.54114Z" fill="currentColor" />
  </svg>
);

const CustomRepostIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1946_19165)">
      <path d="M3.74416 2.09619C3.99401 1.78952 4.4626 1.78895 4.71291 2.09521L8.24513 6.41943C8.57815 6.8276 8.28766 7.43896 7.76076 7.43896H5.73439V12.6899C5.73452 14.2775 7.0218 15.5648 8.60939 15.5649H10.0156C10.8441 15.5649 11.5156 16.2365 11.5156 17.0649C11.5155 17.8933 10.844 18.5649 10.0156 18.5649H8.60939C5.36495 18.5648 2.73452 15.9344 2.73439 12.6899V7.43896H0.706072C0.179583 7.43875 -0.110903 6.82767 0.221697 6.41943L3.74416 2.09619ZM11.3906 1.43408C14.6352 1.43408 17.2655 4.0655 17.2656 7.31006V12.561H19.294C19.8206 12.561 20.1119 13.1723 19.7793 13.5806L16.2559 17.9038C16.006 18.2105 15.5374 18.2112 15.2871 17.9048L11.7559 13.5806C11.4228 13.1725 11.7126 12.5614 12.2393 12.561H14.2656V7.31006C14.2655 5.72235 12.9784 4.43506 11.3906 4.43506H9.98439C9.15628 4.43488 8.48466 3.76315 8.48439 2.93506C8.48452 2.10685 9.1562 1.43426 9.98439 1.43408H11.3906Z" fill="currentColor" />
    </g>
    <defs>
      <clipPath id="clip0_1946_19165">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const CustomVideosIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.11035 10.9795C8.16629 10.9797 9.02244 11.8356 9.02246 12.8916V16.5859C9.02221 17.6417 8.16615 18.4979 7.11035 18.498H4.47852C2.8358 18.498 1.50409 17.1661 1.50391 15.5234V12.8916C1.50393 11.8356 2.35999 10.9796 3.41602 10.9795H7.11035ZM16.5869 10.9795C17.6428 10.9797 18.4989 11.8357 18.499 12.8916V15.5234C18.4989 17.1661 17.1671 18.4979 15.5244 18.498H12.8926C11.8367 18.498 10.9807 17.6418 10.9805 16.5859V12.8916C10.9806 11.8356 11.8366 10.9796 12.8926 10.9795H16.5869ZM7.1084 1.50195C8.16451 1.50195 9.02051 2.35892 9.02051 3.41504V7.10742C9.02028 8.16334 8.16437 9.01953 7.1084 9.01953H3.41602C2.36012 9.01945 1.50414 8.16329 1.50391 7.10742V4.47656C1.50413 2.83391 2.83582 1.50197 4.47852 1.50195H7.1084ZM15.5303 1.50293C17.1731 1.50293 18.5049 2.83469 18.5049 4.47754V7.10742C18.5047 8.16339 17.6488 9.01953 16.5928 9.01953H12.9004C11.8445 9.01945 10.9885 8.16334 10.9883 7.10742V3.41504C10.9883 2.35898 11.8443 1.50301 12.9004 1.50293H15.5303Z" fill="currentColor" />
  </svg>
);

const CustomNavLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M19.6593 4.72585C20.5543 5.6208 20.5543 7.07181 19.6593 7.96676L11.0529 16.5732C9.43193 18.1942 7.39261 19.3331 5.16229 19.8628L3.094 20.3537C2.09792 20.5903 1.20215 19.6945 1.43873 18.6985L1.92961 16.6302C2.45937 14.3998 3.59831 12.3605 5.21926 10.7396L13.8257 2.13313C14.7207 1.23818 16.1717 1.23818 17.0666 2.13313L19.6593 4.72585ZM11.7191 6.83244L6.51562 12.0359C5.13477 13.4168 4.16463 15.1543 3.71338 17.0543L3.39435 18.3981L4.73819 18.0791C6.63816 17.6278 8.37567 16.6577 9.75653 15.2768L14.96 10.0733L11.7191 6.83244ZM15.7702 3.42949C15.5913 3.2505 15.3011 3.2505 15.1221 3.42949L13.0155 5.53608L16.2564 8.77699L18.363 6.6704C18.542 6.49141 18.542 6.20121 18.363 6.02221L15.7702 3.42949Z" fill="currentColor"/>
  </svg>
);

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('videos');
  const [isBubbleVisible, setIsBubbleVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [popPosition, setPopPosition] = useState({ x: 0, y: 0 });
  const avatarRef = React.useRef<HTMLDivElement>(null);

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const distance = useTransform([dragX, dragY], ([x, y]) => {
    return Math.sqrt(Number(x) ** 2 + Number(y) ** 2);
  });

  const BREAK_DISTANCE = 140;

  const handleDragStart = () => {
    setIsDragging(true);
    setIsBroken(false);
    dragX.set(0);
    dragY.set(0);
  };

  const handleDrag = (event: any, info: any) => {
    const d = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
    if (d > BREAK_DISTANCE && !isBroken) {
      setIsBroken(true);
    } else if (d <= BREAK_DISTANCE && isBroken) {
      setIsBroken(false);
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    const d = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);

    if (d > BREAK_DISTANCE || isBroken) {
      setPopPosition({ x: dragX.get(), y: dragY.get() });
      setIsBubbleVisible(false);
      setIsPopping(true);
      setTimeout(() => setIsPopping(false), 500);
    }
    setIsBroken(false);
  };

  const originRadius = useTransform(distance, d => {
    if (isBroken) return 0;
    return Math.max(0, 16 - (Number(d) / BREAK_DISTANCE) * 16);
  });

  const headRadius = useTransform(distance, d => {
    if (isBroken) return 0;
    return Math.max(12, 20 - (Number(d) / BREAK_DISTANCE) * 4);
  });

  const gooeyPath = useTransform([dragX, dragY, headRadius], ([x, y, hr]) => {
    const nx = Number(x);
    const ny = Number(y);
    const r2 = Number(hr);
    const d = Math.sqrt(nx ** 2 + ny ** 2);

    if (d < 2 || d > BREAK_DISTANCE || isBroken) return "";

    const ox = 0;
    const oy = 0;
    const bx = nx;
    const by = ny;

    const r1 = Math.max(4, 16 - (d / BREAK_DISTANCE) * 12);

    const angle = Math.atan2(by - oy, bx - ox);
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    const p1x = ox - r1 * sin;
    const p1y = oy + r1 * cos;
    const p4x = ox + r1 * sin;
    const p4y = oy - r1 * cos;

    const p2x = bx - r2 * sin;
    const p2y = by + r2 * cos;
    const p3x = bx + r2 * sin;
    const p3y = by - r2 * cos;

    const cx1 = (p1x + p2x) / 2;
    const cy1 = (p1y + p2y) / 2;
    const cx2 = (p3x + p4x) / 2;
    const cy2 = (p3y + p4y) / 2;

    return `M ${p1x} ${p1y} Q ${cx1} ${cy1} ${p2x} ${p2y} L ${p3x} ${p3y} Q ${cx2} ${cy2} ${p4x} ${p4y} Z`;
  });

  const tabs = [
    { id: 'videos', icon: CustomVideosIcon, hasArrow: true },
    { id: 'music', icon: CustomMusicIcon },
    { id: 'shop', icon: CustomShopIcon },
    { id: 'repost', icon: CustomRepostIcon },
  ];

  return (
    <div className="bg-white pb-20">
      <header className="sticky top-0 z-50 bg-white pb-3">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 h-[60px] text-[15px] font-bold tracking-tight">
          <span>8:00</span>
          <div className="flex items-center gap-1.5">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="8" width="3" height="4" rx="1" fill="black"/>
              <rect x="5" y="6" width="3" height="6" rx="1" fill="black"/>
              <rect x="10" y="3" width="3" height="9" rx="1" fill="black"/>
              <rect x="15" width="3" height="12" rx="1" fill="black"/>
            </svg>
            <svg width="17" height="12" viewBox="0 -1 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 12C9.32843 12 10 11.3284 10 10.5C10 9.67157 9.32843 9 8.5 9C7.67157 9 7 9.67157 7 10.5C7 11.3284 7.67157 12 8.5 12Z" fill="black"/>
              <path d="M12.035 7.465C11.097 6.527 9.833 6 8.5 6C7.167 6 5.903 6.527 4.965 7.465L3.55 6.05C4.863 4.737 6.631 4 8.5 4C10.369 4 12.137 4.737 13.45 6.05L12.035 7.465Z" fill="black"/>
              <path d="M15.571 3.929C13.696 2.054 11.196 1 8.5 1C5.804 1 3.304 2.054 1.429 3.929L0.015 2.515C2.266 0.264 5.266 -1 8.5 -1C11.734 -1 14.734 0.264 16.985 2.515L15.571 3.929Z" fill="black"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="black" strokeWidth="1"/>
              <rect x="2" y="2" width="18" height="8" rx="2" fill="black"/>
              <path d="M23 4V8C23.5523 8 24 7.55228 24 7V5C24 4.44772 23.5523 4 23 4Z" fill="black"/>
            </svg>
          </div>
        </div>
        {/* Navi Bar */}
        <div className="flex justify-between items-center px-4 h-[44px]">
          <CustomNavLeftIcon className="w-6 h-6 cursor-pointer" />
          <div className="flex items-center gap-5">
            <Footprints className="w-6 h-6 cursor-pointer" />
            <UserPlus className="w-6 h-6 cursor-pointer" />
            <Menu className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
      </header>

      <section className="pt-0 pb-[1px]">
        <div className="flex justify-between px-4 items-stretch">
          {/* Left: Info & Stats */}
          <div className="flex flex-col">
            <div>
              <div className="flex items-center gap-1">
                <h1 className="text-3xl font-bold tracking-tight leading-[1.1]">Coldplay</h1>
                <ChevronDown className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 text-[12px] font-semibold text-[rgba(0,0,0,0.48)] leading-[130%] mt-0.5">
                <span>@coldplay</span>
                <img src="https://picui.ogmua.cn/s1/2026/03/19/69bb9aa2723f0.webp" className="w-3.5 h-3.5" alt="Icon" referrerPolicy="no-referrer" />
                <span>· Artist</span>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex gap-6 mt-auto">
              <div className="flex flex-col items-start">
                <span className="font-semibold text-[15px] leading-[1.2] text-black">36</span>
                <span className="text-[12px] font-normal text-[rgba(0,0,0,0.48)] leading-[1.2]">Following</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-[15px] leading-[1.2] text-black">8.1M</span>
                <span className="text-[12px] font-normal text-[rgba(0,0,0,0.48)] leading-[1.2]">Followers</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-[15px] leading-[1.2] text-black">88.3M</span>
                <span className="text-[12px] font-normal text-[rgba(0,0,0,0.48)] leading-[1.2]">Likes</span>
              </div>
            </div>
          </div>

          {/* Right: Avatar */}
          <div className="relative flex-shrink-0 ml-4" ref={avatarRef}>
            <div className="absolute top-[-13px] left-1/2 w-0 h-0 flex items-center justify-center z-[100]">
              {isPopping && (
                Array.from({ length: 6 }).map((_, i) => {
                  const angle = (i / 6) * Math.PI * 2 + (i % 2 === 0 ? 0 : Math.PI / 6);
                  const dist = 12 + (i % 2 === 0 ? 8 : 0);
                  const size = i % 2 === 0 ? 8 : 5;
                  return (
                    <motion.div
                      key={`pop-${i}`}
                      className="absolute bg-gray-200 rounded-full"
                      style={{ width: size, height: size, marginLeft: -size/2, marginTop: -size/2 }}
                      initial={{ x: popPosition.x, y: popPosition.y, scale: 0.5, opacity: 0.8 }}
                      animate={{ 
                        x: popPosition.x + Math.cos(angle) * dist, 
                        y: popPosition.y + Math.sin(angle) * dist,
                        scale: 1.5,
                        opacity: 0
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  );
                })
              )}
              <div className="absolute pointer-events-none overflow-visible">
                <svg width="400" height="400" viewBox="-200 -200 400 400" className="overflow-visible" style={{ shapeRendering: 'geometricPrecision' }}>
                  <defs>
                    <filter id="gooey-shadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.1" />
                    </filter>
                  </defs>
                  {isDragging && !isBroken && (
                    <g filter="url(#gooey-shadow)">
                      <motion.path d={gooeyPath} fill="white" stroke="white" strokeWidth="0.5" />
                      <motion.circle cx="0" cy="0" r={originRadius} fill="white" stroke="white" strokeWidth="0.5" />
                      <motion.circle cx={dragX} cy={dragY} r={headRadius} fill="white" stroke="white" strokeWidth="0.5" />
                    </g>
                  )}
                </svg>
              </div>
              <AnimatePresence>
                {isBubbleVisible && (
                  <motion.div
                    drag
                    dragSnapToOrigin={true}
                    dragElastic={0.1}
                    onDragStart={handleDragStart}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    style={{ x: dragX, y: dragY, opacity: isDragging && !isBroken ? 0 : 1 }}
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{
                      opacity: isDragging && !isBroken ? 0 : 1,
                      scale: 1,
                      width: isDragging ? 44 : 'auto',
                      height: isDragging ? 44 : 30,
                      borderRadius: isDragging ? '50%' : '16px',
                      padding: isDragging ? '0px' : '0 12px',
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      width: { duration: 0.15 },
                      height: { duration: 0.15 },
                      borderRadius: { duration: 0.2 },
                      opacity: { duration: 0.1 }
                    }}
                    className="absolute whitespace-nowrap bg-white text-[rgba(0,0,0,0.48)] text-[11px] font-medium leading-[130%] tracking-[0.0177em] shadow-[0_4px_20px_rgb(0,0,0,0.15)] border border-gray-100 flex items-center justify-center cursor-grab active:cursor-grabbing"
                  >
                    {!isDragging && (
                      <>
                        Thoughts?
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gray-100 rotate-45"></div>
                      </>
                    )}
                    {isDragging && isBroken && (
                      <div className="w-2 h-2 bg-gray-300 rounded-full relative z-10" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="w-[108px] h-[108px] relative flex items-center justify-center">
              <img src="https://picui.ogmua.cn/s1/2026/03/19/69bb9d4885a95.webp" alt="Avatar" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 pointer-events-none">
                <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M105 54C105 25.8335 82.1665 3 54 3C25.8335 3 3 25.8335 3 54C3 82.1665 25.8335 105 54 105V108C24.1766 108 0 83.8234 0 54C0 24.1766 24.1766 0 54 0C83.8234 0 108 24.1766 108 54C108 83.8234 83.8234 108 54 108V105C82.1665 105 105 82.1665 105 54Z" fill="url(#paint0_linear_1984_24643)"/>
                  <rect x="74" y="78" width="24" height="24" rx="12" fill="#20D5EC"/>
                  <path d="M85.023 96.1955C85.13 96.25 85.27 96.25 85.55 96.25H86.45C86.73 96.25 86.87 96.25 86.977 96.1955C87.0711 96.1476 87.1476 96.0711 87.1955 95.977C87.25 95.87 87.25 95.73 87.25 95.45V91.25H91.45C91.73 91.25 91.87 91.25 91.977 91.1955C92.0711 91.1476 92.1476 91.0711 92.1955 90.977C92.25 90.87 92.25 90.73 92.25 90.45V89.55C92.25 89.27 92.25 89.13 92.1955 89.023C92.1476 88.9289 92.0711 88.8524 91.977 88.8045C91.87 88.75 91.73 88.75 91.45 88.75H87.25V84.55C87.25 84.27 87.25 84.13 87.1955 84.023C87.1476 83.9289 87.0711 83.8524 86.977 83.8045C86.87 83.75 86.73 83.75 86.45 83.75H85.55C85.27 83.75 85.13 83.75 85.023 83.8045C84.9289 83.8524 84.8524 83.9289 84.8045 84.023C84.75 84.13 84.75 84.27 84.75 84.55V88.75H80.55C80.27 88.75 80.13 88.75 80.023 88.8045C79.9289 88.8524 79.8524 88.9289 79.8045 89.023C79.75 89.13 79.75 89.27 79.75 89.55V90.45C79.75 90.73 79.75 90.87 79.8045 90.977C79.8524 91.0711 79.9289 91.1476 80.023 91.1955C80.13 91.25 80.27 91.25 80.55 91.25H84.75V95.45C84.75 95.73 84.75 95.87 84.8045 95.977C84.8524 96.0711 84.9289 96.1476 85.023 96.1955Z" fill="white"/>
                  <defs>
                    <linearGradient id="paint0_linear_1984_24643" x1="0" y1="0" x2="108.073" y2="107.927" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#15C0F9"/>
                      <stop offset="0.478362" stopColor="#20D5EC"/>
                      <stop offset="1" stopColor="#1AE3C6"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bio & links */}
        <div className="flex flex-col items-start px-[16px] w-[390px] bg-white text-[13px] mt-3">
          <span className="text-[12px] font-normal text-[rgba(0,0,0,0.48)] leading-[130%]">He/him/his</span>
          <span className="leading-tight mt-1">Tik Official Coldplay Tok. The new album, Moon Music, out now. Your Japanese bestie🇯🇵🫶#comedy</span>
          <span className="font-medium leading-tight mt-1">lemon8-app.com/bimbingan and 1 more</span>
        </div>

        <div className="flex flex-col items-start px-[16px] w-[390px] bg-white text-[13px] mt-1">
          <div className="flex items-center gap-1.5 font-medium">
            <GraduationCap className="w-4 h-4" />
            <span>University of California</span>
          </div>
        </div>

        {/* Action Pills */}
        <div className="flex gap-2 px-4 mt-[14px] overflow-x-auto no-scrollbar">
          <button className="flex items-center gap-1.5 px-[9px] h-[29px] border border-gray-200 rounded-full text-[13px] font-medium whitespace-nowrap">
            <Clock className="w-4 h-4 text-red-500" /> Watch history
          </button>
          <button className="flex items-center gap-1.5 px-[9px] h-[29px] border border-gray-200 rounded-full text-[13px] font-medium whitespace-nowrap">
            <ShoppingCart className="w-4 h-4 text-pink-500" /> Your orders
          </button>
          <button className="flex items-center gap-1.5 px-[9px] h-[29px] border border-gray-200 rounded-full text-[13px] font-medium whitespace-nowrap">
            <ShoppingBag className="w-4 h-4 text-pink-500" /> Showcase
          </button>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-2">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex justify-center py-3 relative transition-colors ${activeTab === tab.id ? 'text-black' : 'text-[rgba(0,0,0,0.17)]'}`}>
            <div className="flex items-center gap-0.5">
              <tab.icon className="w-5 h-5" />
              {tab.hasArrow && <ChevronDown className="w-3 h-3" />}
            </div>
            {activeTab === tab.id && (<motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />)}
          </button>
        ))}
      </div>


      {/* Video Grid */}
      <div className="grid grid-cols-3 gap-[0.5px]">
        {Array.from({ length: 12 }).map((_, i) => {
          const customImages = [
            'https://picui.ogmua.cn/s1/2026/03/19/69bb9de61e456.webp',
            'https://picui.ogmua.cn/s1/2026/03/19/69bb9de6632e6.webp',
            'https://picui.ogmua.cn/s1/2026/03/19/69bb9de67fed4.webp',
            'https://picui.ogmua.cn/s1/2026/03/19/69bb9de685428.webp',
            'https://picui.ogmua.cn/s1/2026/03/19/69bb9de69b0e0.webp',
            'https://picui.ogmua.cn/s1/2026/03/19/69bb9dee80077.webp'
          ];
          const imgSrc = i < 6 ? customImages[i] : `https://picsum.photos/seed/video-${i + 20}/300/400`;
          
          return (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="aspect-[3/4] bg-gray-200 relative overflow-hidden group cursor-pointer">
              <img src={imgSrc} alt={`Video ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              {i === 0 && (
                <div className="absolute top-2 left-2 text-white text-sm font-normal drop-shadow-md">
                  Drafts · 2
                </div>
              )}
              {(i === 1 || i === 2) && (
                <div className="absolute top-2 left-2 bg-[#FE2C55] text-white text-[11px] font-normal px-1.5 py-0.5 rounded-sm">
                  Pinned
                </div>
              )}
              <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs font-normal drop-shadow-md">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.25 3.41804C4.25007 2.57754 5.16567 2.05731 5.8877 2.48737L13.5703 7.06745C14.2751 7.48762 14.2751 8.50861 13.5703 8.92878L5.8877 13.5089C5.16574 13.9388 4.25022 13.4185 4.25 12.5782V3.41804ZM5.75 11.8448L12.2021 7.99812L5.75 4.15144V11.8448Z" fill="#F6F6F6"/>
                </svg>
                <span>
                  {i === 1 ? '16.5K' : i === 2 ? '9,126' : `${(Math.random() * 100).toFixed(1)}K`}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
