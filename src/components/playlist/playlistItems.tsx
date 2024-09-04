'use client';
import CardPlaylistSong from '../cards/cardPlaylistSong';
import '@/scss/playlist/playlistItems.scss';

export default function PlaylistItems({uri, tracks}) {
  return (
    <section className="playlistItems">
      {tracks.map((item, index) => {
        const { track } = item;
        
        const cardProps = {
          name: track.name,
          album: track.album,
          artists: track.artists,
          duration_ms: track.duration_ms,
          uri: track.uri,
          playlist_uri: uri,
          offset: index,
          list_index: index + 1,
        }

        return (
          <div key={index} className="playlistItems__item">
            <CardPlaylistSong {...cardProps}></CardPlaylistSong>
          </div>
        )
      })}
    </section>
  )
}