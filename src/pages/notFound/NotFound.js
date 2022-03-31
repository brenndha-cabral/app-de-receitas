import React, { useEffect } from 'react';

function NotFound() {
  useEffect(() => {
    throw new Error('Not Found');
  }, []);

  return (
    <div>Not Found</div>
  );
}

export default NotFound;
