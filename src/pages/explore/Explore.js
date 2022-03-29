import React from 'react';
import { useHistory } from 'react-router-dom';

function Explore() {
  const history = useHistory();

  return (
    <div>
      <button
        type="button"
        onClick={ () => history.push('/explore/foods') }
        data-testid="explore-foods"

      >
        Explore Foods

      </button>
      <button
        type="button"
        onClick={ () => history.push('/explore/drinks') }
        data-testid="explore-drinks"
      >
        Explore Drinks

      </button>
    </div>
  );
}

export default Explore;
