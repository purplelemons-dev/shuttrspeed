<script lang="ts">
	import { SignedIn, SignedOut } from 'sveltefire';
	import SignInPopup from './SignInPopup.svelte';
	import type { UserLocation } from '$lib';
	import { auth } from '$lib/firebase';
	import { onMount } from 'svelte';
	import { signOut } from 'firebase/auth';
	export let userLocation: UserLocation;

	let isPopupOpen = false;
	let isDropdownOpen = false;
	export let isDarkMode: boolean;

	const toggleDropdown = () => {
		isDropdownOpen = !isDropdownOpen;
	};
	const togglePopup = () => {
		isPopupOpen = !isPopupOpen;
	};

	onMount(() => {
		isDarkMode = localStorage.getItem('isDarkMode') === 'true';
		if (isDarkMode) document.documentElement.classList.add('dark-mode');
		else document.documentElement.classList.remove('dark-mode');
	});

	const toggleDarkMode = () => {
		isDarkMode = !isDarkMode;
		document.documentElement.classList.toggle('dark-mode', isDarkMode);
		//document.body.classList.toggle('dark-mode', isDarkMode);
		localStorage.setItem('isDarkMode', String(isDarkMode));
	};

	const customSignOut = async () => {
		isDarkMode = false;
		document.documentElement.classList.remove('dark-mode');
		localStorage.setItem('isDarkMode', String(isDarkMode));
		await signOut(auth);
	};
</script>

<div
	class="profile-icon"
	on:click={toggleDropdown}
	on:keypress={toggleDropdown}
	role="button"
	tabindex="0"
>
	<SignedIn let:user><img src={user.photoURL} alt="Profile Icon" /></SignedIn>
	<SignedOut><img src="profile-icon.png" alt="Profile Icon" /></SignedOut>

	{#if isDropdownOpen}
		<div class="dropdown">
			<SignedIn>
				<button on:click={customSignOut}>Sign Out</button>
				<button>Account Settings</button>
				<button on:click={toggleDarkMode}>Light/Dark Switch</button>
				<button>Preferences</button>
			</SignedIn>
			<SignedOut>
				<button on:click={togglePopup}>Sign In or Register</button>
			</SignedOut>
		</div>
	{/if}
</div>

{#if isPopupOpen}
	<SignInPopup bind:isOpen={isPopupOpen} bind:userLocation />
{/if}

<style>
	.profile-icon {
		position: relative;
		cursor: pointer;
		display: inline-block;
	}

	.profile-icon img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 8px;
		min-width: 150px;
		z-index: 1;
	}

	.dropdown button {
		padding: 8px 12px;
		border: none;
		background-color: transparent;
		color: #333;
		text-align: left;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.dropdown button:hover {
		background-color: #f0f0f0;
	}

	.dropdown button:focus {
		outline: none;
		box-shadow: 0 0 0 2px #007bff;
	}
</style>
