import React, { useEffect } from 'react';

function DetailsDrinks() {
  useEffect(() => {
    document.title = 'All Tasty | Details Drink';
  }, []);

  return (
    <div>
      <h1>DetailsDrinks</h1>
    </div>
  );
}

export default DetailsDrinks;
