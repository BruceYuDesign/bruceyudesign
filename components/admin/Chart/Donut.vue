<template>
    <ClientOnly>
        <ApexChart
            v-if=" series.length !== 0 && options.labels.length !== 0 "
            type="donut"
            :options=" options "
            :series=" series "
            v-bind=" $attrs "
            >
        </ApexChart>
    </ClientOnly>
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            chartTitle: {
                type: String,
                default: ''
            },
            chartLabels: {
                type: Array,
                require: true
            },
            chartSeries: {
                type: Array,
                require: true
            },
            chartColors: {
                type: Array,
                require: true
            }
        },
        watch: {
            chartLabels: {
                handler( newValue ) {
                    if( newValue.length > 0 ) {
                        this.options.labels = [ ...this.$props.chartLabels ]
                        this.series = [ ...this.$props.chartSeries ]
                    }
                }
            }
        },
        data() {
            return {
                series: [],
                options: {
                    title: {
                        text:  this.$props.chartTitle,
                        align: 'center',
                        style: {
                            color: '#64748b'
                        }
                    },
                    colors: this.$props.chartColors,
                    labels: [],
                    chart: {
                        type: 'donut',
                        stacked: true,
                        stackType: '100%',
                        toolbar: {
                            show: false
                        },
                        parentHeightOffset: 0,
                    },
                    dataLabels: {
                        formatter: value => {
                            return _round( value , 1 ) + "%"
                        },
                        style: {
                            fontSize: 12,
                        },
                        dropShadow: {
                            enabled: false,
                        }
                    },
                    plotOptions: {
                        pie: {
                            expandOnClick: false,
                            donut: {
                                size: '40%'
                            }
                        }
                    },
                    tooltip: {
                        custom: function({ series , seriesIndex , dataPointIndex , w }) {
                            return (
                                '<div style="padding: .5rem;">' +
                                    '<span style="color: #fff; font-size: 12px;">' +
                                        w.config.labels[ seriesIndex ] + '：' +
                                        series[ seriesIndex ] + '筆' +
                                    '</span>' +
                                '</div>'
                            )
                        }
                    },
                    legend: {
                        fontSize: 12,
                        fontWeight: 500,
                        markers: {
                            width: 12,
                            height: 12,
                        },
                        position: 'bottom'
                    }
                }
            }
        }
    }
</script>