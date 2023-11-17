import ContentInfo from "../Components/ContentDetails/ContentInfo";
import ReviewInfo from "../Components/ContentDetails/ReviewInfo";

const ContentDetail = () => {
  return (
    <div className='w-11/12 m-auto mt-10' style={{backgroundColor: '#2c2c2c'}}>
      <ContentInfo className='h-fit' />
      <ReviewInfo/>
    </div>
  );
};

export default ContentDetail;
