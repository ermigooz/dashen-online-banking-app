import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
  }).format(amount)
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
