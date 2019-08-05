<template>
  <p id="highlight-row" v-html="renderedRow">
    <!-- Outer tag must be P for this to work -->
    {{ renderedRow }}
  </p>
</template>

<script>

export default {
  data() {
    return {}
  },
  computed: {
    renderedRow: function() {
      return this.row
    }
  },
  methods: {
  },
  props: {
    row: {
      type: String,
      required: true
    },
    lineNum: {
      type: Number,
      required: true
    },
    labels: {
      type:Array,
      required: true
    }
  },
}
</script>

<style scoped>
#highlight-row {
  margin-bottom: 0.25em;
}

</style>
