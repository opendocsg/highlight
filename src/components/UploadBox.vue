<template>
  <div id="dropbox" style="display: flex; justify-content: center">
    <div v-if="rawText === ''" class="dropbox">
      Drag and drop a txt file...
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      fileTitle: '',
      processedText: [],
      rawText: '',
    }
  },
  mounted() {
    this.$root.$on('fileUploaded', (fileTitle, text) => {
      this.fileTitle = fileTitle
      this.rawText = text
    })
    let dropbox = document.getElementById("dropbox");
    dropbox.addEventListener("dragenter", this.dragenter, false);
    dropbox.addEventListener("dragover", this.dragover, false);
    dropbox.addEventListener("drop", this.drop, false);
  },
  watch: {
    rawText () {
      if (this.rawText !== '') {
        this.processedText = this.rawText.split('\n')
      }
    }
  },
  methods: {
    dragenter(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    dragover(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    drop(e) {
      e.stopPropagation();
      e.preventDefault();

      const dt = e.dataTransfer;
      const file = dt.files[0];
      // TODO: Check file extension
      this.fileTitle = file.name
      let reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        this.rawText = reader.result
      }
    }
  }
}
</script>

<style>
  .dropbox {
    align-self: center;
    background-color: #EBEBEB;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 5px dashed #C4C4C4;
    border-radius: 25px;
    width: 650px;
    height: 450px;
    margin-top: 100px;
  }
  .file-text {
    text-align: left;
  }
  .file-title {
    font-size: 24px;
    line-height: 33px;
    margin-top: 10px;
  }
  .main-highlight-window {
    margin-top: 20px;
  }
</style>
