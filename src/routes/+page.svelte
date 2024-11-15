<script>
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Button
  } from 'flowbite-svelte';
import { Chart, Card, A, Dropdown, DropdownItem, Popover, Tooltip } from 'flowbite-svelte';
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
    return { name: pad.name, rate: Number(successRate) };
  });
   const options = {
    series: successRates.map((pad) => pad.rate), // Success rates as series data
    colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#E74694'], // Customize colors as needed
    chart: {
      height: 320,
      width: '100%',
      type: 'donut'
    },
    stroke: {
      colors: ['transparent'],
      lineCap: ''
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: 'Inter, sans-serif',
              offsetY: 20
            },
            total: {
              showAlways: true,
              show: true,
              label: 'Success Rate',
              fontFamily: 'Inter, sans-serif',
              formatter: function (w) {
                return `${w.globals.seriesTotals.reduce((a, b) => a + b, 0).toFixed(2)}%`;
              }
            },
            value: {
              show: true,
              fontFamily: 'Inter, sans-serif',
              offsetY: -20,
              formatter: function (value) {
                return `${value}%`;
              }
            }
          },
          size: '80%'
        }
      }
    },
    grid: {
      padding: {
        top: -2
      }
    },
    labels: successRates.map((pad) => pad.name), // Landing pad names as labels
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'bottom',
      fontFamily: 'Inter, sans-serif'
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + '%';
        }
      }
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + '%';
        }
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    }
  };
</script>

<div class="grid grid-cols-12 gap-4 p-8 bg-gray-50 min-h-screen">
  
  <div class="col-span-12 lg:col-span-8 bg-white p-6 rounded-lg shadow">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Landing Zones</h2>
      <select
    bind:value={filterStatus}
    class="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700"
  >
    {#each statuses as status}
      <option value={status}>{status}</option>
    {/each}
  </select>
    </div>
    <Table>
      <TableHead>
        <TableHeadCell>Full Name</TableHeadCell>
        <TableHeadCell>Location Name</TableHeadCell>
        <TableHeadCell>Region</TableHeadCell>
        <TableHeadCell>Details</TableHeadCell>
        <TableHeadCell>Success Rate</TableHeadCell>
        <TableHeadCell>Status</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each filteredData as zone}
          <TableBodyRow>
            <TableBodyCell>{zone.full_name}</TableBodyCell>
            <TableBodyCell>{zone.location.name}</TableBodyCell>
            <TableBodyCell>{zone.location.region}</TableBodyCell>
            <TableBodyCell><Button outline>View Details</Button></TableBodyCell>
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
            <TableBodyCell>
              <span
                class="px-2 py-1 rounded-full text-sm"
                class:class:bg-green-100={zone.status === "Active"}
                class:class:bg-red-100={zone.status === "Retired"}
                class:class:bg-blue-100={zone.status === "Under Construction"}
                class:class:text-green-700={zone.status === "Active"}
                class:class:text-red-700={zone.status === "Retired"}
                class:class:text-blue-700={zone.status === "Under Construction"}
              >
                {zone.status}
              </span>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
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
        <div class="w-32 h-32 bg-pink-200 rounded-full flex items-center justify-center text-xl font-semibold text-gray-700">
          <span>6</span>
        </div>
      </div>
    </div>
  </div>
</div>
