import React, { useEffect, useRef, useState } from 'react';
import './NewArrivals.css';
import Product1 from './images/Glutanex-Tablets-100.jpeg';
import Product2 from './images/Eventone-C-Cream-300x300.jpg';
import HappyCustomers from './images/customer-review.png';
import RegularCustomers from './images/service.png';
import Branches from './images/branch.png';
import Employees from './images/employee (1).png';
import Skincare from './images/Skin-1.jpg';
import Multivitamin from './images/Multy-1.jpg';
import SexualWellness from './images/Sew-1.jpg';
import Wheel from './images/Wheel-1.jpg';
import Sethescope from './images/Littman-1.jpg';
import Pressure from './images/Rossmax-1.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router';

function NewArrivals() {
    const countersRef = useRef(null);
    const hasAnimated = useRef(false);
    const [products, setProducts] = useState([]);
    const [email, setEmail] = useState('');
    const api = process.env.REACT_URL;
    
    const [quantity,setQuantity] = useState('');
    const [stock,setStock] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`{api}/newsletter`, { email })
            .then(result => console.log(result))
            .catch(err => console.log(err));
    };

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

    useEffect(() => {
        if (countersRef.current) {
            const counters = countersRef.current.querySelectorAll('.stat-number');

            const updateCount = (counter) => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / 100;
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(() => updateCount(counter), 20);
                } else {
                    counter.innerText = target;
                }
            };

            const handleIntersection = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        counters.forEach(counter => updateCount(counter));
                        hasAnimated.current = true;
                        observer.disconnect();
                    }
                });
            };

            const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
            observer.observe(countersRef.current);

            return () => observer.disconnect();
        }
    }, []);

    useEffect(() => {
        const newArrivalsSection = document.querySelector('.new-arrivals');
        if (newArrivalsSection) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        newArrivalsSection.classList.add('in-view');
                    }
                },
                { threshold: 0.75 }
            );

            observer.observe(newArrivalsSection);

            return () => {
                observer.unobserve(newArrivalsSection);
            };
        }
    }, []);

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
            <section className='new-arrivals' style={{ padding: '50px 20px', backgroundColor: '#f9f9f9' }}>
                <h1 className='head' style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px', color: '#333' }}>New Arrivals</h1>
                <div className='container-home' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop:'70px'}}>
                    {products.map((product, index) => (
                        <div className='pro-container-home' key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '250px', textAlign: 'center', transition: 'transform 0.2s' }}>
                            <img src={`${api}}/${product.image.replace(/\\/g, '/')}`} alt={`Product${index + 1}`} className='pro-image-home' style={{ width: '80%', height: 'auto' }} onClick={() => navigatePage(product._id)}/>
                            <h3 className='pro-name' style={{ fontSize: '1.2rem', margin: '15px 0', color: '#555' }} onClick={() => navigatePage(product._id)}>{product.name}</h3>
                            <h4 style={{ fontSize: '1.2rem', color: '#333' }} onClick={() => navigatePage(product._id)}>Rs. {product.price.toLocaleString()}</h4>
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

            <div className='news-img' style={{ padding: '40px 20px', backgroundColor: '#f2f2f2', textAlign: 'center' }}>
                <div className='newsletter-div' style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ marginBottom: '20px', fontSize: '1.5rem', color: '#333' }}>Subscribe to Newsletter for more updates!</h3>
                    <form className='newsletter-form' onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <input
                            type="email"
                            className='email-input'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ flex: '1', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginRight: '10px' }}
                        />
                        <button type='submit' style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' }}>
                            Send
                        </button>
                    </form>
                </div>
            </div>

            <section className='best-selling' style={{ padding: '50px 20px', backgroundColor: '#f9f9f9' }}>
    <h1 className='head' style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px', color: '#333' }}>Best Selling</h1>
    <div className='best-selling-div' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' ,marginTop:'70px'}}> {/* Reduced gap */}
        {products.map((product, index) => (
            <div className='pro-container-home' key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '220px', textAlign: 'center', transition: 'transform 0.2s' }}> {/* Adjusted width */}
                <img src={`${api}/${product.image.replace(/\\/g, '/')}`} alt={`Product${index + 1}`} className='pro-image-home' style={{ width: '80%', height: 'auto' }} onClick={() => navigatePage(product._id)} />
                <h3 className='pro-name' style={{ fontSize: '1.2rem', margin: '15px 0', color: '#555' }} onClick={() => navigatePage(product._id)}>{product.name}</h3>
                <h4 style={{ fontSize: '1.2rem', color: '#333' }} onClick={() => navigatePage(product._id)}>Rs. {product.price.toLocaleString()}</h4>
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


            <section className='stats' ref={countersRef} style={{ padding: '50px 20px', backgroundColor: '#f2f2f2' }}>
                <h1 className='head' style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px', color: '#004085' }}><b>Statistics</b></h1>
                <div className='counters' style={{ display: 'flex', justifyContent: 'space-around',marginTop:'80px' }}>
                    <div className='counter' style={{ textAlign: 'center' }}>
                        <img src={HappyCustomers} alt="Happy Customers" style={{ width: '60px', marginBottom: '10px' }} />
                        <div className='stat-number' data-target="150" style={{ fontSize: '2rem', color: '#004085' }}>0</div>
                        <h3 style={{ color: '#004085' }}>Happy Customers</h3>
                    </div>
                    <div className='counter' style={{ textAlign: 'center' }}>
                        <img src={RegularCustomers} alt="Regular Customers" style={{ width: '60px', marginBottom: '10px' }} />
                        <div className='stat-number' data-target="250" style={{ fontSize: '2rem', color: '#004085' }}>0</div>
                        <h3 style={{ color: '#004085' }}>Regular Customers</h3>
                    </div>
                    <div className='counter' style={{ textAlign: 'center' }}>
                        <img src={Branches} alt="Branches" style={{ width: '60px', marginBottom: '10px' }} />
                        <div className='stat-number' data-target="5" style={{ fontSize: '2rem', color: '#004085' }}>0</div>
                        <h3 style={{ color: '#004085' }}>Branches</h3>
                    </div>
                    <div className='counter' style={{ textAlign: 'center' }}>
                        <img src={Employees} alt="Employees" style={{ width: '60px', marginBottom: '10px' }} />
                        <div className='stat-number' data-target="50" style={{ fontSize: '2rem', color: '#004085' }}>0</div>
                        <h3 style={{ color: '#004085' }}>Employees</h3>
                    </div>
                </div>
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
        </>
    );
}

export default NewArrivals;
