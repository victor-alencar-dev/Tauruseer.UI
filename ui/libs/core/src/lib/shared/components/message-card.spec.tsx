import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MessageCard } from './message-card.component';

describe('Message card', () => {
  test('should render with empty props', () => {
    const { container } = render(<MessageCard title="" />);
    expect(container).toBeEmptyDOMElement();
  });

  test('should render with title', () => {
    render(<MessageCard title="Test title" />);
    expect(screen.getByText('Test title')).toBeInTheDocument();
  });

  test('should render with title and message', () => {
    render(<MessageCard title="Test title" message="Test message" />);
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  test('should render with title, message and button', () => {
    render(
      <MessageCard
        title="Test title"
        message="Test message"
        button={{ label: 'Test button', onClick: () => {} }}
      />,
    );
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByText('Test button')).toBeInTheDocument();
  });

  test('should render with title, message and icon', () => {
    render(<MessageCard title="Test title" message="Test message" icon="fa-rocket" />);
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByTitle('Test title')).toBeInTheDocument();
  });

  test('should render with title, message, and button with icon', () => {
    render(
      <MessageCard
        title="Test title"
        message="Test message"
        button={{ label: 'Test button', onClick: () => {}, icon: 'fa-rocket' }}
      />,
    );
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByText('Test button')).toBeInTheDocument();
    expect(screen.getByTitle('Test button')).toBeInTheDocument();
  });

  test('function should be invoked when button is clicked', () => {
    const mockFunction = jest.fn();
    render(
      <MessageCard
        title="Test title"
        message="Test message"
        button={{ label: 'Test button', onClick: mockFunction }}
      />,
    );
    screen.getByText('Test button').click();
    expect(mockFunction).toHaveBeenCalled();
  });
});
