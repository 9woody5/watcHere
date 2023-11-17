const UsersProfile = () => {
  return (
    <section className="border border-white rounded-sm bg-custom-middle-gray w-[60%] h-[auto] ">
      <div className="profile-setting"></div>
      <div className="user-profile flex justify-center font-normal text-center text-sm h-24 text-white">
        <div className="user-profile-photo"></div>
        <div className="user-profile-name">
          <h2>유저 닉네임 : EliceRabbit</h2>
          <p>유저 이메일 : elise@elise.com</p>
        </div>
      </div>
    </section>
  );
};

export default UsersProfile;
