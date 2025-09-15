import React, { useEffect, useState, Suspense } from "react";
import ReactLenis from "lenis/react";
import { useProgress } from "@react-three/drei";

const Navbar = React.lazy(() => import("./sections/Navbar"));
const Hero = React.lazy(() => import("./sections/Hero"));
const ServiceSummary = React.lazy(() => import("./sections/ServiceSummary"));
const Services = React.lazy(() => import("./sections/Services"));
const About = React.lazy(() => import("./sections/About"));
const Works = React.lazy(() => import("./sections/Works"));
const ContactSummary = React.lazy(() => import("./sections/ContactSummary"));
const Contact = React.lazy(() => import("./sections/Contact"));

const App = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);

  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
      {!isReady && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      <Suspense fallback={null}>
        <div
          className={`${
            isReady ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
        >
          <Navbar />
          <Hero />
          <ServiceSummary />
          <Services />
          <About />
          <Works />
          <ContactSummary />
          <Contact />
        </div>
      </Suspense>
    </ReactLenis>
  );
};

export default App;