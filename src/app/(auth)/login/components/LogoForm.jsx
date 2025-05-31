import React from "react";

const LogoForm = () => {
  return (
    <div className="flex gap-3 items-center  justify-center w-full  text-black ">
      <img src="/assets/logo.svg" alt="logo" className="size-10 " />
      <h1 className=" text-center font-semibold text-3xl ">Task Manager</h1>
    </div>
  );
};

export default LogoForm;
