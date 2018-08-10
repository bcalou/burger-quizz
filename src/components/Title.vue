<template>
  <div class="title">
    <video
      :src="videoUrl"
      class="title__video"
      autoplay
      width="100%"
      height="100%"
    ></video>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    phase: Object
  },
  created: function() {
    window.addEventListener('keydown', this.onKeydown);
  },
  destroyed: function() {
    window.removeEventListener('keydown', this.onKeydown);
  },
  computed: {
    videoUrl: function() {
      return this.phase
        ? require(`../assets/videos/${this.phase.title}.mp4`)
        : require(`../assets/videos/title.mp4`)
    }
  },
  methods: {
    onKeydown(event) {
      if (event.key === ' ') {
        this.end();
      }
    },
    end() {
      this.$emit('end');
    }
  }
}
</script>

<style scoped>
.title__video {
  max-width: 100vw;
  max-height: 100vh;
}
</style>
