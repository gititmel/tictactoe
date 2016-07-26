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
	}; 

	render();

// |player.gamePiece| the X or O, 
// |gamePiece.......| is defined in newGame function
// |player.selection| the tile player selects in the array 

	function player(gamePiece){
		this.gamePiece = gamePiece,
		this.selection = [] 
	};

// |newGame |function defines variables and fncs for game play
// |
 
	function newGame(){
		var player1 		= new player("X");
		var player2 		= new player("O");
		var currentPlayer 	= player1;	//X begins
		var gameDraw		= 0;		//default value
		var tileSelected 	= currentPlayer.selection;
		var youWin = [  ['t0','t1','t2'], 
						['t3','t4','t5'], 
						['t6','t7','t8'], 
						
						['t0','t3','t6'], 
						['t1','t4','t7'], 
						['t2','t5','t8'], 
						
						['t0','t4','t8'], 
						['t2','t4','t6']
						]; //array of winning conditions


//defines game play
		$(".box").click(function(){
			if ($(this).text() == '') { 				//if box is empty
				$(this).text(currentPlayer.gamePiece); //place game piece on selected tile
				tileSelected.push($(this).attr('id'));
				
				console.log("Tiles selected: " + tileSelected);

// if there's a winner (via definesWinner function) 
// OR
// if there's a tie (gameDraw >=8)
				
				if(definesWinner(tileSelected, youWin) || gameDraw >=8) {
					if (gameDraw >= 8) {

						$('#gameStatus').html("<b>Game tied!</b>");
						console.log("Game Draw");
					} else {
						$('#gameStatus').html("Winning Team: " + currentPlayer.gamePiece + "!");
						console.log(currentPlayer.gamePiece);
					}
				}  //if does not meet conditions to win or draw, switch players
					else {
						switchPlayers();
					}
				}
			});

// |definesWinner| Sets the winning conditions 
// |cell.........| is the tile selected by player (tileSelected)
// |winningTiles.| the array of win conditions
// |indexOf......| returns -1 if element not found.
// ...............returns the position of the first occurrence of a value in a string 


		function definesWinner(cell, winningTiles){
			var tileName	= cell.sort() //the tile that player selected
			var isWinner	= false;
			var t; //limited to 8 turns
			var i; // for elements in the array

			for (t = 0; t < 8; t++){ 
				var count = 0;
				
				for (i = 0; i < winningTiles[i].length; i++) { // winningTiles[i].length is always 3
					if (tileName.indexOf(winningTiles[t][i]) > -1){ 
						count++;
						//console.log("tile name = " + tileName);
						// console.log("winningTile[0]: " + winningTiles[0]);
						// console.log("winningTile[1]: " + winningTiles[1]);
						// console.log("winningTile[2]: " + winningTiles[2]);
						// console.log("winningTile[3]: " + winningTiles[3]);
						// console.log("winningTile[4]: " + winningTiles[4]);
						// console.log("winningTile[5]: " + winningTiles[5]);
						// console.log("winningTile[6]: " + winningTiles[6]);
						// console.log("winningTile[7]: " + winningTiles[7]);
						// console.log("winningTile[8]: " + winningTiles[8]);
						console.log("t = " + t);
						console.log("i = " + i);
						console.log("winningTiles[i]: " + winningTiles[i]);
						console.log("winningTiles[t]: " + winningTiles[t]);
						console.log("tileName.indexOf(winningTiles[t][i]): " + tileName.indexOf(winningTiles[t][i]));
						console.log("tileName.indexOf(winningTiles[t]): " + tileName.indexOf(winningTiles[t]));
						console.log("tileName.indexOf(winningTiles[i]): " + tileName.indexOf(winningTiles[i]));

					}
// forEach calls function once for each element in an array, in order.

					if (count >=3){ 
						isWinner = true;
						winningTiles[t].forEach(function(color){
							$('#' + color).css("color", "blue");
							console.log("**WINNER**");
						});
					}
				}
				return isWinner;
			}
		}

//switchPlayers function uses ternary operator to manage player's turns
// if currentPlayer = Player 2, else currentPlayer = player 1
// game is tied when gameDraw = 8
		function switchPlayers(){
			currentPlayer = (currentPlayer == player1) ? player2 : player1;
			$('#gameStatus').html("Current Status:<br>Team " + currentPlayer.gamePiece);
			gameDraw += 1; 
		}
	};

	newGame();

//reloads a new game
	$('#newGame').click(function(){
		location.reload();
	});
});