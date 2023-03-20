import React from 'react';
import axios from 'axios';
import Header from './components/Header'
import Users from './components/Users';
import SignUp from './components/SignUp';
import ModalSignUp from './components/ModalSignUp';
import './scss/app.scss';

function App() {
  const [users, setUsers] = React.useState([]);
  const [offset, setOffset] = React.useState(6);
  const [loaded, setLoaded] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const getUsers = async () => {
    try {
      await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${String(offset)}`)
        .then(res => {
          setUsers(res.data.users);
          setLoaded(true);
        });
    } catch (error) {
      alert('Помилка сервера');
      console.error(error)
    }
  }

  React.useEffect(() => {
    getUsers();
  }, [offset]);

  return (
    <div className="App">
      <Header />
      <main className='main'>
        <div className="head">
          <div className="container">
            <div className="head__content">
              <h1 className="head__content__title">Test assignment for front-end developer</h1>
              <p className="head__content__text">What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with
                a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be
                excited to learn, as the world of Front-End Development keeps evolving.
              </p>
              <button className="head__content__button button">Sign up</button>
            </div>
          </div>
        </div>
        <div className="container">
          <Users users={users} loaded={loaded} setOffset={setOffset} />
          <SignUp setOpenModal={setOpenModal} setMessage={setMessage} getUsers={getUsers} />
        </div>
      </main>
      <ModalSignUp openModal={openModal} setOpenModal={setOpenModal} message={message} />
    </div>
  );
}

export default App;
