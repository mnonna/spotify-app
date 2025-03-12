'use client';
import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import CardArtist from "../cards/cardArtist";
import ListSectionLayout from "@/components/lists/listSectionLayout";

import 'swiper/scss';

interface savedPlaylistsSliderProps {
  data: any,
  heading?: string
}

const SavedPlaylistsSlider: FC<savedPlaylistsSliderProps> = ({
  data, heading
}) => {
  return (
    <ListSectionLayout heading={heading ?? 'Saved Playlists'}>
      { data && data.items !== undefined ? 
        <Swiper
          slidesPerView={'auto'}
          autoplay={false}
          spaceBetween={24}
        >
          { data.items.map((item, index) => {
            const cardImage = (item.images) ? item.images[0].url : '';
            
            return (
              <SwiperSlide key={index} className={'listSection__slide'}>
                <CardArtist image={cardImage} name={item.name} uri={item.uri} id={item.id} />
              </SwiperSlide>
            )
          }) }
        </Swiper>
        : null 
      } 
    </ListSectionLayout>
  )
}

export default SavedPlaylistsSlider;