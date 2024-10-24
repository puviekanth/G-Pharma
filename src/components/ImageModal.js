// ImageModal.js
import React from 'react';
import './ImageModal.css'; // You can add styles for the modal here

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <img src={imageUrl} alt="Selected" className="modal-image" />
      </div>
    </div>
  );
};

export default ImageModal;