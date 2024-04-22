import { useSelector } from "react-redux";
import { nanoid } from "nanoid";

export default function MessageSection() {
  // 最多顯示 10 筆資料
  const MAX_DISPLAY_MESSAGES = 10;
  const { messages } = useSelector(state => state.messages);

  const MessageItem = ({ type, content }) => {
    let textColor;

    // 根據事件決定文字顏色
    if (type === 'move') {
      textColor = 'green';
    }

    return (
      <p className="text-gray-500 first:text-gray-800 first:font-medium">{content}</p>
    );
  }

  // 反過來遍歷，最新的會在最上面
  const renderedMessages = messages
    .slice(-MAX_DISPLAY_MESSAGES) // 擷取特定數量的訊息
    .reverse() // 反過來遍歷
    .map(message => {
      return <MessageItem key={nanoid()} type={message.type} content={message.content} />;
  });

  return (
    <div className="w-11/12 h-16 bg-slate-200 rounded-md overflow-scroll my-1 px-2 py-1">
      {renderedMessages}
    </div>
  );
};