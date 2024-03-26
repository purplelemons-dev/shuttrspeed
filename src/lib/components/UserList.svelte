<script lang="ts">
	import type { User } from '$lib';
	import { distanceCalc } from '$lib/utils';
	import { firestore, auth } from '$lib/firebase';
	import { SignedIn, collectionStore, userStore } from 'sveltefire';
	import type { UserLocation } from '$lib';

	export let userLocation: UserLocation;
	$: lat = userLocation?.lat;
	$: lng = userLocation?.lng;

	const user = userStore(auth);
	const users = collectionStore<User>(firestore, 'users');
	const conditions = (userItem: User) => {
		return (
			userItem.uid !== $user?.uid &&
			userItem.accountType === 'photographer' &&
			distanceCalc(lat, lng, userItem.location.latitude, userItem.location.longitude) < 50
		);
	};
</script>

<!-- make a scrollable list of $users -->

<SignedIn>
	<ul>
		{#each $users as userItem (distanceCalc(lat, lng, userItem.location.latitude, userItem.location.longitude))}
			{#if conditions(userItem)}
				<li>
					<div class="userItem">
						<div class="profile-icon-container">
							<img src={userItem.photoURL} alt={userItem.name} class="profile-icon" />
						</div>
						<h2>{userItem.name}</h2>
						{distanceCalc(
							lat,
							lng,
							userItem.location.latitude,
							userItem.location.longitude
						).toFixed(1)} miles from you.
					</div>
				</li>
			{/if}
		{/each}
	</ul>
</SignedIn>

<style>
	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		padding: 1rem;
		border-bottom: 1px solid #ccc;
	}

	.userItem {
		display: flex;
		justify-content: space-between;
	}

	h2 {
		margin: 0;
	}

	.profile-icon-container {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 1rem;
	}

	.profile-icon {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
