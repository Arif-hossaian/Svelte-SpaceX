<script>
	import { Chart, Card } from 'flowbite-svelte';
	import { sharedState } from '../shared/shared';

	export let landingPadsData = [];

	// Local state for filtering
	let currentValue = null;

	// Initialize chart options
	let options = {
		series: [],
		colors: ['#16BDCA', '#E74694'],
		chart: {
			height: 320,
			width: '100%',
			type: 'donut'
		},
		stroke: {
			colors: ['transparent']
		},
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: true,
						total: {
							showAlways: true,
							show: true,
							label: 'Landing Pads',
							fontFamily: 'Inter, sans-serif',
							formatter: function () {
								return `${landingPadsData.length}`;
							}
						}
					},
					size: '80%'
				}
			}
		},
		labels: ['Successful Pads', 'Other Pads'],
		legend: {
			position: 'bottom',
			fontFamily: 'Inter, sans-serif'
		}
	};

	// Function to update the chart data based on the filter
	function updateChart() {
		// Apply the same filtering logic as in the map
		const filteredData = currentValue
			? landingPadsData.filter((pad) => pad.status.toLowerCase() === currentValue.toLowerCase())
			: landingPadsData;

		// Recalculate totals
		const totalLandingPads = filteredData.length;
		const successfulLandingPads = filteredData.filter((pad) => pad.successful_landings > 0).length;

		// Update the chart options
		options.series = [successfulLandingPads, totalLandingPads - successfulLandingPads];
	}

	// Subscribe to sharedState to get the current filter value
	sharedState.subscribe((value) => {
		currentValue = value;
		updateChart();
	});

	// Initial chart setup with all data
	updateChart();
</script>

<Card size="lg">
	<div class="flex w-full items-start justify-between">
		<div class="flex-col items-center">
			<div class="mb-1 flex items-center">
				<h5 class="me-1 text-xl font-bold leading-none text-gray-900 dark:text-white">
					Success Rate Chart
				</h5>
			</div>
		</div>
	</div>

	<Chart {options} class="py-6" />
</Card>