<script setup lang="ts">
import { CustomPageMeta, NavigationTheme } from '~~/types'
import { ref } from 'vue'
const active = ref<number | null>(null) 
definePageMeta({
  title: '方向',
  layout: 'page',
  navigationOptions: {
    fixed: false,
    theme: NavigationTheme.NEGATIVE,
    bgColor: 'bg-primary'
  },
} as CustomPageMeta)

const directions = [
  {
    color: 'yellow',
    //image:'~/img/background.png',
    titleColor: 'text-yellow-600',
    icon: 'game',
    iconColor: 'bg-yellow-600',
    name: '游戏开发',
    desc: '在这个组里，你将学习如何运用引擎进行游戏开发。你可以学习游戏引擎开发/复刻自己心仪游戏，参加很多游戏设计比赛，制作独立游戏，去 BAT 大厂制作游戏。',
  },
  {
    color: 'blue',
     //image:'~/img/background.png',
    titleColor: 'text-blue-600',
    icon: 'web',
    iconColor: 'bg-blue-600',
    name: 'Web 开发',
    desc: 'Web 应用遍布于我们的生活当中，是目前火热的学习方向。在这里你可以跟随经验丰富的前辈们学习前后端开发，并有机会组成一个团队承接企业项目、比赛项目。',
  },
  {
    color: 'green',
    //image:'~/img/background.png',
    titleColor: 'text-green-600',
    icon: 'android',
    iconColor: 'bg-green-600',
    name: '移动开发',
    desc: '精通移动设备的应用开发，具有很强的实用性。在这里，你可以学到主流的移动开发技术并用来解决很多日常需求，快来一起开发你的专属应用，一起把技术装进口袋吧。',
  },
  {
    color: 'red',
    //image:'~/img/background.png',
    titleColor: 'text-red-600',
    icon: 'ai',
    iconColor: 'bg-red-600',
    name: '人工智能',
    desc: '学习自然语言处理(NLP)、计算机视觉(OpenCV，Object detection，Image segmentation，Matting)等方向。在这里有学长们引导你入门人工智能技术，动手实践人工智能demo。',
  },
]
</script>

<template>
  <div style="height: 1400px;">
    <div class="flex mb-4 text-white" style="height: 800px;">
      <div class="flex flex-col justify-center space-y-4">
        <h1 class="font-semibold text-shadow-md text-2xl">方向介绍</h1>
        <p class="text-shadow-sm">
          软件部内的学习方向都是当前的热门方向，但我们学习内容很自由，在软件部里你也可以学习到除这些方向之外的东西。在这里你可以得到相关方向学长学姐的细心指导，教会你如何学有所成~
        </p>
      </div>
      <img
        class="sm:block hidden aspect-[3/3]"
        src="~/assets/svg/discovery.svg"
        alt=""
        srcset=""
      />
    </div>
    <div class="shell" >
      <div class="content">
        <div
          v-for="(dir,i) in directions"
          :key="i"
          class="item"
          @mouseenter="active = i"
          @mouseleave="active = null"
        >
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="active !== null" class="info-panel">
        <h3>{{ directions[active].name }}</h3>
        <p>{{ directions[active].desc }}</p>
      </div>
    </transition>
  </div>
</template>
<style scoped lang="scss">
.shell{
  width: 300px;
  height: 300px;
  position: relative;
  perspective: 1000px;
  transform-origin:  center center;
   transform: translateX(200px) translateY(100px);
  .content{
    display: flex;
    width:100%;
    height: 100%;
    transform-origin: right right;
    transform-style: preserve-3d;
    animation: rotate 10s infinite linear;
    transition: 0.5s;
    .item{
        width: 100%;
        height: 100%;
        position: absolute;
        box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 20px;
        background-size: cover;
        border-radius: 6px;
        cursor: pointer;
        -webkit-box-reflect: below 25px -webkit-linear-gradient(transparent 50%,rgba(255,255,255,0.3));
         animation-play-state: paused;
    }
  }
}
.item:hover{
  filter: drop-shadow(0 0 2em white);
}
.item:nth-child(1) { 
  background-image: url('~/img/background.png');
   background-size:cover;
   transform: rotateY(0deg) translateZ(300px); 
  }
.item:nth-child(2) {
  background-image: url('~/img/background.png');
   background-size:cover;
    transform: rotateY(90deg) translateZ(300px); }
.item:nth-child(3) { 
  background-image: url('~/img/background.png');
  background-size:cover;
  transform: rotateY(180deg) translateZ(300px); 
}
.item:nth-child(4) { 
  background-image: url('~/img/background.png');
   background-size:cover;
  transform: rotateY(270deg) translateZ(300px); }
@keyframes rotate {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}
.content:hover {
        animation-play-state: paused;
}
.info-panel {
  margin-top: -200px;
  width: 500px;
  height: 600px;
  padding: 20px;
  background:#192B52;
  animation:sweep 1.2s ease-out infinite;
  color: #fff;
  border-radius: 8px;
  margin-left: 1000px;
  text-align: center;
  background-size: 200% 100%;
  p,h3{
    font-size: 30px;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    background: linear-gradient(90deg,#FFC0CB , #1E90FF, #00FFFF);
      background-size: 200% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: flow 3s linear infinite;
  }
}
@keyframes sweep{
  0%  {background-position:150% 0;}
  100%{background-position:-50% 0;}
}
@keyframes flow {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
/* 简单的淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>

