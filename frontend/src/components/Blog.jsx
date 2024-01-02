import React from 'react';
import { plus } from '../assets';
import Footer from './Footer';
import CustomCard from './CustomCard';
import styles from '../style';
import BlogPagination from './BlogPagination';
import { Link,} from 'react-router-dom';

// const PostPage = () => {
//   // Fetch the post details based on postId and display them on this page
//   const { id } = useParams();

//   return (
//     <div>
//       <h2>Post {id} Details</h2>
//       {/* Render post details here */}
//     </div>
//   );
// };

const Blog = () => {

  return (
    <div className="m-12">
      <div className="flex flex-col items-center justify-center">
        <CustomCard
          id='1'
          title="Post 1"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          imageUrl="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
        />
        <CustomCard
          id='2'
          title="Post 2"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          imageUrl="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
        />
        <CustomCard
          id='3'
          title="Post 3"
          description="Massa id neque aliquam vestibulum morbi blandit. Odio facilisis mauris sit amet massa vitae. Et molestie ac feugiat sed lectus vestibulum. Elit at imperdiet dui accumsan sit amet nulla facilisi. Nullam ac tortor vitae purus. Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Ut sem nulla pharetra diam sit. Aliquet bibendum enim facilisis gravida neque convallis. Dignissim diam quis enim lobortis scelerisque. Cras ornare arcu dui vivamus arcu felis bibendum. Lorem ipsum dolor sit amet consectetur adipiscing. Bibendum neque egestas congue quisque egestas diam. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in. Arcu ac tortor dignissim convallis aenean et tortor at risus"
          imageUrl="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
        />
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

export default Blog;
