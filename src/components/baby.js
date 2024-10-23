import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { useNavigate } from 'react-router';

function Shop() {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [quantity,setQuantity] = useState('');
    const [stock,setStock] = useState();
    const [products,setProducts] = useState([]);

    const filteredProducts = products.filter(product => {
        const min = minPrice !== '' ? parseInt(minPrice, 10) : 0;
        const max = maxPrice !== '' ? parseInt(maxPrice, 10) : Infinity;
        return product.price >= min && product.price <= max;
    });

    const handleReset = () => {
        setMinPrice('');
        setMaxPrice('');
    };

    useEffect(()=>{
        axios.get('http://127.0.0.1:3000/getbaby')
        .then(res=>{
            setProducts(res.data);
            console.log('Fetched successfully',res);
        })
        .catch(err=>{
            console.log('Could not fetch the products',err);
        })
    },[])


    const handleAddToCart = (product) => {
        if (product.quantity > 0) {
            
            const token = localStorage.getItem('token');
            if(!token){
                console.error('No token found, please login');
                return;
            }
            const userEmail = JSON.parse(atob(token.split('.')[1])).email;
            axios.post('http://127.0.0.1:3000/addtocart', { 
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
        axios.put(`http://127.0.0.1:3000/reduceoneitem?id=${id}`)
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
            <section className='cat-pro'>
                <section className='with-categories'>
                    <div className='heading'>
                        <h1>Shop</h1>
                    </div>
                    <div className='categories'>
                        <ul>
                        <li><a href="/Shop/ayurvedic" style={{textDecoration:'none'}}>Ayurvedic Products</a></li>
            <li><a href="/Shop/beauty" style={{textDecoration:'none'}}>Beauty Products</a></li>
            <li><a href="/Shop/supports" style={{textDecoration:'none'}}>Body Supports</a></li>
            <li><a href="/Shop/baby" style={{textDecoration:'none'}}>Baby Care</a></li>
            <li><a href="/Shop/multivitamins" style={{textDecoration:'none'}}>Multivitamins</a></li>
            <li><a href="/Shop/machines" style={{textDecoration:'none'}}>Medical Machines</a></li>
            <li><a href="/Shop/instruments" style={{textDecoration:'none'}}>Medical Instruments</a></li>
            <li><a href="/Shop/vetenary" style={{textDecoration:'none'}}>Veternary Care</a></li>
            <li><a href="/Shop/skincare" style={{textDecoration:'none'}}>Skincare Products</a></li>
            <li><a href="/Shop/sexual-wellness" style={{textDecoration:'none'}}>Sexual Wellness</a></li>
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
                            <div className='pro-container' key={product.id} >

                            <img src={`http://localhost:3000/${product.image.replace(/\\/g, '/')}`} alt={product.name} className='pro-image' onClick={() => navigatePage(product._id)}/>
                            <h3 className='pro-name' onClick={() => navigatePage(product._id)} >{product.name}</h3>
                            <h4 onClick={() => navigatePage(product._id)} >Rs. {product.price.toLocaleString()}</h4>
                            <button className='add-to-cart' onClick={() => handleAddToCart(product)}>Add to Cart</button>
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
