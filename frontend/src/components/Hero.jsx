import styles from "../style";
import { discount, headerright, headAnimate } from "../assets";
import GetStarted from "./GetStarted";
import Lottie from 'lottie-react'

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">Tony</span> Tony Tony {" "}
            <span className="text-white">Hunt</span> Hunt.
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="heroHeading flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
          Revamping <br className="sm:block hidden" />{" "}
            <span className="text-gradient">Student</span>{" "}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>

        <h1 className="heroHeading font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
        Campus Experience{" "}
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Unishare Campus is your comprehensive solution, providing access to study materials, campus updates, and expert guidance. Experience a hassle-free university journey and enhance your academic experience with us.
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        {/* <img src={} alt="billing" className="w-[100%] h-[100%] relative z-[5]" /> */}
        <Lottie loop={true} animationData={headAnimate} alt="billing" className="w-[100%] h-[100%] scale-100 relative z-[5]"></Lottie>
        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;
