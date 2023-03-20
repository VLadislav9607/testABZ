import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './signup.scss';

const SignUp = ({ setOpenModal, setMessage, getUsers }) => {
  const [radioButtons, setRadioButtons] = React.useState([]);
  const [checkRadioBtn, setCheckRadioBtn] = React.useState("Lawyer");
  const [selectFile, setSelectFile] = React.useState(null);
  const [sizePhoto, setSizePhoto] = React.useState(0)
  const [token, setToken] = React.useState('');
  const { register, formState: { errors, isValid }, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      phone: '+380',
    }
  });

  React.useEffect(() => {
    (async () => {
      try {
        await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`)
          .then(res => {
            setRadioButtons(res.data.positions);
          });
        await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token')
          .then(res => {
            setToken(res.data.token);
          });

      } catch (error) {
        alert('Помилка сервера');
        console.error(error)
      }
    })();
  }, []);

  const handleRadioBtn = (e) => {
    const position = e.target.value;
    setCheckRadioBtn(position);
  };

  const isCheck = (value) => {
    return checkRadioBtn === value;
  };

  const handleFile = (e) => {
    if (e.target.files[0].size > 5000000) {
      setSizePhoto(e.target.files[0].size)
      return
    }
    setSelectFile(e.target.files[0]);
    setSizePhoto(0)

  }

  const onSubmit = async (dataUser) => {

    const newUser = new FormData();
    newUser.append('position_id', 1);
    newUser.append('name', dataUser.name);
    newUser.append('email', dataUser.email);
    newUser.append('phone', dataUser.phone);
    newUser.append('photo', selectFile);
    try {
      await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
        method: 'POST',
        body: newUser,
        headers: {
          'Token': token,
        }
      })
        .then(res => {
          const json = res.json();
          return json
        })
        .then(data => {
          if (data.success) {
            setOpenModal(true);
            getUsers();
          } else {
            setMessage('User with this phone or email already exist');
            setOpenModal(true);
          }
        })
    } catch (error) {
      alert('Помилка сервера');
      console.error(error);
    }
  }

  return (
    <div className='signup'>
      <h2 onClick={() => setOpenModal(true)} className="signup__title title">Working with POST request</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='signup__form' method='post'>
        <div className="signup__inputs">
          <input
            {...register('name', {
              required: 'Required field',
              minLength: {
                value: 3,
                message: 'at least 3 characters'
              },
              maxLength: {
                value: 60,
                message: 'maximum 60 characters'
              },
            })}
            className={`signup__input ${errors.name && 'error'}`}
            type="text"
            placeholder='Your name'
            name='name'
          />
          <div className='error__message'>{errors.name && <p>{errors.name.message}</p>}</div>
          <input
            {...register('email', {
              required: 'Required field',
              pattern: {
                value: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i,
                message: 'jhon@example.com'
              },
              minLength: {
                value: 3,
                message: 'at least 3 characters'
              },
              maxLength: {
                value: 100,
                message: 'maximum 100 characters'
              }
            })}
            className={`signup__input ${errors.email ? 'error' : ''}`}
            type="email"
            placeholder='Email'
            name='email'
          />
          <div className='error__message'>{errors.email && <p>{errors.email.message || errors.email.type.message}</p>}</div>
          <input
            {...register('phone', {
              required: 'Required field',
              pattern: /^[\+]{0,1}380([0-9]{9})$/i,
            })}
            className={`signup__input ${errors.phone && 'error'}`}
            type="text"
            placeholder='Phone'
            name='phone'
          />
          <div className={`phone__message ${errors.phone?.type === 'pattern' && 'phone__error'}`}><p>{'+38 (XXX) XXX - XX - XX'}</p></div>
        </div>
        <div className="signup__radio">
          <h5 className="signup__radio__title">Select your position</h5>
          <div className="signup__radio__buttons">
            {radioButtons.map(radio => (
              <label key={radio.id} className='signup__radio__wrapper'>
                <input
                  className='signup__radio__btn'
                  type="radio"
                  name='developer'
                  value={radio.name}
                  checked={isCheck(radio.name)}
                  onChange={handleRadioBtn}
                />
                <span className='signup__radio__style'></span>
                {radio.name}
              </label>
            ))}
          </div>
        </div>
        <div className={`signup__upload ${errors.upload && 'error'}`}>
          <input
            {...register('upload', {
              required: 'Add your photo'
            })}
            id="file"
            className={`signup__upload__input ${errors.upload && 'error__upload'}`}
            type="file"
            name='file'
            onChange={(e) => handleFile(e)}
            accept="image/*,.jpg,.jpeg,"
          />
          <label className='signup__upload__label' htmlFor="file">Upload</label>
          {selectFile ? selectFile.name : 'Upload your photo'}
        </div>
        <div className='error__message'>{sizePhoto > 5000000 && <p>{'The photo size must not be greater than 5 Mb.'}</p>}</div>
        <div className='error__message'>{errors.upload && <p>{errors.upload.message}</p>}</div>
        <button
          className='signup__btn button'
          type="submit"
          disabled={!isValid}
        >
          Sign up
        </button>
      </form>
    </div>
  )
}

export default SignUp
