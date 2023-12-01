import { useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { usernameState } from "../../Common/CommonAtom";

const MessageList = ({ messages }) => {
  const containerRef = useRef(null);
  const userInfo = useRecoilValue(usernameState);

  const AddMessage = ({ message }) => {
    const username = message?.username;
    const content = message?.content;
    const createdAt = message?.created_at;
    const formattedDate = dayjs(createdAt).format("YYYY.MM.DD HH:mm:ss");
    const isMyMessage = userInfo.email === message?.email;

    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    const containsLink = urlPattern.test(content);

    return (
      <div className={`flex justify-${isMyMessage ? "end" : "start"} items-start gap-4 pr-2 py-2`}>
        <div className={`flex flex-col justify-start items-${isMyMessage ? "end" : "start"} gap-2`}>
          <span
            className={`text-zinc-700 font-pretendardBold text-[14px] max-w-[300px] h-auto overflow-hidden whitespace-nowrap overflow-ellipsis`}
          >
            {username}
          </span>
          <div
            className={`px-2 py-2 rounded-xl ${
              isMyMessage ? "bg-emerald-500 ml-2" : "bg-[#f1f1f1] mr-2"
            } max-w-[350px] h-auto`}
          >
            {containsLink ? (
              <a className="text-white underline text-sm" href={content} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <p
                className={`flex-1 flex-grow-0 flex-shrink-0 text-sm text-left ${
                  isMyMessage ? "text-white" : "text-black"
                } overflow-hidden break-words`}
              >
                {content}
              </p>
            )}
          </div>
          <span className="text-xs">{formattedDate}</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      const newMsg = containerRef.current.lastChild;
      if (newMsg) {
        newMsg.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      }
    }
  }, [messages]);

  return (
    <div className="msg_area w-[full] min-w-[385px] min-h-[360px] overflow-y-scroll" ref={containerRef}>
      {/* messages 배열을 매핑하여 AddMessage 컴포넌트를 생성하고 렌더링 */}
      {messages.map((message) => (
        <AddMessage key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
