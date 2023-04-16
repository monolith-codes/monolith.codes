<template>
    <div class="WelcomeScreenContainer" id="WelcomeScreenContainer">
      <canvas  width="100vw" height="100vh" id="c"></canvas>
      <div class="logo">
          <img @mouseover="hoverMainIcon()" @mouseleave="resetMainIcon()" @click="CloseWelcomeScreen" id="logo" alt="logo" src="../assets/images/logo.png">
      </div>
    </div>
</template>
  
<script lang="ts">
    export default {
        name: 'WelcomeScreen',
        components: {
        },
        data() {
            return {
                iswelcomeclosed: false,
                closedMainScreen: false,
                columns: 0,
            }
        },
        unmounted() {
        },
        mounted() {
            this.iswelcomeclosed = false;
            let closedMainScreen = false;

            function hoverMainIcon() {
                console.log("MOUSE OVER");

                if(closedMainScreen == false) {
                    let mainicon = document.getElementById("logo") as HTMLElement;

                    mainicon.style.height = "50%";
                    

                    mainicon.style.cursor = "pointer";
                    mainicon.style.animation = "shake 0.5s cubic-bezier(1,-0.5,0,1.6)";
                    mainicon.style.animationIterationCount = "infinite";
                }
            }

            function resetMainIcon() {
                console.log("MOUSE OVER");

                if(closedMainScreen == false) {
                    let mainicon = document.getElementById("logo") as HTMLElement;


                    mainicon.style.height = "30%";

                    mainicon.style.cursor = "cursor";
                    mainicon.style.animation = "none";
                    mainicon.style.animationIterationCount = "unset";
                }
            }

            let c = document.getElementById("c") as HTMLCanvasElement;
            let ctx = c.getContext("2d") as CanvasRenderingContext2D;
            c.height = window.innerHeight;
            c.width = window.innerWidth;
            let font_size = 65;
            ctx.font = font_size + "px Dos";
            let matrix: string[] = "10".split("");
            let columns = c.width / font_size;
            const drops: number[] = [];
            let columncounter = 0;

            for(let i=0; i<columns; i++){
                drops[i] = 1; 
                columncounter++;
                ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
                ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
                ctx.fillStyle = "rgba(181,0,0,0.5)";
                ctx.font = font_size + "px Dos";
            }

            function draw(){  
                c = document.getElementById("c") as HTMLCanvasElement;
                ctx = c.getContext("2d") as CanvasRenderingContext2D;
                ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
                ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
                ctx.fillStyle = "rgba(181,0,0,0.5)";
                ctx.font = font_size + "px Dos";
                for(let i = 0; i < drops.length; i++)
                {
                    let text = matrix[Math.floor(Math.random()*matrix.length)];
                    ctx.fillText(text, i*font_size, drops[i]*font_size);
                    if(drops[i]*font_size > window.innerHeight && Math.random() > 0.925) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }
            }

            function resizer(){  
                let newcolumns = window.innerWidth/font_size;
                let addcolumns = newcolumns-columns
                for(let i=0; i<addcolumns; i++) {
                    columns = newcolumns
                    columncounter = columncounter+1
                    drops[columncounter] = 1; 
                }
            }

            window.addEventListener('resize',function(){
                var width  = window.innerWidth;
                var height = window.innerHeight;
                ctx.canvas.width  = width;
                ctx.canvas.height = height;
            },false);

            setInterval(draw, 55);
            setInterval(resizer, 1000);
        },
        watch: {
        },
        methods: {
            CloseWelcomeScreen: function() {
                if(this.iswelcomeclosed == false) {
                    this.iswelcomeclosed = true;
                    this.closedMainScreen = true;
                    setTimeout(() => {
                        let mainicon = document.getElementById("logo") as HTMLElement;
                        mainicon.style.cursor = "default";
                        mainicon.style.animation = "none";
                        mainicon.style.animationIterationCount = "unset";
                        mainicon.style.height = "100%";
                        setTimeout(() => {
                            mainicon.style.height = "150%";
                            mainicon.style.transform = "scaleX(8) scaleY(1.5) translateX(5%)";
                            setTimeout(() => {
                                (this.$parent as any).exitWelcomeScreen()
                            }, 100);
                        }, 1000);
                    }, 10);
                }
            },
            draw: function() {
                let c = document.getElementById("c") as HTMLCanvasElement;
                let ctx = c.getContext("2d") as CanvasRenderingContext2D;
                c.height = window.innerHeight;
                c.width = window.innerWidth;
                let font_size = 65;
                ctx.font = font_size + "px Dos";
                let matrix: string[] = "10".split("");
                this.columns = c.width / font_size;
                const drops: number[] = [];
                let columncounter = 0;
                c = document.getElementById("c") as HTMLCanvasElement;
                ctx = c.getContext("2d") as CanvasRenderingContext2D;
                ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
                ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
                ctx.fillStyle = "rgba(181,0,0,0.5)";
                ctx.font = font_size + "px Dos";
                for(let i = 0; i < drops.length; i++)
                {
                    let text = matrix[Math.floor(Math.random()*matrix.length)];
                    ctx.fillText(text, i*font_size, drops[i]*font_size);
                    if(drops[i]*font_size > window.innerHeight && Math.random() > 0.925) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }
            },
            resizer: function() {
                let c = document.getElementById("c") as HTMLCanvasElement;
                let ctx = c.getContext("2d") as CanvasRenderingContext2D;
                c.height = window.innerHeight;
                c.width = window.innerWidth;
                let font_size = 65;
                ctx.font = font_size + "px Dos";
                let matrix: string[] = "10".split("");
                this.columns = c.width / font_size;
                const drops: number[] = [];
                let columncounter = 0;
                let newcolumns = window.innerWidth/font_size;
                let addcolumns = newcolumns-this.columns
                for(let i=0; i<addcolumns; i++) {
                    this.columns = newcolumns
                    columncounter = columncounter+1
                    drops[columncounter] = 1; 
                }
            },
            hoverMainIcon: function() {
                if(this.closedMainScreen == false) {
                    let mainicon = document.getElementById("logo") as HTMLElement;
                    mainicon.style.height = "50%";
                    mainicon.style.cursor = "pointer";
                    mainicon.style.animation = "shake 0.5s cubic-bezier(1,-0.5,0,1.6)";
                    mainicon.style.animationIterationCount = "infinite";
                }
            },
            resetMainIcon: function() {
                if(this.closedMainScreen == false) {
                    let mainicon = document.getElementById("logo") as HTMLElement;
                    mainicon.style.height = "30%";
                    mainicon.style.cursor = "cursor";
                    mainicon.style.animation = "none";
                    mainicon.style.animationIterationCount = "unset";
                }
            },
        }
    }
</script>

<style scoped>
    .WelcomeScreenContainer {
        height: 100%;
        width: 100%;
    }

    *{
        margin: 0;
        padding: 0;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    body {background: black;}
    canvas {display:block;}
    .logo {
        position: absolute;
        top: 0px;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #logo {
        animation: none;
        animation-iteration-count: unset;
        transition: ease-in-out 0.3s;
        transform: scale(1.0);
    }
    .logo img {
        height: 30%;
    }
</style>