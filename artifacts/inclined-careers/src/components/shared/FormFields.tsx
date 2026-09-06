import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export function StatusMessage({
  type,
  children,
}: {
  type: "success" | "error";
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      role={type === "error" ? "alert" : "status"}
      data-testid={`status-form-${type}`}
      className={`mt-6 flex items-start gap-3 rounded-lg border p-4 text-sm leading-6 ${
        type === "success"
          ? "border-[#9db6a0] bg-[#e8f0e5] text-[#2f5136]"
          : "border-[#d6a8a3] bg-[#f8e8e4] text-[#743d38]"
      }`}
    >
      {type === "success" ? (
        <Check size={18} className="mt-1 shrink-0 text-[#2f5136]" />
      ) : (
        <X size={18} className="mt-1 shrink-0 text-[#743d38]" />
      )}
      {children}
    </motion.div>
  );
}

export function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = true,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block" htmlFor={name}>
      <span className="mb-2 block text-[.72rem] font-bold uppercase tracking-[.1em] text-[#596770]">
        {label}
        {required && <span className="text-[#BA780E]"> *</span>}
      </span>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        data-testid={`input-${name}`}
        className="w-full border-b border-[#bdb5a6] bg-transparent px-0 py-3 text-[#011330] outline-none transition-colors placeholder:text-[#a1a19b] focus:border-[#BA780E]"
      />
    </label>
  );
}
