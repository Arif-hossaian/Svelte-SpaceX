<script>
    import { Badge } from 'flowbite-svelte';
    
    export let filteredData = [];
    
    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  </script>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredData as zone}
      <div class="p-4 bg-white border rounded-lg shadow">
        <h3 class="text-lg font-semibold">{zone.full_name}</h3>
        <p class="text-sm text-gray-600">Location Name: {zone.location.name}</p>
        <p class="text-sm text-gray-600">Region: {zone.location.region}</p>
        <p class="text-sm text-gray-600">Success Rate: {zone.successRate}</p>
        <p class="text-sm text-gray-600">
          Status: 
          {#if zone.status === 'active'}
            <Badge color="green">{capitalizeFirstLetter(zone.status)}</Badge>
          {:else if zone.status === 'retired'}
            <Badge color="red">{capitalizeFirstLetter(zone.status)}</Badge>
          {:else}
            <Badge color="blue">{capitalizeFirstLetter(zone.status)}</Badge>
          {/if}
        </p>
      </div>
    {/each}
  </div>