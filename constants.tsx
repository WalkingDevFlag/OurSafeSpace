
import React from 'react';
import { SocialLink } from './types';
import { DiscordIcon, GithubIcon, LinkedinIcon, WhatsappIcon, InstagramIcon, MailIcon } from './components/icons/SocialIcons';

export const APP_NAME = "Our Safe Space";
export const COPYRIGHT_TEXT = `Crafted with love, for our love. © ${new Date().getFullYear()}`;

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Discord', href: 'https://discord.com/users/walking_red_flag_69', icon: <DiscordIcon className="w-5 h-5" /> },
  { name: 'GitHub', href: 'https://github.com/WalkingDevFlag', icon: <GithubIcon className="w-5 h-5" /> },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/siddharth-panditrao/', icon: <LinkedinIcon className="w-5 h-5" /> },
  { name: 'WhatsApp', href: 'https://wa.me/8888870956', icon: <WhatsappIcon className="w-5 h-5" /> },
  { name: 'Instagram', href: 'https://www.instagram.com/justsidstuff64/', icon: <InstagramIcon className="w-5 h-5" /> },
  { name: 'Email', href: 'mailto:panditrao.sid@gmail.com', icon: <MailIcon className="w-5 h-5" /> },
];

// General Purpose Icons
export const HeartIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
  </svg>
);

export const LockIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export const GroupIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
    // Simplified group of hearts icon
  <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M20 10C15 10 10 15 10 20C10 25 15 30 20 30C25 30 30 25 30 20C30 15 25 10 20 10M20 28C16.69 28 14 25.31 14 22C14 18.69 16.69 16 20 16C23.31 16 26 18.69 26 22C26 25.31 23.31 28 20 28Z" />
    <path d="M40 10C35 10 30 15 30 20C30 25 35 30 40 30C45 30 50 25 50 20C50 15 45 10 40 10M40 28C36.69 28 34 25.31 34 22C34 18.69 36.69 16 40 16C43.31 16 46 18.69 46 22C46 25.31 43.31 28 40 28Z" />
    <path d="M30 0C25 0 20 5 20 10H40C40 5 35 0 30 0M30 18C26.69 18 24 15.31 24 12H36C36 15.31 33.31 18 30 18Z" transform="translate(0, -5)" />
  </svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
  </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export const KeyIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7h3a2 2 0 012 2v10a2 2 0 01-2 2h-3m-3-14H6a2 2 0 00-2 2v10a2 2 0 002 2h6m-3-14V4m0 16v-2m0-6H9m3 0h3m-3 0a3 3 0 01-3-3V7a3 3 0 013-3m3 10a3 3 0 00-3 3v1a3 3 0 003 3m-3-10a3 3 0 013-3V7a3 3 0 01-3-3" />
    </svg>
);

export const EyeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const EyeSlashIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L6.228 6.228" />
  </svg>
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// SubmissionForm Icons
export const PaperclipIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
  </svg>
);

export const SpinnerIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);