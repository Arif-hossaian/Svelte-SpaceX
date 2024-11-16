<script>
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Button,
    Badge
  } from 'flowbite-svelte';
import { Chart, Card, A, Dropdown, DropdownItem, Popover, Tooltip } from 'flowbite-svelte';
	import Modal from './Modal.svelte';
	import Navbar from '../components/Navbar.svelte';




  import { InfoCircleSolid, ArrowDownToBracketOutline, ChevronDownOutline, ChevronRightOutline } from 'flowbite-svelte-icons';

 export let data; // Data from the load function
  console.log(data)
  // Sample Data (Replace with API data in a real application)
  const processedData = data.props.users.map((zone) => {
    const attempted = zone.attempted_landings || 0; // Avoid division by zero
    const successful = zone.successful_landings || 0;
    const successRate = attempted > 0 ? ((successful / attempted) * 100).toFixed(2) : '0.00';
    return { ...zone, successRate: `${successRate}%` };
  });
function capitalizeFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

  console.log(processedData); // Debugging
  let filterStatus = "All";

  // Filtered data based on selected filter
  $: filteredData = filterStatus === "All"
    ? processedData
    : processedData.filter((zone) => zone.status === filterStatus);
    console.log(filterStatus)

  const statuses = ["All", "active", "retired", "under construction"];
  // Prepare Doughnut Chart Data
    const successRates = data.props.users.map((pad) => {
    const successRate = pad.attempted_landings > 0
      ? ((pad.successful_landings / pad.attempted_landings) * 100).toFixed(2)
      : 0;
    return { name: pad.landing_type, rate: Number(successRate) };
  });
  const newsuccessRates = data.props.users
    .map((pad) => {
      const successRate = pad.attempted_landings > 0
        ? (pad.successful_landings / pad.attempted_landings) * 100
        : 0;
     return successRate.toFixed(2)
    })
    .sort((a, b) => b.rate - a.rate) // Sort by success rate in descending order
    .slice(0, 6); // Take top 6

  console.log('Filtered Success Rates:', newsuccessRates);
     const options = {
    series: successRates.map((pad) => Number(pad.rate)), // Dynamic series
    labels: successRates.map((pad) => pad.name), // Dynamic labels
    colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#E74694', '#A78BFA', '#34D399'],
    chart: {
      type: 'donut',
      height: 320,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '80%',
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 20,
            },
            total: {
              show: true,
              label: 'Landing Pads',
              formatter: function (w) {
                const sum = newsuccessRates.reduce((a, b) => a + b, 0);
                //return `${sum.toFixed(2)}%`; // Display total percentage
                return 6
              },
            },
            value: {
              show: true,
              offsetY: -20,
              formatter: function (value) {
                return `${value.toFixed(2)}%`; // Individual success rate percentage
              },
            },
          },
        },
      },
    },
    legend: {
      position: 'bottom',
    },
  };

    // View state
  let viewMode = "list"; // Toggle between "list" and "grid"
  
let showModal = false;
	let modalHeader = '';
	let modalContent = '';
	let landpads = [];
  // Fetch landpad details for a specific pad
async function fetchLandpadDetails(id) {
  console.log('id', id)
		try {
			const response = await fetch(`https://api.spacexdata.com/v3/landpads/${id}`);
			if (!response.ok) throw new Error('Failed to fetch landpad details');
			const data = await response.json();
			// Populate modal content
			modalHeader = data.full_name;  // Display full_name as the header
      console.log('header', modalHeader)
			modalContent = data.details
			showModal = true;
		} catch (error) {
			console.error('Error fetching landpad details:', error);
		}
	}

	// Load the landpads on mount
	//onMount(fetchLandpadDetails);
console.log('ttt', options.series)
 
</script>

