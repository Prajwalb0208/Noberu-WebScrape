import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllProducts.css';
import { assets } from '../../assets/assets';

const AllProducts = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20); // 4 rows * 5 columns = 20 products per page
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => {
        const filteredProducts = selectedCategory === 'all'
          ? data
          : data.filter(product => product.category.includes(selectedCategory) || product.category.includes('all'));
        setProducts(filteredProducts);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [selectedCategory]);

  const handleProductClick = (product) => {
    const productSlug = product.title.toLowerCase().split(' ').join('-');
    navigate(`/product/${productSlug}`);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const goToNextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className='products'>
      <h1>Products</h1>
      <div className="products-container">
        {currentProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          currentProducts.map((product) => {
            // Determine the image based on non-'all' categories
            let imageSrc = assets.catall; // Default to 'catall' if no other category matches
            for (const category of product.category) {
              if (category !== 'all' && assets[category]) {
                imageSrc = assets[category];
                break; // Use the first matching non-'all' category image
              }
            }

            // Debugging
            console.log(`Product Categories: ${product.category}`);
            console.log(`Image Source: ${imageSrc}`);
            
            return (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product)}
              >
                <h2>{product.title}</h2>
                <img src={imageSrc} alt={product.title} className="product-image" />
                <p className='price'>Price: <span className='price-value'> ₹{product.price}</span></p>
                <p>MRP: <span className='mrp'> ₹{product.MRP} </span></p>
              </div>
            );
          })
        )}
      </div>
      <div className="pagination">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          &laquo; Prev
        </button>
        <div className="page-numbers">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={number === currentPage ? 'active' : ''}
            >
              {number}
            </button>
          ))}
        </div>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
