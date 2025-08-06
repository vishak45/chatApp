
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function PrivateChat() {
  const [uid, setUid] = useState("");
  const [msg, setMsg] = useState({}); 
  const [results, setResults] = useState([]);
  const [room, setRoom] = useState("");
  const [showToggle, setShowToggle] = useState(true);
  const [messageText, setMessageText] = useState("");
  const [image, setImage] = useState(null);
  const messagesEndRef = useRef(null);
  const imageInputRef = useRef(null);
  const [typing, setTyping] = useState('');

  const setMg = (data) => {
    setResults((prev) => [...prev, data]);
  };

  useEffect(() => {
    socket.on("my-id", (data) => {
      setUid(data);
    });

    socket.on("message", (data) => {setTyping('');setMg(data)});
    socket.on("typing", (data) => {
      setTyping(data);
      clearTimeout();
     

    })
    return () => {
      socket.off("my-id");
      socket.off("message");
      socket.off("typing");
      clearTimeout();
    };
  
  }, [socket]);
   const clearTimeout =()=> setTimeout(() => {
        setTyping('');
      }, 3000);

  // auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [results]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!room.trim()) return;
    socket.emit("join-room", { uid, room });
    setShowToggle(false);
  };

  const handleSend = (e) => {
    
    e.preventDefault();
    const trimmed = messageText.trim();
    if (!trimmed) return;
    const payload = {
      msg: trimmed,
      uid,
      room,
      ts: Date.now(),
      image
    };

    socket.emit("message", payload);

    // locally add message (server might echo it back; dedup can be added later)
    setResults((prev) => [...prev, payload]);
    setMessageText("");
    setImage(null);
    setMsg({}); // optional: keep msg state consistent
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-lg font-semibold">Private Chat</h1>
          <div className="text-sm text-gray-600">
            Your ID: <span className="font-medium text-gray-800">{uid || "—"}</span>
            <div>
              {
                typing && uid !== typing && (
                  <p>{typing} is typing...</p>
                )
              }
            </div>
          </div>

        </div>

        {/* Body */}
        <div className="p-6">
          {showToggle ? (
            <div className="max-w-md mx-auto">
              <form onSubmit={handleJoin} className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Join a room</label>
                <input
                  type="text"
                  placeholder="roomid"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Join
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col h-[60vh]">
              {/* Room info */}
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Room: <span className="font-medium text-gray-800">{room}</span>
                </div>
                <button
                  onClick={() => {
                    setShowToggle(true);
                    setResults([]);
                    setRoom("");
                  }}
                  className="text-sm text-red-600 hover:underline"
                >
                  Leave
                </button>
              </div>

              {/* Chat messages */}
              <div className="flex-1 bg-gray-50 p-4 rounded-xl overflow-y-auto space-y-3">
                {results.map((item, index) => {
                  const isMine = item.uid === uid;
                  return (
                    <div key={index} className={`flex ${isMine ? "justify-start" : "justify-end"}`}>
                      <div
                        className={`max-w-[75%] px-4 py-2 rounded-xl break-words ${
                          isMine
                            ? "bg-cyan-600 text-white rounded-br-none shadow-sm"
                            : "bg-green-600 text-white rounded-bl-none"
                        }`}
                      >
                        <div>
                          {
                            item.image && (
                              <img src={item.image} alt="img" className="w-[200px]"/>
                            )
                          }
                          </div>
                        <div className="text-sm">{item.msg}</div>
                        <div className="text-[10px] text-white-300 mt-1 text-right">
                          {item.ts ? new Date(item.ts).toLocaleTimeString() : ""}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="mt-4">
                <form onSubmit={handleSend} className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    onChange={(e) => {
                      const file=e.target.files[0]
                      const reader=new FileReader()
                      reader.readAsDataURL(file)
                      reader.onload=()=>{
                        const base64= reader.result
                        setImage(base64)
                        imageInputRef.current.value=""

                      }
                     
                     
                    }}
                    
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-10 h-10"
                    />
                    {
                      image && (
                        <div className="flex items-center gap-3">
                        <img src={image} alt="image" className="w-10 h-10" />
                        <button onClick={() => {setImage("")}}>X</button>
                        </div>
                      )
                    }
                  <input
                    type="text"
                    placeholder="message"
                    value={messageText}
                    onChange={(e) => {
                      socket.emit("typing", { uid, room });
                      setMessageText(e.target.value);
                      setMsg((prev) => ({ ...prev, msg: e.target.value, uid, room }));
                      
                    }}
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PrivateChat;
