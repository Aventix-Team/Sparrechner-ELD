// Vercel Speed Insights initialization for vanilla HTML
// This script loads and initializes Speed Insights tracking

(function() {
  // Load Speed Insights from the installed npm package
  // In production on Vercel, this will be served from the CDN
  const script = document.createElement('script');
  script.src = 'https://va.vercel-scripts.com/v1/speed-insights/script.js';
  script.defer = true;
  
  // Add error handling
  script.onerror = function() {
    console.warn('Failed to load Vercel Speed Insights');
  };
  
  // Initialize Speed Insights when script loads
  script.onload = function() {
    // Speed Insights will automatically start tracking
    if (window.si) {
      console.log('Vercel Speed Insights initialized');
    }
  };
  
  // Append script to document head
  document.head.appendChild(script);
})();
