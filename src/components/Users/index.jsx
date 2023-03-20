import React from 'react';
import User from '../User';
import PreLoader from '../PreLoader';
import './users.scss';

const Users = ({ users, loaded, setOffset }) => {
  return (
    <div className='users'>
      <div className="users__title title">Working with GET request</div>
      <div className="users__inner">
        {!loaded ? <PreLoader /> : users.map(user => <User key={user.id} user={user} />)}
      </div>
      {users.length < 73 && <button onClick={() => setOffset(prev => prev + 6)} className='users__button button'>Show more</button>}
    </div>
  )
}

export default Users
