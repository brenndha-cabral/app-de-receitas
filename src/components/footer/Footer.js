import React from 'react';
import { useHistory } from 'react-router-dom';
//  import PropTypes from 'prop-types';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <buttom
        onClick={ () => history.push('/drinks') }
        type="button"
        data-testid="drinks-bottom-btn"
      >
        <img src={ drinkIcon } alt="" />
      </buttom>
      <buttom
        onClick={ () => history.push('/explore') }
        type="button"
        data-testid="explore-bottom-btn"
      >
        <img src={ exploreIcon } alt="" />
      </buttom>
      <buttom
        onClick={ () => history.push('/foods') }
        type="button"
        data-testid="food-bottom-btn"
      >
        <img src={ mealIcon } alt="" />
      </buttom>
    </footer>
  );
}

/* Footer.propTypes = {
  history: PropTypes.func.isRequired,
}; */

export default Footer;
