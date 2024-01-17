import { InfoIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import UserBadge from "../userAvatar/UserBadge";
import UserListItem from "../userAvatar/UserListItem";
import axios from "axios";

const UpdateGroupChatModal= ({fetchAgain, setFetchAgain , fetchMessages}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading , setRenameLoading] = useState(false)
    const toast = useToast();
    const { user, selectedChat, setSelectedChat } = ChatState();

    const handleRem = async(userSel) => {
        if (selectedChat.groupAdmin._id !== user._id && userSel._id !== user._id) {
          toast({
            title: "Only admins can remove someone!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }

        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            `http://localhost:5000/api/chat/groupremove`,
            {
              chatId: selectedChat._id,
              userId: userSel._id,
            },
            config
          );

          userSel._id === user._id ? setSelectedChat() : setSelectedChat(data);
          setFetchAgain(!fetchAgain);
          fetchMessages()
          //fetchMessages();
          setLoading(false);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        }
        setGroupChatName("");
      };

    const handleAddUser = async (userSel) => {
        if (selectedChat.users.find((u) => u._id === userSel._id)) {
          toast({
            title: "User Already in group!",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
          return;
        }

        if (selectedChat.groupAdmin._id !== user._id) {
          toast({
            title: "Only admins can add someone!",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
          return;
        }

        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            `http://localhost:5000/api/chat/groupadd`,
            {
              chatId: selectedChat._id,
              userId: userSel._id,
            },
            config
          );

          setSelectedChat(data);
          setFetchAgain(!fetchAgain);
          setLoading(false);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        }
        setGroupChatName("");
      };


    const handleSearch = async (query) => {
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
          const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);
          console.log(data);
          setLoading(false);
          setSearchResult(data);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: "Failed to Load the Search Results",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
          setLoading(false);
        }
      };

    const handleRename = async() => {
        if(!groupChatName) return

        try {
            const config = {
                headers :{
                    Authorization:`Bearer ${user.token}`
                }
            }

            const {data} = await axios.put('http://localhost:5000/api/chat/rename' , {
                chatId: selectedChat._id,
                chatName: groupChatName
            } , config)

            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setRenameLoading(false)
        } catch (error) {
            toast({
                title: 'Error Occured.',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "bottom-right",
              })
              setRenameLoading(false)
              setGroupChatName("")
        }

    }


    return (
        <>
            <IconButton display='flex' justifyContent='center' bgColor='transparent' icon = {<InfoIcon color='gray.300' height='7' width='7' />} onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent  bgGradient='linear(to-r, gray.900, blue.900)' color='gray.100' >
                <ModalHeader>{selectedChat.chatName}</ModalHeader>
                <ModalCloseButton />
                <ModalBody p={2}>
                <Box w="100%" display="flex" flexWrap="wrap" >
              {selectedChat.users.map(userSelected => <HStack><UserBadge key = {userSelected._id} handleFunction={() => handleRem(userSelected)} userSelected={userSelected} /></HStack>)}
                </Box>
                <FormControl display='flex' mt={3} p={2} >
                <Input
                    placeholder="Chat Name"
                    mb={3}
                    onChange={(e) => setGroupChatName(e.target.value)}
                />
                <Button
                variant='solid'
                bgGradient='linear(to-l, cyan.200, cyan.300)'
                p={3}
                ml={3}
                isLoading={renameLoading}
                onClick={handleRename}>
                    Update
                </Button>
                </FormControl>
                <FormControl p={2}>
                <Input
                    placeholder="Add Users eg: Sharan .."
                    margin='auto'
                    onChange={(e) => handleSearch(e.target.value)}
                />
                </FormControl>
                {loading ? (
                <Spinner size="lg" color='gray.500' margin='auto' display='flex' justifyContent='center' />
                ) : (
                searchResult?.slice(0,4).map((user) => (
                    <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                    />
                ))
                )}
                </ModalBody>

                <ModalFooter >
                <Button bgGradient='linear(to-l, red.300, red.200)' mr='0px' onClick={() => handleRem(user)} >
                    Leave Group
                </Button>
                </ModalFooter>
            </ModalContent>
            </Modal>

        </>
    )
}

export default UpdateGroupChatModal
