import { Button, Tooltip , Text, Box, Spacer, MenuButton  , Menu, Avatar, MenuList, MenuItem, MenuDivider, useDisclosure, Drawer, DrawerOverlay, DrawerFooter, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerContent, Input, Spinner, Divider } from "@chakra-ui/react";
import { BellIcon , ChevronDownIcon, SearchIcon} from '@chakra-ui/icons'
import React, { useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import ChatLoading from "./ChatLoading";
import MailIcon from '@mui/icons-material/Mail';
import Lottie from 'lottie-react';
import axios from "axios";
import { Badge } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import UserListItem from "../userAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";
import octoAni from "../../animations/octoAni.json"

const SideDrawer = () => {

    let navigate = useNavigate()

    const [search , setSearch] = useState("")
    const [searchresult , setSearchResult] = useState([])
    const [loading , setLoading] = useState(false)
    const [loadingChat , setLoadingChat] = useState();

    const {user , selectedChat, setSelectedChat, chats , setChats , notification , setNotification } = ChatState()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const logOutHandler = () => {
        localStorage.removeItem('userInfo')
        navigate('/')
    }

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: octoAni,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    const handleSearch = async() => {
        if(!search)
        {
            toast({
                title: 'Please Enter something in search',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position:'bottom-right'
              })
        }

        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization : `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get(`http://localhost:5000/api/user?search=${search}`,config )
            setLoading(false)
            console.log(data)
            setSearchResult(data);
        } catch (error) {
            toast({
                title: 'Error Occured !',
                description:'Failed to load the search results',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position:'bottom-right'
              })
        }
    }

    const accessChat = async(userId)=> {

        try {
            setLoadingChat(true);
            const config = {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            };
            const { data } = await axios.post(`http://localhost:5000/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
          } catch (error) {
            toast({
              title: "Error fetching the chat",
              description: error.message,
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "bottom-left",
            });
          }
    }

    return (
        <>
        <Box
        d="flex"
        justifyContent='space-between'
        alignItems='center'
        bgGradient='linear(to-r, gray.900, blue.900)'
        w='100%'
        p='5px 10px 5px 10px'
        borderWidth='0px 0px 1px 0px'
        style = {{justifyContent:'space-between', display:'flex' , padding:'10px'}}
        >
            <Tooltip label ="Seach Users to chat" hasArrow placement="bottom-end" >
            <Button variant='ghost' borderWidth='1px' py='4px' onClick={onOpen}   _hover={{bgColor:'gray.600' , color:'gray.100'}} >
            <i className="fa fa-search" aria-hidden="true" color="gray-100" style={{color:"white"}} ></i>
            <Text display={{base:"none" , md:"flex" , lg:'flex'}} px={4} color='gray.100' >Search User</Text>
            </Button>
            </Tooltip>
            {/* <div style={{zIndex:5 , position:"absolute" , top:50}}>
            <Lottie
              options={defaultOptions}
              height={200}
              width={200}
            />
            </div> */}
            {/* <Spacer/> */}
            <Text fontSize='4xl' color='gray.200' fontFamily='Lobster Two' ><span style={{wordSpacing:20}}>UniHub</span></Text>
            <div >
                <Menu>
                    <MenuButton p={1} color='white'>
                    {/* <Badge content='5' placement="top-start"> */}
                    {/* <MailIcon color="action" style={{color:"white"}} h='25px' w='25px' /> */}
                      <BellIcon style={{color:"white"}} h='25px' w='25px' />
                    <sup style={{color:'#add8e6'}} >{notification.length>0 ? <div style={{borderRadius:'50%' , backgroundColor:'gray',height:'25px', width:'25px'}}>notification.length</div> : ''}</sup>
                    {/* </Badge> */}
                    </MenuButton>
                    <MenuList pl={2}>
                      {!notification.length && "No New Messages"}
                      {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
                    </MenuList>
                </Menu>
                <Menu px='4px' position='absolute' zIndex='10' >
                    <MenuButton p={1} mx={2} bgColor='gray.500' as={Button} rightIcon={<ChevronDownIcon/>}>
                    <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic} />
                    </MenuButton>
                 <MenuList>
                  <ProfileModal user={user}>
                  <MenuItem>My Profile</MenuItem>
                  </ProfileModal>
                    <MenuDivider/>
                    <MenuItem onClick={logOutHandler}>LogOut</MenuItem>
                 </MenuList>
                </Menu>
            </div>
        </Box>

        <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        >
        <DrawerOverlay  />
        <DrawerContent bgGradient='linear(to-r, gray.900, blue.900)'>
          <DrawerCloseButton style={{color:"white"}} />
          <DrawerHeader color='white' fontSize='1.4rem' >SeachBar</DrawerHeader>

          <DrawerBody>
            <Box
            display='flex'
            pb='2'
            >
            <Input placeholder='Search...' color='gray.100' style={{}} value={search} onChange={(e) => {setSearch(e.target.value)}} />
            <Button variant='outline' mx={2} onClick={handleSearch}><SearchIcon style={{color:'white'}} /></Button>

            </Box>
            {loading ? (
                <ChatLoading />
            ): (
                searchresult?.map((user)=>(
                    <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={()=>accessChat(user._id)}
                    >
                    <Divider />
                    </UserListItem>
                ))
            )}
            {loadingChat && <Spinner ml= 'auto' display='flex' justifyContent='center' alignItems='center' margin='auto' color='gray.500'/>}
          </DrawerBody>
        </DrawerContent>
        </Drawer>
        </>
    )
}

export default SideDrawer
