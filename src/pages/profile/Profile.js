import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Profile() {
  return (
    <div>
      <Header searchButtonIsVisible={ false } title="Profile" />
      <Footer />
    </div>
  );
}

export default Profile;
