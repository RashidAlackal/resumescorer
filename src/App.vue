<template>
  <div id="app">
    <HeaderComponent />
    <HeroSection />
    <ResumeUpload @analyzeResume="handleAnalyze" v-if="uploadSection"/>
    <ResumeAnalysis
      v-if="resumeScore > 0"
      :score="resumeScore"
      :positive="positivePoints"
      :negative="negativePoints"
      @reset="resetAnalysis"
    />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import HeroSection from './components/HeroSection.vue';
import ResumeUpload from './components/ResumeUpload.vue';
import ResumeAnalysis from './components/ResumeAnalysis.vue';

export default {
  components: {
    HeaderComponent,
    HeroSection,
    ResumeUpload,
    ResumeAnalysis
  },
  data() {
    return {
      resumeScore: 0,
      positivePoints: [],
      negativePoints: [],
      uploadSection: true,
    };
  },
  methods: {
    handleAnalyze(result) {
      this.resumeScore = result.score;
      this.positivePoints = result.positivePoints;
      this.negativePoints = result.negativePoints;
      this.uploadSection = false
      // console.log(this.resumeScore)
    },
    handleUploadSectionStatus(status) {
      this.uploadSection = status;
    },
    resetAnalysis() {
      this.resumeScore = 0;
      this.positivePoints = [];
      this.negativePoints = [];
      this.uploadSection = true;
    },
  },
};
</script>

<style>
* {
  font-family: sans-serif;
}
body{
  margin: 0px;
}
</style>
