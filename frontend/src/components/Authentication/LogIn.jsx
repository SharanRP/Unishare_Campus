import React , {useState , useEffect} from "react";
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn = ()=> {

    const [show , setShow] = useState(false)
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [loading , setLoading] = useState(false)

    const toast = useToast()
    let navigate = useNavigate()
    const handleClick = () => {setShow(!show)}

    const submitButton = async() => {
        setLoading(true);
        if(!email || !password)
        {
            toast({
                title: 'Pleae fill all fields',
                description: "Missing data",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position:"bottom-right"
              });
              setLoading(false);
              return
        }

        try {
            const config = {
                headers:{
                 "Content-type" : 'application/json'
                }
            }

            const {data} = await axios.post('http://localhost:5000/api/user/login' , {email , password} , config);

            toast({
                title: 'Login Successfull',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:"bottom-right"
              });
              localStorage.setItem('userInfo',JSON.stringify(data));
              setLoading(false)
              navigate("/");
        } catch (error) {
            toast({
                title: 'Error Occured',
                description: error.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position:"bottom-right"
              });
              setLoading(false)
        }

    }

    return (

            <VStack spacing ='5px'>
            <FormControl id = 'email' style={{marginTop:10}}>
                <FormLabel color='white'>Email</FormLabel>
                    <Input
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
            </FormControl>

            <FormControl id = 'password'>
                <FormLabel color='white' style={{marginTop:10}}>Password</FormLabel>
                 <InputGroup>
                       <Input
                            type={show ? 'text':'password'}
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size ='sm' onClick={handleClick} border='2px' color='gray.500' borderColor='gray.600' style={{backgroundColor:"transparent"}} >
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                 </InputGroup>

            </FormControl>

            <Button
            width = '100%'
            p={2}
            colorScheme="gray"
            isLoading={loading}
            style = {{marginTop : 15 , backgroundColor:'#00FFFF'}}
            onClick={submitButton}
            bgGradient='linear(to-r, cyan.300, cyan.700)'
        _hover={{
            bgGradient: 'linear(to-r, green.200, blue.400)',
        }}
            >
                Login
            </Button>

            <Button
            variant='solid'
            width = '100%'
            p={2}
            colorScheme="gray"
            style = {{marginTop : 15 , backgroundColor:'#A4A4A4'}}
            bgGradient='linear(to-r, cyan.300, cyan.700)'
        _hover={{
            bgGradient: 'linear(to-r, green.200, blue.400)',
        }}
            onClick={()=>{
                setEmail("guest21@gmail.com")
                setPassword("123456ABC")

            }}
            >
                Guest User
            </Button>

            </VStack>
        )


}

export default LogIn
