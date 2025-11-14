const { execSync } = require('child_process');
const path = require('path');

console.log('🧪 Running Comprehensive Test Suite for Ara\'s Llantas...\n');

// Test configuration
const config = {
  backend: {
    dir: path.join(__dirname, 'node-backend'),
    testCommand: 'npm test',
    coverageCommand: 'npm run test:coverage'
  },
  frontend: {
    dir: path.join(__dirname, 'frontend'),
    testCommand: 'npm test -- --coverage --watchAll=false',
    coverageCommand: 'npm test -- --coverage --watchAll=false'
  }
};

// Helper function to run commands
function runCommand(command, cwd, description) {
  console.log(`\n📋 ${description}`);
  console.log(`📍 Directory: ${cwd}`);
  console.log(`⚡ Command: ${command}\n`);
  
  try {
    const output = execSync(command, { 
      cwd, 
      stdio: 'inherit',
      encoding: 'utf8'
    });
    console.log(`✅ ${description} - PASSED\n`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} - FAILED`);
    console.error(error.message);
    return false;
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting Test Suite...\n');
  
  const results = {
    backend: false,
    frontend: false
  };

  // Run backend tests
  results.backend = runCommand(
    config.backend.testCommand,
    config.backend.dir,
    'Backend API Tests'
  );

  // Run frontend tests
  results.frontend = runCommand(
    config.frontend.testCommand,
    config.frontend.dir,
    'Frontend Component Tests'
  );

  // Generate coverage reports
  console.log('\n📊 Generating Coverage Reports...\n');
  
  if (results.backend) {
    runCommand(
      config.backend.coverageCommand,
      config.backend.dir,
      'Backend Coverage Report'
    );
  }

  if (results.frontend) {
    runCommand(
      config.frontend.coverageCommand,
      config.frontend.dir,
      'Frontend Coverage Report'
    );
  }

  // Summary
  console.log('\n📋 TEST SUMMARY');
  console.log('================');
  console.log(`Backend Tests: ${results.backend ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Frontend Tests: ${results.frontend ? '✅ PASSED' : '❌ FAILED'}`);
  
  const allPassed = results.backend && results.frontend;
  console.log(`\nOverall: ${allPassed ? '🎉 ALL TESTS PASSED' : '⚠️  SOME TESTS FAILED'}`);
  
  if (allPassed) {
    console.log('\n🎯 Your Ara\'s Llantas project is ready for production!');
  } else {
    console.log('\n🔧 Please fix the failing tests before deploying.');
  }
}

// Run the tests
runTests().catch(console.error);






