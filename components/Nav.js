
import Head from 'next/head';
import MyNavLink from './MyNavLink';
import styled, { keyframes } from 'styled-components';

// login
// true sticky footer

class Nav extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

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
						<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css" />
					</head>

					<aside class="menu">
						<ul class="menu-list">
							<li>
								<Title>
									<h1 class="title is-2 is-spaced animated jello">
											Parklife
									</h1>
								</Title>
							</li>
							<li>
								<ul>
									<li>
										<MyNavLink linkName={"Home"} linkUrl={"/"}>
										</MyNavLink>
									</li>
									<li>
										<MyNavLink linkName={"Rides"} linkUrl={"/rides"}>
										</MyNavLink>
									</li>
									<li>
										<MyNavLink linkName={"Concessions"} linkUrl={"/concessions"}>
										</MyNavLink>
									</li>
									<li>
										<MyNavLink linkName={"Tickets"} linkUrl={"/tickets"}>
										</MyNavLink>
									</li>
									<li>
										<MyNavLink linkName={"Maintenance"} linkUrl={"/maintenance"}>
										</MyNavLink>
									</li>
									<li>
										<MyNavLink linkName={"Reports"} linkUrl={"/reports"}>
										</MyNavLink>
									</li>
									<li>
										<MyNavLink linkName={"Staff"} linkUrl={"/staff"}>
										</MyNavLink>
									</li>
								</ul>
							</li>
						</ul>
					</aside>
			</div>
		);
	}
}

export default Nav;

