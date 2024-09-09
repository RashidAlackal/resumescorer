<template>
  <div class="resume-analysis">
    <h2>Your Resume Score</h2>
    <div class="donut-chart">
      <canvas ref="chart" style="height: 200px; max-width: 200px;"></canvas>
    </div>
    <div class="feedback">
      <div class="positive">
        <h4 class="positive-head">Positive Points</h4>
        <ul>
          <li v-for="point in positive" :key="point">{{ point }}</li>
        </ul>
      </div>
      <div class="negative">
        <h4 class="negative-head">Negative Points</h4>
        <ul>
          <li v-for="point in negative" :key="point">{{ point }}</li>
        </ul>
      </div>
    </div>
    <button @click="releaseData">Analyze Another Resume</button>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  props: {
    score: Number,
    positive: Array,
    negative: Array,
  },
  data: () => {
    return {
      pieChartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            borderColor: ["#ffffff", "#ffffff", "#ffffff"],
            borderWidth: 0,
            data: [],
            cutout: "50%",
          },
        ],
      },
      pieChartOptions: {
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltip: {
          enabled: false,
        },
        plugins: {
          legend: {
            position: "left",
            labels: {
              render: "percentage",
              font: {
                size: 13,
                family: "Muli",
                style: "italic",
              },
              color: "black",
            },
          },
          tooltip: {
            bodyFont: {
              size: 11,
              family: "Muli",
              weight: "normal",
            },
            bodyColor: "#fff",
          },
        },
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
          },
        },
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.pieChartData.datasets[0].data = [];
      this.pieChartData.datasets[0].backgroundColor = [];
      this.pieChartData.labels = [];
      this.getChartData();
    },
    getChartData() {
      const totalScore = 100;
      // console.log(this.score)
      this.pieChartData.datasets[0].data.push(parseInt(this.score));
      this.pieChartData.datasets[0].data.push(
        totalScore - parseInt(this.score)
      );

      this.pieChartData.datasets[0].backgroundColor.push("#3bbdad");
      this.pieChartData.datasets[0].backgroundColor.push("#E9ECEF");
      this.destroyChart();
      this.renderChart();
    },
    renderChart() {
      const ctx = this.$refs.chart.getContext("2d");
      this.chartInstance = new Chart(ctx, {
        type: "doughnut",
        data: this.pieChartData,
        options: this.pieChartOptions,
      });
    },
    destroyChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
    },
    releaseData() {
      this.$emit("reset");
    },
  },
};
</script>

<style scoped>
.resume-analysis {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  margin-bottom: 40px;
}
.donut-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.feedback {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 0 20px;
  width: 80%;
  gap: 32px;
}
h2 {
  font-size: 48px;
  letter-spacing: -0.6px;
  font-weight: 300;
  text-align: left;
  margin: 0px;
  color: #21252a;
}
.positive,
.negative {
  width: 40%;
  text-align: left;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
  text-align: center;
  padding-bottom: 25px;
}
h4 {
  font-size: 20px;
  letter-spacing: -0.2px;
  font-weight: 300;
  text-align: center;
  margin: 20px 0 15px 0px;
}
.positive-head {
  color: #228b5a;
}
.negative-head {
  color: #dc3644;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 4px 15px;
  border-radius: 5px;
  color: #21242a;
}
button {
  font-size: 16px;
  color: #3bbdad;
  background-color: #fff;
  border: 1px solid #3bbdad;
  border-radius: 5px;
  margin-top: 40px;
  padding: 10px 20px;
  cursor: pointer;
}
button:hover {
  background-color: #3bbdad;
  color: #fff;
}
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  h2 {
    font-size: 30px;
  }
}

@media only screen and (min-width: 561px) and (max-width: 768px) {
  h2 {
    font-size: 24px;
  }
}
@media only screen and (min-width: 380px) and (max-width: 560px) {
  .positive,
  .negative {
    width: 80%;
  }
  h2 {
    font-size: 18px;
  }
  .feedback {
    align-items: center;
    flex-direction: column;
  }
  h4 {
    font-size: 14px;
  }
  li {
    font-size: 10px;
  }
}
@media only screen and (max-width: 380px) {
  .positive,
  .negative {
    width: 90%;
  }
}
</style>
