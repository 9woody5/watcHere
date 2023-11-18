/**
 *
 * @param {Number} reports 다른사람에게 신고당한 횟수
 * @param {String} review 작성한 리뷰 내용
 * @param {String} nick_name 해당 계정의 닉네임
 * @param {String} email 해당 계정의 이메일
 * @param {Date} write_date  해당 리뷰의 작성일
 *
 * @returns
 *
 * 유저 리뷰 삭제용 모달
 */
export function AddedFavoritesModal({ props }) {
  const postFavorites = async (movieId) => {
    let jsonData = {};
    jsonData["movieId"] = movieId;
    console.log("데이터 전송 준비");
    // const response = await PostData("url", JSON.stringify(jsonData));
    // console.log(response);
  };
  const { email, nick_name, reports, review, write_date } = props;
  return (
    <dialog id="addFavoritesModal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">즐겨찾기</h3>
        <p className="py-4">
          <div>즐겨찾기 목록에 추가 되었습니다.</div>
        </p>
        <div className="modal-action">
          <form method="dialog">
            {/* <button
              className="btn1"
              onClick={() => delUserReview("userId, reviewId")}
            >
              삭제하기
            </button> */}
            <button className="btn">닫기</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
