<template>
  <div id="highlight-page">
    <div class="main-highlight-window">
      <h2 class="file-title">{{ title }}</h2>
      <br/>
      <HighlightBox 
        v-bind:processedText="processedText" 
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
import _ from 'lodash'

export default {
  components: {
    HighlightBox,
    LabelsBox
  },
  data() {
    return {
      annotations: []
    }
  },
  props: {
    processedText: {
      validate: function(arr) {
        return arr.every(_.isString)
      }
    },
    title: {
      type: String
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
