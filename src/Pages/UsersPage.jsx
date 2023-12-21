import UsersProfile from "../Components/Users/UsersProfile";
import UsersBookmark from "../Components/Users/UsersBookmark";
<<<<<<< HEAD
import UsersReview from "../Components/Users/UsersReview";

const UsersPage = () => {
  return (
    <div className=" w-[full] h-[full]">
=======
import UsersReviewInfo from "../Components/Users/UserReviewInfo";

const UsersPage = () => {
  return (
    <div className=" w-[full] h-[full] font-pretendard">
>>>>>>> 0a8094c027b3d11969c640fbf7a375981643a86d
      <section className="flex flex-col items-center justify-center text-white mt-9">
        <UsersProfile />
      </section>
      <section className="flex flex-col items-center justify-center mt-5">
        <UsersBookmark />
      </section>
<<<<<<< HEAD
      <section className="flex flex-col items-center justify-center mt-5">
        <UsersReview />
=======
      <section className="mt-5">
        <UsersReviewInfo />
>>>>>>> 0a8094c027b3d11969c640fbf7a375981643a86d
      </section>
    </div>
  );
};

export default UsersPage;
