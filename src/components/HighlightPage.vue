<template>
  <div id="highlight-page">
    <div class="main-highlight-window">
      <h2 class="file-title">{{ document.title }}</h2>
      <br/>
      <HighlightBox 
        v-bind:processedText="document.processedText" 
        v-bind:annotations="annotations" 
        @highlight="onHighlight">
      </HighlightBox>
    </div>
    <LabelsBox v-bind:labels="annotations"></LabelsBox>
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
        processedText: ['The quick brown fox jumps over the lazy dog.', 'Yada mada gogo gaga']
      },
      annotations: []
    }
  },
  methods: {
    onHighlight(annotation) {
      /* eslint-disable */
      console.log('annotated ' + JSON.stringify(annotation))
      this.annotations.push(annotation)
    }
  }
}
</script>

<style>
#hightlight-page {
}
</style>
