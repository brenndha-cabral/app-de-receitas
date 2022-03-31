import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Nationalities() {
  useEffect(() => {
    document.title = 'All Tasty | Nationalities';
  }, []);

  return (
    <div>
      <Header searchButtonIsVisible title="Explore Nationalities" />
      <Footer />
    </div>
  );
}

export default Nationalities;
