import { Loader2, Rocket } from "lucide-react";
import { FC } from "react";

interface ButtonProps {
  isSubmitting: boolean;
}

const Button: FC<ButtonProps> = ({ isSubmitting }) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="group relative w-full flex justify-center items-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-cyan-600/90 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500/50 transition-all duration-200 disabled:opacity-50"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Autenticando...
        </>
      ) : (
        <>
          <Rocket className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
          Acceder al sistema
        </>
      )}
    </button>
  );
};

export default Button;
