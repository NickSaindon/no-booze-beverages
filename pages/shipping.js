import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useState, useContext, useEffect } from 'react';
import StateOptions from "../utils/stateOptions";
import { Container, Row, Col } from 'react-bootstrap';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import NumberFormat from "react-number-format";
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';

const Shipping = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    setValue
  } = useForm();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [states, setStates] = useState("");
  const stateOption = StateOptions.states;
  const { shippingAddress } = cart;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setValue('firstName', shippingAddress.firstName);
    setValue('lastName', shippingAddress.lastName);
    setValue('email', shippingAddress.email);
    setValue('phone', shippingAddress.phone)
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('state', shippingAddress.state);
    setValue('zipCode', shippingAddress.zipCode);
  }, [setValue, shippingAddress]);
    
    const submitHandler = ({ firstName, lastName, email, phone, address, city, state, zipCode }) => {
      dispatch({
        type: 'SAVE_SHIPPING_ADDRESS',
        payload: { firstName, lastName, email, phone, address, city, state, zipCode },
      });

      Cookies.set(
        'cart', 
        JSON.stringify({
          ...cart,
          shippingAddress: {
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            state,
            zipCode
          }
        })
      );
      router.push('/placeorder');
    };

  return (
    <Layout title="No Booze Beverages | Shipping">
      <div className="shipping-container page-contain bg-white py-5">
        <Container className="pt-5">
          <Row className="row">
            <Col lg={{ span: 6, offset: 3 }} md={{ span: 10, offset: 1 }}>
              <p><strong>*</strong> We do not ship to the following US states, counties, and cities where kratom is banned: Alabama, 
                Arkansas, Indiana, Rhode Island, Vermont, Wisconsin, Sarasota County (FL), Union County (NC), Denver (CO), and San Diego (CA).
                Furthmore, it your county or city have banner kratom we will not ship and will refund you for any purchases.
              </p>
            </Col>
          </Row>
        </Container>
        <main className="form-shipping">
          <Container>
            <Row className="justify-content-md-center">
              <form onSubmit={handleSubmit(submitHandler)} className="col-lg-6 col-md-12 col-sm-12">
              <Row>
                <Col>
                <h2>Contact</h2>
                </Col>
                <Col className="text-end">
                  <b>Have an accout? <Link href="/signin">Sign in</Link></b>
                </Col>

              </Row>

              <div className="form-floating">
                <input
                  type="email"
                  {...register('email', {
                    required: 'Please enter email',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: 'Please enter valid email',
                    },
                  })}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  placeholder="Email"
                />
                {errors.email && (
                  <div className="invalid-feedback">
                    {errors.email.message}
                  </div>
                )}
                <label htmlFor="name">Email</label>
              </div>
                <h2>Delivery</h2>

                <div className="form-floating text-center">
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <input 
                        type="text" 
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        id="firstName" 
                        placeholder="First Name" 
                        {...field}
                      />
                    )}
                  />
                  <div className="invalid-feedback">
                    {
                      errors.firstName
                        ? errors.firstName.type === 'minLength'
                        ? 'First Name length is more than 2'
                      : 'First Name is required'
                      : ''
                    }
                  </div>
                  <label htmlFor="firstName">First Name</label>
                </div>

                <div className="form-floating text-center">
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <input 
                        type="text" 
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        id="lastName" 
                        placeholder="Last Name" 
                        {...field}
                      />
                    )}
                  />
                  <div className="invalid-feedback">
                    {
                      errors.lastName
                        ? errors.lastName.type === 'minLength'
                        ? 'Last Name length is more than 2'
                      : 'Last Name is required'
                      : ''
                    }
                  </div>
                  <label htmlFor="lastName">Last Name</label>
                </div>

                <div className="form-floating">
                <Controller 
                  name="phone"
                  control={control}
                  rules={{
                    required: true,
                    pattern: /^\(?\b[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}\b$/
                    ,
                  }}
                  render={({ field: {onChange, name, value} }) => (
                    <NumberFormat
                      format="(###) ###-####"
                      name={name}
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      value={value}
                      id="phone" 
                      placeholder="Phone Number" 
                      onChange={onChange}
                    />
                  )}
                />
                <div className="invalid-feedback">
                    {errors.phone
                          ? errors.phone.type === 'pattern'
                            ? 'Phone number is not completed'
                            : 'Phone number is required'
                          : ''
                    }
                </div>
                <label htmlFor="floatingInput">Phone Number</label>
              </div>
                <div className="form-floating text-center">
                  <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <input 
                        type="text" 
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        id="address" 
                        placeholder="Address" 
                        {...field}
                      />
                    )}
                  />
                  <div className="invalid-feedback">
                    {
                      errors.address
                        ? errors.address.type === 'minLength'
                        ? 'Address length is more than 1'
                      : 'Address is required'
                      : ''
                    }
                  </div>
                  <label htmlFor="address">Address</label>
                </div>
                <div className="form-floating text-center">
                  <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <input 
                        type="text" 
                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                        id="city" 
                        placeholder="City" 
                        {...field}
                      />
                    )}
                  />
                  <div className="invalid-feedback">
                    {
                      errors.city
                        ? errors.city.type === 'minLength'
                        ? 'City length is more than 1'
                      : 'City is required'
                      : ''
                    }
                  </div>
                  <label htmlFor="city">City</label>
                </div>
                <div className="form-floating text-center">
                  <Controller
                    name="state"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field }) => (
                      <select 
                        defaultValue='DEFAULT'
                        className={`form-select ${errors.state ? 'is-invalid' : ''}`} 
                        onChange={(e) => setStates(e.target.value)}
                        value={states}
                        {...field}
                      >
                      <option disabled value="DEFAULT">Select a State</option>
                        {stateOption.map((state) => (
                          <option key={state.value} value={state.value}>{state.label}</option>
                        ))}
                      </select>
                    )}
                  />
                  <div className="invalid-feedback text-center">
                    {
                      errors.state
                        ? 'State is required'
                        : ''
                    }
                  </div>
                </div>
                    <div className="form-floating text-center">
                      <Controller
                        name="zipCode"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          minLength: 2,
                        }}
                        render={({ field }) => (
                          <input 
                            type="text" 
                            className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                            id="zipCode" 
                            placeholder="Zip Code" 
                            {...field}
                          />
                        )}
                      />
                      <div className="invalid-feedback">
                        {
                          errors.zipCode
                            ? errors.zipCode.type === 'minLength'
                              ? 'Zip Code length is more than 1'
                              : 'Zip Code is required'
                            : ''
                        }
                      </div>
                      <label htmlFor="address">Zip Code</label>
                    </div>
                    <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        value="" 
                        id="disclaimer" 
                        {...register("disclaimer", { required: true })}
                    />
                    {errors.disclaimer && <div className="required-checkbox">
                        Please read the diclaimer and check the box.
                    </div>}
                    <label className="form-check-label" htmlFor="disclaimer">
                    <strong>Disclaimer:</strong> Our products are the highest quality (GAP/GMP).  They have not been evaluated by the FDA.  Only for use as botanical 
                    specimen.  The information given is for academic purpose only and not intended to diagnose, treat, cure or prevent disease.
                    </label>
                    </div>
                    <button className="w-100 btn btn-3 btn-outline-primary btn-lg px-4 my-3" type="submit">
                      Continue
                    </button>
                  </form>
                </Row>
              </Container>
            </main>
          </div>
        </Layout>
      )
}

export default Shipping;