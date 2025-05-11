import React from "react";

const LoginHeader = () => {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img src="/task.svg" alt="logo" style={{ width: "50px" }} />
        <h3>Task Manager</h3>
      </div>
      <h2>Welcome Back</h2>
    </>
  );
};

export default LoginHeader;
