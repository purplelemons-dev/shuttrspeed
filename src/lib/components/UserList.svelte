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
</script>

<!-- make a scrollable list of $users -->

<SignedIn>
	<ul>
		{#each $users as userItem (distanceCalc(lat, lng, userItem.location.latitude, userItem.location.longitude))}
			{#if userItem.uid !== $user?.uid && userItem.accountType === 'photographer'}
				<li>
					<h2>{userItem.name}</h2>
					{distanceCalc(lat, lng, userItem.location.latitude, userItem.location.longitude).toFixed(
						1
					)} miles from you.
				</li>
			{/if}
		{/each}
	</ul>
</SignedIn>
