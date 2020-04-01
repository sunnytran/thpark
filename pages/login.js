import Layout from '../components/Layout';

export default function Login() {
	return (
		<div>
			<Layout>
				<div>
					<div>
						<label for="username">Username:</label>
						<input type="text" id="username" name="username" required></input>
					</div>
					
					<div>
						<label for="password">Password:</label>
						<input type="password" id="password" name="password" required></input>
					</div>
					
					<input type="submit" value="Sign in"></input>
				</div>
			</Layout>
		</div>
	);
}

