// viewmodels/HomeViewModel.ts
import { createSignal, Accessor, Setter } from 'solid-js';
import { ParsedVerse, IHomeViewModel } from '../utils/interfaces';
import { searchVerses } from '../services/bibleApi';
import { analyzeVerses } from '../services/deepseekApi';


export class HomeViewModel implements IHomeViewModel {
    // --- Private State Signals ---
    private _verses: Accessor<ParsedVerse[]>;
    private _setVerses: Setter<ParsedVerse[]>;
    private _searchTopic: Accessor<string>;
    private _setSearchTopic: Setter<string>;
    private _searchVersion: Accessor<string>;
    private _setSearchVersion: Setter<string>;
    private _isLoading: Accessor<boolean>;
    private _setIsLoading: Setter<boolean>;

    // --- Publicly Exposed Accessors ---
    public readonly verses: Accessor<ParsedVerse[]>;
    public readonly searchTopic: Accessor<string>;
    public readonly searchVersion: Accessor<string>;
    public readonly isLoading: Accessor<boolean>;

    // OpenRouter API will be used through the service layer

    constructor() {
        // Initialize signals
        const [versesSignal, setVersesSignal] = createSignal<ParsedVerse[]>([]);
        const [topicSignal, setTopicSignal] = createSignal<string>("");
        const [versionSignal, setVersionSignal] = createSignal<string>("KJV"); // Default version
        const [loadingSignal, setLoadingSignal] = createSignal<boolean>(false);

        // Assign signals and setters
        this._verses = versesSignal;
        this._setVerses = setVersesSignal;
        this._searchTopic = topicSignal;
        this._setSearchTopic = setTopicSignal;
        this._searchVersion = versionSignal;
        this._setSearchVersion = setVersionSignal;
        this._isLoading = loadingSignal;
        this._setIsLoading = setLoadingSignal;

        // Expose public accessors
        this.verses = this._verses;
        this.searchTopic = this._searchTopic;
        this.searchVersion = this._searchVersion;
        this.isLoading = this._isLoading;

        // API calls are handled through service layer

        // console.log("HomeViewModel Initialized");
    }

    /*
    // Optional: Implement initialize if needed for loading data on mount
    public initialize = async (): Promise<void> => {
        if (this.isLoading()) return;
        console.log("VM: initialize() called");
        this._setIsLoading(true);
        try {
            // Fetch initial data if necessary
        } catch (error) {
            console.error("VM: Failed initial load", error);
        } finally {
            this._setIsLoading(false);
        }
    };
    */

    /**
     * Fetches verses for a given topic and version using the Bible API service,
     * and updates the state.
     */
    public updateBibleTopic = async (newBibleTopic: string, selectedBibleVersion: string): Promise<void> => {
        if (this.isLoading()) return; // Don't run if already loading
        console.log(`VM: updateBibleTopic() called with topic "${newBibleTopic}" and version "${selectedBibleVersion}"`);

        this._setIsLoading(true);
        this._setVerses([]); // Clear previous verses immediately
        this._setSearchTopic(newBibleTopic);
        this._setSearchVersion(selectedBibleVersion);

        try {
            // Use the Bible API service to search for verses
            const verses = await searchVerses({ 
                topic: newBibleTopic, 
                translation: selectedBibleVersion 
            });
            console.log(`VM: Fetched ${verses.length} verses for topic "${newBibleTopic}"`);

            // Convert the Bible API response to ParsedVerse format
            const parsedVerses: ParsedVerse[] = verses.map(verse => ({
                reference: verse.reference,
                text: verse.text
            }));

            console.log(`VM: Found ${parsedVerses.length} verses for topic "${newBibleTopic}"`);
            this._setVerses(parsedVerses);

        } catch (error) {
            console.error("VM: Error fetching verses:", error);
            this._setVerses([]);
        } finally {
            this._setIsLoading(false);
        }
    };

    public generateGeminiAnalysis = async (currentTopic: string, verseTexts: string, currentTranslation: string): Promise<string> => {
        try {
            return await analyzeVerses(currentTopic, verseTexts, currentTranslation);
        } catch (error) {
            console.error("VM: Error generating analysis:", error);
            return "Unable to generate analysis at this time. Please try again later.";
        }
    }

