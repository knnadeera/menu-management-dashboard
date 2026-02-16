import { forwardRef } from "react";

type BaseProps = React.ComponentPropsWithoutRef<"textarea">;

interface Props extends BaseProps {
  id?: string;
  label?: React.ReactNode;
  error?: React.ReactNode;
  hint?: React.ReactNode;
  wrapperClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  required?: boolean;

  onClearError?: () => void;
  validateOnChange?: (value: string) => boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      label,
      error,
      hint,
      wrapperClassName,
      labelClassName,
      errorClassName,
      required,
      id,
      className,
      onChange,
      onClearError,
      validateOnChange,
      ...rest
    },
    ref,
  ) => {
    const describedIds: string[] = [];
    if (rest["aria-describedby"])
      describedIds.push(String(rest["aria-describedby"]));
    if (hint && id) describedIds.push(`${id}-hint`);
    if (error && id) describedIds.push(`${id}-error`);
    const ariaDescribedBy = describedIds.length
      ? describedIds.join(" ")
      : undefined;

    if ((label || error || hint) && !id) {
      // eslint-disable-next-line no-console
      console.warn(
        "Textarea: pass an 'id' when using label/error/hint for proper accessibility",
      );
    }

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

        <textarea
          id={id}
          ref={ref}
          className={className}
          aria-invalid={error ? true : rest["aria-invalid"]}
          aria-describedby={ariaDescribedBy}
          onChange={(e) => {
            onChange?.(e as any);
            if (error && onClearError) {
              const value = (e.target as HTMLTextAreaElement).value;
              const isValid = validateOnChange
                ? validateOnChange(value)
                : value.trim() !== "";
              if (isValid) onClearError();
            }
          }}
          {...rest}
        />

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

Textarea.displayName = "Textarea";

export default Textarea;
