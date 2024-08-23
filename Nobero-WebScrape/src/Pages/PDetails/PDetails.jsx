import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PDetails.css';
import { assets } from '../../assets/assets';

const PDetails = () => {
  const { productTitle } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => {
        const selectedProduct = data.find(
          (p) => p.title.toLowerCase().split(' ').join('-') === productTitle
        );
        setProduct(selectedProduct);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [productTitle]);

  if (!product) return <p>Loading...</p>;

  const categoryImage = assets.catall || product.image;
  // const categoryImage = assets[product.category] || product.image;
  console.log(categoryImage); // Check the path


  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };
  const availableSizes = product.available_skus.find(
    (sku) => sku.color === selectedColor
  )?.size || [];

  return (
    <div className="product-details">
      <div className="product-image-container">
        <img src={categoryImage} alt={product.title} className="product-image" />
        
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>
        <p className="category">Category: <span>{product.category}</span></p>
        <p className="price">Price: ₹{product.price}</p>
        <p className="mrp">MRP: <span>₹{product.MRP}</span></p>
        <p>Fit: {product.fit}</p>
        <p>Fabric: {product.fabric}</p>
        <p>Neck: {product.neck}</p>
        <p>Sleeve: {product.sleeve}</p>
        <p>Pattern: {product.pattern}</p>
        <p>Length: {product.length}</p>
        <p className="description">Description: {product.description}</p>
        <a href={product.url} target="_blank" rel="noopener noreferrer" className="view-product">View Product</a>
        <div className="color-size-container">
          <div className="color-selector">
            <h3>Available Colors:</h3>
            {product.available_skus.map((sku, idx) => (
              <button
                key={idx}
                className={`color-button ${selectedColor === sku.color ? 'selected' : ''}`}
                style={{ backgroundColor: sku.color }}
                onClick={() => handleColorSelect(sku.color)}
              />
            ))}
          </div>
          {selectedColor && (
            <div className="size-selector">
              <h3>Available Sizes:</h3>
              {availableSizes.map((size, idx) => (
                <span key={idx} className="size-highlight">{size}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDetails;
