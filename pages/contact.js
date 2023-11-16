import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Image from "next/image";
import { Controller, useForm } from 'react-hook-form';
import gsap from 'gsap';
import NumberFormat from "react-number-format";
import axios from 'axios';
import {Container, Row, Col} from 'react-bootstrap';
import { ToastContainer, toast, Slide } from "react-toastify";

const Contact = () => {
  const { handleSubmit, control, formState: { errors }, reset } = useForm();
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // gsap.timeline()
    // .fromTo(".contact-text .header-one", { y:-100, opacity: 0, ease: 1, duration: 0.3 }, { y: 0, opacity: 1 })
    // .fromTo(".contact-text .header-two", { opacity: 0, ease: 1, duration: 0.5 }, { opacity: 1 })
    // .fromTo(".contact-text p", { y: 100, opacity: 0, ease: 1, duration: 0.3 }, { y: 0, opacity: 1})
    // .delay(1.2);
  }, []);

  async function onSubmitForm(values) {
    let config = {
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: values,
    };
    const response = await axios(config);

    try {
      if (response.status == 200) {
        reset();
        toast.success("Your email has been sent and we will get back to you soon", {
          theme: "colored"
        });
      }
    } catch(err) {
      if (response.status == 500) {
        toast.error("Opps, something went wrong and your email was not sent.  Please try again!", {
          theme: "colored"
        });
      }
    }
  }

  return (
    <Layout 
      title="No Booze Beverages | Contact"
      description="Contact us today and findout more about our quality Thai botanical products.">
      <div className="contact-container">
        <ToastContainer 
          position="top-center" 
          draggable={false} 
          transition={Slide} 
          autoClose={8000}
          hideProgressBar={true}
          className="toast-alert"
        />
        <div className="contact-header">
          <h1>Contact Us Today</h1>
        </div>
        <div className="form-conainer">
          <div className="form-row">
            <div className="row justify-content-md-center ">
              <form onSubmit={handleSubmit(onSubmitForm, phone, setPhone)} 
                className="col-lg-6 col-md-12 col-sm-12 text-center needs-validation" noValidate>
                <Image src="/images/no-booze-logo.png" className="my-5" width={150} height={150} alt=""/>
                <div className="form-floating">
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <input 
                        type="text" 
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name" 
                        placeholder="Full Name" 
                        {...field}
                      />
                    )}
                  />
                  <div className="invalid-feedback">
                    {
                      errors.name
                        ? errors.name.type === 'minLength'
                          ? 'Name length is more than 1'
                          : 'Name is required'
                        : ''
                    }
                  </div>
                  <label htmlFor="name">Full Name</label>
                </div>
                <div className="form-floating">
                  <Controller 
                    name="phone"
                    control={control}
                    rules={{
                      required: true,
                      pattern: /^\(?\b[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}\b$/,
                    }}
                    render={({ field: {name, onChange = (e) => setPhone(e.target.value), value = phone}}) => (
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
                <div className="form-floating">
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    }}
                    render={({ field }) => (
                      <input 
                        type="email" 
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email" 
                        placeholder="name@example.com" 
                        {...field}
                      />
                    )}
                  />
                  <div className="invalid-feedback">
                    {errors.email
                      ? errors.email.type === 'pattern'
                          ? 'Email is not valid'
                          : 'Email is required'
                      : ''
                    }
                  </div>
                  <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating">
                  <Controller 
                    name="message"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <textarea 
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                        id="message" 
                        placeholder="Message goes here" 
                        rows="4"
                        {...field}
                      ></textarea>

                    )}
                  />
                  <div className="invalid-feedback">
                    {
                      errors.message
                        ? errors.message.type === 'minLength'
                          ? 'Message length is more than 1'
                          : 'Message is required'
                        : ''
                    }
                  </div>
                  <label htmlFor="message">Message</label>
                </div>
                <button className="w-100 btn btn-3 btn-outline-primary btn-lg px-4 py-3 my-4 light" type="submit">
                  Submit Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact;