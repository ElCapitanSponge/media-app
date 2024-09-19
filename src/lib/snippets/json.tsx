import "./json.css"

interface JsonProps {
	json: string
}

const syntaxHighlight = (json: string): string => {
	if (!json) return ""

	json = json
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
	return json.replace(
		// eslint-disable-next-line @stylistic/max-len
		/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
		function(match) {
			let cls = "number"
			if (match.startsWith("\"")) {
				if (match.endsWith(":")) {
					match = match.slice(0, -1)
					cls = "key"
				} else {
					cls = "string"
				}
			} else if (/true|false/.test(match)) {
				cls = "boolean"
			} else if (/null/.test(match)) {
				cls = "null"
			}
			const clsEnd = cls === "key" ? ":" : ""
			return `<span class="${cls}">${match}</span>${clsEnd}`
		}
	)
}

export const JsonSnippet = ({
	json
}: JsonProps) => {
	return (
		<>
			<pre
				className="json__snippet"
				dangerouslySetInnerHTML={{ __html: syntaxHighlight(json) }}
			/>
		</>
	)
}
