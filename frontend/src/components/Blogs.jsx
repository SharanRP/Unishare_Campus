import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomCard from './CustomCard';
import styles from '../style';
import BlogPagination from './BlogPagination';
import { plus } from '../assets';
import Spinner from './Spinner';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('http://localhost:5000/api/blogs/all', {
          method: 'GET',
        });
        if (!data.ok) {
          // Handle error response, if needed
          console.error('Failed to fetch blog data');
          return;
        }

        const resData = await data.json();
        console.log(resData);
        setBlogs(resData);
      } catch (error) {
        // Handle fetch error
        console.error('Error during fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
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
            className={`${styles.flexCenter} ${
              styles.marginY
            } py-4 px-7 sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow text-center max-w-4xl mx-auto`}
          >
            <div className="flex sm:flex-row flex-col flex-1 items-center sm:gap-10">
              <h2 className={`${styles.heading2}`}>Add Your Blog now</h2>
              <p
                className={`${styles.paragraph} max-w-[470px] whitespace-nowrap`}
              >
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
        </div>
      )}
    </>
  );
};

export default Blogs;
