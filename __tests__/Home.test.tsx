import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Deploy Now/i);
  expect(linkElement).toBeInTheDocument();
});
