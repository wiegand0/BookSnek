//BOOK SNAKE DOCS//
//ABOUT//
	Book snake is a combination of the game of snake and bookworm. The player controls a snake
	that moves around the board at a set rate, eating letters that appear on the board. The goal
	of the game is to eat the tiles in an order that spells out words, and collect points accordingly.
	This is done while the player avoids running into the edge of the board and themselves in classic
	snake fashion.

//!GENERAL TO BE DONE!//
-stylize game
-finish belly.js
-finish board.js
-finish gamecontainer.js
-finish worm.js

//!!BELLY.JS!!//
	The belly module keeps track of the tiles that the player has eaten. It then uses a
	free dictionary api(https://dictionaryapi.dev) to search all possible word combinations
	of tiles the player has eaten. It then removes the spelled words from the belly and 
	calculates appropriate scoring for said words.
		//!!TO BE DONE!!//
	-add letter overload game over mechanic
	-change from XMLHTTP to fetch

//!!BOARD.JS!!//
	The board is the collection of all the tiles that make up the game, as well as the worm
	that navigates the board. It initializes as many tile modules as are needed, and indexes
	them appropriately. It then coordinates the updating of new tile content onto the board,
	and instructs the worm to update itself, recieves said update information and places it
	on the board appropriately.
		//!!TO BE DONE!!//
	-adjustable tile content generation speed
	-adjustable worm speed

//!!GAMECONTAINER.JS!!//
	The gamecontainer initializes the board module and contains the game loop logic. It also
	takes the board information and translates it into HTML on the DOM. It listens for player
	input and forwards that to the board module.
//!!TO BE DONE!!//
	-consider altering game loop logic to not rely on setInterval
	-optimize render, stop re-rendering whole board every update
	-consider moving away from html generation entirely
	-remove keyListener when paused
	-add restart button functionality
	-add score display
	-add game over screen

//!!TILE.JS!!//
	The tile class is the smallest representation of a space on the game board.
	It contains the necessary information about each tile.
//!!TO BE DONE!!//
	-¿DONE?

//!!WORM.JS!!//
	The worm class keeps track of the handful of tiles on the board that make up the worm.
	It keeps an index of each tile the worm is on, and as the worm moves, pushes new tiles on
	and pops old tiles off. It also contains the belly module and communicates eaten tiles to it.
	It also contains the logic that sets the orientation/display of the worm pieces on the board.
//!!TO BE DONE!!//
	-troubleshoot tail orientation logic when length is 2
	-troubleshoot body orientation logic when length is 3
	-fix initialization logic
