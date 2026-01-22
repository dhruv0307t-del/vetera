import React from "react";

const CustomInput = ({
  type = "text",
  placeholder,
  lable = "",
  ref,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="block font-medium text-lg">{lable}</label>
      <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...rest}
        className="w-full px-4 py-2 sm:py-3 rounded-md border border-gray-300 text-dark-blue placeholder:text-dark-blue font-medium placeholder:fomt-medium text-lg placeholder:text-lg focus:outline-none"
      />
    </div>
  );
};

export default CustomInput;
