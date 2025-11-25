import axios from "axios";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { tmdbApi } from "../tmdbApi";

vi.mock("axios");

describe("TMDb API wrapper", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("uses discover+watch_region for NG trending", async () => {
    (axios.get as unknown as vi.Mock).mockResolvedValue({
      data: { results: [{ id: 1 }] },
    });

    const results = await tmdbApi.getTrendingMovies("NG");

    expect(axios.get).toHaveBeenCalled();
    const calledUrl = (axios.get as unknown as vi.Mock).mock.calls[0][0];
    // Ensure discover endpoint used for NG
    expect(calledUrl).toContain("/discover/movie");
    expect(calledUrl).toContain("watch_region=NG");
    expect(results).toEqual([{ id: 1 }]);
  });

  it("falls back to trending endpoint for non-NG region", async () => {
    (axios.get as unknown as vi.Mock).mockResolvedValue({
      data: { results: [{ id: 2 }] },
    });

    const results = await tmdbApi.getTrendingMovies("US");

    expect(axios.get).toHaveBeenCalled();
    const calledUrl = (axios.get as unknown as vi.Mock).mock.calls[0][0];
    expect(calledUrl).toContain("/trending/movie/week");
    expect(results).toEqual([{ id: 2 }]);
  });
});
