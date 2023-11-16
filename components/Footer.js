import Link from 'next/link'
import Image from "next/image";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row g-4 py-5">
          <div className="col-lg-4 col-md-12">
            <div className="text-center g-4 py-3">
              <Image src="/images/no-booze-logo.png" width={125} height={125} alt="No Booze Beverages Logo"/>
            </div>
            <p>
              Must be of legal age to purchase these products. No Booze Beverages assumes 
              no liability for the misuse or misrepresentation of these products. Keep out of reach of children and pets. Avoid 
              contact with eyes. We do not ship to the following US states, counties, and cities where kratom is banned: Alabama, 
              Arkansas, Indiana, Rhode Island, Vermont, Wisconsin, Sarasota County (FL), Union County (NC), Denver (CO), and San Diego (CA).
            </p>
          </div>
          <div className="col-lg-4 col-md-12 mx-auto">
            <div className="footer-connect-links">
              <div className="social-media">
                <ul>
                  <li>
                    <Link href="https://www.facebook.com/Dragon-Organics-61552383274313" legacyBehavior>
                      <a target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-facebook" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.instagram.com/dragonorganics?igshid=NzZlODBkYWE4Ng" legacyBehavior>
                      <a target="_black" rel="noopener noreferrer">
                        <i className="bi bi-instagram" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" legacyBehavior>
                      <a target="_black" rel="noopener noreferrer">
                        <i className="bi bi-twitter" />
                      </a> 
                    </Link>
                  </li>
                  <li>
                    <Link href="#" legacyBehavior>
                      <a target="_black" rel="noopener noreferrer">
                        <i className="bi bi-linkedin" />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="explore-links">
                <div className="footer-nav">
                  <h4>Explore</h4>
                  <ul>
                    <li>
                      <Link href="/">
                        Our Journey
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link href="/about">
                        News
                      </Link>
                    </li>
                    <li>
                      <Link href="/news">
                        Kratom Facts & FAQ
                      </Link>
                    </li>
                    <li>
                      <Link href="/register">
                        Lab Results
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="quick-links">
              <div className="footer-nav">
                <h4>Quick Links</h4>
                <ul>
                  <li>
                    <Link href="/">
                      My Account / Signin
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/news">
                      Shipping / Refund Policies
                    </Link>
                  </li>
                  <li>
                    <Link href="/register">
                      Wholesale
                    </Link>
                  </li>
                </ul> 
                <ul>
                  <li>
                    <Link href="/privacy-policy">
                      Find NNB Near Me
                    </Link>
                  </li>
                  <li>
                    <Link href="/refund-policy">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                  <Link href="/terms-of-service">
                      Terms of Service
                    </Link>
                  </li>
                </ul> 
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copy-right bg-primary text-center g-4 py-4">
        <p>No Booze Beverages © 2023 | Kratom Products</p>
      </div>
    </div>
  );
}
  
export default Footer; 