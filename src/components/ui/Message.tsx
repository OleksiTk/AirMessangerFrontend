interface MessageProps {
  text: string;
  time: string;
  isRead?: boolean;
}

const Message: React.FC<MessageProps> = ({ text, time, isRead }) => {
  return (
    <div className="chat-you">
      <div className="chat-you__message">{text}</div>
      <div className="chat-you__message-time">
        {time} · {isRead ? "Read" : "Sent"}
      </div>
    </div>
  );
};

export default Message;
