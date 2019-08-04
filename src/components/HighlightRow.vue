<template>
  <p id="highlight-row" v-html="renderedRow">
    <!-- Outer tag must be P for this to work -->
  </p>
</template>

<script>

export default {
  data() {
    return {}
  },
  computed: {
    renderedRow: function() {
      if (this.annotation === null) {
        return this.row
      } else {
        return this.insertHighlight(this.row, this.annotation.beginOffset, this.annotation.endOffset)
        
      }
    }
  },
  methods: {
    insertHighlight(str, begin, end) {
      return `${str.substring(0, begin)}<span style="background-color:red; color:white;">${str.substring(begin, end)}</span>${str.substring(end, str.length)}`
    }
  },
  props: {
    row: {
      type: String
    },
    lineNum: {
      type: Number
    },
    annotation: Object // if null, means that this row is not annotated
  },
}
</script>

<style scoped>
#highlight-row {
  margin-bottom: 0.25em;
}

</style>
