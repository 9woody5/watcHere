import Modal from 'react-modal';
import React, {useRef, useState} from 'react';
import YouTube from 'react-youtube';

import StarRating from './StarRating';

// DeleteConfirm Modal
const deleteModalStyles = {
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
      style={deleteModalStyles}
    >
      <h2 className='text-center'>정말 신고하시겠습니까?</h2>
      <div className='flex justify-around mt-3' >
        <button className='px-5 py-2 hover:bg-gray-300' onClick={onDelete}>Yes</button>
        <button className='px-5 py-2 hover:bg-gray-300' onClick={onRequestClose}>Cancel</button>
      </div>
    </Modal>
  );
}



// ReviewInput Modal
const reviewInputModalStyles = {
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
    width: "500px",
    height: "250px",
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

const ReviewInputModal = ({ isOpen, onRequestClose, onSubmit, handleUserScore, handleUserReview }) => {
  const textAreaRef = useRef('');
  let timerId = undefined;

  function debounce(func, timeout = 300) {
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation"
      ariaHideApp={false}
      style={reviewInputModalStyles}
    >
      <h2 className='text-center mb-3'>리뷰작성</h2>
      <StarRating handleUserScore={handleUserScore}/>
      {/* <textarea ref={textAreaRef} placeholder="리뷰를 작성해주세요" className="my-5 textarea textarea-bordered textarea-lg align-middle" 
        onChange={() => debounce(()=>{
          handleUserReview(textAreaRef.current.value)})()}></textarea> */}
      <textarea ref={textAreaRef} placeholder="리뷰를 작성해주세요" className="my-5 textarea textarea-bordered textarea-lg align-middle" 
        onChange={() => handleUserReview(textAreaRef.current.value)}></textarea>
      <div className='flex justify-around mt-3' >
        <button className='px-5 py-2 hover:bg-gray-300' onClick={onSubmit}>submit</button>
        <button className='px-5 py-2 hover:bg-gray-300' onClick={onRequestClose}>Cancel</button>
      </div>
    </Modal>
  );
}


// ReviewInput Modal
const trailerVideoModalStyles = {
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
    width: "900px",
    height: "560px",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    display: 'flex',
    flexDirection: 'column',
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "black",
    justifyContent: "space-between",
    overflow: "auto",
  },
};

const TrailerVideoModal = ({ isOpen, onRequestClose, youtubeId }) => {
  // const [videoId, setVideoId] = useState(youtubeId);

  const opts = {
    height: '480',
    width: '800',
    playerVars: {
      autoplay: 1,
    },
  };
  console.log('youtubeId:', youtubeId)
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="show trailerVideo"
      ariaHideApp={false}
      style={trailerVideoModalStyles}
    >
      <button className='text-white' onClick={onRequestClose}>Close Modal</button>
      <YouTube className='flex justify-center' videoId={youtubeId} opts={opts} />
    </Modal>
  );
}

export {DeleteModal, ReviewInputModal, TrailerVideoModal}