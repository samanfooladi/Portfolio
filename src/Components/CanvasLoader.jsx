import { useProgress } from "@react-three/drei";

// Plain DOM overlay rendered next to a <Canvas>, not inside it.
// The parent element must be positioned (e.g. `relative` or `absolute`).
const CanvasLoader = () => {
  const { active, progress } = useProgress();

  if (!active) return null;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <span className="canvas-loader" />
      <p
        style={{
          fontSize: 14,
          color: "#f1f1f1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress !== 0 ? `${progress.toFixed(2)}%` : "Loading..."}
      </p>
    </div>
  );
};
export default CanvasLoader;
