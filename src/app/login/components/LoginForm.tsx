import * as React from "react";
import { Formik, Form, Field } from "formik";

interface MyFormValues {
  firstName: string;
}
const LoginForm: React.FC<object> = () => {
  const initialValues: MyFormValues = { firstName: "" };
  return (
    <div>
      <h1>My Example</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <Field
            id="firstName"
            name="firstName"
            placeholder="First Name"
            className="login-field"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
