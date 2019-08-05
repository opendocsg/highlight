<template>
  <div id="labels-box">
    <LabelPill
      v-for="(label, index) in labels"
      v-bind:key="index"
      v-bind:label="label"
    ></LabelPill>
  </div>
</template>

<script>

import Label from './Label'
import LabelPill from './LabelPill'

export default {
  components: {
    LabelPill
  },
  props: {
    labels: {
      validate: function(labelsArr) {
        return Label.validateArray(labelsArr)
      }
    }
  },
}
</script>

<style>
#labels-box {
}
</style>
