import React, { useEffect , useState } from "react"
import axios from 'axios'
import { ChatState } from "../Context/chatProvider"
import SideDrawer from "../components/miscellaneous/SideDrawer"
import { Box } from "@chakra-ui/react"
import ChatBox from "../components/miscellaneous/ChatBox"
import MyChat from "../components/miscellaneous/MyChat"

const ChatPage = () => {

    const {user, setUser ,selectedChat , setSelectedChat, chats , setChats } = ChatState()
    const [fetchAgain , setFetchAgain] = useState(false)

    return (
        <div style={{ width: '100%' }}>
        {user && <SideDrawer /> }
        <Box
        display = "flex"
        position='relative'
        justifyContent='space-between'
        w='100%'
        h='90vh'
        // position = 'absolute'
        // bottom ='0px'
        style = {{justifyContent:'space-between', display:'flex'}}>
            {user && <MyChat fetchAgain={fetchAgain}  />}
            {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}  />}
        </Box>

        </div>
    )
}

export default ChatPage
