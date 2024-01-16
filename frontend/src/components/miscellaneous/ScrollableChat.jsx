import React from "react";
import ScrollableFeed from 'react-scrollable-feed'
import { isSameSender, isSameSenderMargin, isSameUser } from "../../config/ChatLogics";
import { ChatState } from "../../Context/chatProvider";

const ScrollableChat = ({messages}) => {

    const {user} = ChatState()

    let UserColor = "linear-gradient(to right, #ADD8E6, #BEE3F8)"

    return (
        <ScrollableFeed>
            {messages && messages.map((m , i) => 
                <div style={{ display: "flex" , padding:'0.4rem'  }} key={m._id}>
            {/* {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )} */}
            <span
              style={{
                backgroundImage: `${
                  m.sender._id === user._id ? "linear-gradient(to right, #27d7f4, #86f6a9)" : "linear-gradient(to right, #E35BF8, #687AFF)"
                }`,
                padding:'3rem',
                marginLeft: isSameSenderMargin(messages, m, i, user._id) ,
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px 0 20px 20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>

            )}
        </ScrollableFeed>
    )
}

export default ScrollableChat;