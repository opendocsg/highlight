<template>
  <div id="highlight-page">
    <p v-if="processedText === undefined">No document selected. Redirecting...</p>
    <h2 class="file-title">{{ title }}</h2>
    <br/>
    <div class="container-fluid main-highlight-window">
      <div class="row">
        <div class="col">
          In text finder here
        </div>
        <div class="col-8">
          <HighlightBox 
            v-bind:processedText="processedText" 
            v-bind:labels="labels" 
            @highlight="onHighlight">
          </HighlightBox>
        </div>
        <div class="col">
          <LabelsBox 
            v-bind:labels="labels"
            @newlabel="onNewLabelName"
          ></LabelsBox>
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
  mounted() {
    if (this.processedText === undefined) {
      this.$router.push('upload')
    }
  },
  props: {
    processedText: {
      validate: function(arr) {
        return arr.every(_.isString)
      },
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    onHighlight(annotation) {
      Label.addToArray(this.labels, annotation)
      console.log(this.labels[0].annotations[0])
      this.doHighlight()
    },
    doHighlight() {
      for (let label of this.labels) {
        let annotations = label.annotations
        for (let annotation of annotations) {
          let newNode = document.createElement('span')
          newNode.setAttribute("style", `background-color:${label.color};color:white;`)
          annotation.selRange.surroundContents(newNode)
        }
      }
    },
    onExport() {
      Annotation.exportArrayOfAnnotations(this.title, Label.getAnnotations(this.labels))
    },
    onNewLabelName(type) {
      Label.addLabelByTypeToArray(this.labels, type)
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
