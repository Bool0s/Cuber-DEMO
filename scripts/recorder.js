var record = (function() {
	
	var index = [];
	
	return {	
		
		toggleRec: function() {
			//Have a variable to keep track of the indicator
			var state;
			
			//Turn on or off the indicator on click
			if(String(document.getElementById("indicator").style.backgroundColor) == "rgb(85, 85, 85)" || String(document.getElementById("indicator").style.backgroundColor) == "") {
				document.getElementById("indicator").style.backgroundColor = "#FF0000";
				state = true;
			}
			else {
				document.getElementById("indicator").style.backgroundColor = "#555555";
				state = false;
			}
			
			
			//Record the current index of twistqueue
			if (state) {
				index[0] = cube.twistQueue.history.length;
			}
			//When recording shuts off record the current index
			else {
				index[1] = cube.twistQueue.history.length; 
				console.log(index);
			}
		}
	}
})();