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
  
    export let filteredData = [];
    export let fetchLandpadDetails;
  
    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  </script>
  
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
          <TableBodyCell>
            <Button on:click={() => fetchLandpadDetails(zone.id)} class="cursor-pointer hover:bg-gray-200" color="gray">View Details</Button>
            
          </TableBodyCell>
          <TableBodyCell>
            <div class="flex items-center space-x-2">
             
              <div class="w-full bg-gray-200 rounded h-2.5">
                <div
                  class="h-2.5 rounded"
                  style="width: {zone.successRate}; background-color: #4ade80;"
                ></div>
              </div>
            </div>
            <span>{zone.successRate}</span>
          </TableBodyCell>
          <TableBodyCell>
            <a target="__blank" href={zone.wikipedia}>
              <svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"/>
              </svg>
            </a>
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