// 기본 -> 영화 정보, hover -> 찜(로그인 라우팅), 상세보기(링크)

import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import Connect from "../../Network/Connect.json";
import { GetData } from "../../Network/Connect";
import { SwiperComponent } from "../Content/SwiperComponent";

export default function MainContent() {
  // 데이터 연결 함수
  const fetchData = async () => {
    let page = 1;
    let sort = "POPULARITY_DESC";
    let provider = "WAVVE";
    let type = "MOVIE";
    let queryString = `?page=${page}&sort=${sort}&provider=${provider}&contentType=${type}`;

    const response = await GetData(Connect["mainUrl"] + Connect["categoryList"] + queryString);
    return response.data;
  };

  // react-query로 데이터 연결 및 관리
  const { data: contents } = useQuery({
    queryKey: ["contents-list"],
    queryFn: fetchData,
  });

  const autoplayEnabled = true;

  return <>{contents && <SwiperComponent contents={contents.results} autoplayEnabled={autoplayEnabled} />}</>;
}
