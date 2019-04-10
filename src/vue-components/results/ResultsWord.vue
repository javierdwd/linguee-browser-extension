<template>
  <li>
    <div class="collapsible-header word">
      <a
        v-if="word.audios.length"
        @click.stop.prevent="triggerPlayAudio($event, word.audios[0])"
        class="word__audio-trigger grey-text text-darken-3"
        href="#"
      >
        <i class="material-icons">volume_up</i>
      </a>
      <div class="aux-wrapper">
        <span class="word__word blue-text text-darken-4">{{ word.term }}</span>
        <span
          class="word__context grey-text text-darken-1"
          v-if="word.additionalInfo && word.additionalInfo.context"
        >({{ word.additionalInfo.context }})</span>

        <span class="word__type grey-text">{{ word.type }}</span>
        <span
          class="word__verbs grey-text text-darken-1"
          v-if="word.additionalInfo && word.additionalInfo.verbs"
        >[{{ word.additionalInfo.verbs.join(', ') }}]</span>
        <span
          class="word__plural grey-text text-darken-1"
          v-if="word.additionalInfo && word.additionalInfo.plural"
        >
          (
          <strong class="grey-text text-lighten-1">Plural:</strong>
          {{ word.additionalInfo.plural }}
          )
        </span>
      </div>

      <i class="material-icons grey-text text-darken-3 expand-icon expand-less">more_horiz</i>
      <i class="material-icons grey-text text-darken-3 expand-icon expand-more">expand_more</i>

      <div class="audios" :class="{'audios--show': showAudioOptions}" v-if="word.audios.length">
        <results-audio
          v-for="(audio, index) in word.audios"
          :key="index"
          :audio="audio"
          @ended="endedAudio"
        ></results-audio>
      </div>
    </div>
    <div class="collapsible-body">
      <ul class="collection">
        <li v-for="(translation, index) in word.translations" :key="index" class="collection-item">
          <span class="translation">
            <span class="translation__term grey-text text-darken-4">{{ translation.term }}</span>
            <span
              class="translation__type grey-text text-darken-1"
              v-if="translation.type"
            >{{ translation.type }}</span>
          </span>

          <div class="examples" v-if="translation.examples">
            <p class="example" v-for="(example, index) in translation.examples" :key="index">
              <span class="example__phrase grey-text text-darken-2">
                <i class="material-icons blue-text text-accent-4">subdirectory_arrow_left</i>
                {{ example.phrase }}
              </span>
              <span class="example__translation grey-text text-darken-2">
                <i class="material-icons green-text text-accent-4">subdirectory_arrow_right</i>
                {{ example.translation }}
              </span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
import ResultsAudio from "./ResultsAudio";

export default {
  components: {
    ResultsAudio
  },

  props: {
    word: {
      type: String,
      required: true
    },
    selected: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      playingAudio: false,
      showAudioOptions: false
    };
  },

  methods: {
    triggerPlayAudio($event, audio) {
      this.showAudioOptions = true;

      audio.active = true;
    },
    endedAudio({ audio }) {
      this.word.audios[this.word.audios.indexOf(audio)].active = false;
    }
  },

  watch: {
    selected(newValue, oldValue) {
      if (newValue === false) {
        this.showAudioOptions = false;
      }
    }
  },

  beforeMount() {
    for (let audio of this.word.audios) {
      this.$set(audio, "active", false);
    }
  }
};
</script>
