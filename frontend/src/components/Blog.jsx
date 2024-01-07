import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomCard from './CustomCard';
import styles from '../style';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      const data = await fetch(`http://localhost:3000/api/blogs/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`,
        },
      });
      const { blog } = await data.json();
      console.log(blog);
      setBlog(blog);
    };
    fetchData();
  }, [id]);

  return (
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
  );
};

export default Blog;
