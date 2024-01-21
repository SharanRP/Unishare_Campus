import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = ()=> {

    const [show , setShow] = useState(false)
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [pic , setPic] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [loading , setLoading] = useState(false)
    let navigate = useNavigate()

    const toast = useToast()

    const handleClick = () => {setShow(!show)}

    const postDetails = (pic) => {
        setLoading(true)
        if(pic === undefined)
        {
            toast({
                title: 'Pleae select an image',
                description: "We've created your account for you.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position:"bottom-right"
              })
              return;
        }

        if(pic.type === 'image/jpeg' || pic.type === 'image/png')
        {
            // const data = new FormData();
            // data.append("file", pic);
            // data.append('upload_preset', 'unihub');
            // data.append('cloud_name', 'didqtu1fe');
            // fetch('https://api.cloudinary.com/v1_1/didqtu1fe/image/upload', {
            //   method: 'post',
            //   body: data,
            // })
            //   .then((res) => res.json()) // Corrected method to parse JSON
            //   .then((responseData) => {
            //     setPic(responseData.url.toString());
            //     console.log(responseData.url.toString());
            //     setLoading(false);
            //   })
            //   .catch((err) => {
            //     console.error(err);
            //     setLoading(false);
            //   });

            const data = new FormData();
            data.append("file", pic);
            data.append('upload_preset', 'unihub');
            data.append('cloud_name', 'didqtu1fe');

            fetch('https://api.cloudinary.com/v1_1/didqtu1fe/image/upload', {
            method: 'post',
            body: data,
            })
            .then((res) => {
                if (!res.ok) {
                throw new Error(`Failed to upload image: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
            .then((responseData) => {
                if (responseData && responseData.url) {
                setPic(responseData.url.toString());
                console.log(responseData.url.toString());
                } else {
                throw new Error('Invalid response format from Cloudinary');
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
        }
        else
        {
            toast({
                title: 'Pleae select an image',
                description: "We've created your account for you.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position:"bottom-right"
              });
               setLoading(false)
              return;
        }
    }

    const submitButton = async()=>{

        if(!name || !email || !password || !confirmPassword)
        {
            toast({
                title: 'Pleae fill all fields',
                description: "Missing data",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position:"bottom-right"
              });
              setLoading(false)
        }
        else if (password !== confirmPassword)
        {
            toast({
                title: 'Password did not match',
                description: "Match error",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position:"bottom-right"
              });
              return;
        }
        try {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            const { data } = await axios.post("http://localhost:5000/api/user",
              {
                name,
                email,
                password,
                pic,
              },
              config
            );
            console.log(data);
            toast({
              title: "Registration Successful",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom-right",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/");
          } catch (error) {
            toast({
              title: "Error Occured!",
            //   description: error.response.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position:"bottom-right",
            });
            setLoading(false);
          }

    }

    return (
        <VStack spacing ='10px'>
        <FormControl id = 'First-name' style={{marginTop:10}}>
            <FormLabel color='white'>Name</FormLabel>
                <Input
                    placeholder="Enter your Name"
                    onChange={(e) => setName(e.target.value)}
                />
        </FormControl>

        <FormControl id = 'email' style={{marginTop:10}}>
            <FormLabel color='white'>Email</FormLabel>
                <Input
                    placeholder="Enter your Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
        </FormControl>

        <FormControl id = 'password' style={{marginTop:10}}>
            <FormLabel color='white'>Password</FormLabel>
             <InputGroup>
                   <Input
                        type={show ? 'text':'password'}
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size ='sm' m={2} onClick={handleClick} border='2px' color='gray.500' borderColor='gray.600' style={{backgroundColor:"transparent"}} >
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
             </InputGroup>

        </FormControl>

        <FormControl id = 'Confirm-password' style={{marginTop:10}}>
            <FormLabel color='white'>Confirm Password</FormLabel>
             <InputGroup>
                   <Input
                        type={show ? 'text':'password'}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size ='sm' m={2} onClick={handleClick} border='2px' color='gray.500' borderColor='gray.600' style={{backgroundColor:"transparent"}} >
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
             </InputGroup>

        </FormControl>

        <FormControl id = 'profile-pic' style={{marginTop:10}}>
            <FormLabel color='white'>Upload profile pic</FormLabel>
                   <Input
                        id='file-input'
                        type='file'
                        placeholder="Input profile pic"
                        p={1.5}
                        accept="image/*"
                        onChange={(e) => postDetails(e.target.files[0])}
                    />
        </FormControl>

        <Button
        width = '100%'
        m={1}
        p={2}
        style = {{backgroundColor:'#00FFFF' , marginTop:15}}
        bgGradient='linear(to-r, cyan.300, cyan.700)'
        _hover={{
            bgGradient: 'linear(to-r, green.200, blue.400)',
        }}
        onClick={submitButton}
        isLoading={loading}
        >
            Sign Up
        </Button>

        </VStack>
    )

}

export default SignUp
