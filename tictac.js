$(document).ready(function(){

	console.log("jQuery linked");

//Renders the 3 x 3 grid
// uses querySelector method to get .box class and
// innerHTML modifies the id of .box, incrementing ++1
	function render(){
		var gameGrid = document.querySelector("#game-grid")
		gameGrid.innerHTML = '';
		for (t = 0; t < 9; t++){
			gameGrid.innerHTML += '<div class="box" id="t' + t + '"></div>';
		};
	}; // </render>

	render();

// |player.gamePiece| the X or O, 
// |player.selection| the tile player selects in the array 

	function player(gamePiece){ 
		this.gamePiece = gamePiece,
		this.selection = [] 
	}; // </gamePiece>


// |newGame |function defines variables and functions for game play 
	function newGame(){
		var playerx 		= new player("X");
		// var playero 		= new player("O");
		var computer 		= new player("O");
		var currentPlayer 	= playerx;			//X begins
		var isWinner		= false;
		var gameTied		= false;
		var tileArray		= $(".box").map(function(){
								return this.id;}).toArray(); //converts id's into array
		var youWin = [  ['t0','t1','t2'], 
						['t3','t4','t5'], 
						['t6','t7','t8'], 
						
						['t0','t3','t6'], 
						['t1','t4','t7'], 
						['t2','t5','t8'], 
						
						['t0','t4','t8'], 
						['t2','t4','t6']
						]; //array of winning conditions

// |threeInARow|	if the tile player selected is not included in youWin array
//					i = 0, else, i = 1
function threeInARow() {
	for (var i = 0; i < arguments.length; i++) {
		if (!this.includes(arguments[i])){
			// console.log("arguments[i]: " + arguments[i]);
			// console.log("i: " + i);
			return false;
		}
	} 
	return true;
}; //<threeInARow>

//defines game play
		$(".box").click(function(){
			if ($(this).text() == '' && !isWinner && !gameTied) { 	//if box is empty and no winner
				$(this).text(currentPlayer.gamePiece); //place game piece on selected tile
				currentPlayer.selection.push($(this).attr('id'));
				// console.log("currentPlayer.gamePiece: "+ currentPlayer.gamePiece); 
				// console.log(" currentPlayer.selection: " + currentPlayer.selection); 
				// console.log("tileSelected: " + currentPlayer.selection); 
				console.log(currentPlayer.gamePiece + " has selected: " + currentPlayer.selection);
				
				findWinner();
				switchPlayers();
			}
		});

function randomBox(){
	var x = Math.floor( Math.random() * tileArray.length);
	this.box = tileArray[x];
	}; //</randomBox>

// CPU is the computer player
// if the tile is not empty, 
// it will loop until it finds an empty tile
function CPU(){setTimeout(function(){
	var random  = new randomBox();
	console.log("random box: " + random.box);

if ( $.trim($('#' + random.box).text()) !== "" && !isWinner && !gameTied){
	CPU();
	console.log(random.box + " HAS STUFF");
	} else {
		$('#' + random.box).trigger("click");
		// console.log(random.box + " IS EMPTY");
	}
}, 200);//</timeout>
} //CPU>


function switchPlayers(){
			if (currentPlayer === playerx){
				// currentPlayer = playero;
				currentPlayer = computer;
				CPU();
			} else {
				currentPlayer = playerx;
			} 
			$('#gameStatus').html("Current Status:<br>Team " + currentPlayer.gamePiece);
		}; //</switchPlayers>

// |findWinner...| Sets the winning conditions 
// |youWin.......| the array of win conditions
// |allTiles.....| array
		function findWinner(){
			youWin.forEach(function(cells, i, allTiles){
				if (threeInARow.apply(currentPlayer.selection, cells)){				
					// console.log(currentPlayer.gamePiece + " wins");
					console.log("cells: " + cells);
					alert("Team " + currentPlayer.gamePiece + " wins!");
					return isWinner = true;
					$('#'+ cells).css("color", "orange");
				}
			})
			staleMate();
		}; // </findWinner>

//when false, the game is tied
function staleMate(){
	if (computer.selection.length + playerx.selection.length === 9 && !isWinner){
		alert("STALEMATE :(");
		return gameTied = true;
		// $(".box").css("color", "gray");
		// console.log("TIED GAME");
	} else {
		return false;}
}; //</staleMate>
	};

	newGame();

//reloads a new game
	$('#newGame').click(function(){
		location.reload();
	}); //</newGame>
});