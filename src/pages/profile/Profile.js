import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Profile(props) {
  useEffect(() => {
    document.title = 'All Tasty | Profile';
  }, []);

  const { history } = props;

  const [email, setEmail] = useState('');

  useEffect(() => {
    const getLocalStorage = () => {
      setEmail(JSON.parse(localStorage.getItem('user')).email);
    };
    getLocalStorage();
  }, []);

  return (
    <div>
      <Header searchButtonIsVisible={ false } aboutDrink={ false } title="Profile" />
      <section>
        <span data-testid="profile-email">{ email }</span>
        <div>
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => {
              history.push('/');
              localStorage.clear();
            } }
          >
            Logout
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
