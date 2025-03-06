import { Suspense } from "react";
import fetchFromSpotify from "@/utils/fetch";
import SavedPlaylistsList from "./savedPlaylistList";

export default async function LibraryWidget() {
    const data = await fetchFromSpotify(`${process.env.SPOTIFY_BASE_API_URL}/me/playlists`, {
        locale: 'en_GB',
        limit: 10
    });

    return (
        <SavedPlaylistsList data={data} heading="Library"/>
    )
}