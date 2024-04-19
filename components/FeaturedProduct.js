import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link'
import Button from 'react-bootstrap/Button';
import Carousel from 'react-multi-carousel';

const FeaturedProduct = () => {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 579 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 579, min: 0 },
      items: 1
    }
  };

  return (

<Carousel responsive={responsive}>
  <div className="featured-product text-center" style={{backgroundImage: `url(/images/header-apple.jpg)`}}>
    <h2>
      Checkout<br/>Sour Apple
    </h2>
    <Link href="/products/kranium-sodas/sour-apple-kranium-soda-12oz">
      <Button variant="primary" size="lg">Details</Button>
    </Link>
  </div> 
  <div className="featured-product text-center" style={{backgroundImage: `url(/images/header-peach-cream.jpg)`}}>
    <h2>
      Checkout<br/>Creamy Peach
    </h2>
    <Link href="/products/kranium-sodas/creamy-peach-kranium-soda-12oz">
      <Button variant="primary" size="lg">Details</Button>
    </Link>
  </div>   
  <div className="featured-product text-center" style={{backgroundImage: `url(/images/header-cherries.jpg)`}}>
    <h2>
      Checkout<br/>Cherry Pop
    </h2>
    <Link href="/products/kranium-sodas/cherry-pop-kranium-soda-12oz">
      <Button variant="primary" size="lg">Details</Button>
    </Link>
  </div>  
</Carousel>


    // <>
    //   <div className="featured-product text-center" style={{backgroundImage: `url(/images/header-apple.jpg)`}}>
    //     <h2>
    //       Checkout<br/>Sour Apple
    //     </h2>
    //     <Link href="/products/kratom-soda/sour-apple-12oz">
    //       <Button variant="primary" size="lg">Details</Button>
    //     </Link>
    //   </div> 
    //   <div className="featured-product text-center" style={{backgroundImage: `url(/images/header-apple.jpg)`}}>
    //     <h2>
    //       Checkout<br/>Sour Apple
    //     </h2>
    //     <Link href="/products/kratom-soda/sour-apple-12oz">
    //       <Button variant="primary" size="lg">Details</Button>
    //     </Link>
    //   </div> 
    //   <div className="featured-product text-center" style={{backgroundImage: `url(/images/header-apple.jpg)`}}>
    //     <h2>
    //       Checkout<br/>Sour Apple
    //     </h2>
    //     <Link href="/products/kratom-soda/sour-apple-12oz">
    //       <Button variant="primary" size="lg">Details</Button>
    //     </Link>
    //   </div>
    // </>
    // <Carousel 
    //   cols={3} 
    //   rows={1} 
    //   gap={0} 
    //   responsiveLayout={[
    //     {
    //       breakpoint: 1200,
    //       cols: 1
    //     },
    //     {
    //       breakpoint: 770,
    //       cols: 1
    //     }
    //   ]}
    //   loop
    // >
    //   <Carousel.Item>
    //     <div className="featured-product text-center" style={{backgroundImage: `url(/images/header-apple.jpg)`}}>
    //       <h2>
    //         Checkout<br/>Sour Apple
    //       </h2>
    //       <Link href="/products/kratom-soda/sour-apple-12oz">
    //         <Button variant="primary" size="lg">Details</Button>
    //       </Link>
    //     </div>        
    //   </Carousel.Item>
    //   <Carousel.Item>
    //     <div className="featured-product text-center" style={{backgroundImage: `url(/images/header-peach-cream.jpg)`}}>
    //       <h2>
    //         Checkout<br/>Creamy Peach
    //       </h2>
    //       <Link href="/products/kratom-soda/creamy-peach-12oz">
    //         <Button variant="primary" size="lg">Details</Button>
    //       </Link>
    //     </div>           
    //   </Carousel.Item>
    //   <Carousel.Item>
    //     <div className="featured-product text-center" style={{backgroundImage: `url(/images/header-cherries.jpg)`}}>
    //       <h2>
    //         Checkout<br/>Cherry Pop
    //       </h2>
    //       <Link href="/products/kratom-soda/cherry-pop-12oz">
    //         <Button variant="primary" size="lg">Details</Button>
    //       </Link>
    //     </div>   
    //   </Carousel.Item>
    // </Carousel>
  )
}

export default FeaturedProduct;