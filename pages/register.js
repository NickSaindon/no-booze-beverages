import axios from 'axios';
import Layout from '../components/Layout';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect } from 'react';
import Image from "next/image";
import { Controller, useForm } from 'react-hook-form';
import { getError } from '../utils/error';
import NumberFormat from "react-number-format";
import { ToastContainer, toast, Slide } from "react-toastify";

const Register = () => {
  const { data: session } = useSession();
  
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, birthDate, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        birthDate,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error), {
          theme: "colored"
        };        
      }
    } catch (err) {
      toast.error(getError(err), {
        theme: "colored"
      });   
    }
  };

  return (
    <Layout
      title="No Booze Beverages | Register Page"
      description="Register for No Booze Beverages and start purchasing some of the best quality kratom sodas.">
      <div className="register-container page-contain bg-white text-center">
        <ToastContainer 
          position="top-center" 
          draggable={false} 
          transition={Slide} 
          autoClose={5000}
          hideProgressBar={true}
          className="toast-alert"
        />
        <main className="form-conatiner px-3">
          <div className="row justify-content-md-center">
            <form onSubmit={handleSubmit(submitHandler)} className="col-lg-4 col-md-12 col-sm-12">
              <Image src="/images/no-booze-logo.png" className="my-5" width={150} height={150} alt=""/>
              <h1 className="h3 py-3 mb-3 fw-normal">Create An Account</h1>
              <div className="form-floating">
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  placeholder="Full Name" 
                  {...register('name', {
                    required: 'Please enter name',
                  })}
                />
                {errors.name && (
                  <div className="invalid-feedback">
                    {errors.name.message}
                  </div>
                )}
                <label htmlFor="name">Full Name</label>
              </div>
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
              <div className="form-floating">
                <Controller 
                  name="birthDate"
                  control={control}
                  rules={{
                    required: true,
                    pattern: /\d{2}\/\d{4}/
                    ,
                  }}
                  render={({ field: {onChange, birthDate, value} }) => (
                    <NumberFormat
                      format="##/####"
                      name={birthDate}
                      className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
                      value={value}
                      id="birthDate" 
                      placeholder="Birth Date mm/yyyy" 
                      onChange={onChange}
                    />
                  )}
                />
                <div className="invalid-feedback">
                    {errors.birthDate
                          ? errors.birthDate.type === 'pattern'
                            ? 'Phone number is not completed'
                            : 'Phone number is required'
                          : ''
                    }
                </div>
                <label htmlFor="floatingInput">Birth Date mm/yyyy</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  {...register('password', {
                    required: 'Please enter password',
                    minLength: { value: 6, message: 'password is more than 5 chars' },
                  })}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  placeholder="Password"
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
                <label htmlFor="password">Password</label>
              </div>
              <div className="form-floating">
                <input
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password" 
                  {...register('confirmPassword', {
                    required: 'Please enter confirm password',
                    validate: (value) => value === getValues('password'),
                    minLength: {
                      value: 6,
                      message: 'confirm password is more than 5 characters',
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback ">
                    {errors.confirmPassword.message}
                  </div>
                )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === 'validate' && (
                    <div className="invalid-feedback">Password do not match</div>
                )}
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
              <button className="w-100 btn btn-lg btn-outline-primary light" type="submit">
                Register
              </button>
              <p className="mt-5 mb-3 text-black">
                Already have an account? &nbsp;
                <Link href={`/login?redirect=${redirect || '/'}`} legacyBehavior>
                  <a>Login</a>
                </Link>
              </p>
            </form>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Register;