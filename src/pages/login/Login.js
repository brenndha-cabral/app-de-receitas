import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validateForm from '../../helpers/validateForm';
import { setInfoUser } from '../../redux/actions';

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
    <section>
      <h1>login</h1>
      <form>
        <label htmlFor="email">
          E-mail:
          <input
            id="email"
            name="email"
            type="email"
            required
            onChange={ handleChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            name="password"
            type="password"
            required
            onChange={ handleChange }
            data-testid="password-input"
          />
        </label>

        <button
          type="button"
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
