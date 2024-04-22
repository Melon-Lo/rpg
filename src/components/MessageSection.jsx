import { useSelector } from "react-redux";
import { nanoid } from "nanoid";

export default function MessageSection() {
  const { messages } = useSelector(state => state.messages);

  const MessageItem = ({ type, content }) => {
    return (
      <p className="pl-3">{content}</p>
    );
  }

  // 反過來遍歷，最新的會在最上面
  const renderedMessages = messages.slice().reverse().map(message => {
    return <MessageItem key={nanoid()} type={message.type} content={message.content} />;
  });

  return (
    <div className="w-11/12 h-16 bg-slate-300 rounded-md overflow-scroll my-1">
      {renderedMessages}
    </div>
  );
};