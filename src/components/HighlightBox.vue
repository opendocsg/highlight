<template>
  <div ref="highlightBox" id="highlight-box">
    <div v-show="showMenu" class="menu" :style="{left: `${x}px`,top: `${y}px`}" @mousedown.prevent="">      
      <span class="label" @mousedown.prevent="handleAction('highlight')">Highlight</span>      
      <!-- You can add more buttons here -->    
    </div>    
    <!-- The insterted text should be displayed here -->    
    <p>The quick brown fox jumps over the lazy dog.</p>
    <p>The quick brown fox jumps over the lazy dog.</p>
    <p>The quick brown fox jumps over the lazy dog.</p>
  </div>
</template>

<script>
import Annotation from './Annotation'

export default {
  data() {
    return {
      x: 0,
      y: 0,
      showMenu: false,
      anchorOffset: -1,
      focusOffset: -1,
      lineNo: -1
    }
  },
  computed: {
    highlightableElem() {
      return this.$refs.highlightBox
    }
  },
  props: {
    annotations: {
      validator: function(annotationArr) {
        /* eslint-disable */
        console.log(annotationArr)
        return annotationArr.every(Annotation.validate)
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
      const { x, y, width } = selectionRange.getBoundingClientRect()    

      // If width === 0 (i.e. no selection), hide the menu    
      if (!width) {
        this.showMenu = false      
        return    
      }    

      // Finally, if the selection is valid,    
      // set the position of the menu element,    
      // record offsets and line number 
      // then, show the menu    
      this.x = x + (width / 2)    
      this.y = y + window.scrollY - 10    
      this.anchorOffset = selection.anchorOffset
      this.focusOffset = selection.focusOffset
      this.showMenu = true  
      this.lineNo = Array.prototype.indexOf.call(startNode.parentNode.children, startNode) - 1
    },
    handleAction(action) {
      this.$emit(action, Annotation.create(this.lineNo, this.anchorOffset, this.focusOffset, 'DEFAULT'))
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
