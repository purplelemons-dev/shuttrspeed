<script lang="ts">
	import { SignedIn } from 'sveltefire';
	import { getSettings } from '$lib/utils/settings';
	import type { User } from '$lib';

	//const settings = getSettings();
	export let accountSettingsOpen: boolean;
</script>

{#if accountSettingsOpen}
	<SignedIn>
		<button
			class="popup-overlay"
			on:click|self={() => (accountSettingsOpen = false)}
			aria-label="Close popup"
		>
			<div class="popup">
				<h2>Account Settings</h2>
			</div>
		</button>
	</SignedIn>
{/if}

<style>
	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}

	.popup {
		background-color: #fff;
		padding: 20px;
		border-radius: 4px;
		max-width: 400px;
		width: 100%;
	}
	h2 {
		margin-top: 0;
	}
</style>
