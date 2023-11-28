// import { createClient } from "@supabase/supabase-js";
// import { useEffect, useRef, useState } from "react";
// import dayjs from "dayjs";
// // Create a single supabase client for interacting with your database
// const supabase = createClient("https://efwyaewnaeiblkswsccs.supabase.co", import.meta.env.VITE_CHAT_APIKEY);

// const AddMessage = ({ message }) => {
//   const username = message?.username;
//   const content = message?.content;
//   const createdAt = message?.created_at;
//   const formattedDate = dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss");

//   return (
//     <div className="flex justify-start items-start gap-4">
//       <div className="flex flex-col justify-start items-start gap-1 mb-5">
//         <span className="text-emerald-500 font-pretendardBold text-[14px]">{username}</span>
//         <div className="px-4 py-2 rounded-xl bg-[#f1f1f1] max-w-[420px] h-auto">
//           <p className="flex-1 flex-grow-0 flex-shrink-0 text-sm text-left text-black overflow-hidden break-words">
//             {content}
//           </p>
//         </div>
//         <span className="text-xs">{formattedDate}</span>
//       </div>
//     </div>
//   );
// };

// const MessageList = () => {
//   const [messages, setMessages] = useState([]);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     async function fetchData() {
//       let { data: messages } = await supabase.from("messages").select("*");
//       setMessages(messages);
//     }

//     // 데이터베이스 변경 사항을 구독하는 부분
//     const subscription = supabase
//       .channel("room1")
//       .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
//         console.log("Change received!", payload);
//         // 변경 사항을 처리하고 상태 업데이트
//         setMessages((prevMessages) => [...prevMessages, payload.new]);
//       })
//       .subscribe();

//     fetchData();

//     // 컴포넌트가 언마운트될 때 구독을 정리
//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   useEffect(() => {
//     if (containerRef.current) {
//       containerRef.current.scrollTop = containerRef.current.scrollHeight;
//       const newMsg = containerRef.current.lastChild;
//       if (newMsg) {
//         newMsg.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
//       }
//     }
//   }, [messages]);

//   return (
//     <div className="w-[full] min-w-[450px] min-h-[360px] overflow-y-scroll" ref={containerRef}>
//       {/* messages 배열을 매핑하여 AddMessage 컴포넌트를 생성하고 렌더링 */}
//       {messages.map((message) => (
//         <AddMessage key={message.id} message={message} />
//       ))}
//     </div>
//   );
// };

// export default MessageList;
