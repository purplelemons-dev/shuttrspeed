<script lang="ts">
	import type { User } from '$lib';
	import { firestore } from '$lib/firebase';
	import { collectionStore } from 'sveltefire';

	const users = collectionStore<User>(firestore, 'users');
</script>

<ul>
	{#each $users as user}
		<li>{user.uid}: {user.displayName} ({user.email}, {user.name})</li>
	{/each}
</ul>
