import { Show } from 'solid-js';
import SearchBar from '../views/SearchBar';
import TopicTags from '../views/TopicTags';
import VerseList from '../views/VerseList';
import AIAnalysis from '../views/AIAnalysis';
import { HomeViewModel } from '../viewmodels/HomeViewModel';

export default function Home() {
  const homeViewModel = new HomeViewModel();

  const handleTopicSelect = (topic: string) => {
    const currentTranslation = homeViewModel.searchVersion() || 'NIV';
    homeViewModel.updateBibleTopic(topic, currentTranslation);
  };
  
  return (
    <div class="container mx-auto px-4 py-6">
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 class="text-3xl font-bold text-navy mb-2">ASK ABOUT ANY BIBLE TOPIC</h1>
        <SearchBar homeViewModel={homeViewModel} />
        <TopicTags onSelectTopic={handleTopicSelect} />
      </div>
      
      <Show when={homeViewModel.isLoading()}>
        <div class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
        </div>
      </Show>

      <Show when={!homeViewModel.isLoading() && homeViewModel.verses().length === 0 && homeViewModel.searchTopic()}>
        <div class="text-center py-8 text-gray-600">
          <p>No verses found for "{homeViewModel.searchTopic()}". Try a different search term.</p>
        </div>
      </Show>

      <Show when={!homeViewModel.isLoading() && homeViewModel.verses().length > 0}>
        <div class="space-y-6">
          <VerseList
            verses={homeViewModel.verses()}
            topic={homeViewModel.searchTopic()}
            translation={homeViewModel.searchVersion()}
          />
          <AIAnalysis
            verses={homeViewModel.verses()}
            topic={homeViewModel.searchTopic()}
            translation={homeViewModel.searchVersion()}
            generateGeminiAnalysis={homeViewModel.generateGeminiAnalysis}
          />
        </div>
      </Show>
    </div>
  );
}