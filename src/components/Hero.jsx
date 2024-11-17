import React from "react";
import { styles } from "../style";
import { motion } from "framer-motion";
import { ComputersCanvas } from "./canvas";
const Hero = () => {
  return (
    <section className="relative h-screen w-full mx-auto ">
      <div
        className={`absolute inset-0  top-[120px] mx-auto m-2  flex flex-row items-start gap-5 ${styles.paddingX}`}>
        <div className="flex flex-col items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>
        <div>
          <h1
            className={`${styles.heroHeadText} text-white lg:text-[45px] sm:text-[40px] xs:text-[30px]`}>
            Hi, I'm <span className="text-[#915EFF]">Abdelrahman Naser</span>
          </h1>
          <p
            className={`${styles.heroSubText} text-white-100 lg:text-[24px] sm:text-[20px] xs:text-[16px]  `}>
            I develop web and mobile apps using
            <br className="sm:block hidden" />
            React.js, Next.js, and React Native Expo.
          </p>
        </div>
      </div>
      <ComputersCanvas />
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-start">
        <a href="#about">
          <div className="w-[35px] h-[64px] border-4 border-secondary flex justify-center items-center p-2 rounded-3xl">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-10 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
