<template>
  <a class="audios__example" :href="audio.url" @click.stop.prevent="play">
    <i
      class="audios__icon material-icons"
      :class="{ 'audios__icon--play': playing }"
    >{{ loading ? "query_builder" : "volume_up" }}</i>
    {{ audio.version }}
  </a>
</template>

<script>
export default {
  props: {
    audio: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      cache: null,
      loading: false,
      playing: false
    };
  },

  methods: {
    load() {
      this.loading = true;
      this.cache = new Audio();

      this.cache.addEventListener("canplaythrough", () => {
        this.play();
      });

      this.cache.addEventListener("ended", () => {
        this.playing = false;

        this.$emit("ended", {
          audio: this.audio
        });
      });

      this.cache.src = this.audio.url;
    },
    play() {
      if (!this.cache) {
        this.load();

        return false;
      }

      this.loading = false;
      this.playing = true;

      this.$emit("playing", {
        audio: this.audio
      });

      this.cache.play();
    }
  },

  watch: {
    "audio.active": function(newValue, oldValue) {
      if (!newValue) {
        return;
      }

      this.play();
    }
  }
};
</script>
