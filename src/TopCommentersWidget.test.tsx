import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import TopCommentersWidget from "./TopCommentersWidget";

// Mock the useTopCommentersWebSocket hook
vi.mock('./hooks/useTopCommentersWebSocket', () => {
  let _cache: { commenters: any[] };
  return {
    default: () => {
      if (!_cache) {
        _cache = {
          commenters: [
            { username: 'user1', displayName: 'User One', comments: 420, avatar: 'avatar1.png' },
            { username: 'user2', displayName: 'User Two', comments: 90, avatar: 'avatar2.png' },
            { username: 'user3', displayName: 'User Three', comments: 80, avatar: 'avatar3.png' },
          ]
        };
      }
      return _cache;
    }
  };
});

describe('TopCommentersWidget', () => {
  test('renders title', async () => {
    // Arrange
    const { getByRole } = render(<TopCommentersWidget />);

    // Assert
    await expect.element(getByRole('heading', { name: /top commenters/i })).toBeInTheDocument();
  });

  test('renders live indicator', async () => {
    // Arrange
    const { getByText } = render(<TopCommentersWidget />);

    // Assert
    await expect.element(getByText('LIVE')).toBeInTheDocument();
  });

  test('renders commenters count', async () => {
    // Arrange
    const { getByTestId } = render(<TopCommentersWidget />);

    // Assert
    await expect.element(getByTestId('commenters-count')).toBeInTheDocument();
  });

  test('renders correct number of CommenterCard components with mocked data', async () => {
    // Arrange

    const { getByRole } = render(<TopCommentersWidget />);
    const commenterCards = getByRole('listitem');

    // Assert
    expect(commenterCards.all()).toHaveLength(3); // Expect 3 mocked commenters

    // Verify content of each commenter card
    await expect.element(commenterCards.all()[0].getByText('user1')).toBeInTheDocument();
    await expect.element(commenterCards.all()[0].getByText('420')).toBeInTheDocument();

  });
});