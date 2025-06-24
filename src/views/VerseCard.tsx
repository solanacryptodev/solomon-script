import { HomeViewModel } from '../viewmodels/HomeViewModel';

interface Verse {
  reference: string;
  text: string;
}

interface VerseCardProps {
  verse: Verse;
  translation: string;
  topic?: string;
}

function VerseCard(props: VerseCardProps) {
  const homeViewModel = new HomeViewModel();
  console.log('version in verse card component:', homeViewModel.searchVersion())
  
  const highlightTopic = (text: string, topic: string) => {
    if (!topic) return text;
    
    const regex = new RegExp(`(${topic})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
  };

  return (
    <div class="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-teal">
      <div class="flex flex-col md:flex-row justify-between items-start mb-3">
        <h3 class="text-lg font-semibold text-navy mb-2 md:mb-0">{props.verse?.reference}</h3>
        <button class="text-teal hover:text-navy transition text-sm font-medium">
          COPY VERSE
        </button>
      </div>
      
      <p 
        class="text-gray-700 leading-relaxed"
        innerHTML={highlightTopic(props.verse?.text, props.verse?.text)}
      />
      
      <div class="mt-4 flex justify-between items-center">
        <div class="flex space-x-2">
          <button class="text-xs text-gray-500 hover:text-teal transition">
            Share
          </button>
          <button class="text-xs text-gray-500 hover:text-teal transition">
            Save
          </button>
        </div>
        <span class="text-xs text-gray-400">{props.translation}</span>
      </div>
    </div>
  );
}

export default VerseCard;