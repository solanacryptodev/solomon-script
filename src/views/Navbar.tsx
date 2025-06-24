export interface NavbarProps {
  setCurrentRoute: (route: string) => void;
  currentRoute: string;
}

export default function Navbar(props: NavbarProps) {
  return (
    <nav class="bg-navy text-white py-4 shadow-lg">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <button 
          onClick={() => props.setCurrentRoute('home')}
          class="flex items-center text-xl font-bold hover:text-teal-light transition"
        >
          <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 4H3C1.89543 4 1 4.89543 1 6V19C1 20.1046 1.89543 21 3 21H21C22.1046 21 23 20.1046 23 19V6C23 4.89543 22.1046 4 21 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 10H23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 4V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          SOLOMON'S WEB
        </button>
        
        <div class="flex space-x-6 items-center">
          <button 
            onClick={() => props.setCurrentRoute('home')}
            class={`hover:text-teal-light transition font-medium ${props.currentRoute === 'home' ? 'text-teal-light' : ''}`}
          >
            HOME
          </button>
          <button 
            onClick={() => props.setCurrentRoute('topics')}
            class={`hover:text-teal-light transition font-medium ${props.currentRoute === 'topics' ? 'text-teal-light' : ''}`}
          >
            TOPICS
          </button>
          <button 
            onClick={() => props.setCurrentRoute('about')}
            class={`hover:text-teal-light transition font-medium ${props.currentRoute === 'about' ? 'text-teal-light' : ''}`}
          >
            ABOUT
          </button>
        </div>
      </div>
    </nav>
  );
}