<template>
  <div class="audio-player">
    <Button @click="togglePlay" rounded class="p-2">
      <span class="text-sm" :class="isPlaying ? 'pi pi-pause' : 'pi pi-play'" />
    </Button>
    <audio ref="audio" :src="audioSrc" @ended="handleEnded"></audio>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  audioSrc: {
    type: String,
    required: true,
  },
});

const audio = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);

const togglePlay = () => {
  if (audio.value) {
    if (isPlaying.value) {
      audio.value.pause();
    } else {
      audio.value.play();
    }
    isPlaying.value = !isPlaying.value;
  }
};

const handleEnded = () => {
  isPlaying.value = false;
};
</script>

<style scoped>
.audio-player {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
</style>
