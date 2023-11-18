import { useParams } from "react-router-dom";

export default function DummyContentDetail() {
  const { idx } = useParams();
  return (
    <>
      <div>영화 아이디는 : {idx} 입니다</div>
      <div></div>
    </>
  );
}
