import clsx from "clsx";

interface CheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export default function Checkbox({
  checked,
  label,
  className,
  onChange,
}: CheckboxProps) {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        onChange={onChange ? (e) => onChange(e.target.checked) : () => {}}
        {...(onChange ? { role: "checkbox", "aria-checked": checked } : {})}
        {...(onChange ? { "aria-labelledby": label } : {})}
        {...(onChange ? { "aria-label": label } : {})}
        {...(onChange ? { checked } : { readOnly: true, checked })}
        className={clsx(
          // Tailwind classes for custom checkmark
          "relative h-5 w-5 cursor-pointer border border-gray-400 rounded-full appearance-none",
          // Colors for checked state
          "checked:bg-blue-400 checked:border-blue-400",
          // Pseudo-element to show "✔" when checked
          // 1) create a hidden pseudo-element
          "before:content-['✔'] before:absolute before:inset-0 before:flex before:items-center before:justify-center before:text-white before:opacity-0 before:text-xs",
          // 2) make it visible on check
          "checked:before:opacity-100",
          className
        )}
      />

      {label && <span className="ml-2 text-sm text-gray-300">{label}</span>}
    </label>
  );
}
