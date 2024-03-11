<script lang="ts">
	import { SignedIn, SignedOut } from 'sveltefire';
	import SignInPopup from './SignInPopup.svelte';
	import type { UserLocation } from '$lib';

	export let userLocation: UserLocation;

	let isPopupOpen = false;
	let isDropdownOpen = false;

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}
	function togglePopup() {
		isPopupOpen = !isPopupOpen;
	}
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
			<SignedIn let:auth let:signOut let:user>
				<button on:click={signOut}>Sign Out</button>
				<button>Account Settings</button>
				<button>Light/Dark Switch</button>
				<button>Preferences</button>
			</SignedIn>
			<SignedOut let:auth>
				<button on:click={togglePopup}>Sign In or Register</button>
			</SignedOut>
		</div>
	{/if}
</div>

{#if isPopupOpen}
	<SignInPopup bind:isOpen={isPopupOpen} {userLocation} />
{/if}

<style>
	.profile-icon {
		position: relative;
		cursor: pointer;
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
