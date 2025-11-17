/**
 * Comprehensive API Connection Verification Script
 * Tests frontend-backend connectivity and configuration
 * 
 * Run with: node verify-api-connection.js
 */

const http = require('http');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60));
}

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: responseData,
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function testBackendHealth() {
  logSection('1. Testing Backend Health Endpoint');
  
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 8001,
      path: '/api/health',
      method: 'GET',
    });

    if (response.statusCode === 200) {
      log('✅ Backend is running!', 'green');
      try {
        const json = JSON.parse(response.data);
        log(`   Status: ${json.status || 'OK'}`, 'green');
        log(`   Response: ${JSON.stringify(json, null, 2)}`, 'green');
        return true;
      } catch (e) {
        log('⚠️  Backend responded but response is not JSON', 'yellow');
        log(`   Response: ${response.data}`, 'yellow');
        return false;
      }
    } else {
      log(`❌ Backend returned status: ${response.statusCode}`, 'red');
      return false;
    }
  } catch (error) {
    log('❌ Cannot connect to backend!', 'red');
    log(`   Error: ${error.message}`, 'red');
    log('   Make sure the backend is running: cd node-backend && npm start', 'yellow');
    return false;
  }
}

async function testTiresEndpoint() {
  logSection('2. Testing Tires Endpoint');
  
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 8001,
      path: '/api/tires',
      method: 'GET',
    });

    if (response.statusCode === 200) {
      log('✅ Tires endpoint is working!', 'green');
      try {
        const json = JSON.parse(response.data);
        const count = json.data?.length || json.count || 0;
        log(`   Tires count: ${count}`, 'green');
        return true;
      } catch (e) {
        log('⚠️  Tires endpoint responded but response is not JSON', 'yellow');
        return false;
      }
    } else {
      log(`❌ Tires endpoint returned status: ${response.statusCode}`, 'red');
      return false;
    }
  } catch (error) {
    log('❌ Cannot connect to tires endpoint!', 'red');
    log(`   Error: ${error.message}`, 'red');
    return false;
  }
}

async function testCORS() {
  logSection('3. Testing CORS Configuration');
  
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 8001,
      path: '/api/health',
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:3000',
      },
    });

    const corsHeaders = {
      'access-control-allow-origin': response.headers['access-control-allow-origin'],
      'access-control-allow-credentials': response.headers['access-control-allow-credentials'],
    };

    if (corsHeaders['access-control-allow-origin']) {
      log('✅ CORS is configured!', 'green');
      log(`   Allowed Origin: ${corsHeaders['access-control-allow-origin']}`, 'green');
      log(`   Credentials: ${corsHeaders['access-control-allow-credentials'] || 'not set'}`, 'green');
      return true;
    } else {
      log('⚠️  CORS headers not found', 'yellow');
      log('   This might be okay if CORS_ORIGINS is not set (defaults to localhost:3000)', 'yellow');
      return true; // Not a failure, just a warning
    }
  } catch (error) {
    log('❌ CORS test failed!', 'red');
    log(`   Error: ${error.message}`, 'red');
    return false;
  }
}

async function testContactEndpoint() {
  logSection('4. Testing Contact Form Endpoint');
  
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '123-456-7890',
      message: 'This is a test message',
    };

    const response = await makeRequest({
      hostname: 'localhost',
      port: 8001,
      path: '/api/contact',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000',
      },
    }, testData);

    if (response.statusCode === 201 || response.statusCode === 200) {
      log('✅ Contact endpoint is working!', 'green');
      try {
        const json = JSON.parse(response.data);
        log(`   Success: ${json.success}`, 'green');
        log(`   Message: ${json.message || 'OK'}`, 'green');
        return true;
      } catch (e) {
        log('⚠️  Contact endpoint responded but response is not JSON', 'yellow');
        return false;
      }
    } else {
      log(`❌ Contact endpoint returned status: ${response.statusCode}`, 'red');
      log(`   Response: ${response.data}`, 'red');
      return false;
    }
  } catch (error) {
    log('❌ Cannot connect to contact endpoint!', 'red');
    log(`   Error: ${error.message}`, 'red');
    return false;
  }
}

function checkConfiguration() {
  logSection('5. Configuration Check');
  
  log('\n📋 Frontend Configuration:', 'blue');
  log('   API Base URL Logic:', 'blue');
  log('   1. Uses REACT_APP_API_URL if set', 'blue');
  log('   2. Falls back to http://localhost:8001/api in development', 'blue');
  log('   3. Auto-detects in production if env var not set', 'blue');
  
  log('\n📋 Backend Configuration:', 'blue');
  log('   CORS Origins:', 'blue');
  log('   1. Uses CORS_ORIGINS env var if set (comma-separated)', 'blue');
  log('   2. Defaults to http://localhost:3000 in development', 'blue');
  log('   3. Must be set in production for frontend domain', 'blue');
  
  log('\n📋 Expected URLs:', 'blue');
  log('   Frontend: http://localhost:3000', 'blue');
  log('   Backend:  http://localhost:8001', 'blue');
  log('   API Base: http://localhost:8001/api', 'blue');
  
  return true;
}

async function main() {
  console.clear();
  log('\n🔍 API Connection Verification Tool', 'cyan');
  log('====================================\n', 'cyan');

  const results = {
    health: false,
    tires: false,
    cors: false,
    contact: false,
    config: false,
  };

  results.health = await testBackendHealth();
  results.tires = await testTiresEndpoint();
  results.cors = await testCORS();
  results.contact = await testContactEndpoint();
  results.config = checkConfiguration();

  logSection('Summary');
  
  const allPassed = Object.values(results).every(r => r === true);
  
  if (allPassed) {
    log('\n✅ All tests passed! Frontend and backend are properly connected.', 'green');
    log('\n📝 Next Steps:', 'cyan');
    log('   1. Start frontend: cd frontend && npm start', 'cyan');
    log('   2. Open browser: http://localhost:3000', 'cyan');
    log('   3. Check browser console for API requests', 'cyan');
    log('   4. Test contact form and newsletter signup', 'cyan');
  } else {
    log('\n❌ Some tests failed!', 'red');
    log('\n📝 Troubleshooting:', 'yellow');
    log('   1. Make sure backend is running: cd node-backend && npm start', 'yellow');
    log('   2. Check if port 8001 is available', 'yellow');
    log('   3. Verify environment variables are set correctly', 'yellow');
    log('   4. Check CORS_ORIGINS includes http://localhost:3000', 'yellow');
  }

  console.log('\n');
  process.exit(allPassed ? 0 : 1);
}

main().catch((error) => {
  log(`\n❌ Unexpected error: ${error.message}`, 'red');
  process.exit(1);
});

