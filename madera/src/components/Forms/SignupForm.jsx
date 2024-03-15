import React, { useEffect } from 'react';
import './Forms.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import z from 'zod';

const schema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
  phoneNumber: z.string().min(10, { message: 'Invalid phone number' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  
  //address schema
  streetAddress: z.string().min(1, {message: 'Street address is requried'}),
  city: z.string().min(1, {message: 'City is required'}),
  zipCode: z.string().min(1, {message: 'Zip code is required'}),
  state: z.string().min(1, {message: "State is required"})

});

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const errorKeys = Object.keys(errors);
    errorKeys.forEach((key, index) => {
      setTimeout(() => {
        toast.error(errors[key].message);
      }, (index + 1) * 1000);
    });
  }, [errors]);

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }


    //Call local signup endpoint
    fetch ("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error ("Network response not ok");
        }
        return res.json()
      })
      .then((data) => {
        toast.success("Signup successful, please log in.");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message || "An error occured during signup.");
      })
      //Set more state variables down here with .finally if needed
    // Dispatch the login action to update authentication state
    //dispatch(login(data)); - This will be good for the handlesubmit in login.jsx
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="email-login">
          <label htmlFor="firstName"><b>First Name</b></label>
          <input type="text" placeholder="John" {...register('firstName')} />
          {errors.firstName && <p className="validation-error">{errors.firstName.message}</p>}

          <label htmlFor="lastName"><b>Last Name</b></label>
          <input type="text" placeholder="Doe" {...register('lastName')} />
          {errors.lastName && <p className="validation-error">{errors.lastName.message}</p>}

          <label htmlFor="email"><b>Email</b></label>
          <input type="text" placeholder="name@abc.com" {...register('email')} />
          {errors.email && <p className="validation-error">{errors.email.message}</p>}

          <label htmlFor="phoneNumber"><b>Phone Number</b></label>
          <input type="text" placeholder="1234567890" {...register('phoneNumber')} />
          {errors.phoneNumber && <p className="validation-error">{errors.phoneNumber.message}</p>}

          <label htmlFor="streetAddress"><b>Street Address</b></label>
          <input type="text" placeholder="123 main st." {...register('streetAddress')} />
          {errors.streetAddress && <p className="validation-error">{errors.streetAddress.message}</p>}

          <label htmlFor="city"><b>City</b></label>
          <input type="text" placeholder="Yakima" {...register('city')} />
          {errors.city && <p className="validation-error">{errors.city.message}</p>}

          <label htmlFor="city"><b>City</b></label>
          <input type="text" placeholder="Yakima" {...register('city')} />
          {errors.city && <p className="validation-error">{errors.city.message}</p>}

          <label htmlFor="zipCode"><b>Zip Code</b></label>
          <input type="text" placeholder="00000" {...register('zipCode')} />
          {errors.zipCode && <p className="validation-error">{errors.zipCode.message}</p>}

          <label htmlFor="state"><b>State</b></label>
          <input type="text" placeholder="Washington" {...register('state')} />
          {errors.state && <p className="validation-error">{errors.state.message}</p>}


          <label htmlFor="password"><b>Password</b></label>
          <input type="password" placeholder="Password" {...register('password')} />
          {errors.password && <p className="validation-error">{errors.password.message}</p>}


          <label htmlFor="confirmPassword"><b>Confirm Password</b></label>
          <input type="password" placeholder="Repeat your password" {...register('confirmPassword')} />
          {errors.confirmPassword && <p className="validation-error">{errors.confirmPassword.message}</p>}
        </div>
        <button className="cta-btn">Sign up</button>
        <p className="subtitle">Already have an account? <Link to="/login">Sign in</Link></p>
      </form>
      <Toaster />
    </div>
  );
};

export default SignupForm;
