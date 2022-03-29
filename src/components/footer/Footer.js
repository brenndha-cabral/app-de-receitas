import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <input
        type="image"
        alt="drink icon"
        src={ drinkIcon }
        onClick={ () => history.push('/drinks') }
        data-testid="drinks-bottom-btn"
      />
      <input
        type="image"
        alt="explore icon"
        src={ exploreIcon }
        onClick={ () => history.push('/explore') }
        data-testid="explore-bottom-btn"
      />
      <input
        type="image"
        alt="meal icon"
        src={ mealIcon }
        onClick={ () => history.push('/foods') }
        data-testid="food-bottom-btn"
      />
    </footer>
  );
}

export default Footer;
