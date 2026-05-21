import { Suspense } from "react";
import ArtistsList from "@/components/lists/artistsList";
import AlbumsList from "@/components/lists/albumsList";
import ListSectionSkeleton from "@/components/skeletons/listSectionSkeleton";
import fetchFromSpotify from "@/utils/fetch";

const SEARCH_TYPES = ['album', 'artist', 'playlist', 'track'] as const;
const searchUrl = `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API_URL}/search`;

async function searchSpotify(query: string) {
  const params = { q: query, market: 'PL', limit: 10 };

  const combined = await fetchFromSpotify(searchUrl, {
    ...params,
    type: SEARCH_TYPES.join(','),
  });

  if (!combined.error) {
    return combined;
  }

  if (combined.error.status !== 502) {
    return combined;
  }

  const results = await Promise.all(
    SEARCH_TYPES.map((type) =>
      fetchFromSpotify(searchUrl, { ...params, type })
    )
  );

  const merged = {};
  let hasResults = false;
  let lastError = combined.error;

  for (const result of results) {
    if (result.error) {
      lastError = result.error;
      continue;
    }
    hasResults = true;
    Object.assign(merged, result);
  }

  if (!hasResults) {
    return { error: lastError };
  }

  return merged;
}

export default async function Search({ params }) {
  const { phrase } = params;
  const query = decodeURIComponent(phrase);
  const data = await searchSpotify(query);

  if (data?.error) {
    return (
      <p className="p-4 text-center">
        Search failed: {data.error.message ?? 'Please try again later.'}
      </p>
    );
  }

  return (
    <>
      <Suspense fallback={<ListSectionSkeleton itemsCount={7} />}>
        <AlbumsList data={data.albums} />
      </Suspense>
      <Suspense fallback={<ListSectionSkeleton itemsCount={7} />}>
        <ArtistsList data={data.artists} heading="Artists" />
      </Suspense>
      <Suspense fallback={<ListSectionSkeleton itemsCount={7} />}>
        <ArtistsList data={data.playlists} heading="Playlists" />
      </Suspense>
    </>
  );
}
