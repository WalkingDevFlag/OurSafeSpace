
import React from 'react';
import { COPYRIGHT_TEXT } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 text-center">
      <p className="text-sm text-pink-500">{COPYRIGHT_TEXT}</p>
    </footer>
  );
};

export default Footer;
