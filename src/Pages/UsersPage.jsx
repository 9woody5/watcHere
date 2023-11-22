import UsersProfile from "../Components/Users/UsersProfile";
import UsersBookmark from "../Components/Users/UsersBookmark";
import UsersReview from "../Components/Users/UsersReview";

const UsersPage = () => {
  return (
    <div className=" w-[full] h-[full]">
      <section className="flex flex-col items-center justify-center text-white mt-9">
        <UsersProfile />
      </section>
      <section className="flex flex-col items-center justify-center mt-5">
        <UsersBookmark />
      </section>
      <section className="flex flex-col items-center justify-center mt-5">
        <UsersReview />
      </section>
    </div>
  );
};

export default UsersPage;
