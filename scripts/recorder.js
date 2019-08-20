

var record = (function() {
	
	//Keep track of the index where you start recording and the index where you stop reording
	var index = [];
	
	var cubeHistory = [];
	
	var currentCube;
	
	//This keeps track of the recording state, true means on and false means off
	var state;
	
	return {	
		
		//Records the current state of the cube into an array
		saveState: function() {
			currentState = [[],[],[],[],[],[]]
			
			for (var i = 0; i < cube.faces.length; i++) {
				currentFace = playback.parseFace(cube.faces[i].cubelets, i);
				currentState[i] = currentFace;
			}
			
			playback.playFace();
			
			currentCube = cube.faces;
			cubeHistory.push(currentState);
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
				//When recording starts save the state of the cube
				record.saveState();
				//Play the current face when recording starts
				playback.playFace()
			}
			//When recording shuts off record the current index and state of the cube since the auto recording only saves states of the cube before it's moved
			else {
				index[1] = cube.twistQueue.history.length;
				console.log(index);
			}
		},
		
		getIndex: index,
		
		getCurrentCube: function(){
			return currentCube;
		}
	}
})();

var playback = (function() {
	
	//An array to convert from cubelet face to note
	var noteDictionary = [];
	
	//This whitespace is unconventional but I feel like it helps with clarity due to the way these notes need to be hard coded in
	//Note mappings for the white face. The chord is: (B D# F#)
	noteDictionary["W"] = [];
		noteDictionary["W"][0] = "B3";
		noteDictionary["W"][1] = "Gb4"; //F#
		noteDictionary["W"][2] = "Eb4"; //D#
		noteDictionary["W"][3] = "Gb4";
		noteDictionary["W"][4] = "Eb4";
		noteDictionary["W"][5] = "B3";
		noteDictionary["W"][6] = "Eb4"; 
		noteDictionary["W"][7] = "B3";
		noteDictionary["W"][8] = "Gb4";
	
	//Orange face. Chord: (D F# A)
	noteDictionary["O"] = [];
		noteDictionary["O"][18] = "A3";
		noteDictionary["O"][19] = "D4";
		noteDictionary["O"][20] = "Gb4"; //F#
		noteDictionary["O"][9] = "D4";
		noteDictionary["O"][10] = "Gb4";
		noteDictionary["O"][11] = "A3";
		noteDictionary["O"][0] = "Gb4";
		noteDictionary["O"][1] = "A3";
		noteDictionary["O"][2] = "D4";
	
	//Blue Face. Chord: (G Eb Bb)
	noteDictionary["B"] = [];
		noteDictionary["B"][2] = "Eb4";
		noteDictionary["B"][11] = "G4";
		noteDictionary["B"][20] = "Bb3";
		noteDictionary["B"][5] = "Bb3";
		noteDictionary["B"][14] = "Eb4";
		noteDictionary["B"][23] = "G4";
		noteDictionary["B"][8] = "G4";
		noteDictionary["B"][17] = "Bb3";
		noteDictionary["B"][26] = "Eb4";
		
	//Red face. Chord: (A C# E)
	noteDictionary["R"] = [];
		noteDictionary["R"][6] = "A3";
		noteDictionary["R"][7] = "Db4"; //C#
		noteDictionary["R"][8] = "E4";
		noteDictionary["R"][15] = "Db4";
		noteDictionary["R"][16] = "E4";
		noteDictionary["R"][17] = "A3";
		noteDictionary["R"][24] = "E4";
		noteDictionary["R"][25] = "A3";
		noteDictionary["R"][26] = "Db4";
		
	//Green face. Chord: (C E G)
	noteDictionary["G"] = [];
		noteDictionary["G"][18] = "C4";
		noteDictionary["G"][9] = "E4";
		noteDictionary["G"][0] = "G4";
		noteDictionary["G"][21] = "G4";
		noteDictionary["G"][12] = "C4";
		noteDictionary["G"][3] = "E4";
		noteDictionary["G"][24] = "E4";
		noteDictionary["G"][15] = "G4";
		noteDictionary["G"][6] = "C4";
		
	//Yellow face. Chord: (D F a)
	noteDictionary["Y"] = [];
		noteDictionary["Y"][24] = "F4";
		noteDictionary["Y"][25] = "D4";
		noteDictionary["Y"][26] = "A3";
		noteDictionary["Y"][21] = "D4";
		noteDictionary["Y"][22] = "A3";
		noteDictionary["Y"][23] = "F4";
		noteDictionary["Y"][18] = "A3";
		noteDictionary["Y"][19] = "F4";
		noteDictionary["Y"][20] = "D4";
		
	
	var channel_max = 200;								// number of channels
	
	audiochannels = new Array();
	
	for (a=0;a<channel_max;a++) {						// prepare the channels
	
		audiochannels[a] = new Array();
		audiochannels[a]['channel'] = new Audio();		// create a new audio object
		audiochannels[a]['finished'] = -1;				// expected end time for this channel
	}

	return {
		
		playNote: function(noteName) {
			
			//Credit to Thomas sturm for this.
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
		
		//Take a string input of a note between A3 and Ab4 and play it's matching sound file
		playChord: function(noteArray) {
			for(var i = 0; i < noteArray.length; i++) {
					playback.playNote(noteArray[i]);
			}
		},
		
		//Convert an array of cubelets into an array of ID's and colors
		parseFace: function(face, faceId){
			parsedFace = new Array();
			
			for (var i = 0; i < face.length; i++){
				parsedFace[i] = [(face[i].colors[faceId]), face[i].id];
			}
			
			return parsedFace;
		},
		
		//Takes a parsed array of cubelets from parseFace and returns a matching array of notes
		convertToNote: function(cubeArray){
			returnArray = []
			
			for (var i = 0;i < cubeArray.length; i++){
				returnArray[i] = noteDictionary[cubeArray[i][0]][cubeArray[i][1]];
			}
			
			return returnArray;
		},
		
		playFace: function(){
			var faceIndex = document.getElementById("selectedFace").selectedIndex;
			
			playback.playChord(playback.convertToNote(playback.parseFace(cube.faces[faceIndex].up.cubelets, faceIndex)));
			playback.playChord(playback.convertToNote(playback.parseFace(cube.faces[faceIndex].equator.cubelets, faceIndex)));
			playback.playChord(playback.convertToNote(playback.parseFace(cube.faces[faceIndex].down.cubelets, faceIndex)));
			
		}
	}
	

})();
