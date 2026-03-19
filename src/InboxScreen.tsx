import React, { useState } from 'react';
import { Search, Users, Heart, MessageCircle, ChevronDown, Camera } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';

const DraggableBadge = ({ count, isDot, onClear }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPopping, setIsPopping] = useState(false);
  const [popPosition, setPopPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isBroken, setIsBroken] = useState(false);

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const distance = useTransform([dragX, dragY], ([x, y]) => {
    return Math.sqrt(Number(x) ** 2 + Number(y) ** 2);
  });

  const BREAK_DISTANCE = 80;
  const maxRadius = isDot ? 4 : 10;
  const minHeadRadius = isDot ? 2 : 6;
  const minOriginRadius = isDot ? 1 : 2;

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
      setIsVisible(false);
      setIsPopping(true);
      if (onClear) onClear();
      setTimeout(() => setIsPopping(false), 500);
    }
    setIsBroken(false);
  };

  const originRadius = useTransform(distance, d => {
    if (isBroken) return 0;
    return Math.max(0, maxRadius - (Number(d) / BREAK_DISTANCE) * maxRadius);
  });

  const headRadius = useTransform(distance, d => {
    if (isBroken) return 0;
    return Math.max(minHeadRadius, maxRadius - (Number(d) / BREAK_DISTANCE) * (maxRadius - minHeadRadius));
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

    const r1 = Math.max(minOriginRadius, maxRadius - (d / BREAK_DISTANCE) * (maxRadius - minOriginRadius));

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

  if (!isVisible && !isPopping) return null;
  if (!isDot && (!count || count === 0) && isVisible) return null;

  return (
    <div className={`relative flex items-center justify-center flex-shrink-0 ml-2 ${isDot ? 'w-2 h-2' : 'w-5 h-5'}`}>
      <div className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center z-[100]">
        
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

        {!isPopping && (
          <>
            <div className="absolute pointer-events-none overflow-visible">
              <svg width="200" height="200" viewBox="-100 -100 200 200" className="overflow-visible" style={{ shapeRendering: 'geometricPrecision' }}>
                {isDragging && !isBroken && (
                  <g>
                    <motion.path d={gooeyPath} fill="#ef4444" stroke="#ef4444" strokeWidth="0.5" />
                    <motion.circle cx="0" cy="0" r={originRadius} fill="#ef4444" stroke="#ef4444" strokeWidth="0.5" />
                    <motion.circle cx={dragX} cy={dragY} r={headRadius} fill="#ef4444" stroke="#ef4444" strokeWidth="0.5" />
                  </g>
                )}
              </svg>
            </div>
            <AnimatePresence>
              {isVisible && (
                <motion.div
                  drag
                  dragSnapToOrigin={true}
                  dragElastic={0.1}
                  onDragStart={handleDragStart}
                  onDrag={handleDrag}
                  onDragEnd={handleDragEnd}
                  style={{ x: dragX, y: dragY, opacity: isDragging && !isBroken ? 0 : 1 }}
                  initial={{ scale: 0.8 }}
                  animate={{
                    opacity: isDragging && !isBroken ? 0 : 1,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className={`absolute bg-red-500 flex items-center justify-center cursor-grab active:cursor-grabbing ${
                    isDot ? 'w-2 h-2 rounded-full' : 'text-white text-xs font-bold rounded-full h-5 min-w-[20px] px-1'
                  }`}
                >
                  {!isDragging && !isDot && count}
                  {isDragging && isBroken && (
                    <div className="w-1.5 h-1.5 bg-red-300 rounded-full relative z-10" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

const StoryCircle = ({ 
  avatar, 
  name, 
  color = '', 
  hasPlus = false, 
  emoji, 
  live = false,
  customOverlay
}: { 
  avatar: string, 
  name: string, 
  color?: string, 
  hasPlus?: boolean, 
  emoji?: string, 
  live?: boolean,
  customOverlay?: React.ReactNode,
  key?: any
}) => (
  <div className="flex flex-col items-center gap-2 flex-shrink-0">
    <div className="relative">
      {customOverlay ? (
        <div className="w-[92px] h-[92px] relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={avatar} alt={name} className="w-[78px] h-[78px] rounded-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="absolute inset-0 pointer-events-none">
            {customOverlay}
          </div>
        </div>
      ) : (
        <div className={`w-[92px] h-[92px] rounded-full p-[3px] ${color ? `bg-gradient-to-tr ${color}` : 'bg-gray-200'}`}>
          <div className="bg-white p-[4px] rounded-full h-full w-full flex items-center justify-center">
            <img src={avatar} alt={name} className="w-[78px] h-[78px] rounded-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      )}
      {!customOverlay && hasPlus && (
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white"> 
          <p className="text-white text-lg leading-none mb-0.5">+</p>
        </div>
      )}
      {live && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center border-2 border-white">
          <div className="w-2 h-2 bg-white rounded-full"/>
        </div>
      )}
       {emoji && (
        <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
          <span>{emoji}</span>
        </div>
      )}
    </div>
    <p className="text-xs font-medium">{name}</p>
  </div>
);

const NewFollowersIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z" fill="#00ABF4"/>
    <g clipPath="url(#clip0_5506_24211)">
      <path d="M22.75 29.7503C28.3809 29.7503 31.5 33.8569 31.5 37.2376C31.4999 39.0833 30.47 39.0833 26.8672 39.0833H18.6328C15.03 39.0833 14.0001 39.0833 14 37.2376C14 33.8569 17.1191 29.7503 22.75 29.7503ZM35 31.5003C39.1293 31.5003 41.417 34.58 41.417 37.1156C41.417 38.5 40.6617 38.5003 38.0195 38.5003H33.8213C33.7449 36.6044 33.2816 34.2493 31.9561 32.1537C32.8176 31.7451 33.8355 31.5003 35 31.5003ZM35 20.4164C37.5773 20.4164 39.667 22.506 39.667 25.0833C39.667 27.6607 37.5773 29.7503 35 29.7503C32.4227 29.7503 30.333 27.6607 30.333 25.0833C30.333 22.506 32.4227 20.4164 35 20.4164ZM22.75 16.3333C25.9699 16.3333 28.5828 18.9465 28.583 22.1664C28.583 25.3864 25.97 28.0003 22.75 28.0003C19.53 28.0003 16.917 25.3864 16.917 22.1664C16.9172 18.9465 19.5301 16.3333 22.75 16.3333Z" fill="white"/>
    </g>
    <defs>
      <clipPath id="clip0_5506_24211">
        <rect width="28" height="28" fill="white" transform="translate(14 14)"/>
      </clipPath>
    </defs>
  </svg>
);

const ActivityIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z" fill="#FF3B76"/>
    <path d="M31.5 37.3336C31.8219 37.3339 32.0888 37.5976 32.0273 37.9137C31.2758 41.774 24.7231 41.774 23.9716 37.9137C23.9101 37.5975 24.1778 37.3336 24.5 37.3336H31.5ZM28 15.1667C31.9703 15.1669 35.2913 18.1825 35.6738 22.1344L36.2714 28.3092C36.4514 30.1676 38.2571 31.7278 39.3466 33.112C39.9488 33.8773 39.4035 34.9997 38.4296 34.9997H17.5693C16.5954 34.9997 16.0502 33.8773 16.6523 33.112C17.7418 31.7278 19.5475 30.1676 19.7275 28.3092L20.3252 22.1344C20.7076 18.1824 24.0294 15.1667 28 15.1667Z" fill="white"/>
  </svg>
);

const SystemNotificationsIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z" fill="#32364B"/>
    <path d="M31.6436 15.1667C32.9634 15.1667 33.6233 15.1668 34.1992 15.3747C34.7082 15.5584 35.1682 15.8574 35.542 16.2487C35.965 16.6915 36.232 17.296 36.7656 18.5036L39.877 25.5456C40.2336 26.3527 40.4125 26.7566 40.5381 27.1754C40.6496 27.5475 40.7299 27.9287 40.7783 28.3141C40.8328 28.7482 40.833 29.1902 40.833 30.0729V34.067C40.833 36.0269 40.8326 37.0069 40.4512 37.7555C40.1157 38.414 39.5803 38.9493 38.9219 39.2848C38.1732 39.6663 37.1926 39.6667 35.2324 39.6667H20.7656C18.8057 39.6667 17.8258 39.6663 17.0771 39.2848C16.4186 38.9493 15.8834 38.414 15.5479 37.7555C15.1664 37.0069 15.166 36.027 15.166 34.067V30.0729C15.166 29.1902 15.1662 28.7482 15.2207 28.3141C15.2691 27.9287 15.3494 27.5475 15.4609 27.1754C15.5865 26.7566 15.7645 26.3526 16.1211 25.5456L19.2334 18.5036C19.767 17.296 20.0341 16.6915 20.457 16.2487C20.8307 15.8576 21.29 15.5584 21.7988 15.3747C22.3748 15.1668 23.0353 15.1667 24.3555 15.1667H31.6436ZM24.3555 18.0836C23.6587 18.0836 23.2727 18.0847 22.9863 18.1032C22.8624 18.1112 22.7971 18.121 22.7705 18.1256C22.6998 18.1541 22.6347 18.1955 22.5801 18.2487C22.5651 18.271 22.5303 18.3276 22.4727 18.4381C22.34 18.6926 22.1829 19.0451 21.9014 19.6823L18.7891 26.7243C18.692 26.944 18.6145 27.1228 18.5508 27.2692C18.3946 27.6285 18.655 27.9997 19.0469 27.9997H24.0098C24.4103 29.8343 26.0443 31.2085 27.999 31.2086C29.9538 31.2086 31.5877 29.8344 31.9883 27.9997H36.9521C37.3439 27.9996 37.6043 27.6285 37.4482 27.2692C37.3845 27.1228 37.3061 26.944 37.209 26.7243L34.0977 19.6823C33.8161 19.0452 33.659 18.6926 33.5264 18.4381C33.4687 18.3276 33.4329 18.271 33.418 18.2487C33.3635 18.1957 33.2991 18.154 33.2285 18.1256C33.2021 18.121 33.1368 18.1112 33.0127 18.1032C32.7264 18.0847 32.3401 18.0836 31.6436 18.0836H24.3555ZM33.2432 18.1286L33.2412 18.1276H33.2393C33.2416 18.1282 33.2432 18.1286 33.2432 18.1286Z" fill="white"/>
  </svg>
);

const NotificationRow = ({ icon, bgColor, title, subtitle, count = 0, isDot = false, onClear = () => {} }) => (
  <div className="flex flex-row items-center p-[8px_19px_8px_16px] w-[390px] h-[72px] flex-none gap-4 cursor-pointer hover:bg-gray-50">
    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${bgColor}`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
      <p className="font-medium text-[15px] leading-[130%] tracking-[0.00404948em] text-black truncate">{title}</p>
      <p className={`font-normal text-[15px] leading-[130%] tracking-[0.00404948em] text-black truncate ${(count > 0 || isDot) ? '' : 'opacity-50'}`}>{subtitle}</p>
    </div>
    <DraggableBadge count={count} isDot={isDot} onClear={onClear} />
  </div>
);

const MessageRow = ({ avatar, name, message, time, count = 0, isGroup = false, sentSticker = false, onClear = () => {} }) => (
  <div className="flex flex-row items-center p-[8px_19px_8px_16px] w-[390px] h-[72px] flex-none gap-4 cursor-pointer hover:bg-gray-50">
    <img src={avatar} alt={name} className="w-14 h-14 rounded-full object-cover" referrerPolicy="no-referrer" />
    <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
      <div className="flex justify-between items-center">
        <p className="font-medium text-[15px] leading-[130%] tracking-[0.00404948em] text-black truncate">{name}</p>
        {time && <p className="text-xs text-gray-400 flex-shrink-0 ml-2">{time}</p>}
      </div>
      <div className="flex items-center">
        <p className={`font-normal text-[15px] leading-[130%] tracking-[0.00404948em] text-black truncate flex-1 ${count > 0 ? '' : 'opacity-50'}`}>{message}</p>
        {sentSticker && <Camera className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />}
      </div>
    </div>
    <DraggableBadge count={count} isDot={false} onClear={onClear} />
  </div>
);

const InboxScreen = ({ 
  inboxCounts = { newFollowers: 9, activity: 9, cenis: 1, tiktokDesign: 2 }, 
  setInboxCounts 
}: { 
  inboxCounts?: Record<string, number>, 
  setInboxCounts?: React.Dispatch<React.SetStateAction<Record<string, number>>> 
}) => {
  const handleClear = (key: string) => {
    if (setInboxCounts) {
      setInboxCounts(prev => ({ ...prev, [key]: 0 }));
    }
  };
  const stories: { id: number; name: string; avatar: string; color?: string; hasPlus?: boolean; emoji?: string; live?: boolean; customOverlay?: React.ReactNode }[] = [
    { 
      id: 1, 
      name: 'Create', 
      avatar: 'https://picui.ogmua.cn/s1/2026/03/19/69bb9d4885a95.webp', 
      customOverlay: (
        <svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="46" cy="46" r="44.25" stroke="url(#paint0_linear_5514_36239)" strokeWidth="3.5"/>
          <circle cx="75" cy="75" r="11.5" fill="#20D5EC"/>
          <circle cx="75" cy="75" r="11.5" stroke="white" strokeWidth="3"/>
          <circle cx="75" cy="75" r="11.5" stroke="white" strokeWidth="3"/>
          <path d="M74.1852 80.1628C74.2743 80.2082 74.391 80.2082 74.6243 80.2082H75.3743C75.6077 80.2082 75.7244 80.2082 75.8135 80.1628C75.8919 80.1228 75.9557 80.0591 75.9956 79.9807C76.041 79.8915 76.041 79.7749 76.041 79.5415V76.0415H79.541C79.7744 76.0415 79.891 76.0415 79.9802 75.9961C80.0586 75.9561 80.1223 75.8924 80.1623 75.814C80.2077 75.7249 80.2077 75.6082 80.2077 75.3748V74.6248C80.2077 74.3915 80.2077 74.2748 80.1623 74.1857C80.1223 74.1073 80.0586 74.0435 79.9802 74.0036C79.891 73.9582 79.7744 73.9582 79.541 73.9582H76.041V70.4582C76.041 70.2248 76.041 70.1081 75.9956 70.019C75.9557 69.9406 75.8919 69.8769 75.8135 69.8369C75.7244 69.7915 75.6077 69.7915 75.3743 69.7915H74.6243C74.391 69.7915 74.2743 69.7915 74.1852 69.8369C74.1068 69.8769 74.043 69.9406 74.0031 70.019C73.9577 70.1081 73.9577 70.2248 73.9577 70.4582V73.9582H70.4577C70.2243 73.9582 70.1076 73.9582 70.0185 74.0036C69.9401 74.0435 69.8764 74.1073 69.8364 74.1857C69.791 74.2748 69.791 74.3915 69.791 74.6248V75.3748C69.791 75.6082 69.791 75.7249 69.8364 75.814C69.8764 75.8924 69.9401 75.9561 70.0185 75.9961C70.1076 76.0415 70.2243 76.0415 70.4577 76.0415H73.9577V79.5415C73.9577 79.7749 73.9577 79.8915 74.0031 79.9807C74.043 80.0591 74.1068 80.1228 74.1852 80.1628Z" fill="white"/>
          <defs>
            <linearGradient id="paint0_linear_5514_36239" x1="0" y1="0" x2="92.0624" y2="91.9375" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0094FF"/>
              <stop offset="0.478362" stopColor="#20D5EC"/>
              <stop offset="1" stopColor="#00FFA3"/>
            </linearGradient>
          </defs>
        </svg>
      )
    },
    { id: 2, name: 'chenyue', avatar: 'https://picsum.photos/seed/face2/200', color: '' },
    { id: 3, name: 'Curiosity', avatar: 'https://picsum.photos/seed/face3/200', color: 'from-cyan-300 to-blue-600' },
    { id: 4, name: 'Ylidy', avatar: 'https://picsum.photos/seed/face4/200', color: 'from-gray-200 to-gray-300', emoji: '🔥🔥' },
    { id: 5, name: 'Travel', avatar: 'https://picsum.photos/seed/face5/200', color: 'from-green-400 to-teal-500' },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 h-[60px] text-[15px] font-bold tracking-tight bg-white">
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
      <header className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 h-[44px]">
        <button className="p-2 -ml-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.22183 4.22177C8.51759 -0.073977 15.4827 -0.073991 19.7785 4.22177C24.0741 8.51754 24.0742 15.4827 19.7785 19.7784C15.4827 24.0741 8.5176 24.0741 4.22183 19.7784C-0.0739418 15.4826 -0.0739418 8.51754 4.22183 4.22177ZM18.3644 5.63583C14.8497 2.12112 9.15061 2.12113 5.63589 5.63583C2.12117 9.15055 2.12117 14.8496 5.63589 18.3643C9.15062 21.879 14.8497 21.879 18.3644 18.3643C21.8791 14.8497 21.879 9.15055 18.3644 5.63583ZM12.5001 6.50009C12.7762 6.50016 13.0001 6.72399 13.0001 7.00009V11.0001H17.0001C17.2762 11.0002 17.5001 11.224 17.5001 11.5001V12.5001C17.5001 12.7761 17.2762 13 17.0001 13.0001H13.0001V17.0001C13.0001 17.2761 12.7762 17.5 12.5001 17.5001H11.5001C11.224 17.5001 11.0002 17.2762 11.0001 17.0001V13.0001H7.00015C6.72403 13.0001 6.50019 12.7762 6.50015 12.5001V11.5001C6.50015 11.2239 6.724 11.0001 7.00015 11.0001H11.0001V7.00009C11.0001 6.72395 11.224 6.50009 11.5001 6.50009H12.5001Z" fill="black"/>
          </svg>
        </button>
        <div className="flex items-center gap-1 cursor-pointer">
          <h1 className="font-bold text-lg">Inbox</h1>
          <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="25" height="16" rx="4" fill="black" fillOpacity="0.05"/>
            <circle cx="8" cy="8" r="4" fill="black" fillOpacity="0.34"/>
            <path d="M18.2529 9.6711C18.1199 9.81661 17.8798 9.81661 17.7468 9.6711L15.4715 7.18254C15.2862 6.97983 15.4398 6.66666 15.7246 6.66666H20.2751C20.5599 6.66666 20.7135 6.97983 20.5282 7.18254L18.2529 9.6711Z" fill="black" fillOpacity="0.34"/>
          </svg>
        </div>
        <button className="p-2 -mr-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.75 2.25004C15.4442 2.25008 19.2498 6.05585 19.25 10.75C19.25 12.7098 18.5869 14.5154 17.4727 15.9532L21.9062 20.3868C22.1015 20.582 22.1015 20.8985 21.9062 21.0938L21.0938 21.9073C20.8985 22.1025 20.581 22.1025 20.3857 21.9073L15.9521 17.4727C14.5144 18.5869 12.7097 19.25 10.75 19.25C6.05558 19.25 2.25 15.4445 2.25 10.75C2.25024 6.05582 6.05573 2.25004 10.75 2.25004ZM10.75 4.25004C7.1603 4.25004 4.25024 7.16039 4.25 10.75C4.25 14.3399 7.16015 17.25 10.75 17.25C14.3398 17.25 17.25 14.3399 17.25 10.75C17.2498 7.16042 14.3397 4.25008 10.75 4.25004Z" fill="black"/>
          </svg>
        </button>
      </header>
      
      <div className="pb-2">
        <div className="flex gap-4 overflow-x-auto pt-[22px] pb-2 -mb-2 px-4">
          {stories.map(story => (
            <StoryCircle 
              key={story.id} 
              avatar={story.avatar} 
              name={story.name} 
              color={story.color} 
              hasPlus={story.hasPlus} 
              emoji={story.emoji} 
              live={story.live} 
              customOverlay={story.customOverlay}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <NotificationRow 
          icon={<NewFollowersIcon />} 
          bgColor="" 
          title="New Followers" 
          subtitle="Rhianna started following you."
          count={inboxCounts.newFollowers}
          onClear={() => handleClear('newFollowers')}
        />
        <NotificationRow 
          icon={<ActivityIcon />} 
          bgColor="" 
          title="Activity" 
          subtitle="Jaela liked your video."
          count={inboxCounts.activity}
          onClear={() => handleClear('activity')}
        />
        <NotificationRow 
          icon={<SystemNotificationsIcon />} 
          bgColor="" 
          title="System notifications" 
          subtitle="TikTok: Updates to your post p... · 5m"
          isDot={true}
        />

        <MessageRow 
          avatar="https://picsum.photos/seed/face6/200"
          name="Cenis Grimm"
          message="Hello how r u recently · 5m"
          time=""
          count={inboxCounts.cenis}
          onClear={() => handleClear('cenis')}
        />
        <MessageRow 
          avatar="https://picsum.photos/seed/face7/200"
          name="TikTok Design"
          message="Huijuno: Busy day ahead, lots o... · 2d"
          time=""
          count={inboxCounts.tiktokDesign}
          onClear={() => handleClear('tiktokDesign')}
        />
        <MessageRow 
          avatar="https://picsum.photos/seed/face8/200"
          name="summer"
          message="Keep chatting to unlock a Streak · 1h"
          time=""
        />
        <MessageRow 
          avatar="https://picsum.photos/seed/face9/200"
          name="Tommy Tang"
          message="sent a sticker · 1h"
          time=""
        />
      </div>
    </div>
  );
};

export default InboxScreen;
