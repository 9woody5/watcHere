import Modal from 'react-modal';
import React from 'react';

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

const ReviewInputModal = ({ isOpen, onRequestClose, onDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation"
      ariaHideApp={false}
      style={reviewInputModalStyles}
    >
      <h2 className='text-center'>리뷰작성</h2>
      <textarea placeholder="리뷰를 작성해주세요" className="my-5 textarea textarea-bordered textarea-lg align-middle" ></textarea>
      <div className='flex justify-around mt-3' >
        <button className='px-5 py-2 hover:bg-gray-300' onClick={onDelete}>submit</button>
        <button className='px-5 py-2 hover:bg-gray-300' onClick={onRequestClose}>Cancel</button>
      </div>
    </Modal>
  );
}

export {DeleteModal, ReviewInputModal}