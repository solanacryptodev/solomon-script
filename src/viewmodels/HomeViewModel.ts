// viewmodels/HomeViewModel.ts
// Note: Using '@google/generative-ai' instead of '@google/genai' if that's the correct package name
import { GoogleGenAI } from '@google/genai';
import { createSignal, Accessor, Setter } from 'solid-js';

/**
 * Interface representing a single parsed verse.
 */
export interface ParsedVerse {
    title: string; // e.g., "Galatians 1:1"
    body: string;  // e.g., "God said..."
}

/**
 * Interface for the HomeViewModel's public API.
 */
export interface IHomeViewModel {
    // State exposed to the View
    verses: Accessor<ParsedVerse[]>;      // Array of parsed verses
    searchTopic: Accessor<string>;       // The topic searched for
    searchVersion: Accessor<string>;     // The version searched with
    isLoading: Accessor<boolean>;         // Loading state for API calls

    // Actions the View can call
    updateBibleTopic: (newBibleTopic: string, selectedBibleVersion: string) => Promise<void>;
    // initialize might be needed if you fetch something on load, otherwise remove
    // initialize: () => Promise<void>;
}

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

    // --- Google GenAI Instance ---
    // IMPORTANT: NEVER hardcode API keys in source code.
    // Use environment variables or a secure configuration service.
    private genAI: GoogleGenAI;
    private readonly apiKey = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY_HERE"; // Example for Vite

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

        // Initialize GenAI client
        if (!this.apiKey || this.apiKey === "YOUR_API_KEY_HERE") {
             console.error("API Key is missing or placeholder! Please set it in your environment variables.");
             // Consider preventing AI calls if the key is missing
        }
         this.genAI = new GoogleGenAI(this.apiKey);

        console.log("HomeViewModel Initialized");
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
     * Fetches verses for a given topic and version using Google GenAI,
     * parses the response, and updates the state.
     */
    public updateBibleTopic = async (newBibleTopic: string, selectedBibleVersion: string): Promise<void> => {
        if (this.isLoading()) return; // Don't run if already loading

        console.log(`VM: Updating topic to "${newBibleTopic}", version "${selectedBibleVersion}"`);
        this._setIsLoading(true);
        this._setVerses([]); // Clear previous verses immediately
        this._setSearchTopic(newBibleTopic);
        this._setSearchVersion(selectedBibleVersion);

        try {
            // IMPORTANT: Check if API Key exists before making the call
            if (!this.apiKey || this.apiKey === "YOUR_API_KEY_HERE") {
                throw new Error("API Key for Google GenAI is not configured.");
            }

            const prompt = `Return up to 10 bible verses from the ${selectedBibleVersion} translation on the topic of ${newBibleTopic}. Each verse should be on a new line, starting with the full reference (e.g., John 3:16) followed by the verse text. Do not include any introductory or concluding text, just the verses.`;

            const result = await this.genAI.models.generateContent({
              model: "gemini-2.0-flash",
              contents: prompt,
          })
            const text = result.text;

            console.log("VM: AI Response Text:\n", text);

            const parsedVerses = this.parseMultiVerseResponse(text!);
            this._setVerses(parsedVerses); // Update the verses state
            console.log("VM: Parsed Verses:", parsedVerses);

        } catch (error) {
            console.error("VM: Failed to fetch or parse Bible verses", error);
            this._setVerses([]); // Ensure verses are empty on error
            // Optionally set an error state signal here for the UI
        } finally {
            this._setIsLoading(false);
        }
    };

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
                title: match[1].trim(), // The reference (e.g., "Galatians 1:1")
                body: match[2].trim(),  // The verse text
            };
        }
        return null; // Return null if the line doesn't match the expected format
    }
}