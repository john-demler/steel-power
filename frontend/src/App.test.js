import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./api/powerAPI', () => ({
  fetchPowerData: jest.fn().mockResolvedValue([])
}));

describe('App Component', () => {
  test('renders app title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Steel Industry Power Analysis/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders filter panel', () => {
    render(<App />);
    expect(screen.getByLabelText('From')).toBeInTheDocument();
    expect(screen.getByLabelText('To')).toBeInTheDocument();
    expect(screen.getByLabelText('Consumption Type')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
});
