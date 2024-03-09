<script lang="ts">
	import { onMount } from 'svelte';
	import { Loader } from 'google-maps';

	let mapContainer: HTMLDivElement;
	export let map: google.maps.Map<HTMLDivElement>;
	export let userLocation: {
		lat: number;
		lng: number;
	};
	export let autoLoad: boolean;

	onMount(async () => {
		const google = await new Loader('AIzaSyBzIIYM1KpuoSIs5mEEI1-BjTWtyHqagxQ').load();

		navigator.geolocation.getCurrentPosition((position) => {
			userLocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			if (autoLoad) {
				map = new google.maps.Map(mapContainer, {
					center: userLocation,
					zoom: 13
				});
			}
		});
	});
</script>

<div bind:this={mapContainer} class="map-container"></div>

<style>
	.map-container {
		width: 100%;
		height: 100%;
	}
</style>
