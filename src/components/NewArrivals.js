import React, { useEffect, useRef } from 'react';
import './NewArrivals.css';
import Product1 from './images/Glutanex-Tablets-100.jpeg';
import Product2 from './images/Eventone-C-Cream-300x300.jpg';
import HappyCustomers from './images/customer-review.png'
import RegularCustomers from './images/service.png'
import Branches from './images/branch.png'
import Employees from './images/employee (1).png'
import Delivery from './images/delivery.png'
import Skincare from './images/Skin-1.jpg'
import Multivitamin from './images/Multy-1.jpg'
import SexualWellness from './images/Sew-1.jpg'
import Wheel from './images/Wheel-1.jpg'
import Sethescope from './images/Littman-1.jpg'
import Pressure from './images/Rossmax-1.jpg'
import Order from './order'


function NewArrivals() {
    const countersRef = useRef(null);
    const hasAnimated = useRef(false);


    useEffect(() => {
        const deliverySection = document.querySelector('.delivery');
        

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    deliverySection.classList.add('in-view');
                }
            },
            {
                threshold: 0.75, // Trigger when 50% of the section is in view
            }
        );

        observer.observe(deliverySection);

        return () => {
            observer.unobserve(deliverySection);
        };
    }, []);


    useEffect(() => {
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
                    observer.disconnect();  // Stop observing after animation
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5, // Trigger when 50% of the section is in view
        });

        observer.observe(countersRef.current);

        return () => observer.disconnect();  // Cleanup observer on component unmount
    }, []);

    useEffect(() => {
        const NewArrivals = document.querySelector('.new-arrivals');

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    NewArrivals.classList.add('in-view');
                }
            },
            {
                threshold: 0.75,
            }
        );

        observer.observe(NewArrivals);

        return () => {
            observer.unobserve(NewArrivals);
        };
    }, []);

    return (
        <>
            <section className='new-arrivals'>
                <h1 className='head'>New Arrivals</h1>
               
                <div className='container'>
                    {[Product1, Product1, Product1, Product2, Product1, Product2, Product1, Product1].map((product, index) => (
                        <div className='pro-container' key={index}>
                            <img src={product} alt={`Product${index + 1}`} className='pro-image' />
                            <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                            <h4>Rs. 15,000</h4>
                            <button className='add-to-cart'>Add to Cart</button>
                        </div>
                    ))}
                </div>
                
            </section>


            <div className='delivery'>
                <div className='delivery-with-img'>
                <h4> <b>100% Secure & Fast</b> delivery at your doorstep</h4>
                <img src={ Delivery} alt=''></img>
                </div>
                <button className='readmore'>Read More</button>
            </div>


            <section className='best-selling'>
            <h1 className='head'>Best Selling </h1>
                <div className='best-selling-div'>
                    
                    {[Product1, Product1, Product2, Product1, Product1, Product2, Product1, Product1, Product2, Product1].map((product, index) => (
                        <div className='product' key={index}>
                            <img src={product} alt={`Product${index + 1}`} />
                            <h3 className='pro-name'>Product Name {index + 1}</h3>
                            <h4>Price</h4>
                            <button className='add-to-cart'>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </section>

            
            <section className="statistics" ref={countersRef}>
                <div className="stat-item">
                    <img src={ RegularCustomers } alt='regularcustomers'></img>
                    <h3 className="stat-number" data-target="200">0</h3>
                    <p>Regular Customers</p>
                </div>
                <div className="stat-item">
                    <img src={ HappyCustomers } alt='happycustomers'></img>
                    <h3 className="stat-number" data-target="1000">0</h3>
                    <p>Happy Customers</p>
                </div>
                <div className="stat-item">
                    <img src={ Branches } alt='branches'></img>
                    <h3 className="stat-number" data-target="15">0</h3>
                    <p>Branches</p>
                </div>
                <div className="stat-item">
                    <img src={ Employees } alt='employees'></img>
                    <h3 className="stat-number" data-target="50">0</h3>
                    <p>Employees</p>
                </div>
            </section>
            <section className='product-types'>
                <div className='product-types-container'>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Skin Care</h3>
                        <a href='/Order'><img src={ Skincare } className='img-product'></img></a>
                    </div>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Multivitamin</h3>
                        <img src={ Multivitamin } className='img-product'></img>
                    </div>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Sexual Wellness</h3>
                        <img src={ SexualWellness } className='img-product'></img>
                    </div>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Supports</h3>
                        <img src={ Wheel } className='img-product'></img>
                    </div>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Machines</h3>
                        <img src={ Pressure } className='img-product'></img>
                    </div>
                    <div className='individual-products'>
                        <h3 className='prod-name'>Instruments</h3>
                        <img src={ Sethescope } className='img-product'></img>
                    </div>
                </div>
            </section>
            
        </>
    );
}

export default NewArrivals;
