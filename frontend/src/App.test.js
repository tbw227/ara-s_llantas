import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from '../App';
import { LanguageProvider } from '../context/LanguageContext';

// Mock the API service
jest.mock('../services/api', () => ({
  getTires: jest.fn(() => Promise.resolve({
    success: true,
    data: []
  })),
  submitContact: jest.fn(() => Promise.resolve({
    success: true,
    data: { id: 1 }
  }))
}));

// Mock the toast hook
jest.mock('../hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

const renderWithProviders = (component) => {
  return render(
    <LanguageProvider>
      {component}
    </LanguageProvider>
  );
};

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/ara's llantas/i)).toBeInTheDocument();
  });

  it('displays header', () => {
    renderWithProviders(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});





