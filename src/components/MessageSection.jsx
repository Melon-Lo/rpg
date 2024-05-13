import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { useEffect } from "react";

export default function MessageSection() {
  // 最多顯示 20 筆資料
  const MAX_DISPLAY_MESSAGES = 20;
  const { messages } = useSelector(state => state.messages);

  // 每當出現新訊息時，會自動滾到最下面（最新）的訊息
  useEffect(() => {
    const messages = document.getElementById('messages');
    messages.scrollTop = messages.scrollHeight;
  }, [messages])

  const MessageItem = ({ type, content }) => {
    let textColor;

    // 根據事件決定文字顏色
    if (type === 'success') {
      textColor = 'emerald';
    } else if (type === 'get') {
      textColor = 'blue';
    } else if (type === 'hurt') {
      textColor = 'red';
    } else if (type === 'attack') {
      textColor = 'fuchsia';
    } else {
      textColor = 'gray';
    }

    return (
      <p className={`text-${textColor}-800 last:font-bold`}>{content}</p>
    );
  }

  const renderedMessages = messages
    .slice(-MAX_DISPLAY_MESSAGES) // 擷取特定數量的訊息
    .map(message => {
      return <MessageItem key={nanoid()} type={message.type} content={message.content} />;
  });

  return (
    // 包兩層，flex 才不會跟 overflow 互相影響
    <div id="message-section" className="w-11/12 h-16 bg-slate-200 rounded-md my-1 px-2 py-1 flex flex-col justify-end">
      <div id="messages" className="overflow-y-scroll overflow-x-hidden">
        {renderedMessages}
      </div>
    </div>
  );
};