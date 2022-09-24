import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

const threeDotCss = css`
/*!
* three-dots - v0.2.3
* CSS loading animations made with single element
* https://nzbin.github.io/three-dots/
*
* Copyright (c) 2018 nzbin
* Released under MIT License
*/
@charset "UTF-8";
/**
* ==============================================
* Dot Elastic
* ==============================================
*/
.dot-elastic {
 position: relative;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 -webkit-animation: dot-elastic 1s infinite linear;
 animation: dot-elastic 1s infinite linear;
}

.dot-elastic::before, .dot-elastic::after {
 content: '';
 display: inline-block;
 position: absolute;
 top: 0;
}

.dot-elastic::before {
 left: -15px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 -webkit-animation: dot-elastic-before 1s infinite linear;
 animation: dot-elastic-before 1s infinite linear;
}

.dot-elastic::after {
 left: 15px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 -webkit-animation: dot-elastic-after 1s infinite linear;
 animation: dot-elastic-after 1s infinite linear;
}

@-webkit-keyframes dot-elastic-before {
 0% {
   transform: scale(1, 1);
 }
 25% {
   transform: scale(1, 1.5);
 }
 50% {
   transform: scale(1, 0.67);
 }
 75% {
   transform: scale(1, 1);
 }
 100% {
   transform: scale(1, 1);
 }
}

@keyframes dot-elastic-before {
 0% {
   transform: scale(1, 1);
 }
 25% {
   transform: scale(1, 1.5);
 }
 50% {
   transform: scale(1, 0.67);
 }
 75% {
   transform: scale(1, 1);
 }
 100% {
   transform: scale(1, 1);
 }
}

@-webkit-keyframes dot-elastic {
 0% {
   transform: scale(1, 1);
 }
 25% {
   transform: scale(1, 1);
 }
 50% {
   transform: scale(1, 1.5);
 }
 75% {
   transform: scale(1, 1);
 }
 100% {
   transform: scale(1, 1);
 }
}

@keyframes dot-elastic {
 0% {
   transform: scale(1, 1);
 }
 25% {
   transform: scale(1, 1);
 }
 50% {
   transform: scale(1, 1.5);
 }
 75% {
   transform: scale(1, 1);
 }
 100% {
   transform: scale(1, 1);
 }
}

@-webkit-keyframes dot-elastic-after {
 0% {
   transform: scale(1, 1);
 }
 25% {
   transform: scale(1, 1);
 }
 50% {
   transform: scale(1, 0.67);
 }
 75% {
   transform: scale(1, 1.5);
 }
 100% {
   transform: scale(1, 1);
 }
}

@keyframes dot-elastic-after {
 0% {
   transform: scale(1, 1);
 }
 25% {
   transform: scale(1, 1);
 }
 50% {
   transform: scale(1, 0.67);
 }
 75% {
   transform: scale(1, 1.5);
 }
 100% {
   transform: scale(1, 1);
 }
}

/**
* ==============================================
* Dot Pulse
* ==============================================
*/
.dot-pulse {
 position: relative;
 left: -9999px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 box-shadow: 9999px 0 0 -5px;
 -webkit-animation: dot-pulse 1.5s infinite linear;
 animation: dot-pulse 1.5s infinite linear;
 -webkit-animation-delay: .25s;
 animation-delay: .25s;
}

.dot-pulse::before, .dot-pulse::after {
 content: "";
 display: inline-block;
 position: absolute;
 top: 0;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
}

.dot-pulse::before {
 box-shadow: 9984px 0 0 -5px;
 -webkit-animation: dot-pulse-before 1.5s infinite linear;
 animation: dot-pulse-before 1.5s infinite linear;
 -webkit-animation-delay: 0s;
 animation-delay: 0s;
}

.dot-pulse::after {
 box-shadow: 10014px 0 0 -5px;
 -webkit-animation: dot-pulse-after 1.5s infinite linear;
 animation: dot-pulse-after 1.5s infinite linear;
 -webkit-animation-delay: .5s;
 animation-delay: .5s;
}

@-webkit-keyframes dot-pulse-before {
 0% {
   box-shadow: 9984px 0 0 -5px;
 }
 30% {
   box-shadow: 9984px 0 0 2px;
 }
 60%,
 100% {
   box-shadow: 9984px 0 0 -5px;
 }
}

@keyframes dot-pulse-before {
 0% {
   box-shadow: 9984px 0 0 -5px;
 }
 30% {
   box-shadow: 9984px 0 0 2px;
 }
 60%,
 100% {
   box-shadow: 9984px 0 0 -5px;
 }
}

@-webkit-keyframes dot-pulse {
 0% {
   box-shadow: 9999px 0 0 -5px;
 }
 30% {
   box-shadow: 9999px 0 0 2px;
 }
 60%,
 100% {
   box-shadow: 9999px 0 0 -5px;
 }
}

@keyframes dot-pulse {
 0% {
   box-shadow: 9999px 0 0 -5px;
 }
 30% {
   box-shadow: 9999px 0 0 2px;
 }
 60%,
 100% {
   box-shadow: 9999px 0 0 -5px;
 }
}

@-webkit-keyframes dot-pulse-after {
 0% {
   box-shadow: 10014px 0 0 -5px;
 }
 30% {
   box-shadow: 10014px 0 0 2px;
 }
 60%,
 100% {
   box-shadow: 10014px 0 0 -5px;
 }
}

@keyframes dot-pulse-after {
 0% {
   box-shadow: 10014px 0 0 -5px;
 }
 30% {
   box-shadow: 10014px 0 0 2px;
 }
 60%,
 100% {
   box-shadow: 10014px 0 0 -5px;
 }
}

/**
* ==============================================
* Dot Flashing
* ==============================================
*/
.dot-flashing {
 position: relative;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 -webkit-animation: dot-flashing 1s infinite linear alternate;
 animation: dot-flashing 1s infinite linear alternate;
 -webkit-animation-delay: .5s;
 animation-delay: .5s;
}

.dot-flashing::before, .dot-flashing::after {
 content: '';
 display: inline-block;
 position: absolute;
 top: 0;
}

.dot-flashing::before {
 left: -15px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 -webkit-animation: dot-flashing 1s infinite alternate;
 animation: dot-flashing 1s infinite alternate;
 -webkit-animation-delay: 0s;
 animation-delay: 0s;
}

.dot-flashing::after {
 left: 15px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 -webkit-animation: dot-flashing 1s infinite alternate;
 animation: dot-flashing 1s infinite alternate;
 -webkit-animation-delay: 1s;
 animation-delay: 1s;
}

@-webkit-keyframes dot-flashing {
 0% {
   background-color: #9880ff;
 }
 50%,
 100% {
   background-color: #ebe6ff;
 }
}

@keyframes dot-flashing {
 0% {
   background-color: #9880ff;
 }
 50%,
 100% {
   background-color: #ebe6ff;
 }
}

/**
* ==============================================
* Dot Collision
* ==============================================
*/
.dot-collision {
 position: relative;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
}

.dot-collision::before, .dot-collision::after {
 content: '';
 display: inline-block;
 position: absolute;
 top: 0;
}

.dot-collision::before {
 left: -10px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 -webkit-animation: dot-collision-before 2s infinite ease-in;
 animation: dot-collision-before 2s infinite ease-in;
}

.dot-collision::after {
 left: 10px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 -webkit-animation: dot-collision-after 2s infinite ease-in;
 animation: dot-collision-after 2s infinite ease-in;
 -webkit-animation-delay: 1s;
 animation-delay: 1s;
}

@-webkit-keyframes dot-collision-before {
 0%,
 50%,
 75%,
 100% {
   transform: translateX(0);
 }
 25% {
   transform: translateX(-15px);
 }
}

@keyframes dot-collision-before {
 0%,
 50%,
 75%,
 100% {
   transform: translateX(0);
 }
 25% {
   transform: translateX(-15px);
 }
}

@-webkit-keyframes dot-collision-after {
 0%,
 50%,
 75%,
 100% {
   transform: translateX(0);
 }
 25% {
   transform: translateX(15px);
 }
}

@keyframes dot-collision-after {
 0%,
 50%,
 75%,
 100% {
   transform: translateX(0);
 }
 25% {
   transform: translateX(15px);
 }
}

/**
* ==============================================
* Dot Revolution
* ==============================================
*/
.dot-revolution {
 position: relative;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
}

.dot-revolution::before, .dot-revolution::after {
 content: '';
 display: inline-block;
 position: absolute;
}

.dot-revolution::before {
 left: 0;
 top: -15px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 transform-origin: 5px 20px;
 -webkit-animation: dot-revolution 1.4s linear infinite;
 animation: dot-revolution 1.4s linear infinite;
}

.dot-revolution::after {
 left: 0;
 top: -30px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 transform-origin: 5px 35px;
 -webkit-animation: dot-revolution 1s linear infinite;
 animation: dot-revolution 1s linear infinite;
}

@-webkit-keyframes dot-revolution {
 0% {
   transform: rotateZ(0deg) translate3d(0, 0, 0);
 }
 100% {
   transform: rotateZ(360deg) translate3d(0, 0, 0);
 }
}

@keyframes dot-revolution {
 0% {
   transform: rotateZ(0deg) translate3d(0, 0, 0);
 }
 100% {
   transform: rotateZ(360deg) translate3d(0, 0, 0);
 }
}

/**
* ==============================================
* Dot Carousel
* ==============================================
*/
.dot-carousel {
 position: relative;
 left: -9999px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
 -webkit-animation: dot-carousel 1.5s infinite linear;
 animation: dot-carousel 1.5s infinite linear;
}

@-webkit-keyframes dot-carousel {
 0% {
   box-shadow: 9984px 0 0 -1px #9880ff, 9999px 0 0 1px #9880ff, 10014px 0 0 -1px #9880ff;
 }
 50% {
   box-shadow: 10014px 0 0 -1px #9880ff, 9984px 0 0 -1px #9880ff, 9999px 0 0 1px #9880ff;
 }
 100% {
   box-shadow: 9999px 0 0 1px #9880ff, 10014px 0 0 -1px #9880ff, 9984px 0 0 -1px #9880ff;
 }
}

@keyframes dot-carousel {
 0% {
   box-shadow: 9984px 0 0 -1px #9880ff, 9999px 0 0 1px #9880ff, 10014px 0 0 -1px #9880ff;
 }
 50% {
   box-shadow: 10014px 0 0 -1px #9880ff, 9984px 0 0 -1px #9880ff, 9999px 0 0 1px #9880ff;
 }
 100% {
   box-shadow: 9999px 0 0 1px #9880ff, 10014px 0 0 -1px #9880ff, 9984px 0 0 -1px #9880ff;
 }
}

/**
* ==============================================
* Dot Typing
* ==============================================
*/
.dot-typing {
 position: relative;
 left: -9999px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
 -webkit-animation: dot-typing 1.5s infinite linear;
 animation: dot-typing 1.5s infinite linear;
}

@-webkit-keyframes dot-typing {
 0% {
   box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
 }
 16.667% {
   box-shadow: 9984px -10px 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
 }
 33.333% {
   box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
 }
 50% {
   box-shadow: 9984px 0 0 0 #9880ff, 9999px -10px 0 0 #9880ff, 10014px 0 0 0 #9880ff;
 }
 66.667% {
   box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
 }
 83.333% {
   box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px -10px 0 0 #9880ff;
 }
 100% {
   box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
 }
}

@keyframes dot-typing {
 0% {
   box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
 }
 16.667% {
   box-shadow: 9984px -10px 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
 }
 33.333% {
   box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
 }
 50% {
   box-shadow: 9984px 0 0 0 #9880ff, 9999px -10px 0 0 #9880ff, 10014px 0 0 0 #9880ff;
 }
 66.667% {
   box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
 }
 83.333% {
   box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px -10px 0 0 #9880ff;
 }
 100% {
   box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
 }
}

/**
* ==============================================
* Dot Windmill
* ==============================================
*/
.dot-windmill {
 position: relative;
 top: -10px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 transform-origin: 5px 15px;
 -webkit-animation: dot-windmill 2s infinite linear;
 animation: dot-windmill 2s infinite linear;
}

.dot-windmill::before, .dot-windmill::after {
 content: '';
 display: inline-block;
 position: absolute;
}

.dot-windmill::before {
 left: -8.66254px;
 top: 15px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
}

.dot-windmill::after {
 left: 8.66254px;
 top: 15px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
}

@-webkit-keyframes dot-windmill {
 0% {
   transform: rotateZ(0deg) translate3d(0, 0, 0);
 }
 100% {
   transform: rotateZ(720deg) translate3d(0, 0, 0);
 }
}

@keyframes dot-windmill {
 0% {
   transform: rotateZ(0deg) translate3d(0, 0, 0);
 }
 100% {
   transform: rotateZ(720deg) translate3d(0, 0, 0);
 }
}

/**
* ==============================================
* Dot Bricks
* ==============================================
*/
.dot-bricks {
 position: relative;
 top: 8px;
 left: -9999px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 box-shadow: 9991px -16px 0 0 #9880ff, 9991px 0 0 0 #9880ff, 10007px 0 0 0 #9880ff;
 -webkit-animation: dot-bricks 2s infinite ease;
 animation: dot-bricks 2s infinite ease;
}

@-webkit-keyframes dot-bricks {
 0% {
   box-shadow: 9991px -16px 0 0 #9880ff, 9991px 0 0 0 #9880ff, 10007px 0 0 0 #9880ff;
 }
 8.333% {
   box-shadow: 10007px -16px 0 0 #9880ff, 9991px 0 0 0 #9880ff, 10007px 0 0 0 #9880ff;
 }
 16.667% {
   box-shadow: 10007px -16px 0 0 #9880ff, 9991px -16px 0 0 #9880ff, 10007px 0 0 0 #9880ff;
 }
 25% {
   box-shadow: 10007px -16px 0 0 #9880ff, 9991px -16px 0 0 #9880ff, 9991px 0 0 0 #9880ff;
 }
 33.333% {
   box-shadow: 10007px 0 0 0 #9880ff, 9991px -16px 0 0 #9880ff, 9991px 0 0 0 #9880ff;
 }
 41.667% {
   box-shadow: 10007px 0 0 0 #9880ff, 10007px -16px 0 0 #9880ff, 9991px 0 0 0 #9880ff;
 }
 50% {
   box-shadow: 10007px 0 0 0 #9880ff, 10007px -16px 0 0 #9880ff, 9991px -16px 0 0 #9880ff;
 }
 58.333% {
   box-shadow: 9991px 0 0 0 #9880ff, 10007px -16px 0 0 #9880ff, 9991px -16px 0 0 #9880ff;
 }
 66.666% {
   box-shadow: 9991px 0 0 0 #9880ff, 10007px 0 0 0 #9880ff, 9991px -16px 0 0 #9880ff;
 }
 75% {
   box-shadow: 9991px 0 0 0 #9880ff, 10007px 0 0 0 #9880ff, 10007px -16px 0 0 #9880ff;
 }
 83.333% {
   box-shadow: 9991px -16px 0 0 #9880ff, 10007px 0 0 0 #9880ff, 10007px -16px 0 0 #9880ff;
 }
 91.667% {
   box-shadow: 9991px -16px 0 0 #9880ff, 9991px 0 0 0 #9880ff, 10007px -16px 0 0 #9880ff;
 }
 100% {
   box-shadow: 9991px -16px 0 0 #9880ff, 9991px 0 0 0 #9880ff, 10007px 0 0 0 #9880ff;
 }
}

@keyframes dot-bricks {
 0% {
   box-shadow: 9991px -16px 0 0 #9880ff, 9991px 0 0 0 #9880ff, 10007px 0 0 0 #9880ff;
 }
 8.333% {
   box-shadow: 10007px -16px 0 0 #9880ff, 9991px 0 0 0 #9880ff, 10007px 0 0 0 #9880ff;
 }
 16.667% {
   box-shadow: 10007px -16px 0 0 #9880ff, 9991px -16px 0 0 #9880ff, 10007px 0 0 0 #9880ff;
 }
 25% {
   box-shadow: 10007px -16px 0 0 #9880ff, 9991px -16px 0 0 #9880ff, 9991px 0 0 0 #9880ff;
 }
 33.333% {
   box-shadow: 10007px 0 0 0 #9880ff, 9991px -16px 0 0 #9880ff, 9991px 0 0 0 #9880ff;
 }
 41.667% {
   box-shadow: 10007px 0 0 0 #9880ff, 10007px -16px 0 0 #9880ff, 9991px 0 0 0 #9880ff;
 }
 50% {
   box-shadow: 10007px 0 0 0 #9880ff, 10007px -16px 0 0 #9880ff, 9991px -16px 0 0 #9880ff;
 }
 58.333% {
   box-shadow: 9991px 0 0 0 #9880ff, 10007px -16px 0 0 #9880ff, 9991px -16px 0 0 #9880ff;
 }
 66.666% {
   box-shadow: 9991px 0 0 0 #9880ff, 10007px 0 0 0 #9880ff, 9991px -16px 0 0 #9880ff;
 }
 75% {
   box-shadow: 9991px 0 0 0 #9880ff, 10007px 0 0 0 #9880ff, 10007px -16px 0 0 #9880ff;
 }
 83.333% {
   box-shadow: 9991px -16px 0 0 #9880ff, 10007px 0 0 0 #9880ff, 10007px -16px 0 0 #9880ff;
 }
 91.667% {
   box-shadow: 9991px -16px 0 0 #9880ff, 9991px 0 0 0 #9880ff, 10007px -16px 0 0 #9880ff;
 }
 100% {
   box-shadow: 9991px -16px 0 0 #9880ff, 9991px 0 0 0 #9880ff, 10007px 0 0 0 #9880ff;
 }
}

/**
* ==============================================
* Dot Floating
* ==============================================
*/
.dot-floating {
 position: relative;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 -webkit-animation: dot-floating 3s infinite cubic-bezier(0.15, 0.6, 0.9, 0.1);
 animation: dot-floating 3s infinite cubic-bezier(0.15, 0.6, 0.9, 0.1);
}

.dot-floating::before, .dot-floating::after {
 content: '';
 display: inline-block;
 position: absolute;
 top: 0;
}

.dot-floating::before {
 left: -12px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 -webkit-animation: dot-floating-before 3s infinite ease-in-out;
 animation: dot-floating-before 3s infinite ease-in-out;
}

.dot-floating::after {
 left: -24px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 -webkit-animation: dot-floating-after 3s infinite cubic-bezier(0.4, 0, 1, 1);
 animation: dot-floating-after 3s infinite cubic-bezier(0.4, 0, 1, 1);
}

@-webkit-keyframes dot-floating {
 0% {
   left: calc(-50% - 5px);
 }
 75% {
   left: calc(50% + 105px);
 }
 100% {
   left: calc(50% + 105px);
 }
}

@keyframes dot-floating {
 0% {
   left: calc(-50% - 5px);
 }
 75% {
   left: calc(50% + 105px);
 }
 100% {
   left: calc(50% + 105px);
 }
}

@-webkit-keyframes dot-floating-before {
 0% {
   left: -50px;
 }
 50% {
   left: -12px;
 }
 75% {
   left: -50px;
 }
 100% {
   left: -50px;
 }
}

@keyframes dot-floating-before {
 0% {
   left: -50px;
 }
 50% {
   left: -12px;
 }
 75% {
   left: -50px;
 }
 100% {
   left: -50px;
 }
}

@-webkit-keyframes dot-floating-after {
 0% {
   left: -100px;
 }
 50% {
   left: -24px;
 }
 75% {
   left: -100px;
 }
 100% {
   left: -100px;
 }
}

@keyframes dot-floating-after {
 0% {
   left: -100px;
 }
 50% {
   left: -24px;
 }
 75% {
   left: -100px;
 }
 100% {
   left: -100px;
 }
}

/**
* ==============================================
* Dot Fire
* ==============================================
*/
.dot-fire {
 position: relative;
 left: -9999px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 box-shadow: 9999px 22.5px 0 -5px #9880ff;
 -webkit-animation: dot-fire 1.5s infinite linear;
 animation: dot-fire 1.5s infinite linear;
 -webkit-animation-delay: -.85s;
 animation-delay: -.85s;
}

.dot-fire::before, .dot-fire::after {
 content: '';
 display: inline-block;
 position: absolute;
 top: 0;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
}

.dot-fire::before {
 box-shadow: 9999px 22.5px 0 -5px #9880ff;
 -webkit-animation: dot-fire 1.5s infinite linear;
 animation: dot-fire 1.5s infinite linear;
 -webkit-animation-delay: -1.85s;
 animation-delay: -1.85s;
}

.dot-fire::after {
 box-shadow: 9999px 22.5px 0 -5px #9880ff;
 -webkit-animation: dot-fire 1.5s infinite linear;
 animation: dot-fire 1.5s infinite linear;
 -webkit-animation-delay: -2.85s;
 animation-delay: -2.85s;
}

@-webkit-keyframes dot-fire {
 1% {
   box-shadow: 9999px 22.5px 0 -5px #9880ff;
 }
 50% {
   box-shadow: 9999px -5.625px 0 2px #9880ff;
 }
 100% {
   box-shadow: 9999px -22.5px 0 -5px #9880ff;
 }
}

@keyframes dot-fire {
 1% {
   box-shadow: 9999px 22.5px 0 -5px #9880ff;
 }
 50% {
   box-shadow: 9999px -5.625px 0 2px #9880ff;
 }
 100% {
   box-shadow: 9999px -22.5px 0 -5px #9880ff;
 }
}

/**
* ==============================================
* Dot Spin
* ==============================================
*/
.dot-spin {
 position: relative;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: transparent;
 color: transparent;
 box-shadow: 0 -18px 0 0 #9880ff, 12.72793px -12.72793px 0 0 #9880ff, 18px 0 0 0 #9880ff, 12.72793px 12.72793px 0 0 rgba(152, 128, 255, 0), 0 18px 0 0 rgba(152, 128, 255, 0), -12.72793px 12.72793px 0 0 rgba(152, 128, 255, 0), -18px 0 0 0 rgba(152, 128, 255, 0), -12.72793px -12.72793px 0 0 rgba(152, 128, 255, 0);
 -webkit-animation: dot-spin 1.5s infinite linear;
 animation: dot-spin 1.5s infinite linear;
}

@-webkit-keyframes dot-spin {
 0%,
 100% {
   box-shadow: 0 -18px 0 0 #9880ff, 12.72793px -12.72793px 0 0 #9880ff, 18px 0 0 0 #9880ff, 12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0);
 }
 12.5% {
   box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72793px -12.72793px 0 0 #9880ff, 18px 0 0 0 #9880ff, 12.72793px 12.72793px 0 0 #9880ff, 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0);
 }
 25% {
   box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 0 #9880ff, 12.72793px 12.72793px 0 0 #9880ff, 0 18px 0 0 #9880ff, -12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0);
 }
 37.5% {
   box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72793px 12.72793px 0 0 #9880ff, 0 18px 0 0 #9880ff, -12.72793px 12.72793px 0 0 #9880ff, -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0);
 }
 50% {
   box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 0 #9880ff, -12.72793px 12.72793px 0 0 #9880ff, -18px 0 0 0 #9880ff, -12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0);
 }
 62.5% {
   box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72793px 12.72793px 0 0 #9880ff, -18px 0 0 0 #9880ff, -12.72793px -12.72793px 0 0 #9880ff;
 }
 75% {
   box-shadow: 0 -18px 0 0 #9880ff, 12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 0 #9880ff, -12.72793px -12.72793px 0 0 #9880ff;
 }
 87.5% {
   box-shadow: 0 -18px 0 0 #9880ff, 12.72793px -12.72793px 0 0 #9880ff, 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72793px -12.72793px 0 0 #9880ff;
 }
}

@keyframes dot-spin {
 0%,
 100% {
   box-shadow: 0 -18px 0 0 #9880ff, 12.72793px -12.72793px 0 0 #9880ff, 18px 0 0 0 #9880ff, 12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0);
 }
 12.5% {
   box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72793px -12.72793px 0 0 #9880ff, 18px 0 0 0 #9880ff, 12.72793px 12.72793px 0 0 #9880ff, 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0);
 }
 25% {
   box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 0 #9880ff, 12.72793px 12.72793px 0 0 #9880ff, 0 18px 0 0 #9880ff, -12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0);
 }
 37.5% {
   box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72793px 12.72793px 0 0 #9880ff, 0 18px 0 0 #9880ff, -12.72793px 12.72793px 0 0 #9880ff, -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0);
 }
 50% {
   box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 0 #9880ff, -12.72793px 12.72793px 0 0 #9880ff, -18px 0 0 0 #9880ff, -12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0);
 }
 62.5% {
   box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72793px 12.72793px 0 0 #9880ff, -18px 0 0 0 #9880ff, -12.72793px -12.72793px 0 0 #9880ff;
 }
 75% {
   box-shadow: 0 -18px 0 0 #9880ff, 12.72793px -12.72793px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 0 #9880ff, -12.72793px -12.72793px 0 0 #9880ff;
 }
 87.5% {
   box-shadow: 0 -18px 0 0 #9880ff, 12.72793px -12.72793px 0 0 #9880ff, 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72793px 12.72793px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72793px -12.72793px 0 0 #9880ff;
 }
}

/**
* ==============================================
* Dot Falling
* ==============================================
*/
.dot-falling {
 position: relative;
 left: -9999px;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 box-shadow: 9999px 0 0 0 #9880ff;
 -webkit-animation: dot-falling 1s infinite linear;
 animation: dot-falling 1s infinite linear;
 -webkit-animation-delay: .1s;
 animation-delay: .1s;
}

.dot-falling::before, .dot-falling::after {
 content: '';
 display: inline-block;
 position: absolute;
 top: 0;
}

.dot-falling::before {
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 -webkit-animation: dot-falling-before 1s infinite linear;
 animation: dot-falling-before 1s infinite linear;
 -webkit-animation-delay: 0s;
 animation-delay: 0s;
}

.dot-falling::after {
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 -webkit-animation: dot-falling-after 1s infinite linear;
 animation: dot-falling-after 1s infinite linear;
 -webkit-animation-delay: .2s;
 animation-delay: .2s;
}

@-webkit-keyframes dot-falling {
 0% {
   box-shadow: 9999px -15px 0 0 rgba(152, 128, 255, 0);
 }
 25%,
 50%,
 75% {
   box-shadow: 9999px 0 0 0 #9880ff;
 }
 100% {
   box-shadow: 9999px 15px 0 0 rgba(152, 128, 255, 0);
 }
}

@keyframes dot-falling {
 0% {
   box-shadow: 9999px -15px 0 0 rgba(152, 128, 255, 0);
 }
 25%,
 50%,
 75% {
   box-shadow: 9999px 0 0 0 #9880ff;
 }
 100% {
   box-shadow: 9999px 15px 0 0 rgba(152, 128, 255, 0);
 }
}

@-webkit-keyframes dot-falling-before {
 0% {
   box-shadow: 9984px -15px 0 0 rgba(152, 128, 255, 0);
 }
 25%,
 50%,
 75% {
   box-shadow: 9984px 0 0 0 #9880ff;
 }
 100% {
   box-shadow: 9984px 15px 0 0 rgba(152, 128, 255, 0);
 }
}

@keyframes dot-falling-before {
 0% {
   box-shadow: 9984px -15px 0 0 rgba(152, 128, 255, 0);
 }
 25%,
 50%,
 75% {
   box-shadow: 9984px 0 0 0 #9880ff;
 }
 100% {
   box-shadow: 9984px 15px 0 0 rgba(152, 128, 255, 0);
 }
}

@-webkit-keyframes dot-falling-after {
 0% {
   box-shadow: 10014px -15px 0 0 rgba(152, 128, 255, 0);
 }
 25%,
 50%,
 75% {
   box-shadow: 10014px 0 0 0 #9880ff;
 }
 100% {
   box-shadow: 10014px 15px 0 0 rgba(152, 128, 255, 0);
 }
}

@keyframes dot-falling-after {
 0% {
   box-shadow: 10014px -15px 0 0 rgba(152, 128, 255, 0);
 }
 25%,
 50%,
 75% {
   box-shadow: 10014px 0 0 0 #9880ff;
 }
 100% {
   box-shadow: 10014px 15px 0 0 rgba(152, 128, 255, 0);
 }
}

/**
* ==============================================
* Dot Stretching
* ==============================================
*/
.dot-stretching {
 position: relative;
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 transform: scale(1.25, 1.25);
 -webkit-animation: dot-stretching 2s infinite ease-in;
 animation: dot-stretching 2s infinite ease-in;
}

.dot-stretching::before, .dot-stretching::after {
 content: '';
 display: inline-block;
 position: absolute;
 top: 0;
}

.dot-stretching::before {
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 -webkit-animation: dot-stretching-before 2s infinite ease-in;
 animation: dot-stretching-before 2s infinite ease-in;
}

.dot-stretching::after {
 width: 10px;
 height: 10px;
 border-radius: 5px;
 background-color: #9880ff;
 color: #9880ff;
 -webkit-animation: dot-stretching-after 2s infinite ease-in;
 animation: dot-stretching-after 2s infinite ease-in;
}

@-webkit-keyframes dot-stretching {
 0% {
   transform: scale(1.25, 1.25);
 }
 50%,
 60% {
   transform: scale(0.8, 0.8);
 }
 100% {
   transform: scale(1.25, 1.25);
 }
}

@keyframes dot-stretching {
 0% {
   transform: scale(1.25, 1.25);
 }
 50%,
 60% {
   transform: scale(0.8, 0.8);
 }
 100% {
   transform: scale(1.25, 1.25);
 }
}

@-webkit-keyframes dot-stretching-before {
 0% {
   transform: translate(0) scale(0.7, 0.7);
 }
 50%,
 60% {
   transform: translate(-20px) scale(1, 1);
 }
 100% {
   transform: translate(0) scale(0.7, 0.7);
 }
}

@keyframes dot-stretching-before {
 0% {
   transform: translate(0) scale(0.7, 0.7);
 }
 50%,
 60% {
   transform: translate(-20px) scale(1, 1);
 }
 100% {
   transform: translate(0) scale(0.7, 0.7);
 }
}

@-webkit-keyframes dot-stretching-after {
 0% {
   transform: translate(0) scale(0.7, 0.7);
 }
 50%,
 60% {
   transform: translate(20px) scale(1, 1);
 }
 100% {
   transform: translate(0) scale(0.7, 0.7);
 }
}

@keyframes dot-stretching-after {
 0% {
   transform: translate(0) scale(0.7, 0.7);
 }
 50%,
 60% {
   transform: translate(20px) scale(1, 1);
 }
 100% {
   transform: translate(0) scale(0.7, 0.7);
 }
}

/**
* ==============================================
* Experimental: Gooey Effect
* Dot Gathering
* ==============================================
*/
.dot-gathering {
 position: relative;
 width: 12px;
 height: 12px;
 border-radius: 6px;
 background-color: black;
 color: transparent;
 margin: -1px 0;
 filter: blur(2px);
}

.dot-gathering::before, .dot-gathering::after {
 content: '';
 display: inline-block;
 position: absolute;
 top: 0;
 left: -50px;
 width: 12px;
 height: 12px;
 border-radius: 6px;
 background-color: black;
 color: transparent;
 opacity: 0;
 filter: blur(2px);
 -webkit-animation: dot-gathering 2s infinite ease-in;
 animation: dot-gathering 2s infinite ease-in;
}

.dot-gathering::after {
 -webkit-animation-delay: .5s;
 animation-delay: .5s;
}

@-webkit-keyframes dot-gathering {
 0% {
   opacity: 0;
   transform: translateX(0);
 }
 35%,
 60% {
   opacity: 1;
   transform: translateX(50px);
 }
 100% {
   opacity: 0;
   transform: translateX(100px);
 }
}

@keyframes dot-gathering {
 0% {
   opacity: 0;
   transform: translateX(0);
 }
 35%,
 60% {
   opacity: 1;
   transform: translateX(50px);
 }
 100% {
   opacity: 0;
   transform: translateX(100px);
 }
}

/**
* ==============================================
* Experimental: Gooey Effect
* Dot Hourglass
* ==============================================
*/
.dot-hourglass {
 position: relative;
 top: -15px;
 width: 12px;
 height: 12px;
 border-radius: 6px;
 background-color: black;
 color: transparent;
 margin: -1px 0;
 filter: blur(2px);
 transform-origin: 5px 20px;
 -webkit-animation: dot-hourglass 2.4s infinite ease-in-out;
 animation: dot-hourglass 2.4s infinite ease-in-out;
 -webkit-animation-delay: .6s;
 animation-delay: .6s;
}

.dot-hourglass::before, .dot-hourglass::after {
 content: '';
 display: inline-block;
 position: absolute;
 top: 0;
 left: 0;
 width: 12px;
 height: 12px;
 border-radius: 6px;
 background-color: black;
 color: transparent;
 filter: blur(2px);
}

.dot-hourglass::before {
 top: 30px;
}

.dot-hourglass::after {
 -webkit-animation: dot-hourglass-after 2.4s infinite cubic-bezier(0.65, 0.05, 0.36, 1);
 animation: dot-hourglass-after 2.4s infinite cubic-bezier(0.65, 0.05, 0.36, 1);
}

@-webkit-keyframes dot-hourglass {
 0% {
   transform: rotateZ(0deg);
 }
 25% {
   transform: rotateZ(180deg);
 }
 50% {
   transform: rotateZ(180deg);
 }
 75% {
   transform: rotateZ(360deg);
 }
 100% {
   transform: rotateZ(360deg);
 }
}

@keyframes dot-hourglass {
 0% {
   transform: rotateZ(0deg);
 }
 25% {
   transform: rotateZ(180deg);
 }
 50% {
   transform: rotateZ(180deg);
 }
 75% {
   transform: rotateZ(360deg);
 }
 100% {
   transform: rotateZ(360deg);
 }
}

@-webkit-keyframes dot-hourglass-after {
 0% {
   transform: translateY(0);
 }
 25% {
   transform: translateY(30px);
 }
 50% {
   transform: translateY(30px);
 }
 75% {
   transform: translateY(0);
 }
 100% {
   transform: translateY(0);
 }
}

@keyframes dot-hourglass-after {
 0% {
   transform: translateY(0);
 }
 25% {
   transform: translateY(30px);
 }
 50% {
   transform: translateY(30px);
 }
 75% {
   transform: translateY(0);
 }
 100% {
   transform: translateY(0);
 }
}

/**
* ==============================================
* Experimental: Gooey Effect
* Dot Overtaking
* ==============================================
*/
.dot-overtaking {
 position: relative;
 width: 12px;
 height: 12px;
 border-radius: 6px;
 background-color: transparent;
 color: black;
 margin: -1px 0;
 box-shadow: 0 -20px 0 0;
 filter: blur(2px);
 -webkit-animation: dot-overtaking 2s infinite cubic-bezier(0.2, 0.6, 0.8, 0.2);
 animation: dot-overtaking 2s infinite cubic-bezier(0.2, 0.6, 0.8, 0.2);
}

.dot-overtaking::before, .dot-overtaking::after {
 content: '';
 display: inline-block;
 position: absolute;
 top: 0;
 left: 0;
 width: 12px;
 height: 12px;
 border-radius: 6px;
 background-color: transparent;
 color: black;
 box-shadow: 0 -20px 0 0;
 filter: blur(2px);
}

.dot-overtaking::before {
 -webkit-animation: dot-overtaking 2s infinite cubic-bezier(0.2, 0.6, 0.8, 0.2);
 animation: dot-overtaking 2s infinite cubic-bezier(0.2, 0.6, 0.8, 0.2);
 -webkit-animation-delay: .3s;
 animation-delay: .3s;
}

.dot-overtaking::after {
 -webkit-animation: dot-overtaking 1.5s infinite cubic-bezier(0.2, 0.6, 0.8, 0.2);
 animation: dot-overtaking 1.5s infinite cubic-bezier(0.2, 0.6, 0.8, 0.2);
 -webkit-animation-delay: .6s;
 animation-delay: .6s;
}

@-webkit-keyframes dot-overtaking {
 0% {
   transform: rotateZ(0deg);
 }
 100% {
   transform: rotateZ(360deg);
 }
}

@keyframes dot-overtaking {
 0% {
   transform: rotateZ(0deg);
 }
 100% {
   transform: rotateZ(360deg);
 }
}

/**
* ==============================================
* Experimental: Gooey Effect
* Dot Shuttle
* ==============================================
*/
.dot-shuttle {
 position: relative;
 left: -15px;
 width: 12px;
 height: 12px;
 border-radius: 6px;
 background-color: black;
 color: transparent;
 margin: -1px 0;
 filter: blur(2px);
}

.dot-shuttle::before, .dot-shuttle::after {
 content: '';
 display: inline-block;
 position: absolute;
 top: 0;
 width: 12px;
 height: 12px;
 border-radius: 6px;
 background-color: black;
 color: transparent;
 filter: blur(2px);
}

.dot-shuttle::before {
 left: 15px;
 -webkit-animation: dot-shuttle 2s infinite ease-out;
 animation: dot-shuttle 2s infinite ease-out;
}

.dot-shuttle::after {
 left: 30px;
}

@-webkit-keyframes dot-shuttle {
 0%,
 50%,
 100% {
   transform: translateX(0);
 }
 25% {
   transform: translateX(-45px);
 }
 75% {
   transform: translateX(45px);
 }
}

@keyframes dot-shuttle {
 0%,
 50%,
 100% {
   transform: translateX(0);
 }
 25% {
   transform: translateX(-45px);
 }
 75% {
   transform: translateX(45px);
 }
}

/**
* ==============================================
* Experimental: Emoji
* Dot Bouncing
* ==============================================
*/
.dot-bouncing {
 position: relative;
 height: 10px;
 font-size: 10px;
}

.dot-bouncing::before {
 content: '⚽🏀🏐';
 display: inline-block;
 position: relative;
 -webkit-animation: dot-bouncing 1s infinite;
 animation: dot-bouncing 1s infinite;
}

@-webkit-keyframes dot-bouncing {
 0% {
   top: -20px;
   -webkit-animation-timing-function: ease-in;
   animation-timing-function: ease-in;
 }
 34% {
   transform: scale(1, 1);
 }
 35% {
   top: 20px;
   -webkit-animation-timing-function: ease-out;
   animation-timing-function: ease-out;
   transform: scale(1.5, 0.5);
 }
 45% {
   transform: scale(1, 1);
 }
 90% {
   top: -20px;
 }
 100% {
   top: -20px;
 }
}

@keyframes dot-bouncing {
 0% {
   top: -20px;
   -webkit-animation-timing-function: ease-in;
   animation-timing-function: ease-in;
 }
 34% {
   transform: scale(1, 1);
 }
 35% {
   top: 20px;
   -webkit-animation-timing-function: ease-out;
   animation-timing-function: ease-out;
   transform: scale(1.5, 0.5);
 }
 45% {
   transform: scale(1, 1);
 }
 90% {
   top: -20px;
 }
 100% {
   top: -20px;
 }
}

/**
* ==============================================
* Experimental: Emoji
* Dot Rolling
* ==============================================
*/
.dot-rolling {
 position: relative;
 height: 10px;
 font-size: 10px;
}

.dot-rolling::before {
 content: '⚽';
 display: inline-block;
 position: relative;
 transform: translateX(-25px);
 -webkit-animation: dot-rolling 3s infinite;
 animation: dot-rolling 3s infinite;
}

@-webkit-keyframes dot-rolling {
 0% {
   content: '⚽';
   transform: translateX(-25px) rotateZ(0deg);
 }
 16.667% {
   content: '⚽';
   transform: translateX(25px) rotateZ(720deg);
 }
 33.333% {
   content: '⚽';
   transform: translateX(-25px) rotateZ(0deg);
 }
 34.333% {
   content: '🏀';
   transform: translateX(-25px) rotateZ(0deg);
 }
 50% {
   content: '🏀';
   transform: translateX(25px) rotateZ(720deg);
 }
 66.667% {
   content: '🏀';
   transform: translateX(-25px) rotateZ(0deg);
 }
 67.667% {
   content: '🏐';
   transform: translateX(-25px) rotateZ(0deg);
 }
 83.333% {
   content: '🏐';
   transform: translateX(25px) rotateZ(720deg);
 }
 100% {
   content: '🏐';
   transform: translateX(-25px) rotateZ(0deg);
 }
}

@keyframes dot-rolling {
 0% {
   content: '⚽';
   transform: translateX(-25px) rotateZ(0deg);
 }
 16.667% {
   content: '⚽';
   transform: translateX(25px) rotateZ(720deg);
 }
 33.333% {
   content: '⚽';
   transform: translateX(-25px) rotateZ(0deg);
 }
 34.333% {
   content: '🏀';
   transform: translateX(-25px) rotateZ(0deg);
 }
 50% {
   content: '🏀';
   transform: translateX(25px) rotateZ(720deg);
 }
 66.667% {
   content: '🏀';
   transform: translateX(-25px) rotateZ(0deg);
 }
 67.667% {
   content: '🏐';
   transform: translateX(-25px) rotateZ(0deg);
 }
 83.333% {
   content: '🏐';
   transform: translateX(25px) rotateZ(720deg);
 }
 100% {
   content: '🏐';
   transform: translateX(-25px) rotateZ(0deg);
 }
}

/*# sourceMappingURL=three-dots.css.map */
`;

