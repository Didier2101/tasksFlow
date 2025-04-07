import { bebasNeue } from "../lib/fonts";

const Logo = () => {
  return (
    <div>
      <h1
        className={`${bebasNeue.className} font-bold text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent`}
      >
        Task Flow
      </h1>
    </div>
  );
};

export default Logo;
