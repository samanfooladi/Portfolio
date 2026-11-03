import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import ReactLogo from "../Components/ReactLogo.jsx";
import Keycap from "../Components/Keycap.jsx";
import Button from "../Components/Button.jsx";
import Floating from "../Components/Floating.jsx";

const SpinningReactLogo = ({ position, scale }) => {
  const ref = useRef();

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={ref} position={position}>
      <ReactLogo position={[0, 0, 0]} scale={scale} />
    </group>
  );
};

// Places 3D items using the same % coordinates as the DOM items
const HeroScene = ({ isMobile, isTablet }) => {
  const { viewport, size } = useThree();
  const toWorld = (x, y) => [
    (x - 0.5) * viewport.width,
    (0.5 - y) * viewport.height,
    0,
  ];
  const pxToWorld = viewport.width / size.width;
  const itemScale = isMobile ? 0.6 : isTablet ? 0.8 : 1;

  return (
    <group>
      <SpinningReactLogo
        position={isMobile ? toWorld(0.82, 0.77) : toWorld(0.83, 0.7)}
        scale={0.4 * itemScale}
      />
      {!isMobile && (
        <Keycap position={toWorld(0.13, 0.41)} scale={pxToWorld * itemScale} />
      )}
    </group>
  );
};

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const characterRef = useRef();

  // Pop in from scale 0 to full size, then float up and down forever
  useGSAP(() => {
    gsap
      .timeline()
      .fromTo(
        characterRef.current,
        { scale: 0 },
        { scale: 1, duration: 1.2, ease: "back.out(1.4)" },
      )
      .to(characterRef.current, {
        y: -16,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
  });

  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="relative z-10 w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-2xl text-xl font-medium text-white text-center font-generalsans">
          Hi, I am Saman <span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient">
          Building Products & Brands
        </p>
        <p className="text-center text-white-600 font-generalsans sm:text-[17px] text-[15px]">
          Frontend developer — animated, 3D websites
        </p>
      </div>
      {/* Break out of main's max-w-7xl so the canvas spans the full viewport width */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen overflow-hidden">
        <div
          aria-hidden="true"
          className="hero-dot-grid absolute inset-0 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="hero-glow absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 w-[68%] min-w-[600px] aspect-[980/520] pointer-events-none"
        />

        <Canvas
          className="w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 20]} />
            <HeroScene isMobile={isMobile} isTablet={isTablet} />
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>


        <div className="absolute left-1/2 md:top-[34%] top-[48%] -translate-x-1/2 w-[54%] max-md:w-[90vw] max-w-[90vw] pointer-events-none">
          <div
            aria-hidden="true"
            className="hero-shadow absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[72%] aspect-[560/26]"
          />
          <img
            ref={characterRef}
            src="/images/sam-idle.webp"
            alt="Saman character"
            className="relative w-full h-auto"
          />
        </div>

        <Floating isMobile={isMobile} />

        <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
          <a href="#contact" className="w-fit">
            <Button
              name="Let's work together"
              isBeam
              isAccent
              containerClass="sm:w-fit w-full sm:min-w-96"
            />
          </a>
        </div>
      </div>
    </section>
  );
};
export default Hero;
