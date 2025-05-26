import React from 'react';

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactElement<{ className?: string }>;
}

// Declare global types for window.APP_CONFIG
declare global {
  interface Window {
    APP_CONFIG?: {
      USER1_USERNAME?: string;
      USER1_PASSWORD?: string;
      USER2_USERNAME?: string;
      USER2_PASSWORD?: string;
    };
  }
}
