const canvas=document.getElementById('canvas1');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;//to make sure canvas covers the entire browser window
canvas.height=window.innerHeight;
const particlesArray=[];
let hue=0;


// console.log(ctx);
window.addEventListener('resize',()=>{
    canvas.width=window.innerWidth;//to make sure canvas covers the entire browser window
canvas.height=window.innerHeight;

})
const mouse={
    // this object will just store mouse x and y coordinates so that they are globally availabe all around my program
    x: undefined,
    y: undefined

}
canvas.addEventListener('click',function(event){
  mouse.x=event.x;
  mouse.y=event.y;
//  drawCircle();
for(let i=0;i<10;i++)
particlesArray.push(new Particle());

})
canvas.addEventListener('mousemove',function(event){
    mouse.x=event.x;
  mouse.y=event.y;
    // drawCircle()
    
    for(let i=0;i<10;i++)
    particlesArray.push(new Particle());
    
})


class Particle{
    constructor(){
        // this.x=Math.random()*canvas.width;
        // this.y=Math.random()*canvas.height;
        this.x=mouse.x;

        this.y=mouse.y;
        this.size=Math.random()*15 + 1;
        this.speedX=Math.random()*3-1.5;
        this.speedY=Math.random()*3-1.5;
        this.color='hsl('+hue+',100%,50%)'

    }
    update(){
        this.x+=this.speedX;
        this.y+=this.speedY;
        if(this.size>0.2){
            this.size-=0.1;
        }

    }
    draw(){
        ctx.fillStyle=this.color;
        // ctx.strokeStyle='red'
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
        ctx.fill();

    }

}

 function handleParticle(){
    
    for(let i=0;i<particlesArray.length;i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        
        for( let j=i;j<particlesArray.length;j++){
            const dx=particlesArray[i].x-particlesArray[j].x;
            const dy=particlesArray[i].y-particlesArray[j].y;
            const dist=Math.sqrt(dx*dx+dy*dy);
            if(dist<100){
                ctx.beginPath();
                ctx.strokeStyle=particlesArray[i].color;
                ctx.lineWidth=0.2;
                
                ctx.moveTo(particlesArray[i].x,particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x,particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }

        }
        if(particlesArray[i].size<=0.3){
            particlesArray.splice(i,1);
            i--;
        }
    }

 }
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle='rgba(0,0,0,0.02)';
    // ctx.fillRect(0,0,canvas.width,canvas.height);
    handleParticle()
    hue+=6;
    requestAnimationFrame(animate);
}
animate();





