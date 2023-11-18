import ContentInfo from "../Components/ContentDetails/ContentInfo";
import ReviewInfo from "../Components/ContentDetails/ReviewInfo";

const ContentDetail = () => {
  return (
    <div className="w-full m-auto mt-10 px-36" style={{ backgroundColor: "#2c2c2c" }}>
      <ContentInfo />
      <ReviewInfo />
    </div>
  );
};

export default ContentDetail;
