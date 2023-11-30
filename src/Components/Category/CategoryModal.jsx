import { MdOutlineCancel } from "react-icons/md";
import errorImg from "../../assets/img/no_img.png";
function TextLineSplitter(text) {
  const parts = text.split(":");

  const divs = parts.map((part, index) => <div key={index}>{part}</div>);

  return divs;
}

/**
 * 카테고리에서 즐겨찿기에 등록할때 사용하는 모달
 * dialog id 를 카드의 uid 를 받아서 고유화 시키는데 이게 더미데이터에서는 id 값이 유니크하지 않고
 * 돌려쓰기 때문에 의도하지 않은 부분에서 화면 깜빡임이 생기게 된다.
 * 수정은 card.jsx 와 categorymodal양쪽을 고쳐줘야한다.
 *
 */
export function AddedFavoritesModal({ props }) {
  const { title, name, poster_path, id } = props;

  const handleImgError = (e) => {
    e.target.src = errorImg;
  };

  return (
    <dialog id={"addFavoritesModal" + id} className="modal">
      <div className="modal-box bg-white text-black">
        <form method="dialog">
          <button className="rounded-full absolute right-5 top-5 focus:outline-none">
            <MdOutlineCancel className="text-5xl" />
          </button>
        </form>
        <div className="font-bold text-3xl">즐겨찾기</div>
        <div className="flex items-center justify-center ">
          <img
            src={poster_path}
            loading="lazy"
            alt=""
            onError={handleImgError}
          />
        </div>

        <div className="text-3xl font-bold p-2 mx-5">
          {title !== undefined
            ? TextLineSplitter(title)
            : TextLineSplitter(name)}
        </div>
        <div className="mt-2 text-xl font-semibold">
          즐겨찾기 목록에 추가 되었습니다.
        </div>
        <div className="modal-action"></div>
      </div>
    </dialog>
  );
}
