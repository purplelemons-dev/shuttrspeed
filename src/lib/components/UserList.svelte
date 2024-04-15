<script lang="ts">
	import type { User } from '$lib';
	import { distanceCalc } from '$lib/utils';
	import { firestore, auth } from '$lib/firebase';
	import { SignedIn, collectionStore, userStore } from 'sveltefire';
	import type { UserLocation } from '$lib';
	import FeaturedImages from './FeaturedImages.svelte';

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
						<div class="user-info">
							<div class="profile-icon-container">
								<img
									src="/api/profile/{btoa(userItem.photoURL)}"
									alt={userItem.name}
									class="profile-icon"
								/>
							</div>
							<div class="user-details">
								<h2>{userItem.name}</h2>
								{distanceCalc(
									lat,
									lng,
									userItem.location.latitude,
									userItem.location.longitude
								).toFixed(1)} miles from you.
							</div>
						</div>
						<div class="feat-imgs">
							<FeaturedImages {userItem} />
						</div>
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
		flex-direction: column;
		justify-content: space-between;
	}

	.user-info {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
	}

	.user-details {
		display: flex;
		flex-direction: column;
	}

	.feat-imgs {
		display: flex;
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
