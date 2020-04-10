
import Head from 'next/head';
import Nav from './Nav';
import AnimatedFooter from './AnimatedFooter';

import styled, { keyframes } from 'styled-components'

class Layout extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		const NavColumn = styled.div`
			width: 11%;
			margin-left: 2.5%;
		`
		const FooterDiv = styled.div`
			position: absolute;
			width: 100%;
			bottom: 0;
			overflow: hidden;
		`

		return (
			<div>
				<head>
					<title>Parklife</title>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.1/css/bulma.min.css" />
					<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css" />
				</head>

				<section class="section is-small">
						<div class="columns">
							<NavColumn>
								<Nav />
							</NavColumn>

							<div class="column is-rest">
								<section class="section is-small">
										{this.props.children}
								</section>

							</div>
						</div>
				</section>
	
				<FooterDiv>
					<AnimatedFooter>
					</AnimatedFooter>
				</FooterDiv>
			</div>
		);
	}
}

export default Layout;

