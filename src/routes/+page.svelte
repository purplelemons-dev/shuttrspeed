<script lang="ts">
	import type { UserLocation } from '$lib';
	import MapBackground from '$lib/components/MapBackground.svelte';
	import UserList from '$lib/components/UserList.svelte';
	import UserSignInIcon from '$lib/components/UserSignInIcon.svelte';

	let map: google.maps.Map<HTMLDivElement>;
	let userLocation: UserLocation;
	let autoLoad = true;
	let isDarkMode: boolean;
</script>

<div class="app-container">
	<div class="sidebar">
		<!-- user signin icon -->
		<UserSignInIcon bind:userLocation bind:isDarkMode />

		<h1>ShuttrSpeed</h1>
		<!--
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
		-->

		<UserList bind:userLocation />
	</div>
	<MapBackground bind:map bind:userLocation bind:autoLoad bind:isDarkMode />
</div>

<style>
	.sidebar {
		width: 600px;
		padding: 20px;
		background-color: var(--bg-color);
		color: var(--text-color);
	}
	.app-container {
		display: flex;
		height: 100vh;
		background-color: var(--bg-color);
		color: var(--text-color);
	}
	:root {
		--bg-color: white;
		--text-color: black;

		font-family: 'Nunito', sans-serif;
	}

	:global(.dark-mode) {
		--bg-color: black;
		--text-color: white;
	}
</style>
