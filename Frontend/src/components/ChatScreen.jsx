import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/Constants";
import ChatModal from "./ChatModal";
import Modal from "./ChatModal";
import Chat from "./Chat";


const ChatScreen = () => {
  const [chats, setChats] = useState([]);

  const chatList = async () => {
    try {
      const data = await fetch(BASE_URL + "user/getChats", {
        credentials: "include",
      });
      if (!data.ok) {
        console.log(data.Chats);
        console.log("Error in fetching");
        return;
      }
      const res = await data.json();
      console.log("res->", res);
      setChats(res.Chats);
    } catch (err) {
      console.log(`something went wrong! ${err.message}`);
    }
  };

  useEffect(() => {
    console.log("Call chatlist");
    chatList();
  }, []);

  return (
    <div>
      <h1>
        {chats?.map((res, ind) => {
          return (
            <div key={ind}>
              <div className="card w-96 bg-base-200 card-xs shadow-sm">
                <div className="card-body">
                  <p>
                     {`${res.participants[0]} ${res.participants[1]}`} 
                  </p>
                  <div className="justify-end card-actions">
                    <button className="btn btn-primary">Chat</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </h1>
    </div>
  );
};

export default ChatScreen;
