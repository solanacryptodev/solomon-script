# Solomon's Web - Bible Exploration App

## Overview

Solomon's Web is a modern Bible exploration application that combines scripture search with AI-powered analysis. Built with SolidJS and Vinxi, the application allows users to search for biblical topics and receive relevant verses along with theological insights generated by AI models. The app is designed to help users deepen their understanding of scripture through topical exploration and intelligent analysis.

## System Architecture

### Frontend Architecture
- **Framework**: SolidJS with TypeScript for reactive UI components
- **Build Tool**: Vinxi for development and static site generation
- **Styling**: TailwindCSS with custom CSS variables for theming
- **Routing**: SolidJS Router for client-side navigation
- **State Management**: MVVM pattern with ViewModels managing component state

### Backend Architecture
- **Server Functions**: Vinxi server functions for API endpoints
- **Static Generation**: Configured for static site deployment
- **API Integration**: External API calls to Bible search and AI analysis services

### Design Patterns
- **MVVM (Model-View-ViewModel)**: Clear separation between UI components and business logic
- **Service Layer**: Dedicated services for external API interactions
- **Component-Based**: Modular UI components with single responsibilities

## Key Components

### Core Views
- **SearchBar**: Main search interface with topic input and Bible translation selection
- **VerseList**: Display of search results with pagination and verse highlighting
- **AIAnalysis**: AI-generated theological analysis of selected verses
- **Navbar/Footer**: Navigation and branding components

### ViewModels
- **HomeViewModel**: Manages main application state including verses, search parameters, and loading states
- **MemberViewModel**: Placeholder for future member management functionality

### Services
- **bibleApi.ts**: Handles Bible verse search using OpenRouter AI API
- **deepseekApi.ts**: Manages AI analysis requests for theological insights

### Utilities
- **interfaces.ts**: TypeScript interfaces and type definitions for consistent data structures

## Data Flow

1. **User Input**: User enters a biblical topic and selects a translation
2. **Search Request**: HomeViewModel processes the input and calls the Bible API service
3. **Verse Retrieval**: OpenRouter AI returns relevant Bible verses in JSON format
4. **State Update**: ViewModel updates the verses signal, triggering UI re-render
5. **AI Analysis**: Parallel request sent to generate theological analysis
6. **Results Display**: VerseList and AIAnalysis components render the results

## External Dependencies

### AI Services
- **OpenRouter API**: Primary service for both Bible verse search and AI analysis
- **Claude 3.5 Sonnet**: Preferred AI model for scripture analysis and verse search
- **DeepSeek**: Alternative AI model (API key present but service not fully implemented)

### Development Tools
- **TailwindCSS**: Utility-first CSS framework via CDN
- **Google Fonts**: DM Sans font family for typography
- **SolidJS Ecosystem**: Router, Start framework, and related tooling

### Translation Support
- Multiple Bible translations supported (NIV, KJV, ESV, etc.)
- Translation selection affects both verse search and AI analysis context

## Deployment Strategy

### Static Site Generation
- Configured for static deployment using Vinxi's static preset
- Client-side rendering with SolidJS hydration
- API keys managed through environment variables

### Port Configuration
- Development server runs on port 5000
- Additional ports configured for potential services (3000, 3002, 3003)
- External port 80 mapped for production deployment

### Environment Variables
- `DEEPSEEK_API_KEY`: API key for DeepSeek AI service
- `OPENROUTER_API_KEY`: Required for Bible search and analysis (not in current .env)

## Changelog

- June 22, 2025: Initial setup with SolidStart attempt
- June 22, 2025: Converted to TypeScript with Vite + SolidJS
- June 22, 2025: Implemented OpenRouter API integration for Bible verse search and analysis
- June 22, 2025: Fixed vite.config.js with allowedHosts for Replit domain
- June 22, 2025: Simplified App component for debugging rendering issues
- June 22, 2025: Removed all SolidJS router dependencies and implemented simple client-side navigation
- June 22, 2025: Added sticky header and footer with scrollable content area

## User Preferences

Preferred communication style: Simple, everyday language.