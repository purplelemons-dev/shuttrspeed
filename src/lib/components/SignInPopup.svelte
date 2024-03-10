<script lang="ts">
	import {
		signInWithEmailAndPassword,
		type Auth,
		createUserWithEmailAndPassword
	} from 'firebase/auth';
	import { SignedOut } from 'sveltefire';

	export let isOpen = false;
	let isRegistration = false;

	let email = '';
	let password = '';
	let verifyPassword = '';

	const handleSubmit = async (auth: Auth) => {
		await createUserWithEmailAndPassword(auth, email, password);
		console.log('Submit:', email, password);
		isOpen = false;
	};

	const toggleRegistration = () => {
		isRegistration = !isRegistration;
	};
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') isOpen = false;
	};
</script>

{#if isOpen}
	<button
		class="popup-overlay"
		on:click|self={() => (isOpen = false)}
		on:keydown={handleKeyDown}
		aria-label="Close popup"
	>
		<div class="popup">
			<h2>{isRegistration ? 'Register' : 'Sign In'}</h2>
			<SignedOut let:auth>
				<form
					on:submit|preventDefault={() => {
						handleSubmit(auth);
					}}
				>
					<input type="email" placeholder="Email" bind:value={email} required />
					<input type="password" placeholder="Password" bind:value={password} required />
					{#if isRegistration}
						<input
							type="password"
							placeholder="Verify Password"
							bind:value={verifyPassword}
							required
						/>
					{/if}
					<button type="submit">{isRegistration ? 'Register' : 'Sign In'}</button>
				</form>
			</SignedOut>
			<p>
				{isRegistration ? 'Already have an account?' : "Don't have an account?"}
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="#" on:click|preventDefault={toggleRegistration}>
					{isRegistration ? 'Sign In' : 'Register'}
				</a>
			</p>
		</div>
	</button>
{/if}

<style>
	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}

	.popup {
		background-color: #fff;
		padding: 20px;
		border-radius: 4px;
		max-width: 400px;
		width: 100%;
	}

	h2 {
		margin-top: 0;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	input {
		margin-bottom: 10px;
		padding: 8px;
	}

	button {
		padding: 8px;
	}
</style>
