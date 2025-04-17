import { createSignal } from 'solid-js';

function VerseCard(props) {
  const [expanded, setExpanded] = createSignal(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded());
  };
  
  return (
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-5">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-bold text-navy">{props.verse.reference}</h3>
          <button 
            onClick={toggleExpanded}
            class="text-gray-400 hover:text-teal"
            aria-label="Toggle verse details"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor" />
              <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" fill="currentColor" />
              <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" fill="currentColor" />
            </svg>
          </button>
        </div>
        <p class="text-gray-700">{props.verse.text}</p>
      </div>
    </div>
  );
}

export default VerseCard;
