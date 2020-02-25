
import Link from 'next/link';

const headerStyle = {
	paddingBottom: 25
};

const linkStyle = {
	marginRight: 15
};

const Header = () => (
	<div style={headerStyle}>
		<Link href="/">
			<a style={linkStyle}>Home</a>
		</Link>
		<Link href="/login">
			<a style={linkStyle}>Login</a>
		</Link>
		<Link href="/register">
			<a style={linkStyle}>Register</a>
		</Link>
	</div>
);

export default Header;

