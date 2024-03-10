<script lang="ts">
	import { SignedIn, SignedOut } from 'sveltefire';
	import { signInWithEmailAndPassword, type Auth } from 'firebase/auth';

	const handleDropBtn = async (auth: Auth, event: SubmitEvent) => {
		const form = event.target as HTMLFormElement;
		const email = form.email.value;
		const password = form.password.value;
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error(error);
		}
	};
</script>

<SignedIn let:auth let:user let:signOut>
	<!-- open a dropdown menu for account settings and logout button -->>
</SignedIn>

<SignedOut let:auth>
	<!-- open a dropdown menu for signin and signup buttons -->
	<div class="dropdown">
		<button class="dropbtn">Sign In</button>
		<div class="dropdown-content">
			<form on:submit|preventDefault={(event) => handleDropBtn(auth, event)}>
				<label for="email">Email</label>
				<input type="email" id="email" name="email" required />
				<label for="password">Password</label>
				<input type="password" id="password" name="password" required />
				<button type="submit">Sign In</button>
			</form>
		</div>
	</div>
</SignedOut>

<style>
	/* Dropdown Button */
	.dropbtn {
		background-color: #3498db;
		color: white;
		padding: 16px;
		font-size: 16px;
		border: none;
		cursor: pointer;
	}

	/* Dropdown button on hover & focus */
	.dropbtn:hover,
	.dropbtn:focus {
		background-color: #2980b9;
	}

	/* The container <div> - needed to position the dropdown content */
	.dropdown {
		position: relative;
		display: inline-block;
	}

	/* Dropdown Content (Hidden by Default) */
	.dropdown-content {
		display: none;
		position: absolute;
		background-color: #f9f9f9;
		min-width: 160px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 1;
	}

	/* Links inside the dropdown */
	.dropdown-content form {
		display: flex;
		flex-direction: column;
		padding: 10px;
	}

	/* Change color of dropdown links on hover */
	.dropdown-content form button {
		background-color: #f9f9f9;
		color: black;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
	}

	/* Show the dropdown menu on hover */
	.dropdown:hover .dropdown-content {
		display: block;
	}

	/* Change the background color of the dropdown button when the dropdown content is shown */
	.dropdown:hover .dropbtn {
		background-color: #2980b9;
	}
	
</style>
