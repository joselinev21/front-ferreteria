import clsx from "clsx";
import PropTypes from "prop-types";

const TextArea = ({ label, name, placeholder, isError, error, register }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <label className="text-start w-full pl-2 font-bold lg:text-[20px]">
        {label}
      </label>
      <textarea
        name={name}
        {...register(name)}
        placeholder={placeholder}
        className={clsx(
          " p-2 w-full h-[150px] lg:h-[200px] max-h-[250px] shadow-md rounded-md",
          isError ? "border-error border-[1px] border-solid" : ""
        )}
      ></textarea>
      {isError && <p className="text-error text-sm pl-2 w-full">{error}</p>}
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  error: PropTypes.string,
  register: PropTypes.any,
};

export default TextArea;
