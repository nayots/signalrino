import React, { useCallback, useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export const MessageEntry: React.FC<{}> = (): JSX.Element => {
  const hubConnection = useRef<signalR.HubConnection>();
  const [messagingEnabled, setMessagingEnabled] = useState<boolean>(false);
  const [messageValue, setMessageValue] = useState<string>("");

  const initSignalR = useCallback(async () => {
    hubConnection.current = new signalR.HubConnectionBuilder()
      .withUrl("/chatHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();
    await hubConnection.current.start();
    if (hubConnection.current.connectionId) {
      setMessagingEnabled(true);
    }
  }, [setMessagingEnabled]);

  useEffect(() => {
    initSignalR();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEntryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessageValue(e.target.value);
    },
    [setMessageValue]
  );
  const onSubmit = useCallback(async () => {
    if (!messageValue) {
      return;
    }
    try {
      if (hubConnection.current) {
        await hubConnection.current.invoke("SendMessage", "Anon", messageValue);
        setMessageValue("");
      }
    } catch (error) {
      console.log(`Error in send`, error);
      // TODO: handle error
    }
    //TODO: submit
  }, [messageValue, hubConnection, setMessageValue]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSubmit();
      }
    },
    [onSubmit]
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Your message"
        value={messageValue}
        onChange={onEntryChange}
        onKeyDown={onKeyDown}
        disabled={!messagingEnabled}
      />
      <input
        disabled={!messagingEnabled}
        type="button"
        value="Submit"
        onClick={onSubmit}
      />
    </div>
  );
};

export default MessageEntry;
