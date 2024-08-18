import React, { useState } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import Product1 from './images/Glutanex-Tablets-100.jpeg';
import Product2 from './images/Eventone-C-Cream-300x300.jpg';
import Skincare from './images/Skin-1.jpg'
import Multivitamin from './images/Multy-1.jpg'
import SexualWellness from './images/Sew-1.jpg'
import Wheel from './images/Wheel-1.jpg'
import Sethescope from './images/Littman-1.jpg'
import Pressure from './images/Rossmax-1.jpg'
import './Shop.css';

function Shop() {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const products = [
        { id: 1, name: 'Glutanex Tablets - 100g', price: 15000, image: Product1 },
        { id: 2, name: 'Eventone C Cream ', price: 5000, image: Product2 },
        { id: 3, name: 'Glutanex Tablets - 100g', price: 7000, image: Product1 },
        { id: 4, name: 'Eventone C Cream ', price: 1000, image: Product2 },
        { id: 5, name: 'Eventone C Cream ', price: 14000, image: Product2 },
        { id: 6, name: 'Glutanex Tablets - 100g', price: 15000, image: Product1 },
        { id: 7, name: 'Glutanex Tablets - 100g', price: 15000, image: Product1 },
        { id: 8, name: 'Glutanex Tablets - 100g', price: 15000, image: Product1 }
    ];

    const filteredProducts = products.filter(product => {
        const min = minPrice !== '' ? parseInt(minPrice, 10) : 0;
        const max = maxPrice !== '' ? parseInt(maxPrice, 10) : Infinity;
        return product.price >= min && product.price <= max;
    });

    const handleReset = () => {
        setMinPrice('');
        setMaxPrice('');
    };

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
                           <a href='./Individual'>
                             <div className='pro-container' key={product.id}>
                                <img src={product.image} alt={product.name} className='pro-image' />
                                <h3 className='pro-name'>{product.name}</h3>
                                <h4>Rs. {product.price.toLocaleString()}</h4>
                                <button className='add-to-cart'>Add to Cart</button>
                            </div>
                           </a>
                        ))}
                    </div>
                </section>
            </section>

            <section className='product-types'>
                <div className='product-types-container'>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Skin Care</h3>
                        <a href='/Order'><img src={ Skincare } className='img-product' alt=''></img></a>
                    </div>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Multivitamin</h3>
                        <img src={ Multivitamin } className='img-product' alt=''></img>
                    </div>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Sexual Wellness</h3>
                        <img src={ SexualWellness } className='img-product' alt=''></img>
                    </div>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Supports</h3>
                        <img src={ Wheel } className='img-product' alt=''></img>
                    </div>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Machines</h3>
                        <img src={ Pressure } className='img-product' alt=''></img>
                    </div>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Instruments</h3>
                        <img src={ Sethescope } className='img-product' alt=''></img>
                    </div>
                </div>
            </section>

           <section className='other-products'>
           <div className='container'>
                       
                       <div className='pro-container'>
                           <img src={Product1} className='pro-image' />
                           <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                           <h4>Rs. 15,000</h4>
                           <button className='add-to-cart'>Add to Cart</button>
                       </div>
                       <div className='pro-container'>
                           <img src={Product2} className='pro-image' />
                           <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                           <h4>Rs. 15,000</h4>
                           <button className='add-to-cart'>Add to Cart</button>
                       </div>
                       <div className='pro-container'>
                           <img src={Product1} className='pro-image' />
                           <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                           <h4>Rs. 15,000</h4>
                           <button className='add-to-cart'>Add to Cart</button>
                       </div>
                       <div className='pro-container'>
                           <img src={Product2} className='pro-image' />
                           <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                           <h4>Rs. 15,000</h4>
                           <button className='add-to-cart'>Add to Cart</button>
                       </div>
                       <div className='pro-container'>
                           <img src={Product1} className='pro-image' />
                           <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                           <h4>Rs. 15,000</h4>
                           <button className='add-to-cart'>Add to Cart</button>
                       </div>
                       <div className='pro-container'>
                           <img src={Product2} className='pro-image' />
                           <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                           <h4>Rs. 15,000</h4>
                           <button className='add-to-cart'>Add to Cart</button>
                       </div>
                       <div className='pro-container'>
                           <img src={Product1} className='pro-image' />
                           <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                           <h4>Rs. 15,000</h4>
                           <button className='add-to-cart'>Add to Cart</button>
                       </div>
                       <div className='pro-container'>
                           <img src={Product1} className='pro-image' />
                           <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                           <h4>Rs. 15,000</h4>
                           <button className='add-to-cart'>Add to Cart</button>
                       </div>
                       <div className='pro-container'>
                           <img src={Product1} className='pro-image' />
                           <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                           <h4>Rs. 15,000</h4>
                           <button className='add-to-cart'>Add to Cart</button>
                       </div>
                       <div className='pro-container'>
                           <img src={Product1} className='pro-image' />
                           <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                           <h4>Rs. 15,000</h4>
                           <button className='add-to-cart'>Add to Cart</button>
                       </div>
                       <div className='pro-container'>
                           <img src={Product1} className='pro-image' />
                           <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                           <h4>Rs. 15,000</h4>
                           <button className='add-to-cart'>Add to Cart</button>
                       </div>
                       <div className='pro-container'>
                           <img src={Product1} className='pro-image' />
                           <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                           <h4>Rs. 15,000</h4>
                           <button className='add-to-cart'>Add to Cart</button>
                       </div>
                   
               </div>
           </section>
            <Footer />
        </>
    );
}

export default Shop;
