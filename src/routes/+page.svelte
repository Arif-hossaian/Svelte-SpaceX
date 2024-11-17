<script>
  import Filter from '../components/Filter.svelte';

	import Navbar from '../components/Navbar.svelte';
  import TableComponent from '../components/TableComponent.svelte';

  let viewMode = "list";

</script>

<Navbar />

<div class="mt-32 w-full px-24">
	<Filter bind:viewMode/>
  <TableComponent viewMode={viewMode}/>
	
</div>