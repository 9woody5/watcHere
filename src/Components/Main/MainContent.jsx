// 처음, 마지막 슬라이드 alert 띄우기
// 콘텐츠 UI 디자인 수정
// 기본 -> 영화 정보, hover -> 찜(로그인 라우팅), 상세보기(링크)

import mockData from "../../resources/mockData.json";
import { SwiperComponent } from "../Content/SwiperComponent";

export default function MainContent() {
  const contents = mockData;

  return (
    <>
      <SwiperComponent contents={contents} />
    </>
  );
}
