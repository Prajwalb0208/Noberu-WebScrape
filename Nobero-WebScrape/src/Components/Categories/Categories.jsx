import React, { useEffect, useState } from 'react';
import './Categories.css';
import { assets } from '../../assets/assets';

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const images = [assets.cat2, assets.cat6, assets.cat5, assets.cat1, assets.cat4, assets.cat3];

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => {
        const uniqueCategories = [
          { name: 'All Men Dresses', id: 'all', image: assets.catall },
          ...Array.from(new Set(data.map(product => product.category)))
            .map((category, index) => ({
              name: category,
              id: category,
              image: images[index % images.length],
            }))
        ];
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
  };

  return (
    <div className='category' id='category'>
      <h1>Men Categories</h1>
      <div className="category-list">
        {categories.map(({ id, name, image }) => (
          <div
            key={id}
            onClick={() => handleCategoryClick(id)}
            className={`category-item ${selectedCategory === id ? 'selected' : ''}`}
          >
            <img src={image} alt={name} />
            <p>{name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default Categories;
