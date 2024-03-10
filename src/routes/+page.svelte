<script lang="ts">
	import MapBackground from '$lib/components/MapBackground.svelte';
	import UserList from '$lib/components/UserList.svelte';
	import UserSignInIcon from '$lib/components/UserSignInIcon.svelte';

	let map: google.maps.Map<HTMLDivElement>;
	let userLocation: { lat: number; lng: number };
	let autoLoad = true;
</script>

<div class="app-container">
	<div class="sidebar">
		<!-- user signin icon -->
		<UserSignInIcon />
		<h1>ShuttrSpeed</h1>
		<p>Click the buttons for a demo.</p>
		<button
			on:click={() => {
				map.setCenter({ lat: 40.7128, lng: -74.006 });
			}}
		>
			NYC
		</button>
		<button
			on:click={() => {
				map.setCenter(userLocation);
			}}
		>
			home
		</button>

		<UserList />
	</div>
	<MapBackground bind:map bind:userLocation bind:autoLoad />
</div>

<style>
	.app-container {
		display: flex;
		height: 100vh;
	}

	.sidebar {
		width: 600px;
		padding: 20px;
		background-color: #f0f0f0;
	}
</style>
