import React, { useState, useEffect } from 'react';
import styles from '../style';
import { useLogin } from '../Hooks/useLogin';
import Spinner from './Spinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loadingState } = useLogin();
  const [sectionHeight, setSectionHeight] = useState('100vh');

  useEffect(() => {
    const navbarHeight = 154.84;
    const newHeight = `calc(100vh - ${navbarHeight}px)`;
    setSectionHeight(newHeight);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <>
      {loadingState && <Spinner />}
      {!loadingState && (
        <section
          className={`bg-primary ${styles.flexStart} mt-10 font-poppins`}
          style={{ height: sectionHeight }}
        >
          <div className="flex max-w-[450px] flex-1 flex-col justify-center lg:px-8">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">
              Log in to your account
            </h2>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-500"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="example@gmail.com"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-500"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      name="password"
                      type="password"
                      placeholder="p@ssword1234"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={loadingState}
                  >
                    Log in
                  </button>
                </div>
              </form>
            </div>
            {error && <div className="error">{error}</div>}
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
