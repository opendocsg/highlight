<template>
  <div id="highlight-page">
    <h2 class="file-title">{{ title }}</h2>
    <br/>
    <div class="container-fluid main-highlight-window">
      <div class="row">
        <div class="col">
          Hello
        </div>
        <div class="col-8">
          <HighlightBox 
            v-bind:processedText="processedText" 
            v-bind:annotations="annotations" 
            @highlight="onHighlight">
          </HighlightBox>
        </div>
        <div class="col">
          <LabelsBox v-bind:labels="annotations"></LabelsBox>
        </div>
      </div>
    </div>
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

<style scoped>
#hightlight-page {
}

p {
  font-size: 1em;
}
</style>
