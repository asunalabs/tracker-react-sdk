import React from 'react';
import { TrackerProvider, useTracking } from '@engagetrack/react';

// Example component that uses tracking
function ExampleComponent() {
  const { track, isInitialized, sessionId, userId } = useTracking();

  const handleButtonClick = () => {
    track.buttonClick('hero-cta', {
      section: 'homepage',
      campaign: 'summer-sale'
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track.formSubmit('newsletter-signup', {
      source: 'homepage'
    });
  };

  const handleCustomEvent = () => {
    track.customEvent('feature_used', {
      featureName: 'advanced-search',
      timestamp: Date.now()
    });
  };

  const handleVideoPlay = () => {
    track.videoPlay('product-demo', 300);
  };

  const handlePurchase = () => {
    track.purchase('order-123', 99.99, 'USD', {
      items: 2,
      paymentMethod: 'credit-card'
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>EngageTrack React Package Demo</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Tracking Status:</h3>
        <p>Initialized: {isInitialized ? '✅' : '❌'}</p>
        <p>Session ID: {sessionId || 'Not set'}</p>
        <p>User ID: {userId || 'Not set'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Tracking Examples:</h3>
        
        <button 
          onClick={handleButtonClick}
          style={{ margin: '5px', padding: '10px 15px' }}
        >
          Track Button Click
        </button>

        <button 
          onClick={handleCustomEvent}
          style={{ margin: '5px', padding: '10px 15px' }}
        >
          Track Custom Event
        </button>

        <button 
          onClick={handleVideoPlay}
          style={{ margin: '5px', padding: '10px 15px' }}
        >
          Track Video Play
        </button>

        <button 
          onClick={handlePurchase}
          style={{ margin: '5px', padding: '10px 15px' }}
        >
          Track Purchase
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Form Example:</h3>
        <form onSubmit={handleFormSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email"
            style={{ padding: '10px', marginRight: '10px' }}
          />
          <button 
            type="submit"
            style={{ padding: '10px 15px' }}
          >
            Subscribe (Track Form Submit)
          </button>
        </form>
      </div>

      <div>
        <h3>Search Example:</h3>
        <input 
          type="text" 
          placeholder="Search..."
          onChange={(e) => {
            if (e.target.value.length > 2) {
              track.search(e.target.value, Math.floor(Math.random() * 50), {
                category: 'documentation'
              });
            }
          }}
          style={{ padding: '10px', width: '200px' }}
        />
      </div>
    </div>
  );
}

// Main App component with TrackerProvider
function App() {
  return (
    <TrackerProvider
      siteId="demo-site-123"
      domain="localhost"
      serverUrl="http://localhost:5000/api/track"
      autoTrack={true}
    >
      <ExampleComponent />
    </TrackerProvider>
  );
}

export default App;
