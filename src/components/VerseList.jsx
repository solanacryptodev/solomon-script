import { createSignal, createEffect, For, Show } from 'solid-js';
import VerseCard from './VerseCard';

function VerseList(props) {
  const [visibleVerses, setVisibleVerses] = createSignal([]);
  const [page, setPage] = createSignal(1);
  const versesPerPage = 3;
  
  // Update visible verses when topic or page changes
  createEffect(() => {
    const startIndex = 0;
    const endIndex = page() * versesPerPage;
    setVisibleVerses(props.verses.slice(startIndex, endIndex));
  });
  
  // Load more verses
  const loadMoreVerses = () => {
    setPage(prev => prev + 1);
  };
  
  // Check if all verses are loaded
  const hasMoreVerses = () => {
    return visibleVerses().length < props.verses.length;
  };
  
  return (
    <Show when={props.topic && props.verses.length > 0}>
      <div class="mb-10">
        <div class="mb-6">
          <h2 class="text-xl font-bold mb-1">VERSES ABOUT <span class="uppercase text-teal">{props.topic}</span></h2>
          <p class="text-gray-600">{props.verses.length} RELEVANT PASSAGES FROM SCRIPTURE</p>
        </div>
        
        <div class="space-y-4">
          <For each={visibleVerses()}>
            {(verse) => <VerseCard verse={verse} />}
          </For>
        </div>
        
        <Show when={hasMoreVerses()}>
          <div class="flex justify-center mt-8">
            <button 
              onClick={loadMoreVerses}
              class="border border-teal text-teal rounded-md px-4 py-2 hover:bg-teal hover:text-white transition-colors"
            >
              SHOW MORE VERSES
            </button>
          </div>
        </Show>
      </div>
    </Show>
  );
}

export default VerseList;
