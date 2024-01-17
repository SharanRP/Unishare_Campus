import React, { useEffect, useRef } from 'react';
import "../App.css"
import '../index.css'
import { Container , Box, Center , Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import LogIn from '../components/Authentication/LogIn';
import SignUp from '../components/Authentication/SignUp';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  let navigate = useNavigate()

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/features/chats")
  },[history])

  return (

      <Container maxW ='xL' centerContent zIndex='2'>
        <Box
        d='flex'
        justifyContent='center'
        p={3}
        width="50%"
        textAlign='center'
        m ='20px 0 15px 0'
        borderRadius= 'lg'
        borderWidth='1px'
        bg='transparent'
        >
           <Text fontSize='6xl' fontFamily='IBM Plex Serif' color='black' bgGradient='linear(to-l, #00ffff, #09ddef)' bgClip='text' fontWeight='extrabold'>UniHub</Text>
        </Box>
        <Box
        d='flex'
        justifyContent='center'
        p={5}
        color='white'
        width='50%'
        borderRadius= 'lg'
        borderWidth='1px'
        bg={'#8e8e93'}
        sx={{
        background: 'rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 32px 0 rgba(0, 100, 100, 0.5)',
        backdropFilter: 'blur(9.5px)',
        WebkitBackdropFilter: 'blur(9.5px)',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.18)',
      }}
        >
        <Tabs variant='soft-rounded' colorScheme='gray'>
            <TabList mb='1em'>
                <Tab width='50%'>Login</Tab>
                <Tab width='50%'>Sign Up</Tab>
            </TabList>
            <TabPanels>
                <TabPanel><LogIn/></TabPanel>
                <TabPanel><SignUp/></TabPanel>
            </TabPanels>
        </Tabs>

        </Box>
      </Container>
  );
}

export default HomePage;
