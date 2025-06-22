export default function App() {
  console.log('App component rendering...');
  
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3eac0',
      padding: '32px',
      fontFamily: '"DM Sans", sans-serif'
    }}>
      <div style={{
        backgroundColor: '#1e2640',
        color: 'white',
        padding: '24px',
        borderRadius: '8px',
        marginBottom: '24px'
      }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
          Solomon's Web - Bible Exploration
        </h1>
        <p style={{ color: '#e6f7f9', margin: '0' }}>
          Search for Bible verses and receive AI-powered theological insights
        </p>
      </div>
      
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: '600', 
          color: '#1e2640', 
          marginBottom: '16px',
          margin: '0 0 16px 0'
        }}>
          Search Bible Topics
        </h2>
        
        <div style={{ marginBottom: '16px' }}>
          <input 
            type="text" 
            placeholder="Enter a biblical topic (e.g., faith, love, hope)"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              marginBottom: '16px'
            }}
          />
          <button style={{
            backgroundColor: '#008193',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            Search Verses
          </button>
        </div>
        
        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#e6f7f9',
          borderRadius: '8px'
        }}>
          <p style={{ color: '#374151', margin: '0' }}>
            <strong>Note:</strong> This app uses OpenRouter API with Claude 3.5 Sonnet to provide 
            authentic Bible verses and theological analysis. Enter any biblical topic to get started.
          </p>
        </div>
      </div>
    </div>
  );
}

