import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CanvasLoader from "../Components/CanvasLoader.jsx";
import { useMediaQuery } from "react-responsive";
import ReactLogo from "../Components/ReactLogo.jsx";
import Keycap from "../Components/Keycap.jsx";
import Button from "../Components/Button.jsx";

// 9x8 pixel heart, "#" = red, "o" = highlight
const HEART = [
  ".##...##.",
  "##o#.####",
  "#########",
  "#########",
  ".#######.",
  "..#####..",
  "...###...",
  "....#....",
];

const PLUS = ["..#..", "..#..", "#####", "..#..", "..#.."];

const PixelSprite = ({ grid, colors, className, style }) => (
  <svg
    viewBox={`0 0 ${grid[0].length} ${grid.length}`}
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    {grid.flatMap((row, y) =>
      [...row].map((cell, x) =>
        colors[cell] ? (
          <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={colors[cell]} />
        ) : null,
      ),
    )}
  </svg>
);

// Centers its child on a point given as % of the hero
const Floating = ({ x, y, className = "", children }) => (
  <div
    aria-hidden="true"
    className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none ${className}`}
    style={{ left: x, top: y }}
  >
    {children}
  </div>
);

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
  const toWorld = (x, y) => [(x - 0.5) * viewport.width, (0.5 - y) * viewport.height, 0];
  const pxToWorld = viewport.width / size.width;
  const itemScale = isMobile ? 0.6 : isTablet ? 0.8 : 1;

  return (
    <group>
      <SpinningReactLogo
        position={isMobile ? toWorld(0.82, 0.77) : toWorld(0.79, 0.58)}
        scale={0.4 * itemScale}
      />
      {!isMobile && <Keycap position={toWorld(0.13, 0.41)} scale={pxToWorld * itemScale} />}
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
        <div aria-hidden="true" className="hero-dot-grid absolute inset-0 pointer-events-none" />
        <div
          aria-hidden="true"
          className="hero-glow absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 w-[68%] min-w-[600px] aspect-[980/520] pointer-events-none"
        />

        <Canvas className="w-full h-full pointer-events-none" aria-hidden="true">
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 20]} />
            <HeroScene isMobile={isMobile} isTablet={isTablet} />
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
        <CanvasLoader />

        <div className="absolute left-1/2 md:top-[44%] top-[48%] -translate-x-1/2 w-[54%] max-md:w-[90vw] max-w-[90vw] pointer-events-none">
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

        <Floating x={isMobile ? "80%" : "72%"} y={isMobile ? "38%" : "33%"}>
          <img
            src="/images/sam-head-pixel.png"
            alt=""
            className="pixel-tilt w-[80px] md:w-[106px] lg:w-[132px] h-auto [image-rendering:pixelated]"
          />
        </Floating>
        <Floating x={isMobile ? "16%" : "23%"} y={isMobile ? "62%" : "67%"}>
          <PixelSprite
            grid={HEART}
            colors={{ "#": "#FF3B5C", o: "#FFFFFF" }}
            className="pixel-bob w-[36px] md:w-[43px] lg:w-[54px] h-auto"
            style={{ animationDelay: "0.3s" }}
          />
        </Floating>
        <Floating x={isMobile ? "12%" : "17%"} y={isMobile ? "40%" : "28%"}>
          <PixelSprite
            grid={PLUS}
            colors={{ "#": "#FFD84D" }}
            className="pixel-bob w-[20px] md:w-[24px] lg:w-[30px] h-auto"
          />
        </Floating>
        <Floating x="87%" y="29%" className="max-md:hidden">
          <PixelSprite
            grid={PLUS}
            colors={{ "#": "#6B83FF" }}
            className="pixel-bob w-[19px] lg:w-[24px] h-auto"
            style={{ animationDelay: "0.6s" }}
          />
        </Floating>
        <Floating x="90%" y="80%" className="max-md:hidden">
          <PixelSprite
            grid={PLUS}
            colors={{ "#": "#FFFFFF" }}
            className="pixel-bob w-[16px] lg:w-[20px] h-auto"
            style={{ animationDelay: "1.1s" }}
          />
        </Floating>
        <Floating x="85%" y="47%" className="max-md:hidden">
          <span
            className="pixel-bob block font-pixel text-white-700 bg-black-200 border-2 border-accent px-2 py-1 md:text-sm lg:text-base"
            style={{ animationDelay: "0.9s" }}
          >
            &lt;/&gt;
          </span>
        </Floating>

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
