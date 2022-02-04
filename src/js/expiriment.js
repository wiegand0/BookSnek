var testModule = (function() {
	console.log("I RAN");

	function tester() {
		console.log("I also ran");
	}

	function testerTwo() {
		console.log("Me too");
	}

	return { testerTwo }
})();