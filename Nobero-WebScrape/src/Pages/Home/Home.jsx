import React, { useState } from 'react';
import Categories from '../../Components/Categories/Categories';
import AllProducts from '../../Components/AllProducts/AllProducts';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div>
      <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <AllProducts selectedCategory={selectedCategory} />
    </div>
  );
};

export default Home;
