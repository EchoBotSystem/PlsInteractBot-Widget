import { describe, expect, test } from 'vitest';
import { getRankIcon } from './functions';

describe('getRankIcon', () => {
  test('returns correct icon for rank 1', () => {
    // Arrange
    const rank = 1;
    // Act
    const icon = getRankIcon(rank);
    // Assert
    expect(icon).toBe('🥇');
  });

  test('returns correct icon for rank 2', () => {
    // Arrange
    const rank = 2;
    // Act
    const icon = getRankIcon(rank);
    // Assert
    expect(icon).toBe('🥈');
  });

  test('returns correct icon for rank 3', () => {
    // Arrange
    const rank = 3;
    // Act
    const icon = getRankIcon(rank);
    // Assert
    expect(icon).toBe('🥉');
  });

  test('returns rank as string for other ranks', () => {
    // Arrange
    const rank = 4;
    // Act
    const icon = getRankIcon(rank);
    // Assert
    expect(icon).toBe('4');
  });

  test('returns rank as string for rank 0', () => {
    // Arrange
    const rank = 0;
    // Act
    const icon = getRankIcon(rank);
    // Assert
    expect(icon).toBe('0');
  });
});
