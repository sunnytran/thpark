
import Head from 'next/head';
import Nav from './Nav';
import NavBasic from './NavBasic';
import AnimatedFooter from './AnimatedFooter';

import styled, { keyframes } from 'styled-components'

import Router from 'next/router';
import {attemptLogin, logout, isLoggedIn, getRole} from '../components/Auth';

class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			role: "none"
		}
	}

	async componentDidMount(){
		let test = await isLoggedIn();
		if (test === false){
			Router.push('/login');
		}

		let role = await getRole();
		await this.setState({
			role: role
		});
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

		const role = this.state.role;

		return (
			<div>
				{/*<<Head>
					<title>Parklife</title>
					link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/rsuite/4.3.4/styles/rsuite-default.min.css" />
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.1/css/bulma.min.css" />
					<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css" />
				</Head>*/}
			{(role === 'admin' || role === 'manager' || role === 'basic') &&
				<div>
				{(role === 'admin' || role === 'manager') ?
					<div>
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
					:
					<div>
						<section class="section is-small">
								<div class="columns">
									<NavColumn>
										<NavBasic />
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
				}
				</div>
			}
			</div>
		);
	}
}

export default Layout;