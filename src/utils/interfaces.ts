import { Accessor } from 'solid-js'

/**
 * Interface representing a single parsed verse.
 */
export interface ParsedVerse {
    reference: string; // e.g., "Galatians 1:1"
    text: string;      // e.g., "God said..."
}

/**
 * Interface for the HomeViewModel's public API.
 */
export interface IHomeViewModel {
    // State exposed to the View
    verses: Accessor<ParsedVerse[]>;
    searchTopic: Accessor<string>;
    searchVersion: Accessor<string>;
    isLoading: Accessor<boolean>;

    // Actions the View can call
    updateBibleTopic: (newBibleTopic: string, selectedBibleVersion: string) => Promise<void>;
    generateGeminiAnalysis: (currentTopic: string, verseTexts: string, currentTranslation: string) => Promise<string>
    // initialize might be needed if you fetch something on load, otherwise remove
    // initialize: () => Promise<void>;
}

export interface Member {
    id: number;
    name: string;
    email: string;
    favoriteTranslation: string;
}

/**
 * Interface for the MemberViewModel's public API.
 */
export interface IMemberViewModel {
    members: Accessor<Member[]>;
    isLoading: Accessor<boolean>;
    fetchMember: () => Promise<void>;
    // Add other methods as needed
}

// Define Props Interface
export interface AIAnalysisProps {
    verses: ParsedVerse[];
    topic: string;
    translation: string;
    generateGeminiAnalysis: (currentTopic: string, verseTexts: string, currentTranslation: string) => Promise<string>
}

// Define Props interface
export interface VerseListProps {
    verses: ParsedVerse[]; // Expecting the array directly
    topic: string;
    // translation?: string; // Add if needed
}

  // Available Bible translations
  export const translations = [
    { id: 'NIV', name: 'New International Version' },
    { id: 'KJV', name: 'King James Version' },
    { id: 'ESV', name: 'English Standard Version' },
    { id: 'NLT', name: 'New Living Translation' },
    { id: 'NASB', name: 'New American Standard Bible' },
    { id: 'CSB', name: 'Christian Standard Bible' },
  ];