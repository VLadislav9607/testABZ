import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import './user.scss';

const User = ({ user }) => {
  const { name, email, phone, photo, position } = user;

  return (
    <div className='user'>
      <img className='user__avatar' src={photo} alt={name} />
      <h4 className="user__name">{name}</h4>
      <p className="user__desc">{position}</p>
      <a href={`tel:${phone}`} className="user__desc">{phone}</a>
      <Tooltip title={email}>
        <a href='mail' className="user__desc">{email}</a>
      </Tooltip>
    </div>
  )
}

export default User
