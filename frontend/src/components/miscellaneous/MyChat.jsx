import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import { Box, Button, Divider, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import { getSender ,getSenderPic } from "../../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./GroupChatModal";
import MyChatBg from '../../Images/MyChatBg.png'

const MyChat = ({fetchAgain}) => {
    const [loggedUser , setLoggedUser] =useState()
    const {user ,selectedChat , setSelectedChat, chats , setChats } = ChatState()

    const toast = useToast();


    const fetchChats = async()=> {

        try {
            const config = {
                headers: {
                    Authorization : `Bearer ${user.token}`,
                },
            };
    
            const {data} = await axios.get('/api/chat' ,config )
            setChats(data)
            console.log(data);
        } catch (error) {
            toast({
                title: 'Error Occured !',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position:'bottom-right'
              })
        }

    }

    useEffect(()=>{
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
        fetchChats()
    },[fetchAgain])

    return (
        <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        position='absolute'
        top='0'
      //  style={{ display: selectedChat ? 'none' : 'flex', '@media (min-width: 48em)': { display: 'flex' } }}
        flexDir='column'
        alignItems='center'
        p={3}
        mx='0'
        bgGradient='linear(to-r, gray.900, #1B1D38)'
        w={{ base: "100%", md: "31%" }}
        borderWidth='0px 1px 0px 0px'
        style={{overflow: 'hidden',
            // backgroundImage: `url(${MyChatBg})`,
            // backgroundPosition: 'center',
            // backgroundSize: 'cover',
            // backgroundRepeat: 'no-repeat',
            // opacity:0.2,
            // position:'absolute',
            // zIndex:5
            }}
        
        >
        <Box
        pb={0}
        pt={2}
        mb={4}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
       // overflow='auto'
        color='gray.100'
        justifyContent="space-between"
        alignItems="center"
      >
        <Text  fontSize={{ base: "22px", md: "22px", lg: "32px" }} fontFamily='Nunito Sans' ml='5' >My Chats</Text>
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "17px", lg: "20px" }}
            rightIcon={<AddIcon />}
          >
            <Text  fontSize={{ base: "12px", md: "12px", lg: "15px" }} display={{ base: 'none', md: 'none', lg: 'flex' }}>New Group Chat</Text>
          </Button>
          </GroupChatModal>

        </Box>
        <Divider/>
        <Box
        d="flex"
        flexDir="column"
        p={3}
        mt={2}
        mb={0}
        bottom="0"
        bgGradient='linear(to-r, gray.900, #1B1D38)'
        w="100%"
        h="77vh"
        borderRadius="lg"
        overflowY="hidden"
        style={{
             backgroundImage: `url(${MyChatBg})`,
             backgroundPosition: 'center',
             backgroundSize: 'cover',
             backgroundRepeat: 'no-repeat',

        }}

        >
            {
                chats ?(

                    <Stack overflowY='scroll'  height='77vh' >
                    {chats.map((chat) => (
                    <Box
                        onClick={() => setSelectedChat(chat)}
                        cursor="pointer"
                        bg={selectedChat === chat ? "gray.700" : "bgGradient='linear(to-r, gray.700, #1B1D38)'"}
                        color={selectedChat === chat ? "white" : "gray.100"}
                        px={3}
                        py={2}
                        borderRadius="0"
                        key={chat._id}
                        borderWidth='0px 0px 0px 0px'
                    >       
                        <Text>
                        {!chat.isGroupChat ? (
                            <div style={{ display: 'flex', alignItems: 'start'  }}>
                            <img
                                src={getSenderPic(loggedUser, chat.users)}
                                alt="User Profile"
                                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '6px' }}
                            />
                            <span style={{ marginLeft: '4px' }}>{getSender(loggedUser, chat.users)}
                            {chat.latestMessage && (
                        <Text fontSize="xs" py={1} >
                            <b>{chat.latestMessage.sender.name} : </b>
                            {chat.latestMessage.content.length > 50
                            ? chat.latestMessage.content.substring(0, 51) + "..."
                            : chat.latestMessage.content}
                        </Text>
                        )}</span>
                            
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems:'start' }}>
                            <img
                                src={`https://api.multiavatar.com/${chat.chatName}.png`}
                                alt="Group Chat Profile"
                                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '6px' }}
                            />
                            <Box>{chat.chatName}
                        </Box>
                            </div>
                        )}
</Text>

                    </Box>
                    ))}
                    </Stack>

                ):(
                    <ChatLoading/>
                )
            }
        </Box>
        
        </Box>
    )
}

export default MyChat