console.log('test',options.series)
<Navbar />
<div class="grid grid-cols-12 gap-4 p-8 bg-gray-50 min-h-screen mt-16">
  
  <div class="col-span-12 lg:col-span-8 bg-white p-6 rounded-lg shadow">
    <div class="flex justify-between items-center mb-4">
      <select
          bind:value={viewMode}
          class="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700"
        >
          <option value="list">List View</option>
          <option value="grid">Grid View</option>
        </select>

        <!-- Dropdown for View Mode -->
      
      <select
    bind:value={filterStatus}
    class="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700"
  >
    {#each statuses as status}
      <option value={status}>{status}</option>
    {/each}
  </select>

    </div>
    {#if viewMode === "list"}
    <Table>
      <TableHead>
        <TableHeadCell>Full Name</TableHeadCell>
        <TableHeadCell>Location Name</TableHeadCell>
        <TableHeadCell>Region</TableHeadCell>
        <TableHeadCell>Details</TableHeadCell>
        <TableHeadCell>Success Rate</TableHeadCell>
        <TableHeadCell>Wikipedia Link</TableHeadCell>
        <TableHeadCell>Status</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each filteredData as zone}
          <TableBodyRow>
            <TableBodyCell>{zone.full_name}</TableBodyCell>
            <TableBodyCell>{zone.location.name}</TableBodyCell>
            <TableBodyCell>{zone.location.region}</TableBodyCell>
            <TableBodyCell><Button on:click={() => fetchLandpadDetails(zone.id)}>
  View Details
</Button>
</TableBodyCell>
            <TableBodyCell>
              <div class="flex items-center space-x-2">
                <span>{zone.successRate}</span>
                <div class="w-full bg-gray-200 rounded h-2.5">
                  <div
                    class="h-2.5 rounded"
                    style="width: {zone.successRate}; background-color: #4ade80;"
                  ></div>
                </div>
              </div>
            </TableBodyCell>
              <TableBodyCell><a target="__blank" href={zone.wikipedia}><svg className="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"/>
</svg>
</TableBodyCell>
         <TableBodyCell>
							{#if zone.status === 'active'}
								<Badge color="green">{capitalizeFirstLetter(zone.status)}</Badge>
							{:else if zone.status === 'retired'}
								<Badge color="red">{capitalizeFirstLetter(zone.status)}</Badge>
							{:else}
								<Badge color="blue">{capitalizeFirstLetter(zone.status)}</Badge>
							{/if}
						</TableBodyCell>
        
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>

        {/if}
        {#if viewMode === "grid"}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredData as zone}
          <div class="p-4 bg-white border rounded-lg shadow">
            <h3 class="text-lg font-semibold">{zone.full_name}</h3>
            <p class="text-sm text-gray-600">Location Name: {zone.location.name}</p>
            <p class="text-sm text-gray-600">Region: {zone.location.region}</p>
            <p class="text-sm text-gray-600">Success Rate: {zone.successRate}</p>
            <p class="text-sm text-gray-600">Status:  {#if zone.status === 'active'}
								<Badge color="green">{capitalizeFirstLetter(zone.status)}</Badge>
							{:else if zone.status === 'retired'}
								<Badge color="red">{capitalizeFirstLetter(zone.status)}</Badge>
							{:else}
								<Badge color="blue">{capitalizeFirstLetter(zone.status)}</Badge>
							{/if}</p>
          </div>
        {/each}
      </div>
    {/if}
  </div>


  <div class="col-span-12 lg:col-span-4 space-y-4">
    <!-- Map View -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-2">Map View</h3>
      <div class="h-60 bg-gray-100 flex items-center justify-center rounded">
        <!-- Replace with Map component or static image -->
        <span class="text-gray-500">Map Placeholder</span>
      </div>

 
</div>


    <!-- Success Rate Chart -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-2">Success Rate Chart</h3>
      <div class="flex items-center justify-center">
        <!-- Replace with actual chart component -->
    
           <Chart
  {options}
  series={options.series}
  type="donut"
  class="py-6"
/>
       
      </div>
    </div>
  </div>
</div>
<Modal bind:showModal>
	{#snippet header()}
  <div class="flex justify-between items-center mb-4">
  <h1>	Details - {modalHeader}</h1>
  <p on:click={() => showModal(false)}><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
</svg>
</p></div>
	
	{/snippet}

	<ol class="definition-list mt-4">
		<li>{modalContent}</li>
		<li>
			containing provisions as to the mode of procedure or the manner of taking effect —used of a
			contract or legacy
		</li>
		<li>of or relating to a musical mode</li>
		<li>of or relating to structure as opposed to substance</li>
		<li>
			of, relating to, or constituting a grammatical form or category characteristically indicating
			predication
		</li>
		<li>of or relating to a statistical mode</li>
	</ol>

	<a href="https://www.merriam-webster.com/dictionary/modal">merriam-webster.com</a>
</Modal>