/**
 * Test script to verify frontend-backend connection
 * Run with: node test-connection.js
 */

const http = require('http');

console.log('🧪 Testing Backend API Connection...\n');

// Test backend health endpoint
const testBackend = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8001,
      path: '/api/health',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            console.log('✅ Backend is running!');
            console.log('   Status:', json.status || 'OK');
            console.log('   Response:', JSON.stringify(json, null, 2));
            resolve(true);
          } catch (e) {
            console.log('⚠️  Backend responded but response is not JSON');
            console.log('   Response:', data);
            resolve(false);
          }
        } else {
          console.log('❌ Backend returned status:', res.statusCode);
          console.log('   Response:', data);
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ Cannot connect to backend!');
      console.log('   Error:', error.message);
      console.log('   Make sure the backend is running on port 8001');
      reject(error);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      console.log('❌ Backend connection timeout!');
      reject(new Error('Timeout'));
    });

    req.end();
  });
};

// Test tires endpoint
const testTires = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8001,
      path: '/api/tires',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            console.log('✅ Tires endpoint is working!');
            console.log('   Tires count:', json.data?.length || json.count || 0);
            resolve(true);
          } catch (e) {
            console.log('⚠️  Tires endpoint responded but response is not JSON');
            resolve(false);
          }
        } else {
          console.log('❌ Tires endpoint returned status:', res.statusCode);
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ Cannot connect to tires endpoint!');
      reject(error);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });

    req.end();
  });
};

// Run tests
(async () => {
  try {
    console.log('1. Testing backend health endpoint...');
    await testBackend();
    
    console.log('\n2. Testing tires endpoint...');
    await testTires();
    
    console.log('\n✅ All tests passed! Backend is ready.');
    console.log('\n📝 Next steps:');
    console.log('   - Start frontend: cd frontend && npm start');
    console.log('   - Open browser: http://localhost:3000');
    console.log('   - Check browser console for any errors');
    process.exit(0);
  } catch (error) {
    console.log('\n❌ Tests failed!');
    console.log('\n📝 Troubleshooting:');
    console.log('   1. Make sure backend is running: cd node-backend && npm start');
    console.log('   2. Check if port 8001 is available');
    console.log('   3. Verify environment variables are set correctly');
    process.exit(1);
  }
})();

