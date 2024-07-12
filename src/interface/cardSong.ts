interface iCardSongArtist {
  id: number | string,
  name: string,
}

export interface iCardSongProps {
  image: string,
  name: string,
  artists?: Array<iCardSongArtist>
}