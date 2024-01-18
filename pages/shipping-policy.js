import Layout from '../components/Layout';

const ShippingPolicy = () => {
  return (
    <Layout 
      title="No Booze Beverages | Shipping Policy"
      description="Learn what to expect from shipping and delivery when buying kratom from Dragon Organics. See our shipping times, costs, and restrictions."
    >
      <div className="policy-container py-5">
        <div className="container pt-5">
          <h1 className="text-center text-primary">Shipping Policy</h1>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="py-2">
                <p>
                  Shipping within the United States only, all other Countries excluded.
                </p>
                <p className="pt-3">
                  We are unable to ship orders to the following states:
                </p>
                <ul>
                    <li>Alabama</li>
                    <li>Arkansas</li>
                    <li>Indiana</li>
                    <li>Rhode Island</li>
                    <li>Vermont</li>
                    <li>Wisconsin</li>
                    <li>Mississippi</li>
                </ul>
              </div>
              <div className="py-2">
                <p>
                  We are unable to ship orders to the following US Cities:
                </p>
                <ul>
                  <li>San Diego, California</li>
                  <li>Denver, Colorado</li>
                  <li>Jerseyville, Alton, and Edwardsville, Illinois</li>
                </ul>
              </div>
              <div className="py-2">
                <p>
                  We are unable to ship orders to the following US Counties:
                </p>
                <ul>
                  <li>Exclude all Sarasota County, FL. zip codes</li>
                  <li>Exclude all Lee County, FL. zip codes</li>
                  <li>Jerseyville, IL zip: 62052</li>
                </ul>
              </div>
              <div className="py-2">
                <p>
                  The consumer must be 18 yrs. of age and older to place an order. Consumers in the state of Florida, Tennessee, and Utah must be 21 yrs. of age and older to place an 
                  order. Florida is 21 and older and is effective as of July 1, 2023.                 
                  <br/><br/>
                  Consumer agrees to our Terms and Conditions prior to making the final purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ShippingPolicy;