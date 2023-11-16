import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link'
import Button from 'react-bootstrap/Button';
import Carousel from 'react-grid-carousel'

const FeaturedProduct = () => {
  return (
    <Carousel 
      cols={3} 
      rows={1} 
      gap={0} 
      hideArrow={true}
      responsiveLayout={[
        {
          breakpoint: 1200,
          cols: 2
        },
        {
          breakpoint: 770,
          cols: 1
        }
      ]}
      loop
    >
      <Carousel.Item>
        <div className="featured-product text-center" style={{backgroundImage: `url(/images/header-apple.jpg)`}}>
          <h2>
            Checkout<br/>Sour Apple
          </h2>
          <Link href="/product/sour-apple-kratom-soda">
            <Button variant="primary" size="lg">Details</Button>
          </Link>
        </div>        
      </Carousel.Item>
      <Carousel.Item>
        <div className="featured-product text-center" style={{backgroundImage: `url(/images/header-peach-cream.jpg)`}}>
          <h2>
            Checkout<br/>Creamy Peach
          </h2>
          <Link href="/product/peachy-cream-kratom-soda">
            <Button variant="primary" size="lg">Details</Button>
          </Link>
        </div>           
      </Carousel.Item>
      <Carousel.Item>
        <div className="featured-product text-center" style={{backgroundImage: `url(/images/header-cherries.jpg)`}}>
          <h2>
            Checkout<br/>Cherry Pop
          </h2>
          <Link href="/product/cherry-pop-kratom-soda">
            <Button variant="primary" size="lg">Details</Button>
          </Link>
        </div>   
      </Carousel.Item>
    </Carousel>
  )
}

export default FeaturedProduct;