import React from "react";
import Lottie from "lottie-react";
import animation1 from "../assets/animationJSON/animation1.json";
const AnimationLoading = () => {
  return <Lottie animationData={animation1} loop={true} />;
};

export default AnimationLoading;
