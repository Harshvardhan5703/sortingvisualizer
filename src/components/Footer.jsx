import React from 'react';
import { Heart, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-6 border-t border-gray-800 bg-black">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center gap-4">
       
        <div className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent text-lg font-semibold animate-pulse">
            Made with
          </span>
          <Heart className="h-5 w-5 text-red-500 fill-red-500 animate-pulse" />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent text-lg font-semibold animate-pulse">
            by HARSH
          </span>
        </div>
        {/* <span className='text-white'>Come learn DSA with me</span> */}

        
        <div className="flex gap-6">
          <a 
            href="https://x.com/Harsh5703" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/harshvardhan-singh-shekhawat/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a 
            href="https://github.com/Harshvardhan5703" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;