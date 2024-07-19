<template>
  <div class="py-5 mb-5">
    <widgets-daily-quote />
  </div>
  <lazy-widgets-container/>
</template>

<script lang="ts" setup>

const store = useMainStore()

const WidgetsContainer = defineAsyncComponent({
  loader: () => import('@/components/widgets/Container.vue'),
})

</script>
