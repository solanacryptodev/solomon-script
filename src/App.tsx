export default function App() {
  console.log('App component rendering...');
  
  return (
    <div class="min-h-screen bg-cream p-8">
      <div class="bg-navy text-white p-6 rounded-lg mb-6">
        <h1 class="text-3xl font-bold">Solomon's Web - Bible Exploration</h1>
        <p class="text-teal-light mt-2">Search for Bible verses and receive AI-powered theological insights</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-navy mb-4">Search Bible Topics</h2>
        <div class="space-y-4">
          <input 
            type="text" 
            placeholder="Enter a biblical topic (e.g., faith, love, hope)"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
          />
          <button class="bg-teal text-white px-6 py-3 rounded-lg hover:bg-navy transition">
            Search Verses
          </button>
        </div>
        
        <div class="mt-6 p-4 bg-teal-light rounded-lg">
          <p class="text-gray-700">
            <strong>Note:</strong> This app uses OpenRouter API with Claude 3.5 Sonnet to provide 
            authentic Bible verses and theological analysis. Enter any biblical topic to get started.
          </p>
        </div>
      </div>
    </div>
  );
}

