// hooks/use-toast.ts
"use client"

import { toast as sonnerToast } from "sonner"

export interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const toast = (props: ToastProps) => {
    const { title, description, variant = "default" } = props;

    if (variant === "destructive") {
      sonnerToast.error(title || "Error", { description }); // Let sonner handle the options
    } else {
      sonnerToast(title || "Success", { description }); // Let sonner handle the options
    }
  };

  return { toast };
}