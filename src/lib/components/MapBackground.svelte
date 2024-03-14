<script lang="ts">
	import { onMount } from 'svelte';
	import { Loader } from 'google-maps';
	import { lightModeStyles, darkModeStyles } from '$lib/utils/mapStyles';

	let mapContainer: HTMLDivElement;
	export let map: google.maps.Map<HTMLDivElement>;
	export let userLocation: {
		lat: number;
		lng: number;
	};
	export let autoLoad: boolean;
	export let isDarkMode: boolean;

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

	// Reactively "listen" for dark mode
	$: if (map) {
		map.setOptions({ styles: isDarkMode ? darkModeStyles : lightModeStyles });
	}
</script>

<div bind:this={mapContainer} class="map-container"></div>

<style>
	.map-container {
		width: 100%;
		height: 100%;
	}
</style>
