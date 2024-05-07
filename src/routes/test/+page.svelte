<script lang="ts">
	import { DownloadURL, UploadTask, SignedIn } from 'sveltefire';

	let file: File;

	function chooseFile(e) {
		file = e.target.files[0];
	}
</script>

<input type="file" on:change={chooseFile} accept="image/*" />

<SignedIn>
	{#if file}
		<UploadTask ref="myFile.png" data={file} let:progress let:snapshot>
			{#if snapshot?.state === 'running'}
				{progress}% uploaded
			{/if}

			{#if snapshot?.state === 'success'}
				<DownloadURL ref={snapshot?.ref} let:link>
					<a href={link} download>Link</a>
				</DownloadURL>
			{/if}
		</UploadTask>
	{/if}
</SignedIn>
