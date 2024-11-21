import PropTypes from "prop-types";
import clsx from "clsx";

const TextField = ({
  label,
  name,
  type,
  placeholder,
  isIcon,
  Icon,
  Error,
  isError,
  register,
}) => {
  return (
    <div className="flex flex-col justify-center items-start gap-2 w-full">
      <label
        className={clsx(
          "pl-2 w-full font-bold lg:text-[20px]",
          isError ? "text-red-500" : "text-black"
        )}
      >
        {label}
      </label>
      <div className="relative w-full">
        <input
          placeholder={placeholder}
          type={type}
          {...register(name)}
          className={clsx(
            "shadow-md rounded-md p-2 w-full outline-none pr-8 lg:h-[44px]",
            isError ? "border-error border-[1px] border-solid" : ""
          )}
        />
        {isIcon && (
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
            {Icon}
          </span>
        )}
      </div>
      {isError && <p className="text-error text-sm pl-2">{Error}</p>}
    </div>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  Error: PropTypes.string,
  label: PropTypes.string,
  isIcon: PropTypes.bool,
  Icon: PropTypes.node,
  register: PropTypes.any,
};

export default TextField;
