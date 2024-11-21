import PropTypes from "prop-types";
import ClockLoadin from "../Loadings/ClockLoading/index";
import clsx from "clsx";

const Button = ({
  texto,
  isIcon,
  Icon,
  onClick,
  type,
  background,
  isLoading,
}) => {
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      type={type}
      className={`flex flex-row justify-center items-center w-full h-full gap-2 rounded-md text-white p-1 font-georgia text-[18px] ${background}`}
    >
      {isLoading ? (
        <ClockLoadin />
      ) : (
        <div className={clsx(isIcon && "flex flex-row justify-center items-center gap-3")}>
          {isIcon && <span>{Icon}</span>}
          {texto}
        </div>
      )}
    </button>
  );
};

Button.propTypes = {
  texto: PropTypes.string.isRequired,
  isIcon: PropTypes.bool.isRequired,
  Icon: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

export default Button;
