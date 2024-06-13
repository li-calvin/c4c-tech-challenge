import React from 'react';

function Popup({ children, onClose }) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          {children}
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }
  

export default Popup;


