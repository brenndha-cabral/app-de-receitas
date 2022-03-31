import React from 'react';

function ProgressFoods() {
  useEffect(() => {
    document.title = 'All Tasty | Progress';
  }, []);

  return (
    <div>
      <h1>ProgressFoods</h1>
    </div>
  );
}

export default ProgressFoods;