    /**
     * Parses a multi-line string containing Bible verses into an array of ParsedVerse objects.
     * Expects each verse on a new line starting with the reference.
     */
    private parseMultiVerseResponse(responseString: string): ParsedVerse[] {
        if (!responseString) {
            return [];
        }

        const lines = responseString.split('\n'); // Split the response into lines
        const parsedVerses: ParsedVerse[] = [];

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine) { // Skip empty lines
                const parsed = this.parseSingleVerse(trimmedLine);
                console.log(`VM: Parsed line: "${trimmedLine}" ->`, parsed);
                if (parsed) {
                    parsedVerses.push(parsed);
                } else {
                     console.warn(`VM: Could not parse line: "${trimmedLine}"`);
                }
            }
        }
        return parsedVerses;
    }

    /**
     * Parses a single line string to extract a Bible reference title and body.
     */
    private parseSingleVerse(line: string): ParsedVerse | null {
        // Regex adjusted slightly to be less strict at the end if needed
        // but the original one should work if the format is consistent.
        const regex = /^(.+?\s+\d+:\d+)\s+(.*)$/;
        const match = line.match(regex);

        if (match && match.length === 3) {
            return {
                reference: match[1].trim(), // The reference (e.g., "Galatians 1:1")
                text: match[2].trim(),  // The verse text
            };
        }
        return null; // Return null if the line doesn't match the expected format
    }

    private parseAnalysisToHtml(rawText: string): string {
        if (!rawText) {
            return '';
        }

        // Trim whitespace and split into potential paragraphs/blocks based on double+ newlines
        const blocks = rawText.trim().split(/\n{2,}/);
        const htmlBlocks: string[] = [];

        // Precompile regex for efficiency
        const h3Regex3 = /^###\s+(.*)$/; // Matches '### Heading Text'
        const h3Regex2 = /^##\s+(.*)$/; // Matches '## Heading Text'
        const h3Regex = /^#\s+(.*)$/; // Matches '# Heading Text'
        const boldRegex = /\*\*(.*?)\*\*/g; // Matches **bold text**
        const listItemRegex = /^\*\s+(.*)$/; // Matches '* List item text'

        for (const block of blocks) {
            const trimmedBlock = block.trim();
            if (!trimmedBlock) continue; // Skip empty blocks

            // Check if the entire block is an H3 heading
            const h3Match = trimmedBlock.match(h3Regex);
            const h3Match2 = trimmedBlock.match(h3Regex2);
            const h3Match3 = trimmedBlock.match(h3Regex3);

            // Check if the block contains list items (more robust check)
            const lines = trimmedBlock.split('\n');
            const isListBlock = lines.some(line => listItemRegex.test(line.trim()));

            if (isListBlock) {
                // --- List Handling ---
                const listItems: string[] = [];
                for (const line of lines) {
                    const trimmedLine = line.trim();
                    const listItemMatch = trimmedLine.match(listItemRegex);

                    if (listItemMatch && listItemMatch[1]) {
                        // It's a valid list item line (starts with '* ')
                        let processedLine = listItemMatch[1].trim();
                        // Process for bold (**text**) within the list item
                        processedLine = processedLine.replace(boldRegex, '<strong>$1</strong>');
                        listItems.push(`<li>${processedLine}</li>`);
                    } else if (trimmedLine) {
                        // Handle lines within a list block that don't start with '* '
                        // If desired, wrap them too, or ignore them, or append to previous.
                        // Current simple approach: wrap non-empty lines as list items too
                         let processedLine = trimmedLine;
                         processedLine = processedLine.replace(boldRegex, '<strong>$1</strong>');
                         listItems.push(`<li>${processedLine}</li>`);
                    }
                }
                if (listItems.length > 0) {
                    htmlBlocks.push(`<ul>\n${listItems.join('\n')}\n</ul>`);
                }
                // --- End List Handling ---

            } else if (h3Match && h3Match[1]) { // <<< CHECK FOR H3 HERE
                // --- H3 Heading Handling ---
                // Check if the block ONLY contains the H3 heading (no extra lines)
                // This prevents multi-line blocks starting with ### from becoming just H3
                if (lines.length === 1) {
                     let headingContent = h3Match[1].trim();
                     // Process heading content for bold tags as well
                     headingContent = headingContent.replace(boldRegex, '<strong>$1</strong>');
                     htmlBlocks.push(`<h3>${headingContent}</h3>`);
                } else {
                     // If block starts with ### but has multiple lines, treat as paragraph
                     // (or implement more complex multi-line heading logic if needed)
                     // Falling through to paragraph handling is usually sufficient
                     this.processAsParagraph(trimmedBlock, htmlBlocks, boldRegex);
                }
            } else if (h3Match2 && h3Match2[1]) { // <<< CHECK FOR H3 HERE
                // --- H3 Heading Handling ---
                // Check if the block ONLY contains the H3 heading (no extra lines)
                // This prevents multi-line blocks starting with ### from becoming just H3
                if (lines.length === 1) {
                    let headingContent = h3Match2[1].trim();
                    // Process heading content for bold tags as well
                    headingContent = headingContent.replace(boldRegex, '<strong>$1</strong>');
                    htmlBlocks.push(`<h3>${headingContent}</h3>`);
                } else {
                    // If block starts with ### but has multiple lines, treat as paragraph
                    // (or implement more complex multi-line heading logic if needed)
                    // Falling through to paragraph handling is usually sufficient
                    this.processAsParagraph(trimmedBlock, htmlBlocks, boldRegex);
                }
            } else if (h3Match3 && h3Match3[1]) { // <<< CHECK FOR H3 HERE
                    // --- H3 Heading Handling ---
                    // Check if the block ONLY contains the H3 heading (no extra lines)
                    // This prevents multi-line blocks starting with ### from becoming just H3
                if (lines.length === 1) {
                    let headingContent = h3Match3[1].trim();
                    // Process heading content for bold tags as well
                    headingContent = headingContent.replace(boldRegex, '<strong>$1</strong>');
                    htmlBlocks.push(`<h3>${headingContent}</h3>`);
                } else {
                    // If block starts with ### but has multiple lines, treat as paragraph
                    // (or implement more complex multi-line heading logic if needed)
                    // Falling through to paragraph handling is usually sufficient
                    this.processAsParagraph(trimmedBlock, htmlBlocks, boldRegex);
                }
                // --- End H3 Handling ---

            } else {
                // --- Paragraph Handling (Fallback) ---
                this.processAsParagraph(trimmedBlock, htmlBlocks, boldRegex);
                // --- End Paragraph Handling ---
            }
        }

        // Join all processed blocks
        return htmlBlocks.join('\n\n'); // Add some space between blocks in the HTML source
    }

    // Helper function for paragraph processing to avoid repetition
    private processAsParagraph(block: string, htmlBlocks: string[], boldRegex: RegExp): void {
         // 1. Process for bold (**text**)
        let processedBlock = block.replace(boldRegex, '<strong>$1</strong>');
        // 2. Replace single newlines within the block with <br>
        // Only add <br> if there are actual newlines within the block text itself
        if (processedBlock.includes('\n')) {
            processedBlock = processedBlock.replace(/\n/g, '<br />');
        }
        htmlBlocks.push(`<p>${processedBlock}</p>`);
    }
}