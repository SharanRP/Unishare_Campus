import { Stack } from "@chakra-ui/react";
import React from "react";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const ChatLoading = ()=> {
    return (
        <Stack>
        <Skeleton height='45px' style={{borderRadius:'4px'}} />
        <Skeleton height='45px' style={{borderRadius:'4px'}} />
        <Skeleton height='45px' style={{borderRadius:'4px'}} />
        <Skeleton height='45px' style={{borderRadius:'4px'}} />
        <Skeleton height='45px' style={{borderRadius:'4px'}} />
        <Skeleton height='45px' style={{borderRadius:'4px'}} />
        <Skeleton height='45px' style={{borderRadius:'4px'}} />
        <Skeleton height='45px' style={{borderRadius:'4px'}} />
        <Skeleton height='45px' style={{borderRadius:'4px'}} />
        <Skeleton height='45px' style={{borderRadius:'4px'}} />
        <Skeleton height='45px' style={{borderRadius:'4px'}} />
        <Skeleton height='45px' style={{borderRadius:'4px'}} />
        </Stack>
    )
}

export default ChatLoading