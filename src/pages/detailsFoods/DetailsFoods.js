import React, { useEffect } from 'react';

function DetailsFoods() {
  useEffect(() => {
    document.title = 'All Tasty | Details Food';
  }, []);

  return (
    <div>
      <h1>DetailsFoods</h1>
    </div>
  );
}

export default DetailsFoods;
