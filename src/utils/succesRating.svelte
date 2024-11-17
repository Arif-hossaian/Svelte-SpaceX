<script>
	import { P, Progressbar } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	export let attempted_landings = 0;
	export let successful_landings = 0;

	function calculatePercentage() {
		let success_rate = (successful_landings / attempted_landings) * 100;
		return Number(success_rate.toFixed(2));
	}

	let rate;

	onMount(async () => {
		rate = await calculatePercentage();

		console.log(typeof rate);
		// update the rate whenever attempted_landings or successful_landings change
	});
</script>

{#if rate}
	<Progressbar progressClass="bg-green-400 " progress={rate} animate={true} />
	<p>{rate}%</p>
{:else}
	<p>N/A</p>
{/if}
