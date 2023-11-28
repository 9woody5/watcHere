import { useRecoilState } from "recoil";
import { chatState } from "../../../Common/CommonAtom";
import { useState } from "react";
import { ChatForm } from "./ChatForm";

const ChatIcon = () => {
  // 아이콘 동적 스타일링
  const [chat, setChat] = useRecoilState(chatState);
  const [isChatFormVisible, setIsChatFormVisible] = useState(false);

  const handleMouseOver = () => {
    setChat({ ...chat, isHovered: true });
  };
  const handleMouseLeave = () => {
    setChat({ ...chat, isHovered: false });
  };

  const handleChatClick = () => {
    setChat({ ...chat, isClicked: !chat.isClicked });
    setIsChatFormVisible(!isChatFormVisible);
  };

  return (
    <>
      <button
        className="mb-5 fixed bottom-14 right-4 z-50"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClick={handleChatClick}
      >
        <svg width="70" height="70" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="40"
            cy="40"
            r="40"
            fill={chat.isHovered ? "#047857" : "#40AD80"}
            className="transition-all duration-300 ease-in-out"
          />
          <path
            d="M49.0325 23.2258H31.8282C27.0798 23.2258 23.2261 27.0624 23.2261 31.7936V43.8022C23.2261 48.5334 27.0798 52.3699 31.8282 52.3699H34.4089C34.8734 52.3699 35.4927 52.6796 35.7852 53.0581L38.3659 56.4817C39.5013 57.9957 41.3594 57.9957 42.4949 56.4817L45.0755 53.0581C45.4024 52.628 45.9185 52.3699 46.4519 52.3699H49.0325C53.7809 52.3699 57.6347 48.5334 57.6347 43.8022V31.7936C57.6347 27.0624 53.7809 23.2258 49.0325 23.2258ZM33.5487 40.4301C32.5852 40.4301 31.8282 39.6559 31.8282 38.7097C31.8282 37.7635 32.6024 36.9893 33.5487 36.9893C34.4949 36.9893 35.2691 37.7635 35.2691 38.7097C35.2691 39.6559 34.5121 40.4301 33.5487 40.4301ZM40.4304 40.4301C39.4669 40.4301 38.7099 39.6559 38.7099 38.7097C38.7099 37.7635 39.4841 36.9893 40.4304 36.9893C41.3766 36.9893 42.1508 37.7635 42.1508 38.7097C42.1508 39.6559 41.3938 40.4301 40.4304 40.4301ZM47.3121 40.4301C46.3487 40.4301 45.5917 39.6559 45.5917 38.7097C45.5917 37.7635 46.3659 36.9893 47.3121 36.9893C48.2583 36.9893 49.0325 37.7635 49.0325 38.7097C49.0325 39.6559 48.2755 40.4301 47.3121 40.4301Z"
            fill="white"
          />
        </svg>
      </button>
      {isChatFormVisible && <ChatForm />}
    </>
  );
};

export default ChatIcon;
