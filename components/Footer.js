import Link from 'next/link'
import Image from "next/image";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row g-4 py-5">
          <div className="col-lg-5 col-md-12">
            <div className="text-center g-4 py-3">
              <Image src="/images/no-booze-logo.png" width={125} height={125} alt="No Booze Beverages Logo"/>
            </div>
            <p>
            FDA DISCLAIMER: This product is not for use by or sale to persons under the age of 18 or 21 depending on the laws of your governing 
            state or territory. The statements made regarding these products have not been evaluated by the Food and Drug Administration. The 
            efficacy of these products has not been confirmed by FDA-approved research. These products are not intended to diagnose, treat, cure 
            or prevent any disease. All information from health care practitioners. Please consult your healthcare professional about potential 
            interactions or other possible complications before using any product. The Federal Food, Drug, and Cosmetic Act requires this 
            notice. By using this site you agree to follow the Privacy Policy and all Terms & Conditions printed on this site. Void Where 
            Prohibited By Law. Derived from 100%
            </p>
          </div>
          <div className="col-lg-3 col-md-12 mx-auto">
            <div className="footer-connect-links">
              <div className="social-media">
                <ul>
                  <li>
                    <Link href="#" legacyBehavior>
                      <a target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-facebook" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" legacyBehavior>
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
                      <Link href="/about">
                        Our Journey
                      </Link>
                    </li>
                    <li>
                      <Link href="/register">
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link href="/news">
                        News
                      </Link>
                    </li>
                    <li>
                      <Link href="/kratom-faq">
                        Kratom FAQ
                      </Link>
                    </li>
                    <li>
                      <Link href="/wholesale">
                        Wholesale
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-12">
            <div className="quick-links">
              <div className="footer-nav">
                <h4>Quick Links</h4>
                <ul>
                  <li>
                    <Link href="/signin">
                      My Account / Signin
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/refund-policy">
                      Refund Policies
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping-policy">
                      Shipping Policies
                    </Link>
                  </li>
                </ul> 
                <ul>
                  <li>
                    <Link href="/privacy-policy">
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