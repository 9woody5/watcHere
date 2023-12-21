import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SwiperComponent } from "../Content/SwiperComponent";
import MainSkeletonUI from "./MainSkeletonUI";

export default function MainContent() {
  // 장르 데이터 가져오기
  const fetchContentDetailData = async (contentId) => {
    try {
      const responseGenre = await axios.get(`https://kdt-sw-6-team05.elicecoding.com/api/v1/movie/${contentId}`);
      return responseGenre.data;
    } catch (error) {
      console.error("데이터 조회 실패", error);
      return null;
    }
  };
  // 데이터 연결 함수
  const fetchData = async () => {
    try {
      let page = 1;
      let sort = "POPULARITY_DESC";
      let provider = "WAVVE";
      let type = "MOVIE";
      let queryString = `?page=${page}&sort=${sort}&provider=${provider}&contentType=${type}`;

      const response = await axios.get(`https://kdt-sw-6-team05.elicecoding.com/api/v1/contents${queryString}`);

      // 각 객체의 id 값을 이용하여 fetchContentDetailData 호출
      const contentDetailsPromises = response.data.results.map(async (content) => {
        const contentId = content.id;
        const contentDetail = await fetchContentDetailData(contentId);

        const runtime = contentDetail.runtime;
        // contentDetail에서 genres 배열의 name 속성 값을 가져와 활용
        const genreNames = contentDetail.genres.map((genre) => genre.name);

        return {
          contentId,
          genreNames,
          runtime,
        };
      });

      // 모든 fetchContentDetailData 호출이 완료될 때까지 기다림
      const contentDetails = await Promise.all(contentDetailsPromises);
      const resultsWithGenres = response.data.results.map((result, index) => {
        return {
          ...result,
          genreNames: contentDetails[index].genreNames,
          runtime: contentDetails[index].runtime,
        };
      });

      return {
        results: resultsWithGenres,
        contentDetails,
      };
    } catch (error) {
      console.error("데이터 조회 실패", error);
      throw error;
    }
  };

  // react-query로 데이터 연결 및 관리
  const { data: contents, isLoading } = useQuery({
    queryKey: ["contents-list"],
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000,
  });

  const autoplayEnabled = true;

  return (
    <>
      {isLoading ? (
        <MainSkeletonUI />
      ) : (
        <>{contents && <SwiperComponent contents={contents.results} autoplayEnabled={autoplayEnabled} />}</>
      )}
    </>
  );
}
