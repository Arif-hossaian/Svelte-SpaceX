<script>
	import {
		Modal,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { LinkOutline } from 'flowbite-svelte-icons';


	let promise = fetch('https://api.spacexdata.com/v3/landpads').then((res) => res.json());

	import { Badge } from 'flowbite-svelte';
	
	import MapComponent from './MapComponent.svelte';
	import Chart from './DoughtChart.svelte';
	import { sharedState } from '../shared/shared';

    import SuccesRating from '../utils/succesRating.svelte';
    import TableLoader from '../utils/TableLoader.svelte';
    import Filter from './Filter.svelte';
  import MapLoader from '../utils/MapLoader.svelte';
  
  
    let viewMode = "list";
	function capitalizeFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function navigateToAbout(url) {
		window.location = url;
	}
	// export let group = '';
	let showModal = $state(false);
	let details = $state('');
	let title = $state('');

	function openModal(item) {
		showModal = true;
		details = item.details;
		title = item.full_name;
	}

	let currentValue = $state(null);

	sharedState.subscribe((value) => {
		console.log(value);
		currentValue = value;
	});

</script>

<div>
    <Filter viewMode={viewMode}/>
    <div class="mt-10 grid w-full grid-cols-3 gap-5">
        {#await promise}
            <TableLoader />
        {:then data}
            <div class="col-span-3 w-full md:col-span-2">
                <Table>
                    <TableHead class="border-1 border">
                        <TableHeadCell>Full Name</TableHeadCell>
                        <TableHeadCell>Location name</TableHeadCell>
                        <TableHeadCell>Region</TableHeadCell>
                        <TableHeadCell>Details</TableHeadCell>
                        <TableHeadCell>Success Rate</TableHeadCell>
                        <TableHeadCell>Wikipedia Link</TableHeadCell>
                        <TableHeadCell>Status</TableHeadCell>
                    </TableHead>
                    {#each currentValue ? data.filter((dt) => dt.status.toLowerCase() === currentValue.toLowerCase()) : data as item}
                        <TableBody tableBodyClass="divide-y">
                            <TableBodyRow class="border-1 border">
                                <TableBodyCell>{item.full_name}</TableBodyCell>
                                <TableBodyCell>{item.location.name}</TableBodyCell>
                                <TableBodyCell>{item.location.region}</TableBodyCell>
                                <TableBodyCell
                                    ><Badge
                                        class="cursor-pointer hover:bg-gray-200"
                                        onclick={() => openModal(item)}
                                        color="dark">View Details</Badge
                                    ></TableBodyCell
                                >
                                <TableBodyCell
                                    ><SuccesRating
                                        attempted_landings={item.attempted_landings}
                                        successful_landings={item.successful_landings}
                                    /></TableBodyCell
                                >
                                <TableBodyCell>
                                    <LinkOutline
                                        class="cursor-pointer text-blue-700"
                                        onclick={() => navigateToAbout(item.wikipedia)}
                                    />
                                </TableBodyCell>
                                <TableBodyCell>
                                    {#if item.status === 'active'}
                                        <Badge color="green">{capitalizeFirstLetter(item.status)}</Badge>
                                    {:else if item.status === 'retired'}
                                        <Badge color="red">{capitalizeFirstLetter(item.status)}</Badge>
                                    {:else}
                                        <Badge color="blue">{capitalizeFirstLetter(item.status)}</Badge>
                                    {/if}
                                </TableBodyCell>
                            </TableBodyRow>
                        </TableBody>
                    {/each}
                </Table>
            </div>
        {:catch error}
            <p>Error: {error.message}</p>
        {/await}
    
        <Modal title="Details - {title}" bind:open={showModal} autoclose>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {details}
            </p>
        </Modal>
        {#await promise}
            <MapLoader />
        {:then data}
            <div class="col-span-3 w-full md:col-span-1">
                <div class="border-1 w-full rounded-md border bg-white p-5">
                    <h1 class="mb-3 font-semibold">Map View</h1>
                    <MapComponent {data} />
                </div>
                <div class="mt-4 inline-flex w-full justify-center">
                    <Chart landingPadsData={data} />
                </div>
            </div>
        {:catch error}
            <p>Error: {error.message}</p>
        {/await}
    </div>
</div>