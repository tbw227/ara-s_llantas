# 🧪 Testing Guide for Ara's Llantas

This document outlines the comprehensive testing strategy for the Ara's Llantas tire shop application.

## 📋 Test Structure

### Backend Tests (`node-backend/__tests__/`)
- **`health.test.js`** - Health check and basic API endpoints
- **`tires.test.js`** - Tire catalog API endpoints and filtering
- **`contact.test.js`** - Contact form submission and validation
- **`server.test.js`** - Server configuration, CORS, rate limiting
- **`integration.test.js`** - End-to-end integration tests

### Frontend Tests (`frontend/src/`)
- **`App.test.js`** - Main application component tests
- **`components/TireCatalog.test.js`** - Tire catalog component tests
- **`components/Cart.test.js`** - Shopping cart functionality tests
- **`setupTests.js`** - Test configuration and mocks

## 🚀 Running Tests

### Quick Start
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Individual Test Suites
```bash
# Backend only
npm run test:backend

# Frontend only
npm run test:frontend

# Watch mode (frontend)
npm run test:watch
```

### Development Workflow
```bash
# Install all dependencies
npm run install:all

# Run tests to verify setup
npm run setup

# Start development servers
npm run dev
```

## 🎯 Test Coverage

### Backend Coverage
- ✅ **API Endpoints** - All routes tested
- ✅ **Error Handling** - 404s, validation errors
- ✅ **Security** - CORS, rate limiting
- ✅ **Integration** - Complete user flows
- ✅ **Performance** - Response times, concurrent requests

### Frontend Coverage
- ✅ **Component Rendering** - All components render correctly
- ✅ **User Interactions** - Click handlers, form submissions
- ✅ **State Management** - Cart updates, filtering
- ✅ **API Integration** - Mocked API calls
- ✅ **Error States** - Loading, error handling

## 🔧 Test Configuration

### Jest Configuration (Backend)
```javascript
// node-backend/package.json
{
  "jest": {
    "testEnvironment": "node",
    "testMatch": ["**/__tests__/**/*.test.js"],
    "collectCoverageFrom": [
      "routes/**/*.js",
      "server.js"
    ]
  }
}
```

### React Testing Library (Frontend)
```javascript
// frontend/src/setupTests.js
import '@testing-library/jest-dom';

// Mock browser APIs
global.IntersectionObserver = class IntersectionObserver { ... };
global.ResizeObserver = class ResizeObserver { ... };
```

## 📊 Test Types

### 1. Unit Tests
- **Purpose**: Test individual functions and components
- **Examples**: API route handlers, React components
- **Tools**: Jest, React Testing Library

### 2. Integration Tests
- **Purpose**: Test how different parts work together
- **Examples**: Complete API workflows, component interactions
- **Tools**: Supertest, React Testing Library

### 3. End-to-End Tests
- **Purpose**: Test complete user journeys
- **Examples**: Shopping flow, contact form submission
- **Tools**: Integration test suites

## 🛠️ Writing New Tests

### Backend Test Example
```javascript
describe('New API Endpoint', () => {
  it('should handle valid requests', async () => {
    const res = await request(app)
      .post('/api/new-endpoint')
      .send({ data: 'test' });
    
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
```

### Frontend Test Example
```javascript
describe('New Component', () => {
  it('should render correctly', () => {
    render(<NewComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## 🚨 Test Best Practices

### 1. Test Naming
- Use descriptive test names
- Follow the pattern: "should [expected behavior] when [condition]"

### 2. Test Structure
- **Arrange**: Set up test data
- **Act**: Execute the code being tested
- **Assert**: Verify the results

### 3. Mocking
- Mock external dependencies
- Use realistic test data
- Keep mocks simple and focused

### 4. Coverage Goals
- **Backend**: >90% line coverage
- **Frontend**: >80% line coverage
- **Critical paths**: 100% coverage

## 🔍 Debugging Tests

### Common Issues
1. **Async/Await**: Use `waitFor()` for async operations
2. **Mocking**: Ensure mocks are properly configured
3. **Timing**: Add appropriate delays for API calls

### Debug Commands
```bash
# Run specific test file
npm test -- --testPathPattern=tires.test.js

# Run tests in verbose mode
npm test -- --verbose

# Run tests with debugging
npm test -- --detectOpenHandles
```

## 📈 Continuous Integration

### GitHub Actions (Recommended)
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm run install:all
      - run: npm test
```

## 🎉 Success Metrics

A successful test suite should:
- ✅ All tests pass consistently
- ✅ Coverage targets met
- ✅ Tests run quickly (< 30 seconds)
- ✅ Tests are maintainable
- ✅ Tests catch real bugs

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)







