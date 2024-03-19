<script lang="ts">
	import type { UserLocation } from '$lib';
	import { firestore } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup, type User } from 'firebase/auth';
	import { setDoc, GeoPoint, doc, getDoc } from 'firebase/firestore';
	import { SignedOut } from 'sveltefire';

	export let isOpen = false;
	export let userLocation: UserLocation;

	// slightly randomize location (+/- approx half mile) for privacy
	const randomLoc = () => {
		return (Math.random() - 0.5) / 64;
	};

	const provider = new GoogleAuthProvider();
	const addUserDoc = async (user: User) => {
		// TODO: ensure user is not already in the database
		await setDoc(doc(firestore, 'users', user.uid), {
			uid: user.uid,
			email: user.email,
			name: user.displayName,
			photoURL: user.photoURL,
			location: new GeoPoint(userLocation.lat + randomLoc(), userLocation.lng + randomLoc())
		});
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') isOpen = false;
	};
</script>

{#if isOpen}
	<SignedOut let:auth>
		<button
			class="popup-overlay"
			on:click|self={() => (isOpen = false)}
			on:keydown={handleKeyDown}
			aria-label="Close popup"
		>
			<div class="popup">
				<h2>Sign in with Google</h2>
				<form>
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
							Sign In with Google
						</button>
					</div>
				</form>
			</div>
		</button>
	</SignedOut>
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

	button {
		padding: 8px;
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
</style>
