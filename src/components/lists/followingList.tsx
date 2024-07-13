'use client';
import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';

import CardArtist from "../cards/cardArtist";
import ListSectionLayout from "@/components/lists/listSectionLayout";

interface FollowingListProps {
  data: any,
}

const FollowingList: FC<FollowingListProps> = ({
  data
}) => {


  return (
    <ListSectionLayout heading={`Followed artists`}>
      <Swiper
          slidesPerView={'auto'}
          autoplay={false}
        >
          { data.artists.items.map((item, index) => {
            
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

export default FollowingList;