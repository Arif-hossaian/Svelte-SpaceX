<script>
	import { ButtonGroup, Button, Dropdown, Radio } from 'flowbite-svelte';
	import {
		AdjustmentsVerticalOutline,
		ChevronDownOutline,
		GridSolid,
		ListOutline
	} from 'flowbite-svelte-icons';

	import { sharedState } from '../shared/shared';

	// Local state for the selected radio value
	let group = null;
    const { viewMode, onViewModeChange } = $props();

	// Subscribe to the store
	sharedState.subscribe((value) => {
		group = value;
	});

	// Function to update the shared state when a radio button is selected
	function handleChange(event) {
		group = event.target.value;
		sharedState.set(group === "all" ? null : group);
	}
	
</script>

<div class="flex w-[66%] items-center justify-between">
    <ButtonGroup>
        <!-- Button for List View -->
        <!-- svelte-ignore attribute_quoted -->
        <Button
          outline
          color="dark"
          class="{viewMode === 'list' ? 'bg-gray-100' : ''}"
		  on:click={() => onViewModeChange('list')}

        >
          <ListOutline class="me-2 h-4 w-4 {viewMode === 'list' ? 'text-blue-500' : ''}" />
 
        </Button>
        
        <!-- Button for Grid View -->
        <!-- svelte-ignore attribute_quoted -->
        <Button
          outline
          color="dark"
          class="{viewMode === 'grid' ? 'bg-gray-100' : ''}"
		  on:click={() => onViewModeChange('grid')}

        >
          <GridSolid class="me-2 h-4 w-4 {viewMode === 'grid' ? 'text-blue-500' : ''}" />

        </Button>
      </ButtonGroup>

	<Button
		class="border-1 flex gap-2 border border-gray-400 bg-gray-200 text-black hover:bg-gray-300 focus:text-blue-700 focus:ring-2 focus:ring-gray-200"
		><AdjustmentsVerticalOutline
			class="h-6 w-6 text-black focus:text-blue-700 dark:text-white"
		/>Filter By Status<ChevronDownOutline
			class=" h-6 w-6 text-black focus:text-blue-700 dark:text-white"
		/></Button
	>
	<Dropdown class="w-48 space-y-1 p-3 ">
		<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
			<Radio
				name="group"
				class="focus:text-indigo-600 focus:ring-2 focus:ring-indigo-600"
				bind:group
				on:change={handleChange}
				value="all">All</Radio
			>
		</li>
		<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
			<Radio
				name="group"
				class="focus:text-indigo-600 focus:ring-2 focus:ring-indigo-600"
				bind:group
				on:change={handleChange}
				value="active">Active</Radio
			>
		</li>
		<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
			<Radio name="group" bind:group on:change={handleChange} value="retired">Retired</Radio>
		</li>
		<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
			<Radio name="group" bind:group on:change={handleChange} value="under construction"
				>Under Construction</Radio
			>
		</li>
	</Dropdown>
</div>