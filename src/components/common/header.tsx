import { ArrowBigLeftDash, Home } from "lucide-react"
import { Button } from "../ui/button"
import { HeaderLink } from "@/lib/interfaces/common"
import { useAppSelector } from "@/hooks.ts"
import { useEffect, useState } from "react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"

const links: HeaderLink[] = [
	{
		key: "home",
		title: "Home",
		href: "/",
		icon: () => <Home />
	}
]

const HeaderBar = () => {
	const pageTitle = useAppSelector(state => state.pageTitle)
	const [title, setTitle] = useState<string>(pageTitle)
	const [backButton, setBackButton] = useState<JSX.Element | null>(<></>)

	useEffect(() => {
		setTitle(pageTitle)
		const path = window.location.pathname
		if (path !== "/") {
			setBackButton(
				<Button
					key="back"
					variant="link"
					onClick={() => window.history.back()}
				>
					<ArrowBigLeftDash />
				</Button>
			)
		} else {
			setBackButton(<></>)
		}
	}, [pageTitle, setBackButton])

	return (
		<header className="w-full border-b mb-8">
			<div className="flex h-14 items-center justify-between">
				<div>
					{links.map(link =>
						<>
							<Button
								key={link.key}
								variant="link"
								onClick={() => window.location.href = link.href}
							>
								{link.icon()}
							</Button >
						</>
					)}
					{backButton}
				</div>
				<div>
					<h1 className="text-2xl font-bold" key="page_title">
						{title}
					</h1>
				</div>
				<div className="mx-4">
					<SignedOut>
						<SignInButton />
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</div>
		</header >
	)
}

export default HeaderBar
