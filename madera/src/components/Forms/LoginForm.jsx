import { useEffect, useState } from 'react';
import './Forms.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';

// Define form validation schema using zod
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" })
}); // GOOD

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema)
  }); // GOOD

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //1. Initialize a state to manage the loading indicator during the signup process.
  const [isLoading, setIsLoading] = useState(false); //GOOD

  const onSubmit = data => {
    setIsLoading(true);
    
    //2.  Create a function that sends a POST request to the /api/signup endpoint with the user's signup data. Use the fetch API for sending the request. Include headers for Content-Type set to application/json, and stringify the form data for the body.
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok"); // Check for response failure
      }
      return response.json(); 
    })
    .then(data => {
      localStorage.setItem("token", data.token); // Store token in local storage
      toast.success("Login successful"); // Show success message
      // Update redux store with user info
      dispatch(login({
        firstName: data?.user?.firstName || "",
        lastName: data?.user?.lastName || "",
        email: data?.user?.email || "",
        phoneNumber: data?.user?.phoneNumber || "",
        designation: data?.user?.designation || "",
        avatar: "",
      }));
      navigate("/account"); // Navigate to account page on success
    })
    .catch(error => {
      toast.error(error.message || "An error occurred during login"); // Show error message on failure
    })
    .finally(() => setIsLoading(false)); // Reset loading state after request
  };

  useEffect(() => {
    // Display validation errors
    const errorKeys = Object.keys(errors);
    errorKeys.forEach((key, index) => {
      setTimeout(() => {
        toast.error(errors[key].message);
      }, (index + 1) * 1000);
    });
  }, [errors]);

  return (
    <>
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tippy content="Home" animation="fade" arrow={true}>
            <h2 className="title">
              <Link to="/">Ravenous</Link>
            </h2>
          </Tippy>
          <div className="email-login">
            <label htmlFor="email">
              {" "}
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="name@abc.com"
              {...register("email")}
            />
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="8+ (a, A, 1, #)"
              {...register("password")}
            />
          </div>
          {isLoading ? (
            <button className="cta-btn" disabled>
              Loading...
            </button>
          ) : (
            <button className="cta-btn">Login</button>
          )}
          <Link className="forget-pass" to="/signup">
            Create an Account
          </Link>
        </form>
      </div>
    </>
  );
};

export default LoginForm;