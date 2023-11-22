import ContentInfo from "../Components/ContentDetails/ContentInfo";
import ReviewInfo from "../Components/ContentDetails/ReviewInfo";
import ContentScoreInfo from '../Components/ContentDetails/ContentScoreInfo';

const ContentDetail = () => {
  return (
    <div className="w-full m-auto mt-10 px-36" style={{ backgroundColor: "#2c2c2c" }}>
      <ContentInfo />
      <ContentScoreInfo />
      <ReviewInfo />
    </div>
  );
};

export default ContentDetail;
