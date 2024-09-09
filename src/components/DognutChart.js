import { Doughnut } from "vue-chartjs";

const { reactiveProp } = mixins

export default {
    extends: Pie,
    mixins: [reactiveProp],
    props: ['options'],
    data() {
        return {
            updating : false
        };
    },
    mounted () {
        this.initChart();
    },
    methods: {
        initChart() {
            console.log(this.$refs.canvas.getContext('2d'))
            this.renderChart(this.chartData, this.options)
        }
    },
    watch: {
        chartData: {
            handler() {
                if (!this.updating && this.$data && this.$data._chart) {
                    this.updating = true
                    this.$data._chart.update()
                    this.$nextTick(() => this.updating = false)
                }
            },
            deep: true,
        },
    }
}