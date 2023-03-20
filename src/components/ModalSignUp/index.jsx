import React from 'react';
import successImg from './../../img/success-image.svg';
import './modalSignUp.scss';

const ModalSignUp = ({ openModal, setOpenModal, message }) => {
  return (
    <div className={`success__modal ${openModal && 'active__modal'}`} onClick={() => setOpenModal(false)}>
      <div className={`success__modal__wrapper ${openModal && 'active'}`}>
        <h3 className="success__modal__title title">{message ? message : 'User successfully registered'}</h3>
        {!message && <img style={{ margin: '0 auto' }} src={successImg} alt="success__modal" />}
      </div>
    </div>
  )
}

export default ModalSignUp
