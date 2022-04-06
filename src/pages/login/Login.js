import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validateForm from '../../helpers/validateForm';
import { setInfoUser } from '../../redux/actions';
import '../css/login.css';
import imageLogin from '../../images/image-login.png';

function Login(props) {
  useEffect(() => {
    document.title = 'All Tasty | Login';
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const setTokensLocalStorage = () => {
    const { email } = formData;
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  const hadleSubmit = (event) => {
    event.preventDefault();
  };

  const { loginInformations, history } = props;

  return (
    <section className="container-login">
      <h1 className="title-login">All Tasty</h1>
      <form className="form-login">
        <label className="label-email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            className="email"
            placeholder="Email"
            required
            onChange={ handleChange }
            data-testid="email-input"
          />
        </label>
        <label className="label-password" htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            className="password"
            placeholder="Password"
            required
            onChange={ handleChange }
            data-testid="password-input"
          />
        </label>

        <button
          type="button"
          className="button-login"
          disabled={ !validateForm(formData) }
          onClick={ (event) => {
            loginInformations(formData);
            hadleSubmit(event);
            setTokensLocalStorage();
            history.push('/foods');
          } }
          data-testid="login-submit-btn"
        >
          Login
        </button>
      </form>
      <img className="chef-hat" src={ imageLogin } alt="chef-hat" />
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  loginInformations: (stateUser) => {
    dispatch(setInfoUser(stateUser));
  },
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  loginInformations: PropTypes.func.isRequired,
};
