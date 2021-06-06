<template>
    <div class="index__wrap">
        <Tag :text="text" />
        <div class="main">
            <!-- absoulue -->
            <div class="timers">
                <p>{{ l }}</p>
                <p class="localDate">{{ localDate }}</p>
                <div class="tringle"></div>
            </div>

            <!-- relative -->
            <div class="left">

            </div>
            <div class="statistics">
                <div id="table"></div>
            </div>
        </div>
    </div>
</template>
<script>
import solarLunar from 'solarlunar'
import * as echarts from 'echarts'

console.dir(echarts)

const year = new Date().getFullYear(),
    month =
        new Date().getMonth() + 1 - 0 < 10
            ? '0' + (new Date().getMonth() + 1)
            : new Date().getMonth() + 1,
    day =
        new Date().getDate() - 0 < 10
            ? '0' + new Date().getDate()
            : new Date().getDate()

const getToLocalDateString = () => {
    return (
        year + '-' + month + '-' + day + ' ' + new Date().toLocaleTimeString()
    )
}

export default {
    name: 'Index',
    data() {
        return {
            text: '我喜欢你啊~~~',
            output: {},
            l: '',
            year,
            month,
            day,
            localDate: getToLocalDateString(),
        }
    },
    created() {
        this.initDate()
        this.initEcharts()
    },
    methods: {
        initDate() {
            this.output = solarLunar.solar2lunar(
                this.year,
                this.month,
                this.day
            )
            this.l =
                this.output.gzYear +
                '年' +
                this.output.monthCn +
                this.output.dayCn

            setInterval(() => {
                this.localDate = getToLocalDateString()
            }, 1000)
        },

        initEcharts() {
            this.$nextTick(() => {
                const Echarts = echarts.init(document.getElementById('table'))
                const options = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)',
                    },
                    series: [
                        {
                            name: '面积模式',
                            type: 'pie',
                            label: {
                                show: false,
                            },
                            radius: [20, 180],
                            center: ['50%', '50%'],
                            roseType: 'area',
                            itemStyle: {
                                borderRadius: 10,
                                borderWidth: 3,
                                borderColor: '#fff'
                            },
                            data: [
                                { value: 30, name: 'rose 1' },
                                { value: 28, name: 'rose 2' },
                                { value: 26, name: 'rose 3' },
                                { value: 24, name: 'rose 4' },
                                { value: 22, name: 'rose 5' },
                                { value: 20, name: 'rose 6' },
                                { value: 18, name: 'rose 7' },
                                { value: 16, name: 'rose 8' },
                            ],
                        },
                    ],
                }

                setTimeout(() => {
                    Echarts.setOption(options)
                }, 300)
            })
        },

        fetchData() {},
    },
}
</script>
<style lang= "scss" scoped>
@import './scss/index.scss';
</style>
