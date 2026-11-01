const Button = ({ name, isBeam = false, isAccent = false, containerClass }) => {
  return (
    <button className={`btn ${containerClass}`}>
      {isBeam && (
        <span className="relative flex h-3 w-3">
          <span className={`btn-ping ${isAccent ? "btn-ping--accent" : ""}`} />
          <span
            className={`btn-ping_dot ${isAccent ? "btn-ping_dot--accent" : ""}`}
          />
        </span>
      )}
      {name}
    </button>
  );
};
export default Button;
