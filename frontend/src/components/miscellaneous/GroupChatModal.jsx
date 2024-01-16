import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Input, Spinner, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import axios from "axios";
import UserListItem from "../userAvatar/UserListItem";
import UserBadge from "../userAvatar/UserBadge";

const GroupChatModal = ({children}) =>{

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [groupChatName , setGroupChatName] = useState()
    const [selectedUsers , setSelectedUsers] = useState([])
    const [search , setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([]);
    //const [state , setState] = useState()
    const [loading , setLoading] = useState(false)

    const toast = useToast()

    const {user ,selectedChat , setSelectedChat, chats , setChats } = ChatState()

    const handleSearch = async(query) => {
        setSearch(query);
        if (!query) {
          return;
        }
    
        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.get(`/api/user?search=${search}`, config);
          console.log(data);
          setLoading(false);
          setSearchResult(data);
        }
        catch(error)
        {
            toast({
                title: 'Could not Add',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position:'bottom-right'
              })
        }
    }

    const handleDelete = (userSelected) => {

        setSelectedUsers(selectedUsers.filter((selected) => selected._id !==userSelected._id))

    }

    const handleSubmit = async() => {
        if(!groupChatName && !selectedUsers)
        {
            toast({
                title: 'Pleases Fill all the Fields',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position:'bottom-right'
              })
            return;  
        }

        try {

            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              };
            const {data} = await axios.post('/api/chat/group' , { name : groupChatName , users : JSON.stringify(selectedUsers.map((su)=> su._id))} , config)  

            setChats([data , ...chats])
            onClose()
            toast({
                title: 'Chat created',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:'bottom-right'
              })
            
        } catch (error) {

            toast({
                title: 'Could not Create',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position:'bottom-right'
              })
            
        }
    }

    const handleGroup = (add) => {

        if(selectedUsers.includes(add))
        {
            toast({
                title: 'User already selected',
                status: 'info',
                duration: 3000,
                isClosable: true,
                position:'bottom-right'
              })
              return
        }
            setSelectedUsers([...selectedUsers , add])
    }

    const isError = groupChatName === ''

    return (
        <>
          <span onClick={onOpen}>{children}</span>
    
          <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent bgGradient='linear(to-r, gray.900, blue.900)'>
              <ModalHeader
              fontSize="35px"
              fontFamily='Nunito Sans'
              display='flex'
              justifyContent='center'
              color='white'
              >Create Group Chat</ModalHeader>
              <ModalCloseButton />
              <ModalBody
              display ='flex'
              flexDir='column'
              alignItems='center'
              color='gray.100'
              >
                <FormControl isInvalid={isError}>
                <FormLabel>Group Name</FormLabel>
                <Input type='text' value={groupChatName} onChange={ (e) => setGroupChatName(e.target.value)} />
                </FormControl>
                <FormControl>
                <FormLabel>Members</FormLabel>
                <Input type='text' onChange={(e) => handleSearch(e.target.value)} />
                
                </FormControl>
                <Box width='100%' flexWrap='wrap' display='flex' mt={4}>
                {selectedUsers.map(userSelected => <HStack><UserBadge key = {userSelected._id} handleFunction={() => handleDelete(userSelected)} userSelected={userSelected} /></HStack>)}
                {loading ? <Spinner mt='3' p='2'></Spinner>
                : searchResult?.slice(0 , 4).map(user => <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />)}
                </Box>
              </ModalBody>
    
              <ModalFooter>
                <Button bgGradient='linear(to-l, cyan.300, cyan.500)' mr={3} onClick={handleSubmit}>
                  Create Chat
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
    )

}

export default GroupChatModal;