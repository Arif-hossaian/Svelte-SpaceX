<script>
	let { showModal = $bindable(), header, children } = $props();

	let dialog; // HTMLDialogElement reference

	$effect(() => {
		if (showModal) dialog.showModal();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		// Close modal if the backdrop (dialog itself) is clicked
		if (e.target === dialog) dialog.close();
	}}
>
	<div>
		<div class="flex justify-between items-center mb-4">
			<!-- Render header content if provided -->
			{@render header?.()}
			
			<!-- Close button -->
			<button 
				autofocus 
				aria-label="Close modal" 
				onclick={() => dialog.close()}
			>
				<svg 
					class="w-6 h-6 text-gray-800 dark:text-white" 
					xmlns="http://www.w3.org/2000/svg" 
					width="24" 
					height="24" 
					viewBox="0 0 24 24" 
					fill="none" 
					aria-hidden="true"
				>
					<path 
						stroke="currentColor" 
						stroke-linecap="round" 
						stroke-linejoin="round" 
						stroke-width="2" 
						d="M6 18L18 6M18 18L6 6"
					/>
				</svg>
			</button>
		</div>
		
		<hr />
		
		<!-- Render children content if provided -->
		{@render children?.()}
		
		<hr />
	</div>
</dialog>

<style>
	dialog {
		max-width: 42em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
		background: none;
		border: none;
		cursor: pointer;
	}
</style>
