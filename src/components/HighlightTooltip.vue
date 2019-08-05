<template>
  <div id="highlight-tooltip" v-on:wheel.prevent="onWheelEvent">
    <span class="label" @mousedown.prevent="">{{ labelName }} </span>
    <span id="highlight-tooltip-badge" class="badge"
      :style="{'background-color': labelColor}"
    >&nbsp;&nbsp;</span>
  </div>
</template>

<script>
import _ from 'lodash'
import Label from './Label'

export default {
  data() {
    return {
      index: 0
    }
  },
  computed: {
    labelName: function() {
      if (this.labels.length <= 0) {
        return "No labels"
      }
      return this.labels[this.index].type
    },
    labelColor: function() {
      if (this.labels.length <= 0) {
        return '#000000'
      }
      return this.labels[this.index].color
    }
  },
  props: {
    labels: {
      validator: function(labelsArr) {
        return Label.validateArray(labelsArr)
      }
    },
  },
  methods: {
    onWheelEvent: _.debounce(function (e) {
      if (e.deltaY < 0) {
        this.index++
      } else {
        this.index--
      }
      if (this.index >= this.labels.length) {
        this.index = 0
      } else if (this.index < 0) {
        this.index = this.labels.length - 1
      }
    }, 50),
  }
}
</script>

<style scoped>

#highlight-tooltip-badge {
}
.highlight-tooltip .label {
  float:left;
}

.highlight-tooltip .badge {
  float:right;
}

.label {  
  color: #FFF;  
  cursor: pointer;
}
.label:hover {  
  color: #1199ff;
}
.label + .label {  
  margin-left: 10px;
}

</style>
