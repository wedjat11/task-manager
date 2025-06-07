import React from "react";

const DisclaimerForm = () => {
  return (
    <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Important Note
      </h3>
      <p className="text-gray-600 mb-4">
        This is a demo login form connected to the Reqres.in test API. To
        successfully log in, please use one of the following test email
        addresses ( or you can use any email provided by Reqres ).
      </p>

      <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-1">
        <li>
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
            eve.holt@reqres.in
          </span>
        </li>
        <li>
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
            george.bluth@reqres.in
          </span>
        </li>
      </ul>

      <p className="text-gray-600">
        The password field is not required as this is a simplified demo. After
        submitting a valid test email, you'll receive a mock authentication
        token response.
      </p>
    </section>
  );
};

export default DisclaimerForm;
