
import Layout from '../components/Layout';

// TODO: Line 23 add real margins
export default function Login() {
	return (
		<div>
			<Layout>
				<div>
					<div>
						<label for="first-name">First name:</label>
						<input type="text" id="first-name" name="first-name" required></input>
					</div>
					
					<div>
						<label for="last-name">Last name:</label>
						<input type="text" id="last-name" name="last-name" required></input>
					</div>
				</div>

				<br></br>

				<div>
					<div>
						<label for="username">Username:</label>
						<input type="text" id="username" name="username" required></input>
					</div>
					
					<div>
						<label for="password">Password:</label>
						<input type="password" id="password" name="password" required></input>
					</div>
					

					<div>
						<label for="password">Confirm Password:</label>
						<input type="password" id="confirm-password" name="confirm-password" required></input>
					</div>

					<input type="submit" value="Register"></input>
				</div>
			</Layout>
		</div>
	);
}

