/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  Plus, 
  MessageSquare, 
  User,
} from 'lucide-react';
import ProfileScreen from './ProfileScreen';
import InboxScreen from './InboxScreen';

const ProfileActiveIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 13C15.5336 13 17.8787 13.5549 19.332 14.7998C20.811 16.0668 21.25 17.9426 21.25 20.25C21.25 20.5754 21.0698 20.8207 20.8799 20.9844C20.6915 21.1468 20.4448 21.2737 20.1816 21.3779C19.6511 21.5879 18.9244 21.7527 18.0918 21.8809C16.4171 22.1387 14.2021 22.2656 12 22.2656C9.79794 22.2656 7.58288 22.1387 5.9082 21.8809C5.07563 21.7527 4.34885 21.5879 3.81836 21.3779C3.5552 21.2737 3.30854 21.1468 3.12012 20.9844C2.93025 20.8207 2.75 20.5754 2.75 20.25C2.75 17.9426 3.18897 16.0668 4.66797 14.7998C6.12129 13.5549 8.46641 13 12 13ZM12 14C8.51546 14 6.48549 14.5598 5.31836 15.5596C4.18509 16.5305 3.75601 18.0154 3.75 20.2031C3.75563 20.2089 3.76283 20.2174 3.77344 20.2266C3.84135 20.285 3.9708 20.3632 4.18555 20.4482C4.61203 20.6171 5.25273 20.7682 6.06055 20.8926C7.66711 21.1399 9.8271 21.2656 12 21.2656C14.1729 21.2656 16.3329 21.1399 17.9395 20.8926C18.7473 20.7682 19.388 20.6171 19.8145 20.4482C20.0292 20.3632 20.1587 20.285 20.2266 20.2266C20.2369 20.2177 20.2434 20.2089 20.249 20.2031C20.243 18.0154 19.8149 16.5305 18.6816 15.5596C17.5145 14.5598 15.4845 14 12 14Z" fill="currentColor"/>
    <path d="M12 13.5C19.0182 13.5 20.75 15.7292 20.75 20.25C20.75 22.2708 3.25 22.2708 3.25 20.25C3.25 15.7292 4.98177 13.5 12 13.5ZM12 1.75C14.6234 1.75 16.75 3.87665 16.75 6.5C16.75 9.12335 14.6234 11.25 12 11.25C9.37665 11.25 7.25 9.12335 7.25 6.5C7.25 3.87665 9.37665 1.75 12 1.75Z" fill="currentColor"/>
  </svg>
);

const FriendsIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="4 4 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_962_50821)">
      <path d="M12.5801 16.5811C15.6383 16.5811 17.8356 17.0867 19.2441 18.3711C20.6848 19.6851 21.0605 21.5889 21.0605 23.7256C21.0604 24.2134 20.8045 24.5691 20.5693 24.7852C20.3406 24.9952 20.0623 25.1422 19.8066 25.25C19.2891 25.4681 18.613 25.6277 17.8848 25.7471C16.4099 25.9888 14.4812 26.1045 12.5801 26.1045C10.6789 26.1045 8.75024 25.9888 7.27539 25.7471C6.54729 25.6277 5.87198 25.4681 5.35449 25.25C5.09878 25.1422 4.8207 24.9952 4.5918 24.7852C4.35655 24.5691 4.09971 24.2136 4.09961 23.7256C4.09967 21.5889 4.47534 19.6851 5.91602 18.3711C7.32451 17.0867 9.5218 16.5811 12.5801 16.5811ZM12.5801 18.5811C9.63911 18.5811 8.09553 19.0902 7.26367 19.8486C6.50998 20.5361 6.14216 21.615 6.10254 23.3936C6.11168 23.3976 6.12079 23.403 6.13086 23.4072C6.43145 23.5339 6.92448 23.6629 7.59863 23.7734C8.92894 23.9915 10.7411 24.1045 12.5801 24.1045C14.4191 24.1045 16.2312 23.9915 17.5615 23.7734C18.2356 23.6629 18.7287 23.5339 19.0293 23.4072C19.0389 23.4031 19.0479 23.3974 19.0566 23.3936C19.017 21.615 18.6502 20.5361 17.8965 19.8486C17.0646 19.0902 15.521 18.5811 12.5801 18.5811ZM12.5801 6.20312C15.1375 6.20336 17.2117 8.27653 17.2119 10.834L17.2061 11.0732C17.0818 13.5199 15.0576 15.4656 12.5801 15.4658L12.3418 15.46C9.89494 15.3357 7.94922 13.3117 7.94922 10.834C7.94947 8.27654 10.0226 6.20338 12.5801 6.20312ZM12.5801 8.20312C11.1272 8.20338 9.94947 9.38111 9.94922 10.834C9.94922 12.2871 11.1271 13.4656 12.5801 13.4658C14.0331 13.4656 15.2119 12.2871 15.2119 10.834C15.2117 9.3811 14.033 8.20336 12.5801 8.20312Z" fill="currentColor"/>
      <path d="M21.9785 17.3501C24.0503 17.3501 25.6338 17.7289 26.6475 18.8394C27.6421 19.9291 27.8789 21.5053 27.8789 23.3091C27.8785 23.852 27.5636 24.2347 27.2676 24.4634C26.9778 24.687 26.6163 24.8398 26.2607 24.9507C25.5397 25.1754 24.5854 25.3057 23.5498 25.3638C23.0539 25.3914 22.6287 25.012 22.6006 24.5161C22.5728 24.0199 22.9531 23.5948 23.4492 23.5669C24.4244 23.5122 25.2101 23.3936 25.7256 23.2329C25.8881 23.1822 25.9998 23.1322 26.0732 23.0942C26.0527 21.4789 25.799 20.5809 25.3174 20.0532C24.8336 19.5234 23.917 19.1509 21.9785 19.1509C21.4817 19.1507 21.0784 18.7472 21.0781 18.2505C21.0781 17.7535 21.4816 17.3502 21.9785 17.3501ZM22.0332 8.5874C24.1042 8.58753 25.7832 10.2664 25.7832 12.3374C25.7832 14.4084 24.1041 16.0873 22.0332 16.0874C19.9622 16.0874 18.2832 14.4084 18.2832 12.3374C18.2832 10.2663 19.9621 8.5874 22.0332 8.5874ZM22.0332 10.3872C20.9562 10.3872 20.083 11.2604 20.083 12.3374C20.083 13.4143 20.9563 14.2876 22.0332 14.2876C23.11 14.2875 23.9834 13.4143 23.9834 12.3374C23.9834 11.2605 23.11 10.3873 22.0332 10.3872Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip0_962_50821">
        <rect width="24" height="24" fill="white" transform="translate(4 4)"/>
      </clipPath>
    </defs>
  </svg>
);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('profile');
  const [inboxCounts, setInboxCounts] = useState<Record<string, number>>({
    newFollowers: 9,
    activity: 9,
    cenis: 1,
    tiktokDesign: 2,
  });

  const totalInboxCount: number = (Object.values(inboxCounts) as number[]).reduce((a: number, b: number) => a + b, 0);

  const bottomNavItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'friends', icon: FriendsIcon, label: 'Friends' },
    { id: 'add', icon: Plus, label: '', isSpecial: true },
    { id: 'inbox', icon: MessageSquare, label: 'Inbox', notificationCount: totalInboxCount },
    { id: 'profile', icon: User, activeIcon: ProfileActiveIcon, label: 'Profile' },
  ];

  return (
    <div className="h-[844px] bg-white text-black font-sans w-full max-w-[390px] mx-auto border border-gray-100 shadow-2xl relative overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
        {currentScreen === 'profile' ? <ProfileScreen /> : <InboxScreen inboxCounts={inboxCounts} setInboxCounts={setInboxCounts} />}
      </div>

      {/* Bottom Nav */}
      <nav className="absolute bottom-0 left-0 w-full bg-white pt-2 pb-6 flex items-center z-50 border-t border-gray-100">
        {bottomNavItems.map((item) => {
          const isActive = currentScreen === item.id;
          if (item.isSpecial) {
            return (
              <div key={item.id} className="flex-1 flex justify-center relative group cursor-pointer">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M46.8487 27.577C47.0504 24.8611 47.0504 23.1341 46.8487 20.4182C45.9707 8.60136 32.3588 9.77504 24 9.77503V38.2201C32.3588 38.2201 45.9707 39.3938 46.8487 27.577Z" fill="#FA2D6C"/>
                  <path d="M1.15134 27.577C0.949553 24.8611 0.949553 23.1341 1.15134 20.4182C2.0293 8.60136 15.6412 9.77504 24 9.77503V38.2201C15.6412 38.2201 2.0293 39.3938 1.15134 27.577Z" fill="#20D5EC"/>
                  <path d="M5.45955 18.1785C5.89014 12.2475 10.9513 10.2831 15.9716 9.90886C21.317 9.51036 26.6846 9.51036 32.0299 9.90886C37.0503 10.2831 42.1114 12.2475 42.542 18.1785C42.8475 22.3857 42.8475 25.6095 42.542 29.8167C42.1114 35.7477 37.0503 37.7121 32.0299 38.0863C26.6846 38.4848 21.317 38.4848 15.9716 38.0863C10.9513 37.7121 5.89014 35.7477 5.45955 29.8167C5.15411 25.6095 5.15411 22.3857 5.45955 18.1785Z" fill="black"/>
                  <path d="M24 18V30" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M18 24L30 24" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
            );
          }
          return (
            <button key={item.id} onClick={() => setCurrentScreen(item.id)} className={`flex-1 flex flex-col items-center gap-1 cursor-pointer ${isActive ? 'text-black' : 'text-gray-400'}`}>
              <div className="relative">
                {isActive && item.activeIcon ? (
                  <item.activeIcon className="w-6 h-6" />
                ) : (
                  <item.icon className="w-6 h-6" />
                )}
                {item.notificationCount !== undefined && item.notificationCount > 0 ? (
                  <div className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {item.notificationCount}
                  </div>
                ) : null}
              </div>
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
