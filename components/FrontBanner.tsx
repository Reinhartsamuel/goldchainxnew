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
    <Box position={'relative'} height={'600px'} width={'full'} overflow={'hidden'}>
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
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        // transform={'translate(0%, -50%)'}
        zIndex={2}
        color={'white'}
        // opacity={0.3}
        _hover={{
          backgroundColor: '#00000000',
          transform: 'scale(1.1)',
          // transition : 'ease-in'
        }}
        _active={{
          transform: 'scale(1.5)',
          // transition : 'ease-in'
        }}
        onClick={() => slider?.slickPrev()}>
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        // transform={'translate(0%, -50%)'}
        zIndex={2}
        color={'white'}
        // opacity={0.3}
        _hover={{
          backgroundColor: '#00000000',
          transform: 'scale(1.1)',
          // transition : 'ease-in'
        }}
        _active={{
          transform: 'scale(1.5)',
          // transition : 'ease-in'
        }}
        onClick={() => slider?.slickNext()}>
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings}>
        {cards?.map((card, index) => (
          <Box
            key={index}
            height={'sm'}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="contain"
            backgroundImage={`url(${card})`}>
            {/* This is the block you need to change, to customize the caption */}
            <Container size="container.lg" height="600px" position="relative">
              <Stack
                spacing={6}
                w={'full'}
                maxW={'lg'}
                position="absolute"
                top="50%"
                transform="translate(0, -50%)">
                {/* <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                  {card.title}
                </Heading>
                <Text fontSize={{ base: 'md', lg: 'lg' }} color="GrayText">
                  {card.text}
                </Text> */}
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  )
}