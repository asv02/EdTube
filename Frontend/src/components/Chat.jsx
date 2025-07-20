import { useSelector, useDispatch } from "react-redux";
import { createSocketConnection } from "../utils/socket";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "../utils/Constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.UserReducer.user);
  const userId = user.userId;
  const [messages, SetMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");

  const ref = useRef();

  const handleGetChat = async(targetUserId)=>
    {
        const data = await fetch(BASE_URL+`user/getChat/${targetUserId}`,
          {
            credentials:'include'
          });
        if(!data.ok)
          {
            return;
          }
        const res = await data.json();
        console.log('res in handleGetChat->',res)
        const resMessage = res?.chat?.messages?.map((msg)=>(
          {
            userId:msg.senderId,
            targetUserId:msg.targetUserId,
            text:msg.text
          }))
          console.log('resMessage->',resMessage)
        return resMessage;
    }


  const sendMessages = async() => {
    const socket = ref.current;
    console.log('NewMessage->',newMessages)
    socket.emit("sendMessage", {
      userId: userId,
      targetUserId: targetUserId,
      text: newMessages,
    });
  };

  useEffect(() => {
    const socket = createSocketConnection();
    ref.current = socket;
    socket.emit("joinchat", {
      userId:userId,
      targetUserId:targetUserId,
    });
    
    const msg = async(targetUserId)=>
      {
        const data = await handleGetChat(targetUserId);
        SetMessages(data);
        console.log('older data Messages->',data)
      }
      msg(targetUserId);
      

    socket.on('receiveMessage',({userId,targetUserId,text})=>
      {
        SetMessages((prev) => [...prev,{userId,targetUserId,text}])
        console.log("messages->",messages)
      })

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  return (
    <div>
      <div className="card card-dash bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <div>
          {messages?.map((msg,ind)=>
            {
               return <h2 key={ind}>{msg.text}</h2>
            })}
          </div>
          <div className="card-actions justify-end">
            <input
              type="text"
              value={newMessages}
              onChange={(e) => {
                setNewMessages(e.target.value);
              }}
              placeholder="Send Message"
              className="input input-md"
            />
            <button className="btn btn-primary" onClick={sendMessages}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
