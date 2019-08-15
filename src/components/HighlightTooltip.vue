<template>
  <div id="highlight-tooltip" class="menu" v-on:wheel.prevent="onWheelEvent">
    <span class="label" @mousedown.prevent="$emit('labelclick', getLabelType())">{{ getLabelType() }}&nbsp;&nbsp;</span>
    <span id="highlight-tooltip-badge" class="badge"
      :style="{'background-color': getLabelColor()}"
    >{{ getLabelNumber() }}</span>
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
  props: {
    labels: {
      validator: function(labelsArr) {
        return Label.validateArray(labelsArr)
      }
    },
  },
  methods: {
    getLabelType: function() {
      if (this.labels.length <= 0) {
        return "No labels"
      }
      return this.labels[this.index].type
    },
    getLabelColor: function() {
      if (this.labels.length <= 0) {
        return '#000000'
      }
      return this.labels[this.index].color
    },
    getLabelNumber: function() {
      if (this.labels.length <= 0) {
        return "_"
      }
      return this.labels[this.index].annotations.length.toString()

    },
    onWheelEvent: _.debounce(function (e) {
      if (e.deltaY < 0) {
        this.index++
      } else {
        this.index--
      }
      if (this.index >= this.labels.length || this.labels.length === 0) {
        this.index = 0
      } else if (this.index < 0) {
        this.index = this.labels.length - 1
      }
    }, 50),
  }
}
  //transform: translate(-50%, -100%);  
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

.menu {
  height: 50px;  
  min-width: 150px;
  max-width: 250px;
  padding: 5px 10px;  
  background: #333;  
  border-radius: 3px;  
  position: absolute;  
  top: 0;  
  left: 0;  
  transition: 0.2s all;  
  display: flex;  
  justify-content: center;  
  align-items: center;
}
.menu:after {  
  content: '';  
  position: absolute;  
  left: 50%;  
  bottom: -5px;  
  transform: translateX(-50%);  
  width: 0;  
  height: 0;  
  border-left: 6px solid transparent;  
  border-right: 6px solid transparent;  
  border-top: 6px solid #333;
}

</style>
