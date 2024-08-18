import React from 'react'
import Navbar from './NavBar';
import Footer from './Footer';
import Img1 from './images/Glutanex-Tablets-100.jpeg'
import Img2 from './images/glutanex-1.jpg'
import Img3 from './images/glutathione.jpg'
import Img4 from'./images/img3.jpg'
import './individual.css'

function individual(){
    return(

        <>
        <Navbar/>
        <section className='details-with-img'>
            <div className='imgs'>
                <div className='single-image'>
                    <img src={Img1} alt='' className='main-img'></img>
                </div>
                <div className='other-imgs'>
                    <div><img src={Img2} alt='' className='sub-img'></img></div>
                    <div><img src={Img3} alt='' className='sub-img'></img></div>
                    <div><img src={Img4} alt='' className='sub-img'></img></div>
                </div>
            </div>

            </section>
        <Footer/>
        </>
    );
}
export default individual;