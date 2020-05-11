import React, { useMemo } from "react";
import { MessagesListProps } from "./messages-list-props";

export const MessagesList: React.FC<MessagesListProps> = ({
  messages,
}): JSX.Element => {
  const messageEntries = useMemo(() => {
    return messages.map((m, ind) => <li key={`m_${ind}`}>{m}</li>); // TODO: use something else rather than index
  }, [messages]);

  return (
    <div>
      <ol>{messageEntries}</ol>
    </div>
  );
};

export default MessagesList;
