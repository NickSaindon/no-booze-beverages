import { useEffect } from 'react';
import Layout from '../components/Layout';
import gsap from 'gsap';
import Image from "next/image";
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const About = () => {

  useEffect(() => {
    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: "#pinned",
    //     start: "top top",
    //     end: () => `+=500%`,
    //     pin: true,
    //     pinSpacing: true,
    //     scrub: 1,
    //     invalidateOnRefresh: true,
    //   },
    // });
    
    // tl.fromTo(".about-background-image", {
    //   width: "30%"
    // }, {
    //   duration: .5,
    //   width: "100%",
    // })
    
    
    // tl.fromTo(
    //   ".farm",
    //   {
    //     y: 40,
    //     opacity: 0,
    //   },
    //   {
    //     y: 0,
    //     opacity: 1,
    //   }
    // );
    // tl.to(".farm", {
    //   y: -40,
    //   opacity: 0,
    // });
    
    
    // tl.fromTo(
    //   ".home",
    //   {
    //     y: 40,
    //     opacity: 0,
    //   },
    //   {
    //     y: 0,
    //     opacity: 1,
    //   }
    // );
    // tl.to(".home", {
    //   y: -40,
    //   opacity: 0,
    // });
  }, [])

  return (
    <Layout title="No Booze Beverages | About"
      description="No Booze Beverages | Online and retail seller of quality Thai botanicals.  Findout about our company and the rich culture behind our products.">
    <div className="about-container">
        <div className="about-header">
          <h1>Our Journey</h1>
        </div>
      <section className="bg-primary">
          <Container>
            <Row>
              <Col className="text-center text-white py-4">
                <h1>Fun Times without the Booze</h1>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="about-row">
          <Container fluid>
            <Row>
              <Col lg={6} md={6} sm={12} className="about-row-img">
                <Image src="/images/sieze-the-day.jpg" className="contact-img" width={600} height={600} alt="..." />
                <Image src="/images/about-cherry-pop.png" className="cherry-pop-can" width={410} height={1050} alt="..." />
              </Col>
              <Col lg={6} md={6} sm={12} className="about-row-text m-auto">
              <h1 className="text-primary text-center fw-bold">Seize the Day</h1>
                <p className="lead">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim 
                  id est laborum.                
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section style={{backgroundColor: "#ffae00"}}>
          <Container>
            <Row>
              <Col className="text-center text-white py-4">
                <h1>Fun Times without the Booze</h1>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="about-row">
          <Container fluid>
          <Row>
            <Col lg={6} md={6} sm={12} className="about-row-text m-auto">
            <h1 className="text-primary text-center fw-bold">Our Journey</h1>
              <p className="lead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim 
                id est laborum.                
              </p>
            </Col>
            <Col lg={6} md={6} sm={12} className="about-row-img">
              <Image src="/images/cherry-pop-ad.png" className="contact-img" width={600} height={600} alt="..." />
            </Col>

          </Row>
          </Container>
        </section>
        <section style={{backgroundColor: '#ff9047'}}>
          <Container>
            <Row>
              <Col className="text-center text-white py-4">
                <h1>Fun Times without the Booze</h1>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="about-row">
          <Container fluid>
            <Row>
              <Col lg={6} md={6} sm={12} className="about-row-img">
                <Image src="/images/about-img3.jpg" className="contact-img" width={600} height={600} alt="..." />
              </Col>
              <Col lg={6} md={6} sm={12} className="about-row-text m-auto">
              <h1 className="text-primary text-center fw-bold">Amazing Flavors Exclusively For No Booze Beverages</h1>
                <p className="lead">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim 
                  id est laborum.                
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section style={{backgroundColor: '#9e1313'}}>
          <Container>
            <Row>
              <Col className="text-center text-white py-4">
                <h1>Fun Times without the Booze</h1>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="about-bottom-section">
          <Container fluid>
            <Row>
              <div className="about-bottom-text text-white">
                <h1 className="fw-bold">Kratom Soda</h1>
                <p className="lead ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <Button variant="primary" size="lg">Shop Kratom Soda</Button>
              </div>
              <Image src="/images/about-full.jpg" className="contact-img" width={1920} height={1080} alt="..." />
            </Row>
          </Container>
        </section>
      </div>
    </Layout>
  )
}

export default About;