import ContentInfo from "../Components/ContentDetails/ContentInfo";
import ReviewInfo from "../Components/ContentDetails/ReviewInfo";

const ContentDetail = () => {
  return (
    <div className='w-full h-full bg-black'>
      <ContentInfo className='h-fit' />
      <ReviewInfo/>
    </div>
  );
};

export default ContentDetail;
