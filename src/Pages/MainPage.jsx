import MainSearchBar from "../Components/Main/MainSearchBar";
import MainContent from "./../Components/Main/MainContent";

const MainPage = () => {
  return (
    <>
      <MainSearchBar />
      <MainContent numberOfContent={30} />
    </>
  );
};

export default MainPage;
