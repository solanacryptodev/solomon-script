import { Show } from 'solid-js';
import SearchBar from '../views/SearchBar';
import VerseList from '../views/VerseList';
import AIAnalysis from '../views/AIAnalysis';
import { HomeViewModel } from '../viewmodels/HomeViewModel';

const Home = () => {
  const homeViewModel = new HomeViewModel();
  // Optional: Call initialize if you implement it in the VM
  // import { onMount } from 'solid-js';
  // onMount(() => {
  //   homeViewModel.initialize?.();
  // });
  
  return (
      <div>
          {/* Pass the ViewModel instance to SearchBar */}
          <SearchBar homeViewModel={homeViewModel} />

          {/* Show loading spinner based on ViewModel state */}
          {/* Remember to CALL the accessor: homeViewModel.isLoading() */}
          <Show when={homeViewModel.isLoading()}>
              <div class="flex justify-center py-8">
                  <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
              </div>
          </Show>

          {/* Show error message (Consider adding an error signal to ViewModel) */}
          {/* <Show when={homeViewModel.error()}> ... </Show> */}

          {/* Show "No verses found" message */}
          <Show when={!homeViewModel.isLoading() && homeViewModel.verses().length === 0 && homeViewModel.searchTopic()}>
              <div class="text-center py-8 text-gray-600">
                  <p>No verses found for "{homeViewModel.searchTopic()}". Try a different search term or check the AI response format.</p>
              </div>
          </Show>

          {/* Show VerseList and AIAnalysis when verses are loaded */}
          {/* Pass data directly from the ViewModel */}
          <Show when={!homeViewModel.isLoading() && homeViewModel.verses().length > 0}>
              <VerseList
                  verses={homeViewModel.verses()} // Pass the array of verses
                  topic={homeViewModel.searchTopic()} // Pass the searched topic
                  // translation={homeViewModel.searchVersion()} // Pass version if needed by VerseList
              />

              <AIAnalysis
                  verses={homeViewModel.verses()} // Pass verses array
                  topic={homeViewModel.searchTopic()} // Pass searched topic
                  translation={homeViewModel.searchVersion()} // Pass searched version
                  generateGeminiAnalysis={homeViewModel.generateGeminiAnalysis}
              />
          </Show>
      </div>
  );
}

export default Home;
