import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { getError } from '../utils/error';
import { ToastContainer, toast, Slide } from "react-toastify";

const Signin = () => {
  const { data: session } = useSession();
  const { handleSubmit, control, formState: { errors } } = useForm();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);
 

  const submitHandler = async ({email, password}) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: email, 
        password: password,
      });

      if (!result.error) {
        return "Authorized Successful"
      }

      if (result.error) {
        toast.error(result.error, {
          theme: "colored"
        });
      }
      
    } catch (err) {
      toast.error(getError(err), {
        theme: "colored"
      });
    }
  }

  return (
    <Layout 
      title="No Booze Beverages | Login"
      description="Login and start purchasing your Thai botanicales today with No Booze Beverages.  Our quality products and great prices are exactly what you have been looking for.">
      <div className="login-container page-contain py-5 bg-white text-center">
        <div className="form-signin">
          <div className="row justify-content-md-center">
            <ToastContainer 
              position="top-center" 
              draggable={false} 
              transition={Slide} 
              autoClose={5000}
              hideProgressBar={true}
              className="toast-alert"
            />
            <form onSubmit={handleSubmit(submitHandler)} className="col-lg-5 col-md-12 col-sm-12 needs-validation" noValidate>
              <h1 className="py-3 fw-normal fs-1 text-primary">Please Signin</h1>
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
                      id="email-signin" 
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
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 6
                  }}
                  render={({ field }) => (
                    <input 
                      type="password" 
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="signin-password" 
                      placeholder="Password" 
                      {...field}
                    />
                  )}
                />
                <div className="invalid-feedback">
                  {errors.password
                    ? errors.password.type === 'minLength'
                      ? 'Password is more than 5'
                      : 'Password is required'
                    : ''
                  }
                </div>
                <label htmlFor="password">Password</label>
              </div>
              <button className="w-100 btn btn-lg btn-outline-primary signin-btn" type="submit">Sign in</button>
              <p className="pt-3">If you don&apos;t have an account please click on the Create an Account link below.</p>
              <p>
                Don&apos;t have an account? &nbsp;
                <Link href="/register" className="text-primary">
                  Create an Accout
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Signin;