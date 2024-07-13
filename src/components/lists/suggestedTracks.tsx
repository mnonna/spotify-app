'use client';
import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';

import CardArtist from "../cards/cardArtist";
import ListSectionLayout from "@/components/lists/listSectionLayout";

interface SuggestedTracksListProps {
  data: any,
}

const SuggestedTracksList: FC<SuggestedTracksListProps> = ({
  data
}) => {
  return (
    <ListSectionLayout heading={data.message}>
      <Swiper
          slidesPerView={'auto'}
          autoplay={false}
        >
          { data.playlists.items.map((item, index) => {
            
            return (
              <SwiperSlide key={index} className={'listSection__slide'}>
                <CardArtist image={item.images[0].url} name={item.name} uri={item.uri} id={item.id} />
              </SwiperSlide>
            )
          }) }
      </Swiper> 
    </ListSectionLayout>
  )
}

export default SuggestedTracksList;