import { PixelHeart, PixelPlus } from "./PixelSprite.jsx";

// Centers its child on a point given as % of the hero
const FloatingItem = ({ x, y, className = "", children }) => (
  <div
    aria-hidden="true"
    className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none ${className}`}
    style={{ left: x, top: y }}
  >
    {children}
  </div>
);

// Pixel decorations floating around the hero character
const Floating = ({ isMobile }) => (
  <>
    <FloatingItem x={isMobile ? "80%" : "78%"} y={isMobile ? "38%" : "29%"}>
      <img
        src="/images/sam-head-pixel.png"
        alt=""
        className="pixel-tilt w-[80px] md:w-[106px] lg:w-[132px] h-auto [image-rendering:pixelated]"
      />
    </FloatingItem>
    <FloatingItem x={isMobile ? "16%" : "23%"} y={isMobile ? "62%" : "67%"}>
      <PixelHeart
        className="pixel-bob w-[36px] md:w-[43px] lg:w-[54px] h-auto"
        style={{ animationDelay: "0.3s" }}
      />
    </FloatingItem>
    <FloatingItem x={isMobile ? "12%" : "17%"} y={isMobile ? "40%" : "28%"}>
      <PixelPlus
        color="#FFD84D"
        className="pixel-bob w-[20px] md:w-[24px] lg:w-[30px] h-auto"
      />
    </FloatingItem>
    <FloatingItem x="87%" y="29%" className="max-md:hidden">
      <PixelPlus
        color="#6B83FF"
        className="pixel-bob w-[19px] lg:w-[24px] h-auto"
        style={{ animationDelay: "0.6s" }}
      />
    </FloatingItem>
    <FloatingItem x="90%" y="80%" className="max-md:hidden">
      <PixelPlus
        color="#FFFFFF"
        className="pixel-bob w-[16px] lg:w-[20px] h-auto"
        style={{ animationDelay: "1.1s" }}
      />
    </FloatingItem>
    <FloatingItem x="85%" y="47%" className="max-md:hidden">
      <span
        className="pixel-bob block font-pixel text-white-700 bg-black-200 border-2 border-accent px-2 py-1 md:text-sm lg:text-base"
        style={{ animationDelay: "0.9s" }}
      >
        &lt;/&gt;
      </span>
    </FloatingItem>
  </>
);

export default Floating;
