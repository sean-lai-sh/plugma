import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// Boilerplate for shadcn components pls don't remove
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
