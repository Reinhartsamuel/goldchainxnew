'use client'

import React, { ReactElement, RefObject, useEffect, useRef, useState } from 'react'
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Image,
} from '@chakra-ui/react'
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
// And react-slick as our Carousel Lib
import Slider from 'react-slick'
import { getCollectionFirebaseV2 } from '@/apis/firebaseApi'

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendDots: (dots : ReactElement) => <ul>{dots}</ul>,
}

interface CardProps {
  title: string
  text: string
  image: string
}

interface CaptionCarouselProps { }
export default function FrontBanner() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null)
  const [cards, setCards] = useState([]);


  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '1%', md: '50%' })
  const side = useBreakpointValue({ base: '30%', md: '40px' })

  const getCards = async () => {
    try {
      const res: any = await getCollectionFirebaseV2('banners', [], { field: 'createdAt', direction: 'desc' });
      setCards(res[0]?.images)
    } catch (error: Error | any) {
      console.log(error.message, '')
    }
  }
  useEffect(() => { getCards() }, [])
  return (
    <>
      <Box
        // position={'relative'} borderRadius={'xl'} width={'full'} overflow={'hidden'}
        boxShadow={' 1px 1px 200px gray'}>
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <Slider {...settings}>
          {cards?.map((card, index) => (
            <Image key={index} src={card} width={'full'} alt={`url(${card})`} borderRadius={'lg'} />
          ))}
        </Slider>
      </Box>
    </>
  )
}