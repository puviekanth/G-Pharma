import React, { useState,useEffect } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import Product1 from './images/Glutanex-Tablets-100.jpeg';
import Product2 from './images/Eventone-C-Cream-300x300.jpg';
import './Shop.css';
import axios from 'axios'

function Shop() {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const [products,setProducts] = useState([]); 

    const filteredProducts = products.filter(product => {
        const min = minPrice !== '' ? parseInt(minPrice, 10) : 0;
        const max = maxPrice !== '' ? parseInt(maxPrice, 10) : Infinity;
        return product.price >= min && product.price <= max;
    });
    const api = process.env.REACT_URL;

    const handleReset = () => {
        setMinPrice('');
        setMaxPrice('');
    };

    useEffect(()=>{
        axios.get(`${api}/getsexual`)
        .then(res=>{
            setProducts(res.data);
            console.log('Fetched successfully',res);
        })
        .catch(err=>{
            console.log('Could not fetch the products',err);
        })
    },[])

    return (
        <>
            <Navbar />
            <section className='cat-pro'>
                <section className='with-categories'>
                    <div className='heading'>
                        <h1>Shop</h1>
                    </div>
                    <div className='categories'>
                        <ul>
                        <li><a href="/Shop/ayurvedic">Ayurvedic Products</a></li>
            <li><a href="/Shop/beauty">Beauty Products</a></li>
            <li><a href="/Shop/supports">Body Supports</a></li>
            <li><a href="/Shop/baby">Baby Care</a></li>
            <li><a href="/Shop/multivitamins">Multivitamins</a></li>
            <li><a href="/Shop/machines">Medical Machines</a></li>
            <li><a href="/Shop/instruments">Medical Instruments</a></li>
            <li><a href="/Shop/vetenary">Veternary Care</a></li>
            <li><a href="/Shop/skincare">Skincare Products</a></li>
            <li><a href="/Shop/sexual-wellness">Sexual Wellness</a></li>
                        </ul>
                        <div className='filter-div'>
                            <h3>Filter by Price</h3>
                            <div className='price-filter'>
                                <input
                                    type="number"
                                    className='min-price-input'
                                    placeholder='Min Price'
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                />
                                <input
                                    type="number"
                                    className='max-price-input'
                                    placeholder='Max Price'
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                />
                            </div>
                            <button className='apply-filter'>Apply Filter</button>
                            <button className='remove-filter' onClick={handleReset}>Remove Filter</button>
                        </div>
                    </div>
                </section>
                <section className='products'>
                    <div className='container'>
                        {filteredProducts.map(product => (
                            <div className='pro-container' key={product.id}>
                                <img src={`${api}/${product.image.replace(/\\/g, '/')}`} alt={product.name} className='pro-image' />
                                <h3 className='pro-name'>{product.name}</h3>
                                <h4>Rs. {product.price.toLocaleString()}</h4>
                                <button className='add-to-cart'>Add to Cart</button>
                            </div>
                        ))}
                    </div>
                </section>
            </section>

           

           
            <Footer />
        </>
    );
}

export default Shop;
