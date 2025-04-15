import { createSignal, createResource, Show } from 'solid-js';
import SearchBar from '../components/SearchBar';
import TopicTags from '../components/TopicTags';
import VerseList from '../components/VerseList';
import AIAnalysis from '../components/AIAnalysis';
import { searchVerses } from '../services/bibleApi';

function Home() {
  const [searchParams, setSearchParams] = createSignal({ topic: '', translation: 'NIV' });
  const [verses, { refetch }] = createResource(searchParams, searchVerses);
  
  const handleSearch = (topic, translation) => {
    setSearchParams({ topic, translation });
  };
  
  const handleSelectTopic = (topic) => {
    setSearchParams({ ...searchParams(), topic });
  };
  
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <TopicTags onSelectTopic={handleSelectTopic} />
      
      <Show when={verses.loading}>
        <div class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
        </div>
      </Show>
      
      <Show when={verses.error}>
        <div class="text-center py-8 text-red-500">
          <p>Failed to load verses. Please try again later.</p>
        </div>
      </Show>
      
      <Show when={!verses.loading && verses() && verses().length === 0 && searchParams().topic}>
        <div class="text-center py-8 text-gray-600">
          <p>No verses found for "{searchParams().topic}". Try a different search term.</p>
        </div>
      </Show>
      
      <Show when={!verses.loading && verses() && verses().length > 0}>
        <VerseList 
          verses={verses() || []} 
          topic={searchParams().topic} 
          translation={searchParams().translation}
        />
        
        <AIAnalysis 
          verses={verses() || []} 
          topic={searchParams().topic}
          translation={searchParams().translation}
        />
      </Show>
    </div>
  );
}

export default Home;
