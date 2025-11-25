/**
 * Unit tests for apiClient.ts
 * Tests for API client utilities and error handling
 *
 * @vitest tests for TMDB API client functions
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  findTrailer,
  getDirectorsFromCrew,
  buildImageUrl,
  buildBackdropUrl,
} from "@/services/apiClient";

describe("apiClient", () => {
  describe("findTrailer", () => {
    it("should find a YouTube trailer from videos array", () => {
      const videos = [
        { type: "Teaser", site: "YouTube", key: "teaser123" },
        { type: "Trailer", site: "YouTube", key: "trailer123" },
        { type: "Clip", site: "YouTube", key: "clip123" },
      ];

      const trailer = findTrailer(videos);

      expect(trailer).toBeDefined();
      expect(trailer?.key).toBe("trailer123");
      expect(trailer?.type).toBe("Trailer");
    });

    it("should return undefined if no YouTube trailer found", () => {
      const videos = [
        { type: "Teaser", site: "Vimeo", key: "teaser123" },
        { type: "Clip", site: "YouTube", key: "clip123" },
      ];

      const trailer = findTrailer(videos);

      expect(trailer).toBeUndefined();
    });

    it("should handle empty videos array", () => {
      const videos: any[] = [];

      const trailer = findTrailer(videos);

      expect(trailer).toBeUndefined();
    });
  });

  describe("getDirectorsFromCrew", () => {
    it("should extract all directors from crew array", () => {
      const crew = [
        { id: 1, name: "Director One", job: "Director" },
        { id: 2, name: "Screenwriter", job: "Screenplay" },
        { id: 3, name: "Director Two", job: "Director" },
        { id: 4, name: "Cinematographer", job: "Director of Photography" },
      ];

      const directors = getDirectorsFromCrew(crew);

      expect(directors).toHaveLength(2);
      expect(directors[0].name).toBe("Director One");
      expect(directors[1].name).toBe("Director Two");
    });

    it("should return empty array if no directors found", () => {
      const crew = [
        { id: 1, name: "Screenwriter", job: "Screenplay" },
        { id: 2, name: "Cinematographer", job: "Director of Photography" },
      ];

      const directors = getDirectorsFromCrew(crew);

      expect(directors).toHaveLength(0);
    });

    it("should handle empty crew array", () => {
      const crew: any[] = [];

      const directors = getDirectorsFromCrew(crew);

      expect(directors).toHaveLength(0);
    });
  });

  describe("buildImageUrl", () => {
    it("should build correct image URL with default size", () => {
      const path = "/kqjL17yufvn9OVLyXYpvtf8awrk.jpg";

      const url = buildImageUrl(path);

      expect(url).toBe(
        "https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtf8awrk.jpg",
      );
    });

    it("should build correct image URL with custom size", () => {
      const path = "/kqjL17yufvn9OVLyXYpvtf8awrk.jpg";

      const url = buildImageUrl(path, "w780");

      expect(url).toBe(
        "https://image.tmdb.org/t/p/w780/kqjL17yufvn9OVLyXYpvtf8awrk.jpg",
      );
    });

    it("should build URL with original size", () => {
      const path = "/kqjL17yufvn9OVLyXYpvtf8awrk.jpg";

      const url = buildImageUrl(path, "original");

      expect(url).toBe(
        "https://image.tmdb.org/t/p/original/kqjL17yufvn9OVLyXYpvtf8awrk.jpg",
      );
    });
  });

  describe("buildBackdropUrl", () => {
    it("should build correct backdrop URL with default size", () => {
      const path = "/3ihrbqWmYwn6fquoW2V3HZFEX3h.jpg";

      const url = buildBackdropUrl(path);

      expect(url).toBe(
        "https://image.tmdb.org/t/p/original/3ihrbqWmYwn6fquoW2V3HZFEX3h.jpg",
      );
    });

    it("should build correct backdrop URL with custom size", () => {
      const path = "/3ihrbqWmYwn6fquoW2V3HZFEX3h.jpg";

      const url = buildBackdropUrl(path, "w1280");

      expect(url).toBe(
        "https://image.tmdb.org/t/p/w1280/3ihrbqWmYwn6fquoW2V3HZFEX3h.jpg",
      );
    });
  });
});
