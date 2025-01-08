import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const SignUp = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const authToken =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      if (authToken) {
        navigate("/dashboard");
      }
    }, [navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="card w-[90%] max-w-sm shadow-xl bg-white">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Sign Up</h2>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <a href="/signin" className="btn btn-link">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
