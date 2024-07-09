import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function to_time(duration: number): string {
	const seconds = Math.floor(duration / 1000 % 60)
	const minutes = Math.floor(duration / (1000 * 60) % 60)
	const hours = Math.floor(duration / (1000 * 60 * 60) % 24)

	// INFO: Add leading zeros if necessary
	const formattedHours = hours < 10 ? "0" + hours : hours
	const formattedMinutes = minutes < 10 ? "0" + minutes : minutes
	const formattedSeconds = seconds < 10 ? "0" + seconds : seconds

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}
