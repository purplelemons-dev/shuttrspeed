<script lang="ts">
	import type { User } from '$lib';
	import { distanceCalc } from '$lib/utils';
	import { firestore, auth } from '$lib/firebase';
	import { SignedIn, collectionStore, userStore, docStore } from 'sveltefire';

	const user = userStore(auth);
	const userLocation = docStore<User>(firestore, `users/${$user?.uid}`);

	let lat = $userLocation?.location.latitude || 0;
	let lng = $userLocation?.location.longitude || 0;

	const users = collectionStore<User>(firestore, 'users');
</script>

<!-- make a scrollable list of $users -->

<SignedIn>
	<ul>
		{#each $users as userItem (distanceCalc(lat, lng, userItem.location.latitude, userItem.location.longitude))}
			<li>{userItem.name}</li>
		{/each}
	</ul>
</SignedIn>
