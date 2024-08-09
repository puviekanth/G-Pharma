import React from 'react'
import './NewArrivals.css'
import { useEffect} from 'react'
import Product1 from './images/Glutanex-Tablets-100.jpeg'
import Product2 from './images/Eventone-C-Cream-300x300.jpg'


function NewArrivals(){

    useEffect(() => {
        const NewArrivals = document.querySelector('.new-arrivals');
        

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    NewArrivals.classList.add('in-view');
                }
            },
            {
                threshold: 0.75, // Trigger when 50% of the section is in view
            }
        );

        observer.observe(NewArrivals);

        return () => {
            observer.unobserve(NewArrivals);
        };
    }, []);


    return(
        <><section className='new-arrivals'>
            <h1 className='head'>New Arrivals</h1>
            <div className='container'>
                <div className='pro-container'>
                    <img src={Product1} alt='Product1' className='pro-image'></img>
                    <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                    <h4>Rs. 15,000</h4>
                    <button className='add-to-cart'>Add to Cart</button>
                </div>
                <div className='pro-container'>
                    <img src={Product1} alt='Product1' className='pro-image'></img>
                    <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                    <h4>Rs. 15,000</h4>
                    <button className='add-to-cart'>Add to Cart</button>
                </div>
                <div className='pro-container'>
                    <img src={Product1} alt='Product1' className='pro-image'></img>
                    <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                    <h4>Rs. 15,000</h4>
                    <button className='add-to-cart'>Add to Cart</button>
                </div>
                <div className='pro-container'>
                    <img src={Product2} alt='Product1' className='pro-image'></img>
                    <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                    <h4>Rs. 15,000</h4>
                    <button className='add-to-cart'>Add to Cart</button>
                </div>
                <div className='pro-container'>
                    <img src={Product1} alt='Product1' className='pro-image'></img>
                    <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                    <h4>Rs. 15,000</h4>
                    <button className='add-to-cart'>Add to Cart</button>
                </div>
                <div className='pro-container'>
                    <img src={Product2} alt='Product1' className='pro-image'></img>
                    <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                    <h4>Rs. 15,000</h4>
                    <button className='add-to-cart'>Add to Cart</button>
                </div>
                <div className='pro-container'>
                    <img src={Product1} alt='Product1' className='pro-image'></img>
                    <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                    <h4>Rs. 15,000</h4>
                    <button className='add-to-cart'>Add to Cart</button>
                </div>

                <div className='pro-container'>
                    <img src={Product1} alt='Product1' className='pro-image'></img>
                    <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                    <h4>Rs. 15,000</h4>
                    <button className='add-to-cart'>Add to Cart</button>
                </div>

                <div className='pro-container'>
                    <img src={Product1} alt='Product1' className='pro-image'></img>
                    <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                    <h4>Rs. 15,000</h4>
                    <button className='add-to-cart'>Add to Cart</button>
                </div>

                <div className='pro-container'>
                    <img src={Product1} alt='Product2' className='pro-image'></img>
                    <h3 className='pro-name'>Glutanex Tablets - 100g</h3>
                    <h4>Rs. 15,000</h4>
                    <button className='add-to-cart'>Add to Cart</button>
                </div>

            </div>
        </section>
        <section className='best-selling'>
    <div className='best-selling-div'>
        <div className='product'>
            <img src={Product1} alt='Product1' />
            <h3 className='pro-name'>Product Name 1</h3>
            <h4>Price</h4>
        </div>
        <div className='product'>
            <img src={Product1} alt='Product1' />
            <h3 className='pro-name'>Product Name 2</h3>
            <h4>Price</h4>
        </div>
        <div className='product'>
            <img src={Product2} alt='Product2' />
            <h3 className='pro-name'>Product Name 3</h3>
            <h4>Price</h4>
        </div>
        <div className='product'>
            <img src={Product1} alt='Product1' />
            <h3 className='pro-name'>Product Name 4</h3>
            <h4>Price</h4>
        </div>
        <div className='product'>
            <img src={Product1} alt='Product1' />
            <h3 className='pro-name'>Product Name 5</h3>
            <h4>Price</h4>
        </div>
        <div className='product'>
            <img src={Product2} alt='Product2' />
            <h3 className='pro-name'>Product Name 6</h3>
            <h4>Price</h4>
        </div>
        
        <div className='product'>
            <img src={Product1} alt='Product1' />
            <h3 className='pro-name'>Product Name 1</h3>
            <h4>Price</h4>
        </div>
        <div className='product'>
            <img src={Product1} alt='Product1' />
            <h3 className='pro-name'>Product Name 2</h3>
            <h4>Price</h4>
        </div>
        <div className='product'>
            <img src={Product2} alt='Product2' />
            <h3 className='pro-name'>Product Name 3</h3>
            <h4>Price</h4>
        </div>
        <div className='product'>
            <img src={Product1} alt='Product1' />
            <h3 className='pro-name'>Product Name 4</h3>
            <h4>Price</h4>
        </div>
        <div className='product'>
            <img src={Product1} alt='Product1' />
            <h3 className='pro-name'>Product Name 5</h3>
            <h4>Price</h4>
        </div>
        <div className='product'>
            <img src={Product2} alt='Product2' />
            <h3 className='pro-name'>Product Name 6</h3>
            <h4>Price</h4>
        </div>
    </div>
</section>


            </>

    );
}

export default NewArrivals
