import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import {
  requestIngredientFood,
  requestNameFood,
  requestfirstLetterFood,
  requestIngredientDrink,
  requestNameDrink,
  requestfirstLetterDrink,
} from '../../services/requestApi';
import './header.css';

function Header(props) {
  const { searchButtonIsVisible, title, aboutDrink } = props;

  // Referência useHistory() | Link: https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page

  const history = useHistory();

  const [inputIsVisible, setInputIsVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  const toggleSearch = () => {
    setInputIsVisible(!inputIsVisible);
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const handleFilter = ({ target }) => {
    const { checked, id } = target;
    setCategory(checked && id);
  };

  const searchByClick = async () => {
    let response;
    if (aboutDrink) {
      switch (category) {
      case 'ingredient':
        response = await requestIngredientDrink(search);
        break;
      case 'name':
        response = await requestNameDrink(search);
        break;
      case 'first-letter':
        if (search.length <= 1) {
          response = await requestfirstLetterDrink(search);
        } else {
          global.alert('Your search must have only 1 (one) character');
        }
        break;
      default:
        break;
      }
    } else {
      switch (category) {
      case 'ingredient':
        response = await requestIngredientFood(search);
        break;
      case 'name':
        response = await requestNameFood(search);
        break;
      case 'first-letter':
        if (search.length <= 1) {
          response = await requestfirstLetterFood(search);
        } else {
          global.alert('Your search must have only 1 (one) character');
        }
        break;
      default:
        break;
      }
    }
    return response;
  };

  return (
    <header>
      <div>
        <button
          className="profile-picture"
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile"
          />
        </button>
        <h1 data-testid="page-title">{ title }</h1>
        { searchButtonIsVisible && (
          <button
            className="search-button"
            type="button"
            onClick={ toggleSearch }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Search magnifying glass"
            />
          </button>
        )}
      </div>
      { inputIsVisible && (
        <div>
          <input
            id="search"
            name="search"
            type="search"
            onChange={ handleChange }
            data-testid="search-input"
          />
          <label htmlFor="ingredient">
            <input
              id="ingredient"
              name="category"
              type="radio"
              onClick={ handleFilter }
              data-testid="ingredient-search-radio"
            />
            Ingredient
          </label>
          <label htmlFor="name">
            <input
              id="name"
              name="category"
              type="radio"
              onClick={ handleFilter }
              data-testid="name-search-radio"
            />
            Name
          </label>
          <label htmlFor="first-letter">
            <input
              id="first-letter"
              name="category"
              type="radio"
              onClick={ handleFilter }
              data-testid="first-letter-search-radio"
            />
            First Letter
          </label>
          <button
            type="button"
            onClick={ searchByClick }
            data-testid="exec-search-btn"
          >
            Search
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;

Header.propTypes = {
  searchButtonIsVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  aboutDrink: PropTypes.bool.isRequired,
};
