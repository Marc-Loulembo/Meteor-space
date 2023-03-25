import * as THREE from './node_modules/three/build/three.module.js';

// je crée ma scène
const scene = new THREE.Scene();

// je crée mon objet qui representera le joueur
const obstacles = [];

const geometry = new THREE.SphereGeometry(1, 32, 16 );
const material = new THREE.MeshBasicMaterial( { 
    color: 0x00ff00
} );

const cube = new THREE.Mesh( geometry, material );
cube.force = .8
scene.add( cube );




function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)

    const playerPosition = cube.position

    obstacles.forEach( (obstacle)=>{
        //  obstacle.position.x += 0.1
        obstacle.position.y += -0.1
        // obstacle.position.y += 0.1
        if (Math.abs(playerPosition.x - obstacle.position.x) < 2 && Math.abs(playerPosition.y - obstacle.position.y) < 2 ) {
            console.log('perdu');
            window.location.replace('game_over.html')
        }
    })


}

function rend(){ 
    // renderer.render( scene, camera)

    document.addEventListener('keydown', (event)=>{
        
        if(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)){
            console.log(event.key);
            switch(event.key){

                case 'ArrowUp':
                    move(0, 1);
                    break;

                case 'ArrowDown':
                        move(0, -1);
                        break;

                case 'ArrowRight':
                    move(1, 0);
                    break;
                
                case 'ArrowLeft':
                    move(-1, 0);
                    break;
            }
        }
    });
}

rend();

const move = (x,y) =>{
    cube.position.x += x
    cube.position.y += y
}


// je place ma camera
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75,aspect,1,5000);
camera.position.setZ(18);

// le renderer

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

//  le rendu à afficher 
animate();
renderer.render( scene, camera );

// le score

let score=0;
setInterval(compte, 1000);

function compte() {
    
        score+=1;

    document.getElementById('compte').innerHTML = score;
}

compte();
console.log(score);

window.localStorage.setItem('token', compte);



function initializeObstacle() {
    
const obstacleGeometry = new THREE.IcosahedronGeometry();
const obstacleMaterial = new THREE.MeshNormalMaterial();
const x = Math.random()* 60 -40
const y = Math.random()* 30 -10
const z = Math.random()* 50 -10


const obstacle = new THREE.Mesh( obstacleGeometry, obstacleMaterial );
scene.add( obstacle );
obstacle.position.x = x;
obstacle.position.y = 15;
obstacle.position.z = window.length;


obstacles.push(obstacle)

// console.log(window.innerWidth, window.innerHeight);
}
initializeObstacle();

const maFonction = setInterval(()=>{
    initializeObstacle()
},Math.round(Math.random()*5000 -1200));


