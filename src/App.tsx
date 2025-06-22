function App() {
  console.log('App component rendering...');
  
  return (
    <div>
      <h1>Solomon's Web - Bible Exploration</h1>
      <p>Search for Bible verses and receive AI-powered theological insights</p>
      
      <div>
        <h2>Search Bible Topics</h2>
        <input 
          type="text" 
          placeholder="Enter a biblical topic (e.g., faith, love, hope)"
        />
        <button>Search Verses</button>
        
        <p>
          <strong>Note:</strong> This app uses OpenRouter API with Claude 3.5 Sonnet to provide 
          authentic Bible verses and theological analysis. Enter any biblical topic to get started.
        </p>
      </div>
    </div>
  );
}

export default App;

