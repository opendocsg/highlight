<template>
  <div id="highlight-page">
    <p v-if="processedText === undefined">No document selected. Redirecting...</p>
    <h2 class="file-title">{{ title }}</h2>
    <br/>
    <div class="container-fluid main-highlight-window">
      <div class="row">
        <div class="col-1">
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
              @removelabel="onRemoveLabel"
            ></LabelsBox>
          </div>
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="col-4">
          <button type="button" class="btn btn-success btn-lg"
            @click="onExport">Export
          </button>
        </div>
      </div>
      <div class="row justify-content-end">
        &nbsp;&nbsp;
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
    },
    onExport() {
      console.log(Label.getAnnotations(this.labels))
      Annotation.exportArrayOfAnnotations(this.title, Label.getAnnotations(this.labels))
    },
    onNewLabelName(type) {
      Label.addLabelByTypeToArray(this.labels, type)
    },
    onRemoveLabel(type) {
      Label.removeLabelByTypeFromArray(this.labels, type)
    },
    onRemoveAnnotation() {
      Label.removeAnnotationByHighlightNodeFromArray(this.labels, node)
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