export enum ThreeDotModes {
  'dot-elastic'='dot-elastic',
  'dot-pulse'='dot-pulse',
  'dot-flashing'='dot-flashing',
  'dot-collision'='dot-collision',
  'dot-revolution'='dot-revolution',
  'dot-carousel'='dot-carousel',
  'dot-typing'='dot-typing',
  'dot-windmill'='dot-windmill',
  'dot-bricks'='dot-bricks',
  'dot-floating'='dot-floating',
  'dot-fire'='dot-fire',
  'dot-spin'='dot-spin',
  'dot-falling'='dot-falling',
  'dot-stretching'='dot-stretching',
}

@customElement('three-dot')
class ThreeDot extends LitElement{
  @property()
  mode = ThreeDotModes['dot-elastic'];

  @property()
  width = 10;

  @property()
  height = 10;

  static styles = threeDotCss

  render() {
    // 15 : 10 = distance : this.width;
    const distance = 15 * this.width / 10;

    return html`
      <style>
        #custom, #custom::before, #custom::after {
          width:${this.width}px;
          height:${this.height}px;
        }
        #custom::before {
          left: -${distance}px;
        }
        #custom::after {
          left: ${distance}px
        }

      </style>
      <div id="custom" class=${this.mode}></div>
    `
  }
}