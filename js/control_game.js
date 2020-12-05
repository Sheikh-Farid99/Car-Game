/* --------------select Class---------------*/
const score = document.querySelector('.score');
const startScreen = document.querySelector('.start-game');
const gameArea = document.querySelector('.game-screan');
const btn = document.querySelector('button');
const restart_game = document.querySelector('.restart-game');
const retry_game = document.querySelector('.btn');
const scr = document.querySelector('.scr');
/* --------------select Class end---------------*/

/* --------------Score hide---------------*/
score.classList.add('hide');
/* --------------Score hide end---------------*/

/* --------------create playe obj---------------*/
let player = { speed:3, score: 0};
/* --------------create playe obj end---------------*/

/* --------------Add click event---------------*/
btn.addEventListener('click',start);
retry_game.addEventListener('click',start);
/* --------------Add click event end---------------*/

/* --------------Create key object---------------*/
let keys = {ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false};
/* --------------Create key object end---------------*/

/* --------------Create function arrow key move---------------*/
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
/* --------------Create function arrow key move end---------------*/

/* --------------define function---------------*/


function keyDown(e){
	e.preventDefault();
	keys[e.key]=true;
}

function keyUp(e){
	e.preventDefault();
	keys[e.key]=false;
}

/* --------------Arrow key un down  function define end---------------*/

/* --------------start Destroy my car Function ---------------*/

function dist_car(my_car,enemy_car){
	my_car_all_size = my_car.getBoundingClientRect();
	enemy_car_all_size = enemy_car.getBoundingClientRect();
	
	return !((my_car_all_size.top>enemy_car_all_size.bottom) || (my_car_all_size.bottom<enemy_car_all_size.top) || (my_car_all_size.right<enemy_car_all_size.left) || (my_car_all_size.left>enemy_car_all_size.right))
}
/* --------------End Destroy my car Function ---------------*/

/* --------------start run road Lines Function ---------------*/
function runlines(){
	let lines = document.querySelectorAll('.line');
	lines.forEach(function(value){
		if(value.y >=550){
			value.y -=570;
		}
		value.y += player.speed;
		value.style.top = value.y +"px";
	});
}
/* --------------end run road Lines Function ---------------*/

/* --------------start Enemy Car run Function ---------------*/
function run_eneemy_car(car){
	let enemy_car = document.querySelectorAll('.enemy');
	enemy_car.forEach(function(hight){
		
		if(dist_car(car,hight)){
			
			let audio = new Audio("sound/a.mp3");
			audio.play();
			gameEnd();
			restart_game.classList.remove('hide');
			score.classList.add('hide');
		}
		
		if(hight.y >=540){
			hight.y =-750;
			hight.style.left = Math.floor(Math.random()*350) + "px";
		}
		hight.y += player.speed;
		hight.style.top = hight.y +"px";
	});
}

/* --------------End Enemy Car run Function ---------------*/

/* --------------start Start play game Function ---------------*/

function gamePlay(){
	
	let car =document.querySelector('.car');
	
	let area = gameArea.getBoundingClientRect();
	
	if(player.start){
		/* --------------start call road line function and enemy car function ---------------*/
		runlines();
		run_eneemy_car(car);
		/* --------------end call road line function and enemy car function ---------------*/
		
		/* -------------- enemy car spreed define ---------------*/
		if(player.score>=1000 && player.score<=2000){
			player.speed =5;
			s(car,area);
		}
		else if(player.score>=2001 && player.score<=4000){
			player.speed =8;
			s(car,area);
		}
		else if(player.score>=4001 && player.score<=6000){
			player.speed =12;
			s(car,area);
		}
		else if(player.score>=6001){
			player.speed =15;
			s(car,area);
		}
		else{
			s(car,area);
		}
		
		/* -------------- enemy car spreed define ---------------*/		
		window.requestAnimationFrame(gamePlay);
		player.score++;
		score.innerText = "Score : " +player.score;
		scr.innerText = "Your score : " +player.score;
	}
}

/* --------------End Start play game Function ---------------*/

/* --------------start hero car move fixed area Function ---------------*/

function s(car,area){
	if(keys.ArrowUp && player.y>0){
		player.y -= player.speed;
	}
	if(keys.ArrowDown && player.y<area.height-120){
		player.y+= player.speed;
	}
	if(keys.ArrowLeft && player.x>0){
		player.x -= player.speed;
	}
	if(keys.ArrowRight && player.x<area.width-60){
		player.x += player.speed;
	}
	car.style.top = player.y + "px";
	car.style.left = player.x + "px";
}	

/* --------------End hero car move fixed area Function ---------------*/

/* --------------start Game Function ---------------*/

function start(){
	
	restart_game.classList.add('hide');
	gameArea.classList.remove('hide');
	startScreen.classList.add('hide');
	score.classList.remove('hide');
	
	player.start = true;
	player.score = 0;
	player.speed = 3;
	
	window.requestAnimationFrame(gamePlay);
	
	gameArea.innerHTML= '<div class="car"><img src ="img/car.png"></div>';
	for(x=0;x<4;x++){
		let roadline = document.createElement('div');
		roadline.setAttribute('class','line');
		roadline.y = (x*139);
		roadline.style.top = (x*139) +"px";
		gameArea.appendChild(roadline);
	}
	let car =document.querySelector('.car');
	player.x = car.offsetLeft;
	player.y = car.offsetTop
	
	for(x=0;x<6;x++){
		let enamyCar = document.createElement('div');
		enamyCar.setAttribute('class','enemy');
		enamyCar.innerHTML ='<img src ="img/car1.png">';
		enamyCar.y = ((x+1)*200)* -1;
		enamyCar.style.top = enamyCar.y +"px";
		enamyCar.style.left = Math.floor(Math.random()*300) + "px";
		gameArea.appendChild(enamyCar);
	}
	

}

/* --------------End game Function ---------------*/

/* --------------Stop game Function ---------------*/
function gameEnd(){
	player.start = false;
}

/* --------------end Stop game Function ---------------*/
/* --------------Define function End---------------*/
