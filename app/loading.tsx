'use client'
import { Heading, Spinner, Stack } from "@chakra-ui/react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Stack
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      w='full' h='100vh'>
        <Spinner color='gray' size='md' />
    </Stack>
  )
}