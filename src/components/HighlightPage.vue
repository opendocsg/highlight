<template>
  <div id="highlight-page">
    <div class="main-highlight-window">
      <div class="file-title">{{ document.title }}</div>
      <br/>
      <HighlightBox @highlight="onHighlight">
        <p>{{ document.text }}</p>
      </HighlightBox>
    </div>
  </div>
</template>

<script>
import HighlightBox from './HighlightBox'

export default {
  components: {
    HighlightBox
  },
  data() {
    return {
      document: {
        title: 'Hello',
        text: 'The quick brown fox jumps over the lazy dog.'
      },
      fragments: []
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
