<template>
  <div class="resume-upload">
    <div class="file-upload">
      <span>Upload Your Resume</span>
      <input type="file" @change="handleFileUpload" accept=".pdf, .docx" />
    </div>
    <div class="file-upload">
      <span>Or Paste Your Resume Contents</span>
      <textarea
        v-model="resumeContent"
        placeholder="Paste your resume contents here..."
      ></textarea>
      <button @click="startAnalysis" :disabled="!resumeContent || loading">
        Start Analyze
      </button>
    </div>

    <div v-if="analysisResult">
      <h2>Analysis Result</h2>
      <p>{{ analysisResult }}</p>
    </div>

    <div class="loading-overlay" v-if="loading">
      <LoadingSpinnerVue />
    </div>
  </div>
</template>


<script>
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";

GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js`;

import mammoth from "mammoth";
import LoadingSpinnerVue from "./LoadingSpinner.vue";

export default {
  components: {
    LoadingSpinnerVue,
  },
  data() {
    return {
      resumeContent: "",
      analysisResult: "",
      loading: false,
      uploadSection: true,
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const fileType = file.name.split(".").pop().toLowerCase();

      if (fileType === "pdf") {
        this.extractPdfContent(file);
      } else if (fileType === "docx") {
        this.extractDocxContent(file);
      } else {
        alert("Unsupported file type. Please upload a PDF or DOCX file.");
      }
    },

    async extractPdfContent(file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const typedarray = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let extractedText = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          extractedText +=
            textContent.items.map((item) => item.str).join(" ") + " ";
        }

        this.resumeContent = extractedText.trim();
      };
      reader.readAsArrayBuffer(file);
    },

    extractDocxContent(file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const result = await mammoth.extractRawText({ arrayBuffer });
        this.resumeContent = result.value.trim();
      };
      reader.readAsArrayBuffer(file);
    },

    async startAnalysis() {
      this.loading = true;
      const accessToken = "AIzaSyBnEWke_WbteNQisCY3g5w_vPRCIruNMDU";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${accessToken}`;
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `
                        Analyze the following resume content and provide a score out of 100. 
                        Also, list three positive points and two negative points about the resume. 
                        Respond in JSON format with the following structure:
                        {
                        "score": <score>,
                        "positive_points": ["Point 1", "Point 2", "Point 3"],
                        "negative_points": ["Point 1", "Point 2"]
                        }
                        Resume Content:
                        ${this.resumeContent}`,
                  },
                ],
              },
            ],
          }),
        });
        const data = await response.json();
        if (response.ok) {
          const cleanedResponse =
            data.candidates[0].content.parts[0].text.replace(/```json\n|\n```/g,"");
          const result = JSON.parse(cleanedResponse);
          // console.log("test", result);
          this.$emit("analyzeResume", {
            score: result.score,
            positivePoints: result.positive_points,
            negativePoints: result.negative_points,
          });
        } else {
          throw new Error(data.error.message);
        }
      } catch (error) {
        console.error("Error analyzing resume:", error);
        this.$emit("analysisError", error.message);
      } finally {
        this.uploadSection = false;
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped>
.resume-upload {
  padding: 48px 144px;
  gap: 15px;
  margin: auto;
  display: flex;
  flex-direction: column;
  position: relative;
}

.file-upload {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-upload input {
  border-radius: 5px;
  border: 1px solid #dee2e6;
}

textarea {
  height: 232px;
  border-radius: 6px;
  color: #6f6f70;
  padding: 10px;
  border: 1px solid #dee2e6;
  font-size: 16px;
}

button {
  display: block;
  margin: 10px 0;
  border-radius: 5px;
  background: #3bbdad;
  border: none;
  padding: 10px;
  color: #fff;
}

span {
  font-size: 16px;
  color: #5b5c5f;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

@media only screen and (min-width: 561px) and (max-width: 768px) {
  .resume-upload {
    padding: 48px 100px;
  }
  textarea{
    height: 140px;
  font-size: 14px;
  }
}

@media only screen and (max-width: 560px) {
  .resume-upload {
    padding: 48px 50px;
  }
  span{
  font-size: 14px;
  }
textarea {
  height: 140px;
  font-size: 12px;
}
}
</style>
