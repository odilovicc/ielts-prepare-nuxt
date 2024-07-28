<template>
  <div class="widget w-full min-h-[34.5rem] flex flex-col">
    <div class="flex items-center justify-between">
      <h1 class="md:text-xl font-bold">My progress</h1>
      <nuxt-img src="/images/Chart Increasing.svg" class="w-6 md:w-12" />
    </div>
    <Chart
      type="bar"
      :data="chartData"
      :options="chartOptions"
      class="w-full flex-grow"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Listening",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: documentStyle.getPropertyValue("--p-cyan-500"),
        tension: 0.4,
      },
      {
        label: "Reading",
        data: [29, 85, 51, 63, 95, 32, 2],
        fill: false,
        backgroundColor: documentStyle.getPropertyValue("--p-green-500"),
        tension: 0.4,
      },
      {
        label: "Writing",
        data: [49, 16, 25, 63, 11, 70, 14],
        backgroundColor: documentStyle.getPropertyValue("--p-orange-500"),
        tension: 0.4,
      },
      {
        label: "Speaking",
        data: [84, 37, 92, 5, 59, 76, 22],
        fill: false,
        backgroundColor: documentStyle.getPropertyValue("--p-zinc-500"),
        tension: 0.4,
      },
    ],
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  };
};
</script>

<style></style>

<!-- 
     -->
