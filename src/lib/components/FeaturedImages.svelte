<script lang="ts">
	import type { User } from '$lib';

	export let userItem: User;
</script>

<div>
	{#each userItem.featImgURLs as url, idx}
		<img src={url} alt={userItem.name + ' image ' + idx} />
	{/each}
</div>
