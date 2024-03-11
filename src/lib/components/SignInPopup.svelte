<script lang="ts">
	import type { UserLocation } from '$lib';
	import { firestore } from '$lib/firebase';
	import {
		signInWithEmailAndPassword,
		type Auth,
		createUserWithEmailAndPassword,
		GoogleAuthProvider,
		signInWithPopup,
		type User
	} from 'firebase/auth';
	import { setDoc, GeoPoint, doc, getDoc } from 'firebase/firestore';
	import { SignedOut } from 'sveltefire';

	export let isOpen = false;
	export let userLocation: UserLocation;

	let isRegistration = false;
	let email = '';
	let password = '';
	let verifyPassword = '';

	const provider = new GoogleAuthProvider();
	const addUserDoc = async (user: User) => {
		await setDoc(doc(firestore, 'users', user.uid), {
			uid: user.uid,
			email: user.email,
			name: user.displayName,
			photoURL: user.photoURL,
			location: new GeoPoint(userLocation.lat, userLocation.lng)
		});
	};

	const handleSubmit = async (auth: Auth) => {
		if (isRegistration && password !== verifyPassword) {
			alert('Passwords do not match');
			return;
		}
		if (isRegistration) {
			const user = await createUserWithEmailAndPassword(auth, email, password);
			await addUserDoc(user.user);
		} else {
			await signInWithEmailAndPassword(auth, email, password);
		}
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
					<button type="submit" class="submit-btn">{isRegistration ? 'Register' : 'Sign In'}</button
					>
				</form>
				<div class="divider">
					<span>or</span>
				</div>
				<div class="google-btn-container">
					<button
						class="google-btn"
						on:click={async () => {
							let user = await signInWithPopup(auth, provider);
							isOpen = false;
							getDoc(doc(firestore, 'users', user.user.uid)).then(async (doc) => {
								if (doc.exists()) return;
								await addUserDoc(user.user);
							});
						}}
					>
						<img src="google-logo.png" alt="Google Logo" />
						{isRegistration ? 'Register' : 'Sign In'} with Google
					</button>
				</div>
			</SignedOut>
			<p class="toggle-text">
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

	.submit-btn {
		background-color: #007bff;
		color: #fff;
		border: none;
		border-radius: 4px;
		padding: 10px;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.submit-btn:hover {
		background-color: #0056b3;
	}

	.divider {
		display: flex;
		align-items: center;
		margin: 20px 0;
	}

	.divider span {
		margin: 0 10px;
		color: #999;
	}

	.divider::before,
	.divider::after {
		content: '';
		flex-grow: 1;
		height: 1px;
		background-color: #ccc;
	}
	.google-btn-container {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}

	.google-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		color: #757575;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 10px;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.google-btn:hover {
		background-color: #f5f5f5;
	}

	.google-btn img {
		width: 20px;
		height: 20px;
		margin-right: 10px;
	}

	.toggle-text {
		margin-top: 20px;
		text-align: center;
	}
</style>
