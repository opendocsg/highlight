<template>
  <div id="labels-box" class="position-fixed d-flex flex-column">
    <label for="basic-url"><b>Add New Label</b></label>
    <div class="input-group mb-3">
      <input 
        type="text" 
        class="form-control" 
        v-model="newLabelName"
        placeholder="Enter new label here"
        @keyup.enter="onNewLabel"
        >
        <br/>
    </div>
    <div style="color:red;">{{ error }}</div>
    <div id="labels-pills">
      <LabelPill
        v-for="(label, index) in labels"
        v-bind:key="index"
        v-bind:label="label"
        @removelabel="onRemoveLabel"
      ></LabelPill>
    </div>
  </div>
</template>

<script>

import Annotation from './Annotation'
import Label from './Label'
import LabelPill from './LabelPill'

export default {
  components: {
    LabelPill
  },
  data() {
    return {
      newLabelName: '',
      error: ''
    }
  },
  props: {
    labels: {
      validate: function(labelsArr) {
        return Label.validateArray(labelsArr)
      }
    }
  },
  methods: {
    onNewLabel() {
      if (Label.numLabels >= Label.MAX_NUM_LABELS) {
        this.error = `The maximum of ${Label.MAX_NUM_LABELS} has been reached.`
        return
      }
      if (!(0 < this.newLabelName.length && this.newLabelName.length <= Annotation.MAX_TYPE_LEN)) {
        this.error = `Length of label name must be between 1 and ${Annotation.MAX_TYPE_LEN}`
        return
      }
      if (/\s/.test(this.newLabelName)) {
        this.error = 'Label name cannot contain spaces'
        return
      }
      const processedLabelName = this.newLabelName.toUpperCase()
      if (Label.containsType(this.labels, processedLabelName)) {
        this.error = `Label ${processedLabelName} already exists`
        return
      }
      this.$emit('newlabel', processedLabelName)
      this.error = ''
      this.newLabelName = ''
    },
    onRemoveLabel(type) {
      this.$emit('removelabel', type)
    }
  }
}
</script>

<style scoped>
#labels-box {
  width: 18%;
}

#labels-pills {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

</style>
