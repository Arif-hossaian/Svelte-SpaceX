<script>
    import { Chart } from 'flowbite-svelte';
    
    export let chartData;
    
    $: options = {
      series: chartData.map((pad) => pad.rate),
      labels: chartData.map((pad) => pad.name),
      colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#E74694', '#A78BFA', '#34D399', '#FFB74D'],
      chart: {
        type: 'donut',
        height: 320,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total Success',
                formatter: function () {
                  const avgRate =
                    chartData.reduce((acc, pad) => acc + pad.rate, 0) /
                    chartData.length;
                  return `${avgRate.toFixed(2)}%`;
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
  </script>
  
  <div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-2">Success Rate Chart</h3>
    <div class="flex items-center justify-center">
      <Chart {options} series={options.series} type="donut" class="py-6" />
    </div>
  </div>