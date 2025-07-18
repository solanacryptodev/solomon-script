// views/AIAnalysis.tsx
import { Component, createSignal, createEffect, Show } from 'solid-js';
import { AIAnalysisProps } from '../utils/interfaces'

const AIAnalysis: Component<AIAnalysisProps> = (props) => {
    const [analysis, setAnalysis] = createSignal('');
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal('');

    // Request AI analysis when relevant props change
    createEffect(async () => {
        // Use on() to track specific props if needed, or just rely on effect re-running
        const currentVerses = props.verses; // Get current value
        const currentTopic = props.topic;
        const currentTranslation = props.translation;

        if (currentVerses && currentVerses.length > 0 && currentTopic) {
            setLoading(true);
            setError('');
            setAnalysis(''); // Clear previous analysis
            try {
                // Format verses for the analysis prompt
                const verseTexts = currentVerses.map(v => `${v.reference}: ${v.text}`).join('\n\n');
                // Call your specific analysis function (replace placeholder)
                const result = await props.generateGeminiAnalysis(currentTopic, verseTexts, currentTranslation);
                setAnalysis(result);
            } catch (err) {
                console.error('Error generating Gemini analysis:', err);
                setError('Failed to generate AI analysis. Please try again later.');
                setAnalysis('');
            } finally {
                setLoading(false);
            }
        } else {
             // Clear analysis if verses/topic are removed
             setAnalysis('');
             setError('');
             setLoading(false);
        }
    });

    return (
         <Show when={props.verses.length > 0}>
             {/* Main container */}
             <div class="rounded-lg mb-10 shadow-lg overflow-hidden">

                 {/* Header Section */}
                 <div class="bg-gradient-to-b from-navy to-[#2E3B63] p-4"> 
                     <h2 class="text-white text-xl font-bold mb-1">AI BIBLICAL ANALYSIS</h2>
                     <p class="text-white text-md">{`GEMMA'S INTERPRETATION OF THESE VERSES BASED ON THE ${props.translation}`}</p> 
                 </div>

                 {/* Content Area Wrapper */}
                 <div class="bg-gradient-to-b from-[#D07E29] to-desert-sun p-6"> 

                     {/* Loading State */}
                     <Show when={loading()}>
                         <div class="flex justify-center py-8">
                             <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
                         </div>
                     </Show>

                     {/* Error State */}
                     <Show when={error()}>
                         <div class="text-red-500 py-4">{error()}</div>
                     </Show>

                     {/* Analysis Content + Footer Container */}
                     <Show when={!loading() && !error() && analysis()}>
                         {/* Analysis Content via innerHTML */}
                         <div
                             class="prose max-w-none text-black space-y-4"
                             innerHTML={analysis()}
                         >
                             {/* HTML content injected here */}
                         </div>

                         {/* Footer Section */}
                         <div class="flex items-center text-xs text-black mt-8 pt-4 border-t border-t-black"> 
                             <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 2V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 20V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.93 4.93L6.34 6.34" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.66 17.66L19.07 19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 12H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.34 17.66L4.93 19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.07 4.93L17.66 6.34" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                             AI ANALYSIS GENERATED BY GOOGLE GEMMA 3
                         </div>
                     </Show>
                 </div> 
             </div> 
         </Show> 
     );
}

export default AIAnalysis;
