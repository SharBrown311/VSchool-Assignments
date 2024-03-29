import React from 'react'
import Auth from './Auth'
function Modal({isOpen, closeModal, children}) {
  if(!isOpen) return null;


  return (
    <div className='Modal'>
      <div className='modal-content'>
      <button onClick={closeModal}>X</button>
        {children}
        
      </div>
    </div>
  )
}

export default Modal