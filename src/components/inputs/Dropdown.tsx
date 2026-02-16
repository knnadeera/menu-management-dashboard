import { forwardRef } from "react";
import { IDropConfig, IDropOption } from "@/types/inputs.types";

type BaseProps = React.ComponentPropsWithoutRef<"select">;

interface Props extends BaseProps {
  id: string;
  label?: React.ReactNode;
  options: IDropOption[] | any[];
  dropConfig?: IDropConfig;
  error?: React.ReactNode;
  hint?: React.ReactNode;
  wrapperClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  required?: boolean;
}

const Dropdown = forwardRef<HTMLSelectElement, Props>(
  (
    {
      label,
      options,
      dropConfig,
      error,
      hint,
      wrapperClassName,
      labelClassName,
      errorClassName,
      required,
      id,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const describedIds: string[] = [];
    if (props["aria-describedby"])
      describedIds.push(String(props["aria-describedby"]));
    if (hint && id) describedIds.push(`${id}-hint`);
    if (error && id) describedIds.push(`${id}-error`);
    const ariaDescribedBy = describedIds.length
      ? describedIds.join(" ")
      : undefined;

    return (
      <div className={wrapperClassName}>
        {label && (
          <label
            htmlFor={id}
            className={
              labelClassName ?? "block text-sm font-medium text-gray-700 mb-1"
            }
          >
            {label}
            {required && (
              <span aria-hidden className="ml-1 text-red-500">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative inline-block w-full">
          <select
            id={id}
            ref={ref}
            className={`${className ?? "w-full"} appearance-none pr-8`}
            aria-invalid={error ? true : props["aria-invalid"]}
            aria-describedby={ariaDescribedBy}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option
                    key={opt[dropConfig?.valueField ?? "id"]}
                    value={opt[dropConfig?.valueField ?? "id"]}
                  >
                    {opt[dropConfig?.labelField ?? "name"]}
                  </option>
                ))
              : children}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="w-4 h-4 text-gray-500"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M6 8l4 4 4-4"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {hint && id && (
          <p id={`${id}-hint`} className="mt-1 text-sm text-gray-500">
            {hint}
          </p>
        )}

        {error && id && (
          <p
            id={`${id}-error`}
            role="alert"
            className={errorClassName ?? "mt-1 text-xs text-red-500"}
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

export default Dropdown;
