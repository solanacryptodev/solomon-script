import { createSignal } from 'solid-js';
import TopicTags from './TopicTags';

function SearchBar(props) {
  const [inputValue, setInputValue] = createSignal('');
  const [translation, setTranslation] = createSignal('NIV');
  
  // Available Bible translations
  const translations = [
    { id: 'NIV', name: 'New International Version' },
    { id: 'KJV', name: 'King James Version' },
    { id: 'ESV', name: 'English Standard Version' },
    { id: 'NLT', name: 'New Living Translation' },
    { id: 'NASB', name: 'New American Standard Bible' },
    { id: 'CSB', name: 'Christian Standard Bible' },
  ];
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue().trim()) {
      props.homeViewModel.updateBibleTopic(inputValue().trim(), translation());

      // Pass to LLM for analysis
      // homeViewModel.updateBibleTopic(inputValue().trim(), translation());
    }
  };
  
  return (
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-left text-2xl font-bold mb-4">ASK ABOUT ANY BIBLE TOPIC</h2>
      
      <form onSubmit={handleSubmit} class="flex flex-col md:flex-row gap-4">
        <div class="flex-grow">
          <input
            type="text"
            placeholder="e.g. 'Trust', 'Faith', 'The Exodus'"
            value={inputValue()}
            onInput={(e) => setInputValue(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
          />
        </div>
        
        <div class="md:w-48">
          <select 
            value={translation()} 
            onChange={(e) => setTranslation(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
          >
            {translations.map(trans => (
              <option value={trans.id}>{trans.name}</option>
            ))}
          </select>
        </div>
        
        <button 
          type="submit" 
          class="bg-teal text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition flex items-center justify-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          SEARCH
        </button>
      </form>

      <TopicTags onSelectTopic={props.homeViewModel.topicTagSelect} />
    </div>
  );
}

export default SearchBar;
