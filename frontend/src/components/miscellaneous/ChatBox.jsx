import React from "react";
import { ChatState } from "../../Context/chatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";
import DarkImage from '../../Images/Dark.jpg'

const ChatBox = ({fetchAgain , setFetchAgain}) => {

    const {user ,selectedChat , setSelectedChat, chats , setChats } = ChatState()

    return (
        <Box
        display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        alignItems="center"
        flexDir="column"
        position='absolute'
        right='2'
        //right='0'
       // p = {1}
        my={2}
        mx={0}
      //  bgColor='black'
        w={{ base: "97%", md: "68%" }}
        borderWidth="1px"
        height='89vh'
        zIndex={2}
        >
       <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        backdropFilter="auto" 
        backdropBlur="3px"
        style={{
            backgroundImage: `url(${DarkImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            //backdropFilter: "auto",
            // WebkitBackdropFilter: 'blur(10px)',
            // backdropFilter: 'blur(10px)',
            opacity: 0.8,
            zIndex:1
        }}
    />
        <Box style={{zIndex:1 ,padding:0 , width:'100%'}}  >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
        </Box>
    )
}

export default ChatBox