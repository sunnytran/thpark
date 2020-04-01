
import Link from 'next/link';
import LinkActive from 'next-link-active';

class MyNavLink extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<LinkActive href={this.props.linkUrl} passHref>
				{active => <a class={ active ? 'is-active' : undefined}>{this.props.linkName}</a>}
			</LinkActive>
		);
	}
}

export default MyNavLink;

