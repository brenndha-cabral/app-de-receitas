import React, { useEffect } from 'react';

function ProgressDrinks() {
  useEffect(() => {
    document.title = 'All Tasty | Progress';
  }, []);

  return (
    <div>
      <h1>ProgressDrinks</h1>
    </div>
  );
}

export default ProgressDrinks;
