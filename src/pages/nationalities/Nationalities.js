import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { requestArea } from '../../services/requestApi';

const NUMBER_TWELVE = 12;

function Nationalities() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const requestNationalities = async () => {
      const allAreas = await requestArea();
      const twelveAreasObj = allAreas.filter((_item, index) => index < NUMBER_TWELVE);
      const twelveAreas = twelveAreasObj.map((areaObj) => areaObj.strArea);
      setAreas(twelveAreas);
    };

    requestNationalities();
  }, []);

  if (areas.length === 0) return null;

  return (
    <div>
      <Header searchButtonIsVisible title="Explore Nationalities" />
      <select data-testid="explore-by-nationality-dropdown">
        { areas.map((area) => (
          <option
            key={ area }
            data-testid={ `${area}-option` }
          >
            { area }
          </option>
        )) }
      </select>
      <Footer />
    </div>
  );
}

export default Nationalities;
