import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link'
import Image from "next/image";
import gsap from 'gsap';
import { Container, Row, Col } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import FeaturedProduct from '@/components/FeaturedProduct';
import AgeVerification  from '@/components/AgeVerification';
import Cookies from 'js-cookie';
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    gsap.timeline()
    .fromTo(".heading-text", {y:-100, opacity:0, ease:"back"}, {y:0, opacity: 1})
    .fromTo(".heading-text h1:nth-child(1)", {x:-100, opacity:0, ease:"back", duration: 1}, {x:0, opacity: 1})
    .fromTo(".heading-text h1:nth-child(2)", {x:-100, opacity:0, ease:"back", duration: 1}, {x:0, opacity: 1})
    .fromTo(".heading-text h1:nth-child(3)", {x:-100, opacity:0, ease:"back", duration: 1}, {x:0, opacity: 1})
    .fromTo(".home-header img", { x: 100, opacity: 0, ease: 1, duration: 0.3 }, { x: 0, opacity: 1 })
    .delay(1.8);

    gsap.timeline({scrollTrigger:{
      trigger:".about-section",
      start:"top 75%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".about-section img", {x:-150, opacity:0, ease: 1, duration: 0.3}, {x:0, opacity:1})
    .fromTo(".about-section h1", {y:-150, opacity:0, ease: 1, duration: 0.3}, {y:0, opacity:1})
    .fromTo(".about-section p", {y:150, opacity:0, ease: 1, duration: 0.3}, {y:0, opacity:1})

    gsap.timeline({scrollTrigger:{
      trigger:".wholesale-section",
      start:"top 75%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".wholesale-section img", {x:-150, opacity:0, ease: 1, duration: 0.3}, {x:0, opacity:1})
    .fromTo(".wholesale-section h1", {y:-150, opacity:0, ease: 1, duration: 0.3}, {y:0, opacity:1})
    .fromTo(".wholesale-section p", {y:150, opacity:0, ease: 1, duration: 0.3}, {y:0, opacity:1})

    gsap.timeline({scrollTrigger:{
      trigger:".contact-section",
      start:"top 75%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".contact-section img", {x:-150, opacity:0, ease: 1, duration: 0.3}, {x:0, opacity:1})
    .fromTo(".contact-section h1", {y:-150, opacity:0, ease: 1, duration: 0.3}, {y:0, opacity:1})
    .fromTo(".contact-section p", {y:150, opacity:0, ease: 1, duration: 0.3}, {y:0, opacity:1})

    gsap.timeline({scrollTrigger:{
      trigger:".parallax-container",
      start:"top 65%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".parallax-container h1", {y: -100, opacity: 0, ease:"back", duration: 0.5}, {y: 0, opacity: 1})
    .fromTo(".parallax-container p", {y: 100, opacity: 0, ease:"back", duration: 0.5}, {y: 0, opacity: 1})


    gsap.to(".parallax", {
      yPercent: -30,
      scrollTrigger: {
        trigger: ".parallax-container",
        scrub: true
      }, 
    });

    Cookies.get('isVerified') ? JSON.parse(Cookies.get('isVerified')) : setOpenModal(true);
  }, []);

  const featured = [
    { _id: 1, text: "abc" },
    { _id: 2, text: "def" }
  ];

  const handleIsVerified = () => {
    setOpenModal(false);
    Cookies.set('isVerified', true)
  }

  return (
    <Layout 
      title="No Booze Beverages | Home" 
      description="No Booze Beverages is an online and retail seller of quality Thai botanicals.">
      <AgeVerification 
        open={openModal}
        onClose={handleIsVerified}
      >
      </AgeVerification>
      <div id="page" className="home-container page-contain">
        <div className="home-header">
          <Container className="py-5">
            <Row className="row py-xs-1 py-sm-1 py-md-2 py-lg-5">
              <Col md={6} className="heading-text mx-auto text-center">
                <h1>Cu<span>ltiv</span>ate</h1>
                <h1>Your</h1>
                <h1>T<span>hirs</span>t</h1>
              </Col>
              <Col md={6} className="mx-auto text-center home-header-carousel">
                <Carousel controls={false} indicators={false} pause={false}>
                  <Carousel.Item>
                    <Image src="/images/cherry-pop-header.png" width={480} height={500} alt="No Booze Beverage Cherry Pop Kratom Soda" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <Image src="/images/green-apple-header.png" width={480} height={500} alt="No Booze Beverage Sour Apple Kratom Soda" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <Image src="/images/creamy-peach-header.png" width={480} height={500} alt="No Booze Beverage Creamy Peach Kratom Soda" />
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>
          </Container>
        </div>
        <section className="bg-primary">
          <Container>
            <Row>
              <Col className="text-center text-white py-4">
                <h1>Featured Products</h1>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="featured-product-section">
          <Container fluid>
            <Row>
              <FeaturedProduct/>
            </Row>
          </Container>
        </section>
        <section className="about-section bg-white">
          <Container className="py-xs-2 py-sm-2 py-md-2 py-lg-5">
            <Row>
              <Col sm={12} md={12} lg={6} className="text-center py-xs-2 py-sm-2 py-md-2 py-lg-5 m-auto">
                <Image src="/images/kratom-soda-ad-flipped.png" width={600} height={370} alt="Women relaxing drinking a cherry pop kratom soda" />
              </Col>
              <Col sm={12} md={12} lg={6} className="py-5 m-auto">
                <h1 className="text-primary text-center fw-bold">Our Journey</h1>
                <p className="lead">
                  As a passionate explorer, we have traversed the world, seeking out the highest quality elements that form the 
                  heart of our beverages.  Step into a world of tantalizing taste with No Booze Beverages and elevate your beverage experience.
                  Whether you're seeking a flavorful alternative to traditional sodas or a beverage that harmoniously combines taste and well-being, No Booze Beverages is the ideal choice.                
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <div className="parallax-container">
          <div className="parallax-wrapper">
            <h1>Good Vibes For All</h1>
            <p>We are the alternative to alcohole while having a great time. So dont wait and purchase your No Booze Beverages today!</p>
          </div>
          <div className='parallax' data-depth='0.10'></div>
        </div>
        <section className="wholesale-section bg-white">
          <Container className="py-sm-2 py-md-2 py-lg-5">
            <Row>
              <Col sm={12} md={12} lg={6} className="text-center py-sm-2 py-md-2 py-lg-5 m-auto">
                <Image src="/images/business-deal.jpg" width={600} height={370} alt="Shaking hands to conclude a business deal for wholesale" />
              </Col>
              <Col sm={12} md={12} lg={6} className="py-5 m-auto">
                <h1 className="text-primary text-center fw-bold">Working Together</h1>
                <p className="lead">
                  Join forces to create something extraordinary! No Booze Beverages welcomes collaborations with brands, influencers, kava bars, and anyone with aspirations 
                  reaching for the stars. Whether you're bursting with innovative ideas, envisioning partnerships, or simply eager to concoct some flavor magic, we're all ears. Let's 
                  transform the ordinary into the extraordinary, because together, we're an unstoppable force. Drop us a message, and let the collaboration commence!             
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="ad-row">
          <Container fluid>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Image src="/images/cherry-pop-ad.png" className="contact-img" width={600} height={600} alt="Cherry Pop Kratom Soda splashing in water" />
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Image src="/images/sour-apple-ad.png" className="contact-img" width={600} height={600} alt="Sour Apple Kratom soda leaning against a green apple" />
              </Col>
            </Row>
          </Container>
        </section>
        <section className="contact-section py-lg-5 bg-white">
          <Container className="my-lg-5 bg-gray">
            <Row>
              <Col sm={12} md={12} lg={6} className="m-auto">
                <Image src="/images/contact-img.jpg" className="contact-img" width={500} height={450} alt="Man dialing a phone number on a cell phone" />
              </Col>
              <Col sm={12} md={12} lg={6} className="p-5 m-auto">
                <Image src="/images/paper-airplane.png" className="paper-airplane" width={100} height={100} alt="Paper airplane to represent sending emails" />
                <h1 className="text-primary text-center fw-bold py-3">Contact Us</h1>
                <p className="lead">
                  For any inquiries, feedback, or just to spread some positive vibes, connect with No Booze Beverages. Our dedicated team is here to assist
                  you with any questions or concerns, treating your input like a treasure. We strive to provide exceptional service and flavor experiences.
                  Whether you&#39;re a devoted Kranium enthusiast or taking your first sip of No Booze sodas, we welcome the opportunity to vibe with you. Cheers 
                  to reaching new heights together!               
                </p>
                <div className="text-center">
                  <Button variant="primary" size="lg">Contact Us</Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </Layout>
  )
}
