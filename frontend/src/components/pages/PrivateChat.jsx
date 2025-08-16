import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function PrivateChat() {
  const [uid, setUid] = useState("");
  const [msg, setMsg] = useState({});
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState(["Alice", "Bob", "Charlie", "Diana"]);
  const [groups, setGroups] = useState(["Group 1", "Group 2", "Group 3"]);
  const [activeUser, setActiveUser] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [image, setImage] = useState(null);
  const [typing, setTyping] = useState("");
  const messagesEndRef = useRef(null);
  const imageInputRef = useRef(null);

  const setMg = (data) => {
    setResults((prev) => [...prev, data]);
  };

  useEffect(() => {
    socket.on("my-id", (data) => {
      setUid(data);
    });

    socket.on("message", (data) => {
      setTyping("");
      setMg(data);
    });

    socket.on("typing", (data) => {
      setTyping(data);
      clearTyping();
    });

    return () => {
      socket.off("my-id");
      socket.off("message");
      socket.off("typing");
    };
  }, []);

  const clearTyping = () =>
    setTimeout(() => {
      setTyping("");
    }, 3000);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [results]);

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = messageText.trim();
    if (!trimmed || !activeUser) return;

    const payload = {
      msg: trimmed,
      uid,
      to: activeUser,
      ts: Date.now(),
      image,
    };

    socket.emit("private-message", payload);
    setResults((prev) => [...prev, payload]);
    setMessageText("");
    setImage(null);
    setMsg({});
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col md:flex-row text-gray-200">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-800 border-b md:border-b-0 md:border-r border-gray-700 shadow-md p-4 flex flex-col">
        <h2 className="text-lg font-semibold text-blue-400 mb-2 md:mb-4">
          Users
        </h2>
        <div className="flex-1 overflow-x-auto md:overflow-y-auto flex md:block gap-2 md:gap-0">
          {users.map((user) => (
            <div key={user} className="flex gap-2 items-center mb-2">
              <button
                onClick={() => {
                  setActiveUser(user);
                  setResults([]);
                }}
                className={`flex-1 text-left px-3 py-2 rounded-lg text-sm md:text-base transition ${
                  activeUser === user
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {user}
              </button>
              <div
                onClick={() => {
                  const urs = users.filter((g) => g !== user);
                  setUsers([user, ...urs]);
                }}
                className="ml-1 cursor-pointer text-gray-400 hover:text-yellow-400 transition"
                title="Pin chat"
              >
                📌
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold text-blue-400 mt-4 mb-2 md:mb-4">
          Groups
        </h2>
        <div className="flex-1 overflow-x-auto md:overflow-y-auto flex md:block gap-2 md:gap-0">
          {groups.map((group) => (
            <div key={group} className="flex gap-2 items-center mb-2">
              <button
                onClick={() => {
                  setActiveUser(group);
                  setResults([]);
                }}
                className={`flex-1 text-left px-3 py-2 rounded-lg text-sm md:text-base transition ${
                  activeUser === group
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {group}
              </button>
              <div
                onClick={() => {
                  const grps = groups.filter((g) => g !== group);
                  setGroups([group, ...grps]);
                }}
                className="ml-1 cursor-pointer text-gray-400 hover:text-yellow-400 transition"
                title="Pin chat"
              >
                📌
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-400 text-center md:text-left">
          Your ID: <span className="font-medium text-gray-200">{uid || "—"}</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-700 bg-gray-800 flex items-center justify-between">
          <h1 className="text-base md:text-lg font-semibold text-blue-300 truncate">
            {activeUser ? `Chat with ${activeUser}` : "Select a user"}
          </h1>
          {typing && uid !== typing && (
            <p className="text-xs md:text-sm text-gray-400">{typing} is typing...</p>
          )}
        </div>

        {/* Placeholder */}
        {!activeUser && (
          <div className="flex flex-col items-center justify-center flex-1 text-center text-gray-400 p-4">
            <div className="bg-gray-800 p-6 md:p-8 rounded-2xl shadow-md w-full max-w-sm">
              <h2 className="text-lg md:text-xl font-semibold text-blue-400 mb-2">
                Choose a user or group
              </h2>
              <p className="text-gray-300 text-sm md:text-base">to start conversation</p>
            </div>
          </div>
        )}

        {/* Messages */}
        {activeUser && (
          <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-900 space-y-3">
            {results.map((item, index) => {
              const isMine = item.uid === uid;
              return (
                <div
                  key={index}
                  className={`flex ${isMine ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[70%] px-3 md:px-4 py-2 rounded-xl break-words ${
                      isMine
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-700 text-gray-200 rounded-bl-none"
                    }`}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt="img"
                        className="w-[150px] md:w-[200px] mb-2 rounded"
                      />
                    )}
                    <div className="text-xs md:text-sm">{item.msg}</div>
                    <div className="text-[9px] md:text-[10px] mt-1 text-right opacity-70">
                      {item.ts ? new Date(item.ts).toLocaleTimeString() : ""}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input */}
        {activeUser && (
          <div className="p-3 md:p-4 bg-gray-800 border-t border-gray-700">
            <form onSubmit={handleSend} className="flex items-center gap-2 md:gap-3">
              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    setImage(reader.result);
                    imageInputRef.current.value = "";
                  };
                }}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => imageInputRef.current.click()}
                className="px-2 md:px-3 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-gray-200"
              >
                📎
              </button>
              {image && (
                <div className="flex items-center gap-2">
                  <img src={image} alt="preview" className="w-8 h-8 md:w-10 md:h-10 rounded" />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="text-red-400 text-sm md:text-base"
                  >
                    ✕
                  </button>
                </div>
              )}
              <input
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => {
                  socket.emit("typing", uid);
                  setMessageText(e.target.value);
                  setMsg((prev) => ({
                    ...prev,
                    msg: e.target.value,
                    uid,
                    to: activeUser,
                  }));
                }}
                className="flex-1 px-3 md:px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-200 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm md:text-base"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default PrivateChat;
