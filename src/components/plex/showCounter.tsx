import { CounterContentProps } from "@/lib/interfaces/plexCommon"
import { useEffect, useState } from "react"

const ShowCounter = (
	{
		libraryId,
		details = false
	}: CounterContentProps
) => {
	const [content, setContent] = useState<JSX.Element | null>(<></>)

	useEffect(() => {
		setContent(<div>{details ? "No Shows" : "-"}</div>)
	}, [details, setContent])

	return (
		<>
			{content}
		</>
	)
}

export default ShowCounter
