import { useState } from "react";
// import chatIcon from "../../assets/img/chatIcon.svg";

const Chat = () => {
  // 아이콘 동적 스타일링
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleChatClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <button
        className="mb-5 fixed bottom-24 right-5 z-50"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClick={handleChatClick}
      >
        <svg width="70" height="70" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="40" fill={isHovered ? "#047857" : "#40AD80"} />
          <path
            d="M49.0325 23.2258H31.8282C27.0798 23.2258 23.2261 27.0624 23.2261 31.7936V43.8022C23.2261 48.5334 27.0798 52.3699 31.8282 52.3699H34.4089C34.8734 52.3699 35.4927 52.6796 35.7852 53.0581L38.3659 56.4817C39.5013 57.9957 41.3594 57.9957 42.4949 56.4817L45.0755 53.0581C45.4024 52.628 45.9185 52.3699 46.4519 52.3699H49.0325C53.7809 52.3699 57.6347 48.5334 57.6347 43.8022V31.7936C57.6347 27.0624 53.7809 23.2258 49.0325 23.2258ZM33.5487 40.4301C32.5852 40.4301 31.8282 39.6559 31.8282 38.7097C31.8282 37.7635 32.6024 36.9893 33.5487 36.9893C34.4949 36.9893 35.2691 37.7635 35.2691 38.7097C35.2691 39.6559 34.5121 40.4301 33.5487 40.4301ZM40.4304 40.4301C39.4669 40.4301 38.7099 39.6559 38.7099 38.7097C38.7099 37.7635 39.4841 36.9893 40.4304 36.9893C41.3766 36.9893 42.1508 37.7635 42.1508 38.7097C42.1508 39.6559 41.3938 40.4301 40.4304 40.4301ZM47.3121 40.4301C46.3487 40.4301 45.5917 39.6559 45.5917 38.7097C45.5917 37.7635 46.3659 36.9893 47.3121 36.9893C48.2583 36.9893 49.0325 37.7635 49.0325 38.7097C49.0325 39.6559 48.2755 40.4301 47.3121 40.4301Z"
            fill="white"
          />
        </svg>
      </button>
      {isClicked ? (
        <div className="absolute z-50 bottom-52 right-5 w-[340px] h-[440px] overflow-hidden gap-5 rounded-[30px] bg-white font-pretendard shadow-xl">
          <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 h-[360px] w-[340px] relative">
            <div className="flex justify-between items-center flex-grow-0 flex-shrink-0 w-[340px] h-[95px] p-6">
              <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 gap-4">
                <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative">
                  <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-left text-black">오픈톡</p>
                  <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
                    <svg
                      width={10}
                      height={10}
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-grow-0 flex-shrink-0"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <circle cx={5} cy={5} r={5} fill="#68D391" />
                    </svg>
                    <p className="flex-grow-0 flex-shrink-0 opacity-60 text-xs font-semibold text-left text-black">
                      80명
                    </p>
                  </div>
                </div>
              </div>
              <button
                className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2 px-2 py-1.5 rounded-lg bg-[#9bb0a5] hover:bg-emerald-700 cursor-pointer"
                onClick={handleChatClick}
              >
                <span className="text-sm text-white">나가기</span>
              </button>
            </div>
            <div className="flex-grow-0 flex-shrink-0 w-[640px] h-px opacity-[0.08] bg-black" />
            <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 h-[360px] w-[340px] p-6">
              <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
                <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-2.5">
                  <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-2.5 px-4 py-2 rounded-xl bg-[#f1f1f1]">
                    <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-black">안녕하세요</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
                <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-2.5">
                  <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-2.5 px-4 py-2 rounded-xl bg-[#40ad80]">
                    <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">안녕하세요</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-6 p-6 border-blue-200">
            <div className="flex justify-between items-center flex-grow h-12 relative overflow-hidden py-2.5 rounded-xl">
              <input
                type="text"
                placeholder="메세지를 입력하세요"
                className="flex-grow-0 flex-shrink-0 text-sm text-left text-black outline-none w-[250px] h-8 px-2 bg-zinc-100 rounded-lg"
              />
              <button type="submit">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M16.1401 2.96004L7.11012 5.96004C1.04012 7.99004 1.04012 11.3 7.11012 13.32L9.79012 14.21L10.6801 16.89C12.7001 22.96 16.0201 22.96 18.0401 16.89L21.0501 7.87004C22.3901 3.82004 20.1901 1.61004 16.1401 2.96004ZM16.4601 8.34004L12.6601 12.16C12.5101 12.31 12.3201 12.38 12.1301 12.38C11.9401 12.38 11.7501 12.31 11.6001 12.16C11.4606 12.0189 11.3824 11.8285 11.3824 11.63C11.3824 11.4316 11.4606 11.2412 11.6001 11.1L15.4001 7.28004C15.6901 6.99004 16.1701 6.99004 16.4601 7.28004C16.7501 7.57004 16.7501 8.05004 16.4601 8.34004Z"
                    fill="#40AD80"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      ;
    </>
  );
};

export default Chat;
