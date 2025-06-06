import React from "react";
import LogoForm from "./LogoForm";
import HeaderForm from "./HeaderForm";
import DisclaimerForm from "./DisclaimerForm";

const LayoutForm = () => {
  return (
    <div className="flex flex-col md:flex-row w-11/12 max-w-5xl mx-auto bg-white h-auto md:h-[90%] rounded-md shadow-md overflow-hidden">
      {/* Form Section */}
      <section className="w-full md:w-1/2 flex flex-col items-center justify-between py-8 px-6 sm:px-10 md:px-12">
        <LogoForm />
        <HeaderForm />
        <DisclaimerForm />
      </section>

      {/* Image Section (hidden on mobile) */}
      <section className="hidden md:block w-1/2">
        <img
          src="/assets/welcome.webp"
          alt="logo"
          className="h-full w-full object-cover"
        />
      </section>
    </div>
  );
};

export default LayoutForm;
