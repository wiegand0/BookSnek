//game conatiner runs the game loop, contains the instance of the actual game

class gameContainer {
	boolean running;
	board gameActual;

	constructor() {
		this.running = true;
	}

	void run() {
		while(running) {
			input();
			update();
			render();
		}
	}

	void input() {

	}
}