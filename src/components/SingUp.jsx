import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase.init";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SingUp = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSingUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const terms = e.target.terms.checked;

    if (password.length < 6) {
      setErrorMessage("password should be 6 characters");
      return;
    }

    if (!terms) {
      setErrorMessage("Please accept our terms and conditions.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "At least one uppercase, one lowercase, one number, one special character"
      );
      return;
    }

    setSuccess(false);
    setErrorMessage("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);

        // Send email verification code
        sendEmailVerification(auth.currentUser).then(() =>
          console.log("Email verification sent")
        );

        // update profile name and profile photo;
        const profile = {
          displayName: name,
          photoURL: photo,
        };

        updateProfile(auth, profile)
          .then(() => console.log("Profile updated"))
          .catch(() => console.log("Profile not updated for a error"));

        setSuccess(true);
      })
      .catch((error) => setErrorMessage(error.message));
  };
  return (
    <>
      <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
        <h2 className="text-4xl text-center font-bold">Sign Up now!</h2>
        <form onSubmit={handleSingUp} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="email"
              className="input input-bordered"
              name="name"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              name="email"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="text"
              placeholder="Photo"
              className="input input-bordered"
              name="photo"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="input input-bordered"
              name="password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-xs absolute right-2 bottom-2"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="form-control">
            <label className="cursor-pointer label justify-start gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-secondary"
                name="terms"
              />
              <span className="label-text">
                Accept Our Terms and Conditions!
              </span>
            </label>
          </div>

          <div>
            {errorMessage && <p className="text-red-700">{errorMessage}</p>}
            {success && <p className="text-green-500">Successfully sign up</p>}
            <p>
              Have you an account? Please <Link to="/login">Login</Link>
            </p>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SingUp;
