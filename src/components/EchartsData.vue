<template>
           <div class="test-echarts" ref="myChart" style="width:100%;height:100%">

           </div>
</template>

<script>


import echarts from 'echarts'


export default {
    data(){
        return {
            myChart:{}
        }
    },
    props:["option"],

    methods:{
        drawLine:function(){
        this.$refs.myChart.style.width  = this.$refs.myChart.clientWidth+"px";
        this.$refs.myChart.style.height  = this.$refs.myChart.clientHeight+"px";
        this.myChart= echarts.init(this.$refs.myChart);
        this.myChart.setOption(this.option);
        },
    },
    beforeDestroy(){
        this.myChart.dispose();
    },
    mounted:function(){
        this.$nextTick(() => {
            this.drawLine();
        });
    }
}
</script>

<style lang="scss" scoped>

</style>