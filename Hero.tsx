import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ShimmerButton from "./ui/ShimmerButton";

const Hero = () => {
  return (
    <header className="relative flex items-center justify-center h-screen mb-12 overflow-hidden">
      {/* content */}
      <div className="relative z-20 flex flex-col items-center  ">
        <motion.h1
          className="font-heading text-4xl md:text-7xl tracking-wide text-white mb-7 drop-shadow font-bold pl-10 "
          initial={{ opacity: 0, y: 40, letterSpacing: "-0.02em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.17em" }}
          transition={{ duration: 1, delay: 0.3, type: "spring" }}
        >
          Precision. Ritual. Craft.
        </motion.h1>
        <motion.p
          className="font-sans text-lg md:text-2xl text-white tracking-wider mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.96, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          Barbering, redefined.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <Link to="/booking">
            <ShimmerButton className="px-8 py-3 text-lg font-heading border border-white text-white bg-transparent hover:bg-white hover:text-black hover:border-primary transition relative outline-none group animate-none rounded-none">
              <span className="relative z-10">Book Now</span>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </ShimmerButton>
          </Link>
        </motion.div>
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-1 w-full min-w-full min-h-full brightness-50 "
      >
        <source src="public/solution-playback.MP4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </header>
  );
};

export default Hero;
