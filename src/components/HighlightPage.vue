<template>
  <div id="highlight-page">
    <h2 class="file-title">{{ title }}</h2>
    <br/>
    <div class="container-fluid main-highlight-window">
      <div class="row">
        <div class="col">
          Finder here
        </div>
        <div class="col-8">
          <HighlightBox 
            v-bind:processedText="processedText" 
            v-bind:annotations="Label.getAnnotations(this.labels)" 
            @highlight="onHighlight">
          </HighlightBox>
        </div>
        <div class="col">
          <LabelsBox v-bind:labels="annotations"></LabelsBox>
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="col-4">
          <button type="button" class="btn btn-success btn-lg"
            @click="onExport">Save
          </button>
          <button type="button" class="btn btn-danger btn-lg">Discard</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Annotation from './Annotation'
import Label from './Label'
import HighlightBox from './HighlightBox'
import LabelsBox from './LabelsBox'

export default {
  components: {
    HighlightBox,
    LabelsBox
  },
  data() {
    return {
      labels: []
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
      Label.addToArray(this.labels, annotation)
      console.log(this.labels)
    },
    onExport(e) {
      Annotation.exportArrayOfAnnotations(this.title, Label.getAnnotations(this.labels))
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
