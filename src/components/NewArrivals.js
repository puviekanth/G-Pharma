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

function NewArrivals() {
    const countersRef = useRef(null);
    const hasAnimated = useRef(false);
    const [products, setProducts] = useState([]);
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:3000/newsletter', { email })
            .then(result => console.log(result))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:3000/getProducts')
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
        })
        .catch(error => {
            console.log('Error adding to cart', error);
        });
    };

    return (
        <>
            <section className='new-arrivals'>
                <h1 className='head'>New Arrivals</h1>
                <div className='container-home'>
                    {products.map((product, index) => (
                        <div className='pro-container-home' key={index}>
                            <img src={`http://localhost:3000/${product.image.replace(/\\/g, '/')}`} alt={`Product${index + 1}`} className='pro-image-home' />
                            <h3 className='pro-name'>{product.name}</h3>
                            <h4>Rs. {product.price.toLocaleString()}</h4>
                            <button className='add-to-cart' onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </section>

            <div className='news-img'>
                <div className='newsletter-div'>
                    <h3>Subscribe to Newsletter for more updates!</h3>
                    <form className='newsletter-form' onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className='email-input'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type='submit'>Send</button>
                    </form>
                </div>
            </div>

            <section className='best-selling'>
                <h1 className='head'>Best Selling</h1>
                <div className='best-selling-div'>
                    {products.map((product, index) => (
                        <div className='pro-container-home' key={index}>
                            <img src={`http://localhost:3000/${product.image.replace(/\\/g, '/')}`} alt={`Product${index + 1}`} className='pro-image-home' />
                            <h3 className='pro-name'>{product.name}</h3>
                            <h4>Rs. {product.price.toLocaleString()}</h4>
                            <button className='add-to-cart' onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="statistics" ref={countersRef}>
                <div className="stat-item">
                    <img src={RegularCustomers} alt='regularcustomers' />
                    <h3 className="stat-number" data-target="200">0</h3>
                    <p>Regular Customers</p>
                </div>
                <div className="stat-item">
                    <img src={HappyCustomers} alt='happycustomers' />
                    <h3 className="stat-number" data-target="1000">0</h3>
                    <p>Happy Customers</p>
                </div>
                <div className="stat-item">
                    <img src={Branches} alt='branches' />
                    <h3 className="stat-number" data-target="15">0</h3>
                    <p>Branches</p>
                </div>
                <div className="stat-item">
                    <img src={Employees} alt='employees' />
                    <h3 className="stat-number" data-target="50">0</h3>
                    <p>Employees</p>
                </div>
            </section>
            
            <section className='product-types'>
                <div className='product-types-container'>
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
                </div>
            </section>
        </>
    );
}

export default NewArrivals;

           
            

