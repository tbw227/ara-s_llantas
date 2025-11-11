// Quick test to verify backend API is working
// Run this in browser console at http://localhost:3000

async function testBackendAPI() {
  console.log('Testing backend API...');
  
  try {
    // Test health endpoint
    const healthResponse = await fetch('http://localhost:8001/api/health');
    console.log('Health endpoint status:', healthResponse.status);
    console.log('Health endpoint content-type:', healthResponse.headers.get('content-type'));
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('Health data:', healthData);
    }
    
    // Test tires endpoint
    const tiresResponse = await fetch('http://localhost:8001/api/tires');
    console.log('Tires endpoint status:', tiresResponse.status);
    console.log('Tires endpoint content-type:', tiresResponse.headers.get('content-type'));
    
    if (tiresResponse.ok) {
      const tiresData = await tiresResponse.json();
      console.log('Tires data:', tiresData);
    }
    
  } catch (error) {
    console.error('Backend API test failed:', error);
  }
}

// Run the test
testBackendAPI();





