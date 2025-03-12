'use client';
import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import CardArtist from "../cards/cardArtist";
import ListSectionLayout from "@/components/lists/listSectionLayout";
import 'swiper/scss';

interface SavedTracksListProps {
  data: any,
}

const SavedTracksList: FC<SavedTracksListProps> = ({
  data
}) => {


  return (
    <ListSectionLayout heading={`Saved tracks`}>
      { data && data.items !== undefined ? 
        <Swiper
            slidesPerView={'auto'}
            autoplay={false}
            spaceBetween={24}
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
        : null
      } 
    </ListSectionLayout>
  )
}

export default SavedTracksList;