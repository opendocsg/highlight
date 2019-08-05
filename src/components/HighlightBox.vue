<template>
  <div ref="highlightBox" id="highlight-box">
    <div v-show="showMenu" class="menu" :style="{left: `${x}px`,top: `${y}px`}" @mousedown.prevent="">      
      <span class="label" @mousedown.prevent="handleAction('highlight')">Highlight</span>      
      <!-- You can add more buttons here -->    
    </div>    
    <!-- The insterted text should be displayed here -->    
    <p 
      v-for="(line, index) in processedText" 
      v-bind:key="index"
      v-html="line"
    ></p>
  </div>
</template>

<script>
import _ from 'lodash'
import Annotation from './Annotation'
import Label from './Label'

export default {
  data() {
    return {
      x: 0,
      y: 0,
      showMenu: false,
      anchorOffset: -1,
      focusOffset: -1,
      line: -1,
      selectionRange: null
    }
  },
  computed: {
    highlightableElem() {
      return this.$refs.highlightBox
    }
  },
  props: {
    labels: {
      validator: function(labelsArr) {
        return Label.validateArray(labelsArr)
      }
    },
    processedText: {
      validator: function(stringArr) {
        return stringArr.every(_.isString)
      }
    }
  },
  mounted() {  
    window.addEventListener('mouseup', this.onMouseup)
  },
  beforeDestroy() {  
    window.removeEventListener('mouseup', this.onMouseup)
  },
  methods: {
    onMouseup() {
      const selection = window.getSelection()    
      if (selection.rangeCount < 1) {
        return
      }
      const selectionRange = selection.getRangeAt(0)    
      const startNode = selectionRange.startContainer.parentNode // startNode is the element that the selection starts in        
      const endNode = selectionRange.endContainer.parentNode  // endNode is the element that the selection ends in    

      // if the selected text is not part of the highlightableEl (i.e. <p>) OR    
      // if startNode !== endNode (i.e. the user selected multiple paragraphs)    
      // Then don't show the menu (this selection is invalid)    
      if (!startNode.parentNode.isSameNode(this.highlightableElem) || !startNode.isSameNode(endNode)) {      
        this.showMenu = false      
        return    
      }
      // Get the x, y, and width of the selection    
      const { top, right, width } = selectionRange.getBoundingClientRect()    

      // If width === 0 (i.e. no selection), hide the menu    
      if (!width) {
        this.showMenu = false      
        return    
      }    

      // Finally, if the selection is valid,    
      // set the position of the menu element,    
      // record offsets and line number 
      // then, show the menu    
      this.x = right + window.scrollX - 230
      this.y = top + window.scrollY - 130
      this.anchorOffset = selection.anchorOffset
      this.focusOffset = selection.focusOffset
      this.showMenu = true  
      this.selectionRange = selectionRange
      this.line = Array.prototype.indexOf.call(startNode.parentNode.children, startNode) - 1
    },
    handleAction(action) {
      this.$emit(action, Annotation.create(this.line, this.anchorOffset, this.focusOffset, 'DEFAULT', this.selectionRange))
    },
  }
}
</script>

<style scoped>

#hightlight-box {
}

.menu {
  height: 30px;  
  padding: 5px 10px;  
  background: #333;  
  border-radius: 3px;  
  position: absolute;  
  top: 0;  
  left: 0;  
  transform: translate(-50%, -100%);  
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
