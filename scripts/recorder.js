var record = (function() {
	
	var index = [];
	
	var cubeHistory = [[],[],[],[],[],[]];
	
	//This keeps track of the recording state, true means on and false means off
	var state;
	
	return {	
		
		//Records the current state of the cube into an array
		saveState: function() {
			console.log("yo");
			cubeHistory[0].push(cube.front.cubelets);
			cubeHistory[1].push(cube.up.cubelets);
			cubeHistory[2].push(cube.right.cubelets);
			cubeHistory[3].push(cube.down.cubelets);
			cubeHistory[4].push(cube.left.cubelets);
			cubeHistory[5].push(cube.back.cubelets);
			console.log(cubeHistory);
		},
		
		toggleRec: function() {
			
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
			//When recording shuts off record the current index and state of the cube since the auto recording only saves states of the cube before it's moved
			else {
				index[1] = cube.twistQueue.history.length; 
				recorder.saveState();
				console.log(index);
			}
		},
		
		getIndex: index

	}
})();

var playback = (function() {

	var channel_max = 30;										// number of channels
	audiochannels = new Array();
	for (a=0;a<channel_max;a++) {									// prepare the channels
		audiochannels[a] = new Array();
		audiochannels[a]['channel'] = new Audio();						// create a new audio object
		audiochannels[a]['finished'] = -1;		// expected end time for this channel
	}

	return {
		
		playNote: function(noteName) {
			
			//I'm going to be honest, I'm not 100% sure how this works but it does so that's all I really care about. Credit to Thomas Sturm.
			for (a=0;a<audiochannels.length;a++) {
				thistime = new Date();
				if (audiochannels[a]['finished'] < thistime.getTime()) {			// is this channel finished?
					audiochannels[a]['finished'] = thistime.getTime() + document.getElementById(noteName).duration*1000;
					audiochannels[a]['channel'].src = document.getElementById(noteName).src;
					audiochannels[a]['channel'].load();
					audiochannels[a]['channel'].play();
					break;
				}
			}
		},
		
		
		playChord: function(noteArray) {
			for(var i = 0; i < noteArray.length; i++) {
					playback.playNote(noteArray[i]);
			}
		}
	}
})();
