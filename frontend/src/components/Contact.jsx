import React, { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../style';
import emailjs from '@emailjs/browser';
import { LoadingContext } from '../Context/LoadingContext';
import Spinner from './Spinner';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const { loadingState, setIsLoadingState } = useContext(LoadingContext);

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      setIsLoadingState(true);
      await emailjs.sendForm(
        'service_a7hssj8',
        'template_azmybym',
        e.target,
        'Ic1247PhXv7eKpyCH',
      );
      setIsLoadingState(false);

      setEmail('');
      setSubject('');
      setMessage('');

      toast.success('Message Sent', {
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } catch (error) {
      setIsLoadingState(false);
      toast.error('Failed to send message. Please try again.', {
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } finally {
      setIsLoadingState(false);
    }
  };

  return (
    <>
      {loadingState && <Spinner />}
      {!loadingState && (
        <div>
          <div className={`w-full bg-primary p-1`}>
            <div className="w-full container my-2 mx-auto md:px-6 ">
              <section className="w-full mb-2 text-center font-poppins">
                <div className="py-12 md:px-12">
                  <div className="container mx-auto xl:px-32">
                    <div className="grid items-center lg:grid-cols-2">
                      <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0 ">
                        <div className="relative z-[1] block rounded-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:px-12 lg:-mr-14">
                          <h2 className="mb-12 text-gray-100 text-4xl font-bold font">
                            Contact us
                          </h2>
                          <form
                            onSubmit={(e) => sendEmail(e)}
                            action="#"
                            className="space-y-8"
                          >
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-start ml-2 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Your email
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email_from"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="subject"
                                className="block text-start ml-2 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Subject
                              </label>
                              <input
                                type="text"
                                id="subject"
                                name="subject"
                                className="block p-3 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="Let us know how we can help you"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label
                                htmlFor="message"
                                className="block text-start ml-2 mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                              >
                                Your message
                              </label>
                              <textarea
                                id="message"
                                rows="6"
                                name="message"
                                className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Leave a comment..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                              ></textarea>
                            </div>
                            <button
                              type="submit"
                              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg sm:w-fit focus:ring-1 ring-purple-500 focus:outline-none bg-purple-700 hover:bg-purple-800"
                            >
                              Send message
                            </button>
                          </form>
                        </div>
                      </div>
                      <div className="md:mb-4 lg:mb-0">
                        <div className="relative h-[700px] rounded-lg shadow-lg dark:shadow-black/20">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.943343382072!2d72.85354627474953!3d19.022218082171356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf26f4972d21%3A0x2c50185364aca4c1!2sVeermata%20Jijabai%20Technological%20Institute%20VJTI!5e0!3m2!1sen!2sin!4v1699803256500!5m2!1sen!2sin"
                            className="absolute left-0 top-0 h-full w-full rounded-lg"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Contact;
