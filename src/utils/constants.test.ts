import { describe, expect, test } from 'vitest';
import { RANK_ICONS } from './constants';

describe('RANK_ICONS', () => {
  test('should be an object', () => {
    expect(typeof RANK_ICONS).toBe('object');
    expect(RANK_ICONS).not.toBeNull();
  });

  test('should contain correct icons for ranks 1, 2, and 3', () => {
    expect(RANK_ICONS[1]).toBe('🥇');
    expect(RANK_ICONS[2]).toBe('🥈');
    expect(RANK_ICONS[3]).toBe('🥉');
  });
});
