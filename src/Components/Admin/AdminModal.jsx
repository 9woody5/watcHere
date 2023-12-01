/// 네트워크 라이브러리
import { DelDataJwt, PutGetResponse } from "../../Network/Connect";
import connect from "../../Network/Connect.json";

/**
 *
 * @param {Number} activate 유저 현재 상태
 * @param {string} email  유저의 이메일
 * @param {string} nick_name 유저의 닉네임
 * @returns
 *
 * 이 모달은 관리자가 유저 상태를 정지시키거나 정지를 해제할 때 최종 알림창으로 사용
 *
 */
export function ChangeUserStateModal({ props, getUserList }) {
  const { user_id, email, nickname, ban } = props;

  const putUserActivateStatus = async (uid, bool) => {
    let queryString = `user_id=${uid}&ban=${bool}`;
    await PutGetResponse(
      connect["mainUrl"] + connect["adminUserBan"] + "?" + queryString
    );
    getUserList();
  };

  return (
    <dialog id="changeUserStateModal" className="modal">
      <div className="modal-box text-black bg-white">
        <h3 className="font-bold text-lg">계정 상태를 변경합니다.</h3>
        <div className="py-4">
          <div className="p-2 text-xl">
            현재 변경하려는 계정의 정보는 다음과 같습니다.
          </div>
          <div className="p-2">이메일 : {email}</div>
          <div className="p-2">닉네임 : {nickname}</div>
          <div className="p-2">현재 상태 : {ban ? "정지" : "활동 중"}</div>
          <div className="p-2 text-xl text-red-600 font-semibold">
            {ban === false && "계정을 정지하시겠습니까?"}
            {ban === true && "계정정지를 해제하시겠습니가?"}
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn btn-outline btn-warning"
              onClick={() => putUserActivateStatus(user_id, !ban)}
            >
              변경하기
            </button>
            <button className="btn btn-outline btn-accent ml-4">닫기</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
/**
 *
 * @param {Number} activate 유저 현재 상태
 * @param {string} email  유저의 이메일
 * @param {string} nick_name 유저의 닉네임
 * @returns
 *
 * 이 모달은 관리자가 유저의 정보를 확인하는 모달
 * 반응형에서 레이아웃에 데이터가 다 나오지 않아 작성
 *
 */

export function CheckUserInfoModal({ props }) {
  const { email, nickname, ban } = props;

  return (
    <dialog id="checkUserInfoModal" className="modal ">
      <div className="modal-box bg-white text-black">
        <div className="font-bold text-2xl ">계정 상태를 확인 합니다.</div>
        <div className="py-4">
          <div className="p-2 text-xl">
            현재 확인중인 계정의 정보는 다음과 같습니다.
          </div>
          <div className="p-2">이메일 : {email}</div>
          <div className="p-2">닉네임 : {nickname}</div>
          <div className="p-2">현재 상태 : {ban ? "정지" : "활동 중"}</div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn btn-outline btn-warning"
              onClick={() =>
                document.getElementById("changeUserStateModal").showModal()
              }
            >
              변경하기
            </button>
            <button className="btn btn-outline btn-accent ml-4">닫기</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
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
export function DeleteUserReview({ props, getReviewList }) {
  const { detail, likes, reports, created_at, author, id } = props;
  console.log(created_at);
  const delUserReview = async () => {
    const response = await DelDataJwt(
      connect.mainUrl + connect.adminReviewDel.replace("{id}", id)
    );
    if (response.status === 200) {
      await getReviewList();
    }
  };

  return (
    <dialog id="deleteUserReview" className="modal">
      <div className="modal-box bg-white text-black">
        <div className="font-bold text-lg">리뷰를 확인합니다.</div>
        <div className="py-4">
          <div className="p-2 text-xl">
            현재 확인하는 리뷰의 정보는 다음과 같습니다.
          </div>
          <div className="p-2">이메일 : {author?.email}</div>
          <div className="p-2">닉네임 : {author?.nickname}</div>
          <div className="p-2">좋아요 횟수 : {likes}</div>
          <div className="p-2">신고 횟수 : {reports}</div>

          <div className="p-2">작성 리뷰 : {detail}</div>
          <div className="p-2 pl-10">{}</div>
          <div className="p-2">작성일: {created_at}</div>
          <div className="p-2 text-red-600 text-xl font-semibold">
            삭제하시겠습니까?
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn btn-outline btn-warning"
              onClick={() => delUserReview(id)}
            >
              삭제하기
            </button>
            <button className="btn btn-outline btn-accent ml-4">닫기</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
