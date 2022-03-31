import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { requestAllFoodsIngredients, requestAllFoodsIngredientsImages,
} from '../../services/requestApi';

const NUMBER_TWELVE = 12;

function Ingredients() {
  useEffect(() => {
    document.title = 'All Tasty | Ingredients';
  }, []);

  const [ingredients, setIngredients] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      const allIngredients = await requestAllFoodsIngredients();

      const twelveIngredients = allIngredients
        .filter((_item, index) => index < NUMBER_TWELVE);
      setIngredients(twelveIngredients);

      twelveIngredients.forEach(async (ingredient) => {
        const { strIngredient } = ingredient;
        const image = await requestAllFoodsIngredientsImages(strIngredient);
        console.log(image);
        setImages();
        // setImages((prev) => [...prev.images, image]);
      });
    };

    getIngredients();
  }, []);

  if (ingredients.length === 0) return null;

  console.log(images);

  return (
    <div>
      <Header searchButtonIsVisible={ false } title="Explore Ingredients" />
      { ingredients.map((ingredient, index) => (
        <div
          key={ ingredient.idIngredient }
          data-testid={ `${index}-ingredient-card` }
        />
      )) }
      <Footer />
    </div>
  );
}

export default Ingredients;
