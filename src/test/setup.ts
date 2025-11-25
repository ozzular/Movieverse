/**
 * Vitest setup file
 * Global test configuration and utilities
 */

import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock environment variables for tests
process.env.VITE_TMDB_API_KEY = "test-api-key-123";
// Supabase removed; no Supabase env vars required for tests

// Mock fetch for tests
global.fetch = vi.fn();

// Add custom matchers if needed
expect.extend({});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
