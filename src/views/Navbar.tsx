import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';

function Navbar() {
  return (
    <nav class="bg-navy text-white py-4">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <div class="flex items-center text-xl font-bold">
          <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 4H3C1.89543 4 1 4.89543 1 6V19C1 20.1046 1.89543 21 3 21H21C22.1046 21 23 20.1046 23 19V6C23 4.89543 22.1046 4 21 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 10H23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 4V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          SOLOMON'S WEB
        </div>
        
        <div class="flex space-x-6 items-center">
          <button class="hover:text-teal-light transition">HOME</button>
          <button class="hover:text-teal-light transition">TOPICS</button>
          <button class="hover:text-teal-light transition">ABOUT</button>
        </div>
      </div>
    </nav>
  );
}


export default Navbar;
