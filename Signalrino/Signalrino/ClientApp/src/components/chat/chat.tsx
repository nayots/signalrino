import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./chat.module.scss";
import { MessagesList } from "../messages-list/messages-list";
import { MessageEntry } from "../message-entry/message-entry";
import * as signalR from "@microsoft/signalr";

export const Chat: React.FC<{}> = (props): JSX.Element => {
  const hubConnection = useRef<signalR.HubConnection>();
  const [messages, setMessages] = useState<string[]>([]);

  const initSignalR = useCallback(async () => {
    hubConnection.current = new signalR.HubConnectionBuilder()
      .withUrl("/chatHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();
    await hubConnection.current.start();
    if (hubConnection.current.connectionId) {
      hubConnection.current.on("ReceiveMessage", (user, message) => {
        setMessages((pv) => [...pv, `${user}: ${message}`]);
      });
    } else {
      // TODO: handle
    }
  }, []);
  useEffect(() => {
    initSignalR();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.chatRoot}>
      <MessageEntry />
      <MessagesList messages={messages} />
    </div>
  );
};

export default Chat;
