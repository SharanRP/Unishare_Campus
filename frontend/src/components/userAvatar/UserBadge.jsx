import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadge = ({userSelected , handleFunction }) => {

    return (
        <Box
        p='2'
        m={1}
        borderRadius='2xl'
        style ={{ backgroundColor: '#4d5dfb' ,  backgroundImage: 'linear-gradient(315deg, #4d5dfb 0%, #08c8f6 74%)'}}
        color='gray.800'
        fontSize={{ base: 'xs', md: 'sm' }}
        variant='solid'
        cursor='pointer'
        fontStyle='italic'
        fontWeight='bold'
        onClick = {handleFunction}
        >
        {userSelected.name}
        <CloseIcon pl='2' height='5' width='5' />
        </Box>
    )

}

export default UserBadge