/* eslint-disable react/prop-types */
export const InputForm = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  maxLength,
  placeholder,
  error,
  className = "",
  labelClassName = "",
  inputClassName = "",
  errorClassName = "",
}) => {
  // 기본 스타일과 커스텀 스타일 병합
  const defaultInputClassName =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF7976] focus:border-[#FF7976]";
  const defaultLabelClassName = "block text-sm font-medium text-gray-700";
  const defaultErrorClassName = "text-red-500 text-sm mt-1";

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className={`${defaultLabelClassName} ${labelClassName}`}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`${defaultInputClassName} ${inputClassName}`}
        required
      />
      {error && (
        <p className={`${defaultErrorClassName} ${errorClassName}`}>{error}</p>
      )}
    </div>
  );
};

export default InputForm;
