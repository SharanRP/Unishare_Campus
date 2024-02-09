import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomCard from './CustomCard';
import styles from '../style';
import Spinner from './Spinner';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`http://localhost:5000/api/blogs/${id}`, {
          method: 'GET',
        });

        if (!data.ok) {
          console.error('Failed to fetch blog data');
          return;
        }

        const { blog } = await data.json();
        console.log(blog);
        setBlog(blog);
      } catch (error) {
        console.error('Error during fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <div className={`${styles.flexCenter} ${styles.paddingY} w-auto p-10`}>
          {blog && (
            <CustomCard
              id={blog._id}
              title={blog.title}
              description={blog.content}
              image={blog.image}
              isSingle
            />
          )}
        </div>
      )}
    </>
  );
};

export default Blog;
