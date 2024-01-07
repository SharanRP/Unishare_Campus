import React, { useEffect, useState } from 'react';
import { plus } from '../assets';
import Footer from './Footer';
import CustomCard from './CustomCard';
import styles from '../style';
import BlogPagination from './BlogPagination';
import { Link, useNavigate } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchData = async () => {
      const data = await fetch('http://localhost:3000/api/blogs/all', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`,
        },
      });
      const resData = await data.json();
      console.log(resData);
      setBlogs(resData);
    };
    fetchData();
  }, []);

  return (
    <div className="m-12">
      <div className="flex flex-col items-center justify-center">
        {[...blogs].map((blog, index) => {
          return (
            <CustomCard
              key={blog._id}
              id={blog._id}
              title={blog.title}
              description={blog.body}
            />
          );
        })}
      </div>
      <section
        className={`${styles.flexCenter} ${styles.marginY} py-4 px-7 sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow text-center max-w-4xl mx-auto`}
      >
        <div className="flex sm:flex-row flex-col flex-1 items-center sm:gap-10">
          <h2 className={`${styles.heading2}`}>Add Your Blog now</h2>
          <p className={`${styles.paragraph} max-w-[470px] whitespace-nowrap`}>
            Write us a blog
          </p>
        </div>
        <div className="w-[100px] ml-[20px]">
          <Link to={`/blogs/create`}>
            <button className="">
              <img
                src={plus}
                alt=""
                style={{ mixBlendMode: 'multiply' }}
                className="w-[80px]"
              />
            </button>
          </Link>
        </div>
      </section>

      <BlogPagination />

      <div className="m-6">
        <Footer />
      </div>
    </div>
  );
};

export default Blogs;
