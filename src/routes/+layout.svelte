<script lang="ts">
	import { FirebaseApp } from 'sveltefire';
	import { auth, firestore, storage } from '$lib/firebase';
</script>

<head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
		rel="stylesheet"
	/></head
>

<FirebaseApp {auth} {firestore} {storage}>
	<slot />
</FirebaseApp>
