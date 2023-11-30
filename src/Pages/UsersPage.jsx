import UsersProfile from "../Components/Users/UsersProfile";
import UsersBookmark from "../Components/Users/UsersBookmark";
import UsersReviewInfo from "../Components/Users/UserReviewInfo";

const UsersPage = () => {
  return (
    <div className=" w-[full] h-[full] font-pretendard">
      <section className="flex flex-col items-center justify-center text-white mt-9">
        <UsersProfile />
      </section>
      <section className="flex flex-col items-center justify-center mt-5">
        <UsersBookmark />
      </section>
      <section className="mt-5">
        <UsersReviewInfo />
      </section>
    </div>
  );
};

export default UsersPage;
