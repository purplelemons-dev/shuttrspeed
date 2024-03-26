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

<div bind:this={mapContainer} class="map-container" style="background-color: var(--bg-color)">
	<div class="img-container">
		Map is Loading... &nbsp;
		<img src="loading.gif" alt="the map is loading right now" />
	</div>
</div>

<style>
	div.map-container {
		width: 100%;
		height: 100%;
		display: flex;
	}

	div img {
		width: 10%;
		height: 20%;
	}

	.img-container {
		position: absolute;
		top: 40%;
		left: 45%;
		vertical-align: auto;
	}
</style>
