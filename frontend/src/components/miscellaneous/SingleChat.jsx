import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ProfileModal from './ProfileModal';
import { ChatState } from '../../Context/chatProvider';
import {
  getSender,
  getSenderDetails,
  getSenderPic,
} from '../../config/ChatLogics';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import ScrollableChat from './ScrollableChat';
import '../../App.css';
// import { FaPaperPlane } from "react-icons/fa";
import axios from 'axios';
import '../../index.css';
import io from 'socket.io-client';
import Lottie from 'lottie-react';
import '../../animations/typing.json';

const ENDPOINT = 'http://localhost:5000';
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [joke, setJoke] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const toast = useToast();

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff > timerLength && typing) {
        socket.emit('stop typing', selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config,
      );
      setMessages(data);
      setLoading(false);
      console.log(messages);
      socket.emit('join chat', selectedChat._id);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Messages',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  const sendTheMessage = async (e) => {
    if (e.key === 'Enter' && newMessage) {
      socket.emit('stop typing', selectedChat._id);
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage('');
        const { data } = await axios.post(
          'http://localhost:5000/api/message',
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config,
        );
        console.log('data', data);
        setMessages([...messages, data]);

        socket.emit('new message', data);
      } catch (error) {
        toast({
          title: 'Error Occured!',
          description: 'Failed to send the Message',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-right',
        });
      }
    }
  };

  const fetchJoke = async () => {
    try {
      const response = await fetch(
        'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky?blacklistFlags=religious,racist,sexist',
      );
      const data = await response.json();
      console.log(data);
      const formattedJoke = `${data.setup}
                             ${data.delivery}`;
      setJoke(formattedJoke);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleClick = () => {
    fetchJoke();
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => {
      setSocketConnected(true);
    });
    socket.on('typing', () => {
      setIsTyping(true);
    });
    socket.on('stop typing', () => {
      setIsTyping(false);
    });
  });

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    fetchJoke();
  }, []);

  useEffect(() => {
    socket.on('message received', (newMessagReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id == newMessagReceived.chat._id
      ) {
        if (!notification.includes(newMessagReceived)) {
          setNotification([newMessagReceived, ...notification]);
          setFetchAgain(!fetchAgain);
          const storedNotifications =
            JSON.parse(localStorage.getItem('notifications')) || [];
          const updatedNotifications = [
            newMessagReceived,
            ...storedNotifications,
          ];
          localStorage.setItem(
            'notifications',
            JSON.stringify(updatedNotifications),
          );
        }
      } else {
        setMessages([...messages, newMessagReceived]);
      }
    });
  });

  //handleJoke();

  return (
    <div style={{ width: '100%' }}>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: '28px', md: '30px' }}
            py={3}
            px={2}
            width={{ base: '100%', md: '100%' }}
            fontFamily="Nunito Sans"
            display="flex"
            alignContent="center"
            alignItems="center"
            justifyContent={{ base: 'space-between', md: 'center' }}
            color="white"
            opacity="1"
            bgGradient="linear(to-l, gray.900, cyan.900)"
            zIndex={1}
          >
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              justifyContent="flex-start"
              alignItems="center"
              bgColor="transparent"
              icon={<ArrowBackIcon color="white" height="7" width="7" />}
              onClick={() => setSelectedChat('')}
            />
            {!selectedChat.isGroupChat ? (
              <Box
                width={{ base: '100%', md: '100%' }}
                p={2}
                display="flex"
                justifyContent="space-between"
                style={{ justifyContent: 'space-between' }}
              >
                <Box display="flex" px={2}>
                  <img
                    src={getSenderPic(user, selectedChat.users)}
                    style={{
                      height: '3rem',
                      width: '3rem',
                      borderRadius: '50%',
                      marginRight: 6,
                      paddingRight: '2',
                    }}
                  />
                  {getSender(user, selectedChat.users)}
                </Box>
                <ProfileModal
                  user={getSenderDetails(user, selectedChat.users)}
                />
              </Box>
            ) : (
              <Box display="flex" justifyContent="space-between" width="100%">
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </Box>
            )}
          </Text>
          {/* <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bgColor="transparent"
            backdropFilter="auto"
            backdropBlur="3px"
            border='2px'
            borderColor='blue.200'
            width={{ base: '100%', md: '100%' }}
            height={{ base: '83vh', md: '80vh' }}
            borderRadius="lg"
            overflowY="auto"
          > */}
          {loading ? (
            <Box>
              {' '}
              <Spinner
                color="white"
                position="absolute"
                top="50%"
                right="50%"
                h={20}
                w={20}
                size="lg"
                margin="auto"
                display="flex"
                justifyContent="center"
              />
            </Box>
          ) : (
            <div className="messages">
              {' '}
              <ScrollableChat messages={messages} />{' '}
            </div>
          )}
          <FormControl
            display="flex"
            justifyContent="space-between"
            flexDirection="row"
            position="absolute"
            bg="gray.600"
            borderRadius="0"
            bottom="0"
            left="0"
            right="0"
            p={2.2}
            my={0}
            alignItems="center"
            onKeyDown={sendTheMessage}
            isRequired
          >
            {isTyping ? (
              <div>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: typing,
                    rendererSettings: {
                      preserveAspectTatio: 'xMidYMid slice',
                    },
                  }}
                  width={70}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                />
              </div>
            ) : (
              <></>
            )}
            <Input
              variant="filled"
              bgColor="gray.600"
              color="white"
              borderRadius="0"
              border="0"
              placeholder="Click to start typing"
              onChange={typingHandler}
              value={newMessage}
              flex="1"
            />
            <IconButton
              icon={
                <i
                  className="fi fi-ss-paper-plane-top"
                  style={{ height: '9', width: '9' }}
                ></i>
              }
              color="gray.100"
              _hover={{ color: 'gray.900' }}
              alignItems="center"
              bgColor="transparent"
              aria-label="Send Message"
              onClick={sendTheMessage}
            />
          </FormControl>
          {/* </Box> */}
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Text
            pb={3}
            margin={6}
            marginTop={24}
            color="gray.100"
            fontSize="3xl"
            fontFamily="Nunito Sans"
          >
            <p className="animated" style={{ margin: 5 }}>
              {' '}
              Click on User to Start Chatting{' '}
            </p>
            {joke && (
              <Box
                onClick={handleClick}
                _hover={{ cursor: 'pointer' }}
                display="flex"
                fontSize="4xl"
                fontWeight="bold"
                fontFamily="Comic Neue"
                justifyContent="center"
                backdropFilter="auto"
                backdropBlur="3px"
                border="1px"
                borderColor="blue.200"
                borderRadius="2xl"
                padding={7}
                mt={36}
                mx={6}
              >
                {joke}
              </Box>
            )}
          </Text>
        </Box>
      )}
    </div>
  );
};

export default SingleChat;
