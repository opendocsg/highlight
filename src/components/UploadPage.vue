<template>
  <div class="upload-page">
    <div id="dropbox">
      <p>
        Drag and drop a text file
      </p>
    </div>
  </div>
</template>

<script>

export default {
  mounted() {
    let dropbox = document.getElementById("dropbox")
    dropbox.addEventListener("dragenter", this.dragenter, false)
    dropbox.addEventListener("dragover", this.dragover, false)
    dropbox.addEventListener("drop", this.drop, false)
  },
  beforeDestroy() {
    let dropbox = document.getElementById("dropbox")
    dropbox.removeEventListener("dragenter")
    dropbox.removeEventListener("dragover")
    dropbox.removeEventListener("drop")
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
      let reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        this.onSuccessUpload(file.name, reader.result)
      }
    },
    onSuccessUpload(title, rawText) {
      this.$router.push({
        name: 'highlightPage',
        params: {
          title: title,
          processedText: this.processText(rawText)
        }
      })
    },
    processText(text) {
      return text.split('\n')
    }
  }
}
</script>

<style>
.upload-page {
  display: flex; 
  align-items: center;
  justify-content: center;
}

#dropbox {
  background-color: #EBEBEB;
  display: flex; 
  align-items: center;
  justify-content: center;
  border: 5px dashed #C4C4C4;
  border-radius: 25px;
  width: 650px;
  height: 450px;
}
</style>
