import { CloseIcon, InfoIcon, ViewIcon } from "@chakra-ui/icons";
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Text } from "@chakra-ui/react";
import React, { Children } from "react";
import { useState } from 'react';
//import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ProfileModal = ({user , children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            {children ? (
                <span onClick ={onOpen}> {children} </span>
                ) : (
                <IconButton bgColor='transparent' d={{base :"flex"}} icon={<InfoIcon height='7' width='7' color='gray.300' />} onClick={onOpen}></IconButton>
            )}

        <Modal isOpen={isOpen} onClose={onClose} isCentered >
        <ModalOverlay  />
        <ModalContent bgColor='gray.700' color='white' justifyContent='center' d='flex'>
          <ModalHeader>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody d='flex' flexDir='column' justifyContent='center' alignItems='center' style={{display:"flex" , justifyContent:"center", alignItems:"center" }} >
            <Image
            align='center'
            // src={user.pic}
            src = {`https://api.multiavatar.com/${user.name}.png`}
            borderRadius='full'
            alt={user.name}
            boxSize='150px'
            my='2'
            ></Image>
            <Text fontSize='1.2rem' >Email:{user.email} </Text><br/>
          </ModalBody>

          <ModalFooter
           fontSize='35px'
           justifyContent="center"
           d='flex'>
            <Button colorScheme='cyan' mr={0} onClick={onClose} px={4}>
              <CloseIcon h='15px' w='15px' mx={2} /> Close
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>

        </>
    )
}

export default ProfileModal
