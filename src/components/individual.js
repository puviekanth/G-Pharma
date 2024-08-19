import React,{useState} from 'react'
import Navbar from './NavBar';
import Footer from './Footer';
import Product1 from './images/Glutanex-Tablets-100.jpeg'
import Img2 from './images/glutanex-1.jpg'
import Img3 from './images/glutathione.jpg'
import Img4 from'./images/img3.jpg'
import './individual.css'
import Product2 from './images/Eventone-C-Cream-300x300.jpg'
function Individual(){
    const [mainImage, setMainImage] = useState(Product1);
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Glutanex Tablets - 100g', price: 5000, quantity: 1, image: Product1 }
       
    ]);
    const[quantity,setQuantity] = useState('');
    const [errors, setErrors] = useState({});
    const validateForm=()=> {
        const newErrors={};
        if(!quantity){
            newErrors.quantity='Please select a valid quantity';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Quantity:', quantity);
            
        }
    };
    const products = [
        { id: 1, name: 'Glutanex Tablets - 100g', price: 15000, image: Product1 },
        { id: 2, name: 'Eventone C Cream ', price: 5000, image: Product2 },
        { id: 3, name: 'Glutanex Tablets - 100g', price: 7000, image: Product1 },
        { id: 4, name: 'Glutanex Tablets - 100g', price: 15000, image: Product1 }
    ];

    return(

        <>
        <Navbar/>
        <section className='details-with-img'>
            <div className='imgs'>
                <div className='single-image'>
                    <img src={mainImage} alt='' className='main-img'></img>
                </div>
                <div className='other-imgs'>
                <div><img src={Img2} alt='' className='sub-img' onClick={() => setMainImage(Img2)}></img></div>
                <div><img src={Img3} alt='' className='sub-img' onClick={() => setMainImage(Img3)}></img></div>
                <div><img src={Img4} alt='' className='sub-img' onClick={() => setMainImage(Img4)}></img></div>
                </div>
            </div>
            <div className='content'>
            {cartItems.map((item, index) => (
                <form className='prod-details-form'>
                
                    <h1>{item.name}</h1>
                    <h3>Rs. {item.price.toLocaleString()}</h3>
                    <input type='number'  min={1} className='qty-input' value={quantity} onChange={(e)=>setQuantity(e.target.value)} required/>
                    {errors.quantity && <div className="error-message">{errors.quantity}</div>}
                    <button className='add-to-cart' onClick={handleSubmit}>Add to Cart</button>
               
                </form>
                 ))}
            </div>
            </section>
            <div className='description'>
                <p>Skin Whitening and Brightening: Nexus Pharma Glutanex Glutathione Tablets is often associated with skin lightening and brightening effects. It helps reduce the appearance of dark spots, hyperpigmentation, and uneven skin tone, resulting in a more radiant complexion.</p>
            </div>
            <section className='related-products'>
                <h1>Related Products</h1>
                <section className='products'>
                    <div className='container'>
                        {products.map(product => (
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
        <Footer/>
        </>
    );
}
export default Individual;