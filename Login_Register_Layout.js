import Head from 'next/head';
import Nav from './Nav';
import AnimatedFooter from './AnimatedFooter';

import styled, { keyframes } from 'styled-components'

class Login_Register_Layout extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		const NavColumn = styled.div`
			width: 11%;
			margin-left: 2.5%;
		`
		const FooterDiv = styled.div`
			position: fixed;
			width: 100%;
			bottom: 0;
			overflow: hidden;
		`
		const gradient = keyframes`
			from {
				-webkit-filter: hue-rotate(0deg);
			}
			to {
				-webkit-filter: hue-rotate(-360deg);
			}
		`
		const Title = styled.h1`
			color: #fff;
			background-image: linear-gradient(45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			
			animation: ${gradient} 30s ease infinite;
		`

		return (
			<div>
				<head>
					<title>Parklife</title>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.1/css/bulma.min.css" />
				</head>

				<br/>

				<Title>
					<h1 class="title is-2 animated jello has-text-centered">
						Parklife
					</h1>
				</Title>

				<section class="section is-small">
					<div class="columns">
						<div class="is-hidden">				//duplicated from Layout.js, Navbar hidden
							<NavColumn>
								<Nav />
							</NavColumn>
						</div>

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

export default Login_Register_Layout;

