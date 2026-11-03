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

// Draws a pixel-art grid as crisp SVG squares. Each string in `grid` is a
// row; each character is looked up in `colors` ("." or any unmapped char is empty).
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
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="1"
            height="1"
            fill={colors[cell]}
          />
        ) : null,
      ),
    )}
  </svg>
);

// Red heart with one white highlight pixel
export const PixelHeart = (props) => (
  <PixelSprite
    grid={HEART}
    colors={{ "#": "#FF3B5C", o: "#FFFFFF" }}
    {...props}
  />
);

// Small "+" star in a single color
export const PixelPlus = ({ color, ...props }) => (
  <PixelSprite grid={PLUS} colors={{ "#": color }} {...props} />
);

export default PixelSprite;
