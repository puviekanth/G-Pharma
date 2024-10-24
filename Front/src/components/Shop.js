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
    const [quantity,setQuantity] = useState('');
    const [stock,setStock] = useState();
    const api = process.env.REACT_URL;

    const filteredProducts = products.filter(product => {
        const min = minPrice !== '' ? parseInt(minPrice, 10) : 0;
        const max = maxPrice !== '' ? parseInt(maxPrice, 10) : Infinity;
        return product.price >= min && product.price <= max;
    });

    useEffect(() => {
        axios.get(`${api}/getProducts`)
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
    };

    

    const handleAddToCart = (product) => {
        if (product.quantity > 0) {
            
            const token = localStorage.getItem('token');
            if(!token){
                console.error('No token found, please login');
                return;
            }
            const userEmail = JSON.parse(atob(token.split('.')[1])).email;
            axios.post(`${api}/addtocart`, { 
                ProductName: product.name,
                email:userEmail,
                ProductPrice: product.price,
                ProductQuantity:1,
                Subtotal:product.price*1,
                Image:product.image
            },{
                headers: { Authorization: `Bearer ${token}` } // Send the token in the headers
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

    const handleChangequantity = (id) =>{
        axios.put(`${api}/reduceoneitem?id=${id}`)
        .then(res=>{
            setQuantity(res.data)
            console.log('Updated successfully');
            console.log(stock);
        })
        .catch(err=>{
            console.log('Error updating the product',err);
        })
    }


    const navigate = useNavigate();

const navigatePage = (id) => {
    navigate(`/product/${id}`);
};
    return (
        <>
            <Navbar />
            <NAV />
            <section className='cat-pro'>
                <section className='with-categories'>
                    <div className='heading'>
                        <h1 style={{marginTop:'20px',color:'#004085'}}>Shop</h1>
                    </div>
                    <div className='categories'>
                        <ul>
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
                        <div className='filter-div' style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginLeft:'40px'}}>
                            <h4 style={{color:'#004085'}}><b>Filter By Price</b></h4>
                            <div className='price-filter'>
                                <input
                                    type="number"
                                    className='min-price-input'
                                    placeholder='Min Price'
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    style={{width:'100px'}}
                                />
                                <input
                                    type="number"
                                    className='max-price-input'
                                    placeholder='Max Price'
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    style={{width:'100px'}}
                                />
                            </div>
                            <button className='apply-filter' >Apply Filter</button>
                            <button className='remove-filter' onClick={handleReset}>Remove Filter</button>
                        </div>
                    </div>
                </section>
                <section className='products'>
                    <div className='container'>
                        {filteredProducts.map((product) => (
                            
                                <div className='pro-container'  style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '220px', textAlign: 'center', transition: 'transform 0.2s' }}> {/* Adjusted width */}
                                    <img src={`${api}/${product.image.replace(/\\/g, '/')}`} alt='' className='pro-image-home' style={{ width: '80%', height: 'auto' }} />
                                    <h3 className='pro-name' style={{ fontSize: '1.2rem', margin: '15px 0', color: '#555' }}>{product.name}</h3>
                                    <h4 style={{ fontSize: '1.2rem', color: '#333' }}>Rs. {product.price.toLocaleString()}</h4>
                                    <button className='add-to-cart' onClick={() => handleAddToCart(product)} style={{ backgroundColor: '#004085', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', marginBottom: '15px', transition: 'background-color 0.3s' }} 
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#004085'} 
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#004085'}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                        ))}
                    </div>
                </section>
            </section>

            <section className='product-types'>
                <div className='product-types-container'>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Skin Care</h3>
                        <a href='/Order'><img src={Skincare} className='img-product' alt=''></img></a>
                    </div>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Multivitamin</h3>
                        <img src={Multivitamin} className='img-product' alt=''></img>
                    </div>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Sexual Wellness</h3>
                        <img src={SexualWellness} className='img-product' alt=''></img>
                    </div>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Supports</h3>
                        <img src={Wheel} className='img-product' alt=''></img>
                    </div>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Machines</h3>
                        <img src={Pressure} className='img-product' alt=''></img>
                    </div>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Instruments</h3>
                        <img src={Sethescope} className='img-product' alt=''></img>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Shop;
