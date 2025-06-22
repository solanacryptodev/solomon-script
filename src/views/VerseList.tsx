import { createSignal, createEffect, For, Show } from 'solid-js';
import VerseCard from './VerseCard'; 
import type { ParsedVerse } from '../utils/interfaces'; 
import { VerseListProps } from '../utils/interfaces';

export default function VerseList (props: VerseListProps) { 
    const [visibleVerses, setVisibleVerses] = createSignal<ParsedVerse[]>([]);
    const [page, setPage] = createSignal(1);
    const versesPerPage = 3;

    // Recalculate visible verses when props.verses or page changes
    createEffect(() => {
        // Reset page to 1 when the underlying verses array changes (new search)
        setPage(1);
        const startIndex = 0;
        const endIndex = 1 * versesPerPage; // Show first page initially after change
         // Use props.verses directly as it's the array
        setVisibleVerses(props.verses.slice(startIndex, endIndex));
    });

     // Effect for pagination changes only
     createEffect(() => {
        // This runs when page() changes *after* the initial effect
        const currentPage = page();
        if (currentPage > 1) { // Only adjust slice for subsequent pages
             const startIndex = 0;
             const endIndex = currentPage * versesPerPage;
             setVisibleVerses(props.verses.slice(startIndex, endIndex));
        }
     });


    // Load more verses
    const loadMoreVerses = () => {
        setPage(prev => prev + 1);
    };

    // Check if all verses are loaded
    const hasMoreVerses = () => {
        // Compare length of visible subset to the full array length
        return visibleVerses().length < props.verses.length;
    };

    return (
        // Use props directly
        <>
            <Show when={props.topic && props.verses.length > 0}>
                <div class="mb-10">
                    <div class="mb-6">
                        <h2 class="text-xl font-bold mb-1">VERSES ABOUT <span class="uppercase text-rose-red">{props.topic}</span></h2>
                        {/* Display the total count from the full props.verses array */}
                        <p class="text-gray-600">{props.verses.length} RELEVANT PASSAGES FROM SCRIPTURE</p>
                    </div>

                    <div class="space-y-4">
                        {/* Iterate over the visibleVerses signal */}
                        <For each={visibleVerses()}>
                            {/* Assuming VerseCard takes a 'verse' prop of type ParsedVerse */}
                            {(verse) => <VerseCard verse={verse} />}
                        </For>
                    </div>

                    <Show when={hasMoreVerses()}>
                        <div class="flex justify-center mt-8">
                            <button
                                onClick={loadMoreVerses}
                                class="border border-navy text-black rounded-md px-4 py-2 hover:bg-gradient-to-b from-navy to-[#2E3B63] hover:text-white transition-colors"
                            >
                                SHOW MORE VERSES
                            </button>
                        </div>
                    </Show>
                </div>
            </Show>
        </>
    );
};
