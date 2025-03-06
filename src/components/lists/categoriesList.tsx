'use client';
import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import CardArtist from "../cards/cardArtist";
import ListSectionLayout from "@/components/lists/listSectionLayout";

import 'swiper/scss';

interface CategoriesListProps {
  data: any,
}

const CategoriesList: FC<CategoriesListProps> = ({
  data
}) => {


  return (
    <ListSectionLayout heading={`Browse everything`}>
      <Swiper
          slidesPerView={'auto'}
          autoplay={false}
          spaceBetween={24}
        >
          { data.categories.items.map((item, index) => {
            return (
              <SwiperSlide key={index} className={'listSection__slide'}>
                <CardArtist image={item.icons[0].url} name={item.name} uri={`spotify:categories:${item.id}`} id={item.id} />
              </SwiperSlide>
            )
          }) }
      </Swiper> 
    </ListSectionLayout>
  )
}

export default CategoriesList;