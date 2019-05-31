/*
	***CREDIT TO***
	Mark Lundin
	Stewart Smith
	Google
	
	I didn't make this function, I just snagged it from iamthecu.be to see if I could implement it here
*/



//  Take whatever’s in the twist history and undo it
//  and this should (in theory) bring us back to a solved cube.

function undoToZero(){

	cube.isShuffling = false;
	cube.taskQueue.add( function(){

		cube.twistQueue.future = []
		cube.twistDuration = 50
	})
	if( cube.isSolved() === false ){

		twistHistoryLength = cube.twistQueue.history.length
		while( twistHistoryLength -- ){

			//  OMFG this is dirty. but solves a subtle logical flaw.
			//  Can’t use cube.undo() here because undo() would be 
			//  adding to the taskQueue AFTER shit below is being 
			//  added to the taskQueue. 
			//  That means it would set .future = [] BEFORE we actually call undo()!!!
			//cube.taskQueue.add( function(){ cube.undo() })
			
			var wasOk = false

			cube.taskQueue.add( function(){

				if( cube.twistQueue.history.length ){
				
					var move = cube.twistQueue.history.pop()

					cube.twistQueue.future = []//  We might have shit queued up.
					cube.twistQueue.add( move.getInverse())
					wasOk = true
				}

			}, function(){

				if( wasOk ) cube.twistQueue.history.pop()
			})
		}
	}


	//  Finally, make sure to reset the twistDuration,
	//  and make damn sure the queues are empty!

	cube.taskQueue.add( function(){

		cube.twistDuration = 20
		cube.twistQueue.history = []
		//cube.historyQueue.history = []// WTF is this?!?!? Seems redundant and black magic!
	})
}
