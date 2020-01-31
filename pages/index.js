
import Link from 'next/link'

export default function Index() {
	return (
		<div>
			<p>Welcome</p>
			
			<Link href="/login">
				<a>Login</a>
			</Link>
		</div>
	)
}
