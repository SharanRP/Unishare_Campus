import React, { useContext, useEffect, useState } from 'react';
import styles from '../style';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from './Spinner';
import { LoadingContext } from '../Context/LoadingContext';
import { Buffer } from 'buffer';
import emailjs from 'emailjs-com';
import { formatDistance, differenceInDays } from 'date-fns';

const Item = ({ image, title, description, item }) => {
  const [state, setState] = useState({
    fullName: '',
    name: '',
    contact: '',
    email: '',
  });
  const [claimModal, setClaimModal] = useState(false);

  const handleClaim = (e) => {
    e.preventDefault();
    setClaimModal(true);
  };

  const handleClaimChange = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  function initializeEmailjs() {
    emailjs.init('Ic1247PhXv7eKpyCH');

    const templateParams = {
      personName: item.fullName,
      personContact: item.contact,
      personEmail: item.email,
      when: item.when,
      where: item.where,
      itemsDescription: item.itemsDescription,
      email: state.email,
    };

    emailjs.send('service_a7hssj8', 'template_4unmabf', templateParams).then(
      function (response) {
        console.log('Email sent successfully');
        setClaimModal(false);
        toast.success('Email Has Been Sent to you!', {
          position: 'bottom-right',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      },
      function (error) {
        console.log('Email sending failed');
      },
    );
  }

  const handleClaimSubmit = (e) => {
    e.preventDefault();

    initializeEmailjs();
  };

  const createdAtDate = new Date(Date.parse(item.createdAt));

  const today = new Date();

  const daysDifference = differenceInDays(today, createdAtDate);

  let date;
  if (daysDifference === 0) {
    date = 'Today';
  } else if (daysDifference === 1) {
    date = 'Yesterday';
  } else {
    date = formatDistance(createdAtDate, today, {
      addSuffix: true,
    });
  }

  return (
    <>
      <form
        id="popup-modal"
        tabIndex="-1"
        className={`${
          claimModal ? '' : 'hidden'
        } fixed flex z-50 justify-center items-center w-full md:inset-0 backdrop-blur-xs`}
        onSubmit={(e) => handleClaimSubmit(e)}
      >
        <div className="bg-gray-900 border relative rounded-lg px-6 py-6 max-h-[500px] overflow-y-auto">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-poppins text-gray-100 font-semibold">
                Share Your Details to claim your Item
              </h2>
              <button
                onClick={() => setClaimModal(false)}
                className=" cursor-pointer hover:text-gray-300 font-bold text-md text-gray-500 flex items-center justify-center  rounded-full mr-3"
              >
                X
              </button>
            </div>
            <div className="mb-3">
              <div className="flex flex-col flex-1 mb-3">
                <label className="text-md text-gray-400 font-semibold mb-1">
                  Your Full Name
                </label>
                <input
                  className="px-2 py-1 placeholder-gray-500 rounded-md border border-gray-300 bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 text-white"
                  type="name"
                  placeholder="Tony Hunt"
                  value={state.fullName}
                  onChange={handleClaimChange}
                  required
                  name="fullName"
                />
              </div>

              <div className="flex gap-5 justify-between mb-3">
                <div className="flex flex-col">
                  <label className="text-md text-gray-400 font-semibold mb-1">
                    Contact Number
                  </label>
                  <input
                    className="px-2 py-1 rounded-md placeholder-gray-500 border border-gray-300 bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 text-white"
                    type="tel"
                    placeholder="01234-56789"
                    value={state.contact}
                    required
                    onChange={handleClaimChange}
                    name="contact"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <label className="text-md text-gray-400 font-semibold mb-1">
                    Email
                  </label>
                  <input
                    className="px-2 py-1 border placeholder-gray-500 border-gray-300 rounded-md bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 text-white"
                    type="email"
                    placeholder="example@gmail.com"
                    value={state.email}
                    required
                    onChange={handleClaimChange}
                    name="email"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-3">
                <label className="text-md text-gray-400 font-semibold mb-1">
                  Address
                </label>
                <textarea
                  id=""
                  cols="30"
                  rows="2"
                  placeholder="123 Main Street, Anytown, CA 12345"
                  className="rounded-lg px-2 py-1 placeholder-gray-500 border border-gray-300 bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 text-white"
                  value={state.address}
                  onChange={handleClaimChange}
                  name="address"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="self-end text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">
                Get Contact
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="border flex flex-col justify-center items-center sm:justify-normal smm:items-stretch smm:flex-row gap-3 smm:gap-1 rounded-xl item p-1 max-w-[300px] smm:max-w-full">
        <div className="image p-2">
          {image?.data ? (
            <img
              src={`data:image/*;base64,${Buffer.from(
                image.data,
                'binary',
              ).toString('base64')}`}
              alt="lost-item"
              height={200}
              width={200}
              className="rounded-xl"
            />
          ) : (
            <img
              src={URL.createObjectURL(image)}
              alt="lost-item"
              height={200}
              width={200}
              className="rounded-xl"
            />
          )}
        </div>
        <div className="information flex flex-1 flex-col p-2 pr-4">
          <div className="title font-semibold text-xl sm:text-2xl mb-2">
            <h2>{title}</h2>
          </div>
          <div className="description h-full">{description}</div>
          <div className="flex flex-col mt-3 md:mt-0 md:flex-row items-center justify-center sm:justify-end text-gray-500">
            <div className="flex flex-col flex-1 text-sm">
              <p>Posted By: {item.fullName}</p>
              <p>{date}</p>
            </div>
            <div>
              <button
                className="self-end mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900 mb-3"
                onClick={handleClaim}
              >
                Contact and Claim
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LostAndFound = () => {
  const [state, setState] = useState({
    fullName: '',
    contact: '',
    email: '',
    address: '',
    itemName: '',
    when: '',
    where: '',
    image: null,
    itemsDescription: '',
  });
  const [error, setError] = useState(null);

  const [items, setItems] = useState([]);
  const { loadingState, setIsLoadingState } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoadingState(true);
    const fetchData = async () => {
      try {
        const data = await fetch('http://localhost:5000/api/items/all', {
          method: 'GET',
        });
        if (!data.ok) {
          console.error('Failed to fetch Items data');
          return;
        }

        const resData = await data.json();
        setItems(resData);
      } catch (error) {
        console.error('Error during fetch:', error);
      } finally {
        setIsLoadingState(false);
      }
    };

    fetchData();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleImageChange = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.files[0],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(e, state);
    setError('');
    setIsLoadingState(true);

    console.log('clicked submit button');

    const formData = new FormData();
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        console.log(key, state[key]);
        formData.append(key, state[key]);
      }
    }

    try {
      const response = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        body: formData,
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        console.log('Item Posted successfully!');
        setIsModalVisible(false);
      }
      toast.success('Item Posted!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });

      setItems((prevItems) => {
        return [{ _id: Math.random() * 10 + 1, ...state }, ...prevItems];
      });

      console.log(items);

      setState((prev) => {
        const newState = {};
        Object.keys(prev).forEach((key) => {
          if (key === 'image') {
            newState[key] = null;
          }
          newState[key] = '';
        });
        return newState;
      });

      setError('');
    } catch (error) {
      console.error('Error during Posting Item:', error);
      setError('An unexpected error occurred.');
    } finally {
      setIsLoadingState(false);
    }
  };

  return (
    <>
      {loadingState && <Spinner />}
      {!loadingState && (
        <form
          id="popup-modal"
          tabIndex="-1"
          className={`${
            isModalVisible ? '' : 'hidden'
          } fixed flex z-50 justify-center items-center w-full md:inset-0 backdrop-blur-xs`}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="bg-gray-900 border relative rounded-lg px-6 py-6 max-h-[500px] overflow-y-auto">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-poppins text-gray-100 font-semibold mb-3">
                  Post Lost Item
                </h2>
                <button
                  onClick={() => setIsModalVisible(false)}
                  className=" cursor-pointer hover:text-gray-300 font-bold text-md text-gray-500 flex items-center justify-center  rounded-full mr-3"
                >
                  X
                </button>
              </div>
              <div className="application-details mb-3">
                <div className="mb-2 text-center">
                  <h2 className="text-xl font-semibold text-gray-200">
                    &#x2022; Application Details
                  </h2>
                </div>
                <div className="flex flex-col flex-1 mb-3">
                  <label className="text-md text-gray-400 font-semibold mb-1">
                    Your Full Name
                  </label>
                  <input
                    className="px-2 py-1 placeholder-gray-500 rounded-md border border-gray-300 bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 text-white"
                    type="name"
                    placeholder="Tony Hunt"
                    value={state.fullName}
                    onChange={handleChange}
                    required
                    name="fullName"
                  />
                </div>

                <div className="flex gap-5 justify-between mb-3">
                  <div className="flex flex-col">
                    <label className="text-md text-gray-400 font-semibold mb-1">
                      Contact Number
                    </label>
                    <input
                      className="px-2 py-1 rounded-md placeholder-gray-500 border border-gray-300 bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 text-white"
                      type="tel"
                      placeholder="01234-56789"
                      value={state.contact}
                      required
                      onChange={handleChange}
                      name="contact"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <label className="text-md text-gray-400 font-semibold mb-1">
                      Email
                    </label>
                    <input
                      className="px-2 py-1 border placeholder-gray-500 border-gray-300 rounded-md bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 text-white"
                      type="email"
                      placeholder="example@gmail.com"
                      value={state.email}
                      required
                      onChange={handleChange}
                      name="email"
                    />
                  </div>
                </div>

                <div className="flex flex-col mb-3">
                  <label className="text-md text-gray-400 font-semibold mb-1">
                    Address
                  </label>
                  <textarea
                    id=""
                    cols="30"
                    rows="2"
                    placeholder="123 Main Street, Anytown, CA 12345"
                    className="rounded-lg px-2 py-1 placeholder-gray-500 border border-gray-300 bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 text-white"
                    value={state.address}
                    onChange={handleChange}
                    name="address"
                  ></textarea>
                </div>
              </div>
              <div className="article details border-t-2">
                <div className="my-4 text-center">
                  <h2 className="text-xl font-semibold text-gray-200">
                    &#x2022; Item Details
                  </h2>
                </div>
                <div className="flex gap-5 mb-3">
                  <div className="flex flex-1 flex-col">
                    <label className="text-md text-gray-400 font-semibold mb-1">
                      Item Name
                    </label>
                    <input
                      className="px-2 py-1 rounded-md placeholder-gray-500 border border-gray-300 bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 text-white"
                      type="text"
                      placeholder="Watch"
                      value={state.itemName}
                      onChange={handleChange}
                      required
                      name="itemName"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <label className="text-md text-gray-400 font-semibold mb-1">
                      When
                    </label>
                    <input
                      className="px-2 py-1 rounded-md placeholder-gray-500 border border-gray-300 cursor-pointer bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 text-white"
                      type="datetime-local"
                      value={state.when}
                      onChange={handleChange}
                      required
                      name="when"
                    />
                  </div>
                </div>
                <div className="flex gap-5 mb-3">
                  <div className="flex flex-1 flex-col">
                    <label className="text-md text-gray-400 placeholder-gray-500 font-semibold mb-1">
                      Upload image
                    </label>
                    <input
                      className="w-full text-sm px-2 py-1 rounded-md text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file_input"
                      type="file"
                      // value={state.image}
                      onChange={handleImageChange}
                      required
                      name="image"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <label className="text-md placeholder-gray-500 text-gray-400 font-semibold mb-1">
                      Where
                    </label>
                    <input
                      className="px-2 py-1 rounded-md placeholder-gray-500 bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 border border-gray-300 text-white"
                      type="text"
                      placeholder="Stilt Area"
                      value={state.where}
                      onChange={handleChange}
                      required
                      name="where"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-md text-gray-400 font-semibold mb-1">
                    Item Description
                  </label>
                  <textarea
                    id=""
                    cols="30"
                    rows="2"
                    placeholder="Item Description"
                    className="px-2 py-1 rounded-md placeholder-gray-500 border border-gray-300 bg-gray-700 hover:bg-gray-800 focus:bg-gray-800 text-white"
                    value={state.itemsDescription}
                    onChange={handleChange}
                    required
                    name="itemsDescription"
                  ></textarea>
                </div>
              </div>
            </div>
            {error && <div className="error">{error}</div>}
            <div className="flex justify-center items-center mt-4">
              <button className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
      {!loadingState && (
        <>
          <ToastContainer />
          <section
            className={`bg-primary ${styles.paddingY} ${styles.paddingX} ${styles.boxWidth} text-white`}
          >
            <div
              className={`outer flex flex-col flex-1 ${styles.paddingX} ${styles.paddingY} ${styles.flexCenter} ${styles.boxWidth}`}
            >
              <div className="inner1 flex flex-1 space-x-8 md:space-x-[100px] justify-between items-center mb-10">
                <button
                  type="button"
                  className="focus:outline-none sm:w-[300px] xs:w-[200px] text-nowrap text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-xl px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  onClick={() => setIsModalVisible(true)}
                >
                  Post Lost Item
                </button>
                <button
                  type="button"
                  className="focus:outline-none sm:w-[300px] xs:w-[200px] text-nowrap text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-xl px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  onClick={() => {}}
                >
                  Claim Lost Item
                </button>
              </div>
              <div
                className={`inner2 w-full mt-10 px-2 smm:px-16 ${styles.flexCenter}`}
              >
                <div className="grid grid-cols-2 smm:grid-cols-1 gap-10 w-full p-2 smm:px-10">
                  {items.length === 0 ? (
                    <div className="text-center">
                      <h1 className="text-xl">No Lost Items</h1>
                    </div>
                  ) : (
                    [...items].map((item, index) => {
                      return (
                        <Item
                          id={item._id}
                          key={item._id}
                          image={item.image}
                          title={item.itemName}
                          description={item.itemsDescription}
                          item={item}
                        />
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default LostAndFound;
