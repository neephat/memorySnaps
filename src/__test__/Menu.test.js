import { render, screen } from '@testing-library/react';
import Gallery from '../components/body/Gallery';

test('renders learn react link', () => {
  render(<Gallery />);
  const linkElement = screen.getByText(/Image/i);
  expect(linkElement).toBeInTheDocument();
});

