'use client';
import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import CardArtist from "../cards/cardArtist";
import ListSectionLayout from "@/components/lists/listSectionLayout";

import 'swiper/scss';

interface ArtistsListProps {
  data: any,
  heading?: string
}

const ArtistsList: FC<ArtistsListProps> = ({
  data, heading
}) => {


  return (
    <ListSectionLayout heading={heading ?? `My top artists`}>
      <Swiper
          slidesPerView={'auto'}
          autoplay={false}
          spaceBetween={24}
        >
          { data.items.map((item, index) => {
            if (!item) return null;
            let image = '';
            
            if (item.images) {
              image = item.images?.length > 1 ? item.images[1].url : '';
            }

            return (
              <SwiperSlide key={index} className={'listSection__slide'}>
                <CardArtist image={image} name={item.name} uri={item.uri} id={item.id} />
              </SwiperSlide>
            )
          }) }
      </Swiper> 
    </ListSectionLayout>
  )
}

export default ArtistsList;