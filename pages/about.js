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
    gsap.timeline()
    .fromTo(".about-header", { opacity: 0, ease: 1, duration: 0.3 }, { opacity: 1 })
    .fromTo(".about-header h1", {y:-100, opacity:0, ease:"back", duration: 1}, {y:0, opacity: 1})
    .delay(2.3);

    gsap.timeline({scrollTrigger:{
      trigger:".section-one",
      start:"top 75%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".section-one .about-row-img img:nth-child(1)", {x:-150, opacity:0, ease: 1, duration: 0.3}, {x:0, opacity:1})
    .fromTo(".section-one h2", {y:-150, opacity:0, ease: 1, duration: 0.3}, {y:0, opacity:1})
    .fromTo(".section-one p", {y:150, opacity:0, ease: 1, duration: 0.3}, {y:0, opacity:1})

    gsap.timeline({scrollTrigger:{
      trigger:".section-two",
      start:"top 75%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".section-two h2", {y:-150, opacity:0, ease: 1, duration: 0.3}, {y:0, opacity:1})
    .fromTo(".section-two p", {y:150, opacity:0, ease: 1, duration: 0.3}, {y:0, opacity:1})
    .fromTo(".section-two .about-row-img", {x:150, opacity:0, ease: 1, duration: 0.3}, {x:0, opacity:1})

    gsap.timeline({scrollTrigger:{
      trigger:".section-three",
      start:"top 75%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".section-three .about-row-img", {x:-150, opacity:0, ease: 1, duration: 0.3}, {x:0, opacity:1})
    .fromTo(".section-three h2", {y:-150, opacity:0, ease: 1, duration: 0.3}, {y:0, opacity:1})
    .fromTo(".section-three p", {y:150, opacity:0, ease: 1, duration: 0.3}, {y:0, opacity:1})

    gsap.timeline({scrollTrigger:{
      trigger:".about-bottom-section",
      start:"top 75%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".about-bottom-section", {opacity:0, ease: 1, duration: 0.3}, {opacity:1})
    .fromTo(".about-bottom-text h1", {y:-150, opacity:0, ease: 1, duration: 0.3}, {y:0, opacity:1})
    .fromTo(".about-bottom-text p", {x:150, opacity:0, ease: 1, duration: 0.3}, {x:0, opacity:1})
    .fromTo(".about-bottom-text button", {y:150, opacity:0, ease: 1, duration: 0.3}, {y:0, opacity:1})


    gsap.to(".cherry-pop-can", {
      yPercent: -30,
      scrollTrigger: {
        trigger: ".section-one",
        scrub: true
      }, 
    });
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
    <div className="about-container page-contain">
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
        <section className="about-row section-one">
          <Container fluid>
            <Row>
              <Col lg={6} md={12} sm={12} className="about-row-img">
                <Image src="/images/sieze-the-day.jpg" className="contact-img" width={600} height={600} alt="..." />
                <Image src="/images/about-cherry-pop.png" className="cherry-pop-can" width={410} height={1050} alt="..." />
              </Col>
              <Col lg={6} md={12} sm={12} className="about-row-text m-auto">
              <h2 className="text-primary text-center fw-bold">Carpe Deim</h2>
                <p className="lead carpe-deim-text">
                  Prepare to embark on a flavorful journey with No Booze Beverages! Our sodas, inspired by flavors from around the globe, promise to add a burst of taste to every 
                  moment. Whether you're unwinding or staying productive, No Booze is your ultimate refreshment companion. It's more than just a Kratom or Kava soda; it's a voyage 
                  of flavors.
                  <br/><br/>
                  Indulge in the rich and diverse profiles of our beverages, carefully crafted to elevate your drinking experience. From exotic botanical blends to tantalizing 
                  fruit infusions, each sip is a step into the unexpected. No Booze Beverages invites you to redefine your beverage experience and discover the endless 
                  possibilities of a non-alcoholic refreshment that's bold, distinctive, and always satisfying.          
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
        <section className="about-row section-two">
          <Container fluid>
          <Row>
            <Col lg={6} md={12} sm={12} className="about-row-text m-auto">
            <h2 className="text-primary text-center fw-bold">Our Journey</h2>
              <p className="lead">
                Since its inception, NoBooze Beverages has undertaken a global odyssey in pursuit of the finest, ethically grown, and eco-friendly plant-based 
                ingredients. As a passionate explorer, we have traversed the world, seeking out the highest quality elements that form the heart of our beverages.
                <br /><br />
                Our quest has led us to source ingredients from a myriad of cultures, capturing the vibrant essence of markets and local farms. Personally engaged in the process, No Booze Beverages 
                have worked alongside indigenous planters to harvest the very ingredients that define the uniqueness of our beverages. At No Booze Beverages, we are dedicated to 
                bringing you a taste that reflects not only the diversity of the world's cultures but also a commitment to ethical and sustainable practices.              
              </p>
            </Col>
            <Col lg={6} md={12} sm={12} className="about-row-img">
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
        <section className="about-row section-three">
          <Container fluid>
            <Row>
              <Col lg={6} md={12} sm={12} className="about-row-img">
                <Image src="/images/about-img3.jpg" className="contact-img" width={600} height={600} alt="..." />
              </Col>
              <Col lg={6} md={12} sm={12} className="about-row-text m-auto">
              <h2 className="text-primary text-center fw-bold">Amazing Flavors Exclusively For No Booze Beverages</h2>
                <p className="lead">
                  Quality reigns supreme. When No Booze Beverages embarked on this beautiful journey, your satisfaction as a customer took center stage. Months were dedicated to 
                  traversing the globe, visiting farms and meticulously selecting the highest quality Kratom, Kava, and Blue Lotus. The process involved rigorous testing, starting 
                  in the kitchen and progressing to the lab.
                  <br /><br />
                  Collaborating with a team, we tirelessly sourced the freshest, natural, and most flavorful ingredients to craft our wonders. Each flavor underwent multiple 
                  iterations, ensuring that every drink No Booze Beverages offers is one we are proud to share with friends and family.
                  <br /><br />
                  Enjoy the fruits of this dedication!               
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