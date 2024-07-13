'use client';
import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';

import CardArtist from "../cards/cardArtist";
import ListSectionLayout from "@/components/lists/listSectionLayout";

interface SavedTracksListProps {
  data: any,
}

const SavedTracksList: FC<SavedTracksListProps> = ({
  data
}) => {


  return (
    <ListSectionLayout heading={`Saved tracks`}>
      <Swiper
          slidesPerView={'auto'}
          autoplay={false}
        >
          { data.items.map((item, index) => {
            const { track } = item;

            return (
              <SwiperSlide key={index} className={'listSection__slide'}>
                <CardArtist image={track.album.images[0].url} name={track.name} uri={track.uri} id={track.id} />
              </SwiperSlide>
            )
          }) }
      </Swiper> 
    </ListSectionLayout>
  )
}

export default SavedTracksList;