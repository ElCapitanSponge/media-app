import { useGetImageQuery } from "@/services/plex"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "../ui/card"
import { useEffect, useState } from "react"

export function LibraryCard({ title, description, thumbnail, ...props }) {
	const { data } = useGetImageQuery(thumbnail as string)

	const [image, setImage] = useState<JSX.Element | null>(<></>)

	useEffect(() => {
		if (data) {
			setImage(<>
				<img src={data} />
			</>)
		}
	}, [data])

	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>{image} {title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>Content Here...</CardContent>
		</Card>
	)
}
