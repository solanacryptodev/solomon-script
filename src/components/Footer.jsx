import { NavLink } from '@solidjs/router';

function Footer() {
  return (
    <footer class="bg-navy text-white py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <NavLink href="/" class="flex items-center text-lg font-bold">
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 4H3C1.89543 4 1 4.89543 1 6V19C1 20.1046 1.89543 21 3 21H21C22.1046 21 23 20.1046 23 19V6C23 4.89543 22.1046 4 21 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 10H23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 4V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              SOLOMON'S WEB
            </NavLink>
            <p class="text-xs mt-2 text-gray-300">EXPLORING SCRIPTURE WITH AI WISDOM</p>
          </div>
          
          <div class="flex space-x-8">
            <NavLink href="/privacy" class="text-sm hover:text-teal-light transition">
              PRIVACY
            </NavLink>
            <NavLink href="/terms" class="text-sm hover:text-teal-light transition">
              TERMS
            </NavLink>
            <NavLink href="/contact" class="text-sm hover:text-teal-light transition">
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
