import { createContext, useEffect, useState, useContext } from "react";
import socketIOClient from "socket.io-client";

const SocketContext = createContext();

const SocketContextProvider = (props) => {
  const [socket, setSocket] = useState("");

  const getSocket = async () => {
    const socket = socketIOClient("http://localhost:4000", {
      query: {
        token: localStorage.getItem("user"),
      },
    }).connect();
    setSocket(socket);
  };

  useEffect(async () => {
    await getSocket();
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
export { SocketContextProvider };
