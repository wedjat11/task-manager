import React from "react";
import LogoForm from "./LogoForm";

import HeaderForm from "./HeaderForm";
import DisclaimerForm from "./DisclaimerForm";

const LayoutForm = () => {
  return (
    <div className="flex w-10/12 mx-auto bg-white h-[90%] rounded-md">
      <section className="w-1/2 flex flex-col items-center justify-between h-9/12 my-auto px-12">
        <LogoForm />
        <HeaderForm />
        <DisclaimerForm />
      </section>
      <section className=" w-1/2">
        <img
          src="https://placehold.co/300x400"
          alt="logo"
          className="h-full w-full object-cover"
        />
      </section>
    </div>
  );
};
export default LayoutForm;
