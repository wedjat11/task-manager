"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import { createUser } from "@/app/utils/requests";

const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, "Invalid email address e.g. example@gmail.com")
    .required("Email is required"),
});

const SignupForm = () => {
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setError(null);
      try {
        const data = await createUser(values.email);
        alert("Login exitoso: token " + data.token);
      } catch (err) {
        setError(err.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-5 justify-center items-center w-full">
        <div className="flex flex-col w-full">
          <div className="flex gap-2 p-2 rounded-lg border-2 border-gray-300 hover:border-blue-400">
            <figure className="w-1/4 border-r-2 border-gray-300 items-center justify-center flex">
              <Image
                src="/assets/email.svg"
                alt="email"
                width={40}
                height={40}
              />
            </figure>
            <input
              id="email"
              placeholder="Email Address"
              name="email"
              className="w-3/4 p-2"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1 ml-2">
              {formik.errors.email}
            </div>
          )}
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-800 transition-all duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
