import React, { useEffect, useState } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import Skincare from './images/Skin-1.jpg';
import Multivitamin from './images/Multy-1.jpg';
import SexualWellness from './images/Sew-1.jpg';
import Wheel from './images/Wheel-1.jpg';
import Sethescope from './images/Littman-1.jpg';
import Pressure from './images/Rossmax-1.jpg';
import './Shop.css';
import NAV from './SecondNavbar';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Shop() {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [quantity, setQuantity] = useState('');
    const [stock, setStock] = useState();

    // Filter products based on price range and search query
    const filteredProducts = products.filter(product => {
        const min = minPrice !== '' ? parseInt(minPrice, 10) : 0;
        const max = maxPrice !== '' ? parseInt(maxPrice, 10) : Infinity;
        const matchesPrice = product.price >= min && product.price <= max;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()); // Check if product name includes search query
        return matchesPrice && matchesSearch;
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:3000/getsupport')
            .then(res => {
                setProducts(res.data);
                console.log('Fetched Successfully');
            })
            .catch(err => {
                console.log('Failed to Fetch', err);
            });
    }, []);

    const handleReset = () => {
        setMinPrice('');
        setMaxPrice('');
        setSearchQuery(''); // Reset search query
    };

    const handleAddToCart = (product) => {
        if (product.quantity > 0) {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found, please login');
                return;
            }
            const userEmail = JSON.parse(atob(token.split('.')[1])).email;
            axios.post('http://127.0.0.1:3000/addtocart', {
                ProductName: product.name,
                email: userEmail,
                ProductPrice: product.price,
                ProductQuantity: 1,
                Subtotal: product.price * 1,
                Image: product.image
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    console.log('Added to cart successfully', response);
                    handleChangequantity(product._id);
                })
                .catch(error => {
                    console.log('Error adding to cart', error);
                });
        } else {
            console.log("Out of Stock");
        }
    };

    const handleChangequantity = (id) => {
        axios.put(`http://127.0.0.1:3000/reduceoneitem?id=${id}`)
            .then(res => {
                setQuantity(res.data);
                console.log('Updated successfully');
                console.log(stock);
            })
            .catch(err => {
                console.log('Error updating the product', err);
            });
    };

    const navigate = useNavigate();

    const navigatePage = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <>
            <Navbar />
            
            <section className='cat-pro'>
                <section className='with-categories'>
                    
                    <div className='categories'>
                        

                    <div className='filter-div' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '40px' }}>
                            <h4 style={{ color: '#004085',marginTop:'10px' }}><b>Filter By Price</b></h4>
                            <div className='price-filter'>
                                <input
                                    type="number"
                                    className='min-price-input'
                                    placeholder='Min Price'
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    style={{ width: '100px' }}
                                />
                                <input
                                    type="number"
                                    className='max-price-input'
                                    placeholder='Max Price'
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    style={{ width: '100px' }}
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Search Products"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ margin: '10px 0', width: '200px' }}
                            />
                            
                            <button className='remove-filter' onClick={handleReset}>Remove Filter</button>
                           <div className='categories-display'>
                            <h3 style={{color:'#004085',textAlign:'center',marginTop:'20px'}}><b>Categories</b></h3>
                            <ul style={{marginTop:'15px'}}>
                        <li><a href="/Shop/ayurvedic">Ayurvedic Products</a></li>
                            <li><a href="/Shop/beauty">Beauty Products</a></li>
                            <li><a href="/Shop/supports">Body Supports</a></li>
                            <li><a href="/Shop/baby">Baby Care</a></li>
                            <li><a href="/Shop/multivitamins">Multivitamins</a></li>
                            <li><a href='/Shop/medi'>Medicines</a></li>
                            <li><a href="/Shop/machines">Medical Machines</a></li>
                            <li><a href="/Shop/instruments">Medical Instruments</a></li>
                            <li><a href="/Shop/vetenary">Veterinary Care</a></li>
                            <li><a href="/Shop/skincare">Skincare Products</a></li>
                            <li><a href="/Shop/sexual-wellness">Sexual Wellness</a></li>
                        </ul>
                           </div>
                        </div>
                    </div>
                </section>
                <section className='products'>
                    <div className='container'>
                        {filteredProducts.map((product) => (
                            <div className='pro-container' key={product._id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '220px', textAlign: 'center', transition: 'transform 0.2s' }}>
                                <img src={`http://localhost:3000/${product.image.replace(/\\/g, '/')}`} alt='' className='pro-image-home' style={{ width: '80%', height: 'auto' }} onClick={() => navigatePage(product._id)} />
                                <h3 className='pro-name' style={{ fontSize: '1.2rem', margin: '15px 0', color: '#555' }}>{product.name}</h3>
                                <h4 style={{ fontSize: '1.2rem', color: '#333' }}>Rs. {product.price.toLocaleString()}</h4>
                                <button className='add-to-cart' onClick={() => handleAddToCart(product)} style={{ backgroundColor: '#004085', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', marginBottom: '15px', transition: 'background-color 0.3s' }}>
                                    Add to Cart
                                </button>
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
