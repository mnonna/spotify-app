'use client';

import { memo } from 'react';
import CardSong from "../cards/cardSong";
import { iCardSongProps } from '@/interface/cardSong';

const PlayerCurrPlaying = memo((props: iCardSongProps) => {
  const { name, image, artists } = props;

  return (
    <CardSong image={image} name={name} artists={artists} />
  )
})

export default PlayerCurrPlaying;