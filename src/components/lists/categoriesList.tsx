'use client';
import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';

import CardArtist from "../cards/cardArtist";
import ListSectionLayout from "@/components/lists/listSectionLayout";

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
        >
          { data.categories.items.map((item, index) => {
            
            return (
              <SwiperSlide key={index} className={'listSection__slide'}>
                <CardArtist image={item.icons[0].url} name={item.name} url={item.href} />
              </SwiperSlide>
            )
          }) }
      </Swiper> 
    </ListSectionLayout>
  )
}

export default CategoriesList;