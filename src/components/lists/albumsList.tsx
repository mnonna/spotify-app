'use client';
import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import CardArtist from "../cards/cardArtist";

import ListSectionLayout from "@/components/lists/listSectionLayout";
import 'swiper/scss';

interface AlbumsListProps {
  data: any,
  heading?: string
}

const AlbumsList: FC<AlbumsListProps> = ({
  data, heading
}) => {


  return (
    <ListSectionLayout heading={heading ?? 'Albums'}>
      <Swiper
          slidesPerView={'auto'}
          autoplay={false}
          spaceBetween={24}
        >
          { data.items.map((item, index) => {
            return (
              <SwiperSlide key={index} className={'listSection__slide'}>
                <CardArtist image={item.images[1].url} name={item.name} uri={item.uri} id={item.id} />
              </SwiperSlide>
            )
          }) }
      </Swiper> 
    </ListSectionLayout>
  )
}

export default AlbumsList;