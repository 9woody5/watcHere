import React, {useState} from 'react';
import Modal from 'react-modal';
import { AiFillStar } from 'react-icons/ai';

const customModalStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "300px",
    height: "120px",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    display: 'flex',
    flexDirection: 'column',
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
  },
};

const DeleteModal = ({ isOpen, onRequestClose, onDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation"
      ariaHideApp={false}
      style={customModalStyles}
    >
      <h2 className='text-center'>정말 신고하시겠습니까?</h2>
      <div className='flex justify-around mt-3' >
        <button className='px-5 py-2 hover:bg-gray-300' onClick={onDelete}>Yes</button>
        <button className='px-5 py-2 hover:bg-gray-300' onClick={onRequestClose}>Cancel</button>
      </div>
    </Modal>
  );
}

function Review({review}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleDelete = () => {
    // 여기에서 게시물 삭제 로직을 수행합니다.
    // onDelete(post.id);
    console.log('신고완료하였습니다!');
    closeModal();
  };
  const convertString2Number = (scoreString) => {
    try{
      return parseInt(scoreString);
    }
    catch{
      return 0;
    }
  }

  console.log('review', review)
  return (
    <div className='w-full my-4 flex'>

      <div className='w-3/4 flex flex-col' id='review-box'>
        <div className='flex items-center' id='review-info-box'>
          <img className='w-8 mx-2 rounded-full' src={review.userImg} alt="" />
          <div className='text-lg'>{review.userName}</div>
        </div>
        <div className='my-3 text-base' id='review-text'>{review.text}</div>
        <div className='text-xs' id='date'>{String(review.date)}</div>
      </div>
      
      <div className='w-1/4 flex flex-col' id='review-active-box'>
        <div className='' id='review-score'>{[1,2,3,4,5].map((index)=>(
          <AiFillStar className= {`inline-block text-2xl ${convertString2Number(review.score)>=index? 'text-yellow-200': 'text-white'} text-2xl`} /> ))}
          
        </div>
        <div className='' id='review-manage-box'>
          <button className='m-3 bg-orange-500 hover:bg-orange-500/60 text-white font-bold py-2 px-4 rounded'
          onClick={openModal}
          >신고하기</button>
        </div>
      </div>

      <DeleteModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onDelete={handleDelete}
      />

    </div>
  )
}

export default Review;