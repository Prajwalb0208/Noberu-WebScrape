import React from 'react';
import './Categories.css';
import { assets } from '../../assets/assets';

const Categories = ({ cat, setCat }) => {
    const categoryList = [
        { id: 'cat1', image: assets.cat1, name: 'Category 1' },
        { id: 'cat2', image: assets.cat2, name: 'Category 2' },
        { id: 'cat3', image: assets.cat3, name: 'Category 3' },
        { id: 'cat4', image: assets.cat4, name: 'Category 4' },
        { id: 'cat5', image: assets.cat5, name: 'Category 5' },
        { id: 'cat6', image: assets.cat6, name: 'Category 6' },
    ];

    return (
        <div className='category' id='category'>
            <h1>Men Categories</h1>
            <div className="category-list">
                {categoryList.map(({ id, image, name }) => (
                    <img 
                        key={id}
                        src={image}
                        alt={name} 
                        onClick={() => setCat(id)}
                        className={cat === id ? 'All' : name}
                    />
                ))}
            </div>
            <hr />
        </div>
    );
}

export default Categories;
