<template>
  <div id="highlight-page">
    <div class="main-highlight-window">
      <h2 class="file-title">{{ document.title }}</h2>
      <br/>
      <HighlightBox @highlight="onHighlight">
        <p>{{ document.text }}</p>
      </HighlightBox>
    </div>
    <LabelsBox v-bind:labels="labels"></LabelsBox>
  </div>
</template>

<script>
import HighlightBox from './HighlightBox'
import LabelsBox from './LabelsBox'

export default {
  components: {
    HighlightBox,
    LabelsBox
  },
  data() {
    return {
      document: {
        title: 'Hello',
        text: 'The quick brown fox jumps over the lazy dog.'
      },
      labels: []
    }
  },
  methods: {
    onHighlight(highlightedText) {
      // eslint-disable-next-line
      console.log('Highlighted ' + highlightedText)
    }
  }
}
</script>

<style>
#hightlight-page {
}
</style>
