import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomCard from './CustomCard';
import styles from '../style';
import Spinner from './Spinner';
import { LoadingContext } from '../Context/LoadingContext';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);

  const { loadingState, setIsLoadingState } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoadingState(true);
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const data = await fetch(`http://localhost:3000/api/blogs/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!data.ok) {
          // Handle error response, if needed
          console.error('Failed to fetch blog data');
          return;
        }

        const { blog } = await data.json();
        console.log(blog);
        setBlog(blog);
      } catch (error) {
        // Handle fetch error
        console.error('Error during fetch:', error);
      } finally {
        setIsLoadingState(false);
      }
    };

    fetchData();
  }, [id, setIsLoadingState]);

  return (
    <>
      {loadingState && <Spinner />}
      {!loadingState && (
        <div className={`${styles.flexCenter} ${styles.paddingY}`}>
          {blog && (
            <CustomCard
              id={blog._id}
              title={blog.title}
              description={blog.body}
              isSingle
            />
          )}
        </div>
      )}
    </>
  );
};

export default Blog;
