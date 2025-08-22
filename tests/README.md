# WhatsApp.js Testing Guide

This document outlines the testing approach and conventions for the whatsapp.js library.

## Test Structure

Tests are organized in the `tests/` directory with the following structure:

```
tests/
├── client/          # Client-related functionality tests
├── errors/          # Error handling and exception tests
├── models/          # Model and builder pattern tests
├── utils/           # Utility function tests
├── mocks/           # Mock utilities and test helpers
└── setup.ts         # Global test configuration
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Categories

### 1. MessageCollector Tests (`tests/utils/MessageCollector.test.ts`)
Tests the event-driven message collection functionality:
- Message filtering and collection
- Timeout handling
- Maximum collection limits
- Event emission and handling
- Cleanup and resource management

### 2. ContactBuilder Tests (`tests/models/ContactBuilder.test.ts`)
Tests the builder pattern for contact creation:
- Constructor validation
- Setter method functionality
- Data integrity and validation
- Builder pattern chaining
- Edge case handling

### 3. Message Validation Tests (`tests/client/MessageValidation.test.ts`)
Tests the complex validation logic for messages:
- URL and email validation
- Interactive message validation
- Template component validation
- Header validation for different media types
- Contact data validation

### 4. Client Tests (`tests/client/Client.test.ts`)
Tests core client functionality:
- Client initialization and validation
- Webhook handler integration
- Message collection methods
- Business profile management
- Event emitter functionality

### 5. Error Handling Tests (`tests/errors/Messages.test.ts`)
Tests error handling and exception management:
- WhatsAppApiException creation and properties
- Error message mapping
- Error code handling
- Async error scenarios

## Testing Conventions

### Mock Usage
- Use mocks from `tests/mocks/index.ts` for consistent test data
- Mock external dependencies to isolate unit tests
- Use Jest's built-in mocking capabilities

### Test Naming
- Use descriptive test names that explain the scenario
- Group related tests using `describe` blocks
- Use `it` for individual test cases

### Assertions
- Use Jest's built-in matchers for consistency
- Test both positive and negative scenarios
- Include edge cases and error conditions

### Async Testing
- Use async/await for asynchronous operations
- Test timeout scenarios with `jest.useFakeTimers()`
- Verify promise resolution and rejection

## Test Data and Mocks

The `tests/mocks/index.ts` file provides utilities for creating consistent test data:

```typescript
// Create mock WhatsApp messages
const message = createMockWhatsAppMessage({ type: 'text' });

// Create mock interactive messages
const interactive = createMockInteractiveMessage('button');

// Create mock contact data
const contact = createMockContactData();
```

## Coverage Goals

Aim for high test coverage focusing on:
- Business logic and validation rules
- Error handling scenarios
- Edge cases and boundary conditions
- Public API methods and interfaces

## Adding New Tests

When adding features to the library:

1. Create corresponding test files in the appropriate directory
2. Follow existing naming conventions
3. Include both unit and integration test scenarios
4. Add mock data to `tests/mocks/index.ts` if needed
5. Update this guide if introducing new testing patterns

## Testing Best Practices

1. **Isolation**: Each test should be independent and not rely on other tests
2. **Clarity**: Tests should be easy to read and understand
3. **Completeness**: Cover happy paths, error cases, and edge conditions
4. **Performance**: Keep tests fast and efficient
5. **Maintainability**: Use helpers and utilities to reduce code duplication

## Continuous Integration

Tests are automatically run on:
- Pull request creation and updates
- Pushes to main branches
- Release preparation

All tests must pass before code can be merged.