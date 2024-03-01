import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // Import Axios
import ThankYouModal from './ThankYouModal';

const RegistrationForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/register/', values);
      if (response.data.status === 'success') {
        setShowModal(true);
        setSubmittedEmail(values.email);
      } else {
        console.error('Registration failed:', response.data.error_message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-teal-400 to-purple-500 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-center text-2xl mb-6">Registration</h3>
        <Formik
          initialValues={{
            full_name: '',
            email: '',
            phone: '',
            session: [],
            agree_terms: false,
          }}
          validationSchema={Yup.object({
            full_name: Yup.string().required('Full name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            phone: Yup.string().matches(/^[0-9]+$/, 'Invalid phone number').required('Phone number is required'),
            session: Yup.array().min(1, 'At least one session must be selected'),
            agree_terms: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Field
                  type="text"
                  id="full_name"
                  name="full_name"
                  className="mt-1 p-2 rounded-md w-full border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  placeholder="Enter your full name"
                />
                <ErrorMessage name="full_name" component="p" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 rounded-md w-full border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  placeholder="Enter your email address"
                />
                <ErrorMessage name="email" component="p" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 p-2 rounded-md w-full border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  placeholder="Enter your phone number"
                />
                <ErrorMessage name="phone" component="p" className="text-red-500" />
              </div>
              <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">
    Selection of Event Sessions
  </label>
  <div className="flex flex-col">
    {['sports', 'music', 'dance', 'games'].map(session => (
      <label key={session}>
        <Field type="checkbox" name="session" value={session} className="mr-2" />
        {session.charAt(0).toUpperCase() + session.slice(1)}
      </label>
    ))}
  </div>
  <ErrorMessage name="session" component="p" className="text-red-500" />
</div>

              <div className="flex items-center mb-4">
                <Field type="checkbox" id="agree_terms" name="agree_terms" className="form-checkbox h-5 w-5 text-indigo-600" />
                <label htmlFor="agree_terms" className="ml-2 text-gray-700">
                  I agree to the terms and conditions
                </label>
                <ErrorMessage name="agree_terms" component="p" className="text-red-500" />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        {showModal && <ThankYouModal email={submittedEmail} />}
      </div>
    </div>
  );
};

export default RegistrationForm;
