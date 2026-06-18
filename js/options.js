var options = {
	levels: {
		start: {
			message: ["Your alarm clock rings, waking you up."],
			choices: [
				{
					option: "Get out of bed",
					nextLevel: "bedroom",
				},

				{
					option: "Go back to sleep",
					nextLevel: "dream",
				},
			],
		},

		dream: {
			message: ["You fall asleep, dreaming of...?"],
			choices: [
				{
					option: "Falling off of a building",
					nextLevel: "creed",
				},

				{
					option: "67",
					nextLevel: "sixseven",
				},
			],
		},

		creed: {
			message: ["Hold me now"],
			choices: [
				{
					option: "Wake up",
					nextLevel: "start",
				},
			],
		},

		sixseven: {
			message: ["67"],
			choices: [
				{
					option: "Wake up",
					nextLevel: "start",
				},
			],
		},

		bedroom: {
			message: ["You get out of bed, alarm clock still ringing."],
			choices: [
				{
					option: "Turn off alarm clock",
					nextLevel: "nightStand",
				},

				{
					option: "Leave your bedroom",
					nextLevel: "hallNaked",
				},
			],
		},

		hallNaked: {
			message: [
				"You leave your bedroom, forgetting to put on clothes. <br> Your dad finds you naked.",
			],
			choices: [
				{
					option: "Restart",
					nextLevel: "start",
				},
			],
		},

		nightStand: {
			message: [
				"You walk over to your nightstand and turn off your alarm clock.",
			],
			choices: [
				{
					option: "Get your clothes on",
					nextLevel: "closet",
				},

				{
					option: "Go back to bed",
					nextLevel: "dream",
				},
			],
		},

		closet: {
			message: ["You open your closet. <br> What should you wear?"],
			choices: [
				{
					image: "assets/fortnite.png",
					nextLevel: "clothed",
				},
				{
					image: "assets/shrek.jpeg",
					nextLevel: "clothed",
				},
			],
		},

		clothed: {
			message: ["You should probably leave your bedroom now."],
			choices: [
				{
					option: "Walk out the door",
					nextLevel: "hall",
				},
				{
					option: "Jump out of the window",
					nextLevel: "outsideDead",
				},
			],
		},

		outsideDead: {
			message: [
				"You jump out of the window and die. <br> You live on the third floor, what'd you expect?",
			],
			choices: [
				{
					option: "Restart",
					nextLevel: "start",
				},
			],
		},

		hall: {
			message: ["You walk out the door to find a stranger standing outside."],
			choices: [
				{
					option: "Say hi",
					nextLevel: "hi",
				},
				{
					option: "Challenge him",
					nextLevel: "challenge",
				},
			],
		},

		hi: {
			message: ["You say hi. <br> He was just going to the bathroom."],
			choices: [
				{
					option: "Walk downstairs",
					nextLevel: "stairs",
				},
			],
		},

		stairs: {
			message: [
				"You start walking downstairs. <br> Pick a number to determine the outcome.",
			],
			choices: [
				{
					option: "1",
					nextLevel: "carCrash",
				},
				{
					option: "2",
					nextLevel: "banana",
				},
				{
					option: "3",
					nextLevel: "continue",
				},
			],
		},

		carCrash: {
			message: [
				"As you're walking down the stairs, a car suddenly crashes through the wall. <br> It destroyed every bone in your body.",
			],
			choices: [
				{
					option: "Restart",
					nextLevel: "start",
				},
			],
		},

		banana: {
			message: [
				"As you're walking down the stairs, you slip on a banana. <br> It causes you to trip and die.",
			],
			choices: [
				{
					option: "Restart",
					nextLevel: "start",
				},
			],
		},

		continue: {
			message: [
				"You make it all the way down safely. <br> What should you do next?",
			],
			choices: [
				{
					option: "Find the dog",
					nextLevel: "dogFind",
				},
				{
					option: "Go outside",
					nextLevel: "outside",
				},
			],
		},

		dogFind: {
			message: [
				"You decide to find the dog. <br> Where should you start your search?",
			],
			choices: [
				{
					option: "In the living room",
					nextLevel: "dogLivingRoom",
				},
				{
					option: "In the kitchen",
					nextLevel: "dogKitchen",
				},
				{
					option: "Go back",
					nextLevel: "bottomOfStairs",
				},
			],
		},

		dogFind2: {
			message: [
				"You decide to find the dog. <br> Where should you start your search?",
			],
			choices: [
				{
					option: "In the living room",
					nextLevel: "dogLivingRoom",
				},
				{
					option: "In the kitchen",
					nextLevel: "dogKitchen",
				},
				{
					option: "Go back",
					nextLevel: "bottomOfStairsNoCat",
				},
			],
		},

		dogLivingRoom: {
			message: [
				"You enter the living room to find the dog. <br> Where should you look?",
			],
			choices: [
				{
					option: "Behind the couch",
					nextLevel: "dogCouch",
				},
				{
					option: "Under a blanket",
					nextLevel: "dogBlanket",
				},
				{
					option: "Go back",
					nextLevel: "dogFind2",
				},
			],
		},

		dogCouch: {
			message: [
				"You check behind the couch and find an omnious black cube. <br> It sucks you in and you die.",
			],
			choices: [
				{
					option: "Restart",
					nextLevel: "start",
				},
			],
		},

		dogBlanket: {
			message: [
				"You found him sleeping under the blanket!",
			],
			choices: [
				{
					option: "Play again?",
					nextLevel: "start",
				},
			],
		},

		dogKitchen: {
			message: [
				"You check the kitchen for the dog. <br> Where should you look?",
			],
			choices: [
				{
					option: "Under the table",
					nextLevel: "dogTable",
				},
				{
					option: "Inside of the dog's crate",
					nextLevel: "dogCrate",
				},
				{
					option: "Go back",
					nextLevel: "dogFind2",
				},
			],
		},

		dogTable: {
			message: ["You check under the table, but find nothing."],
			choices: [
				{
					option: "Go back",
					nextLevel: "dogKitchen",
				},
			],
		},

		dogCrate: {
			message: ["You check inside of the dogs crate, but find nothing."],
			choices: [
				{
					option: "Go back",
					nextLevel: "dogKitchen",
				},
			],
		},

		outside: {
			message: ["You walk outside and randomly spot a cat dancing."],
			choices: [
				{
					option: "Dance with it",
					nextLevel: "dance",
				},
				{
					option: "Go back",
					nextLevel: "bottomOfStairs",
				},
			],
		},

		dance: {
			message: ["You dance with the cat."],
			choices: [
				{
					option: "Dance more",
					nextLevel: "dance",
				},
				{
					option: "Go back",
					nextLevel: "bottomOfStairsCat",
				},
			],
		},

		stopCat: {
			message: ["The cat's had enough dancing."],
			choices: [
				{
					option: "Go back",
					nextLevel: "bottomOfStairsNoCat",
				},
			],
		},

		bottomOfStairs: {
			message: ["You go back to the bottom of the stairs."],
			choices: [
				{
					option: "Find the dog",
					nextLevel: "dogFind",
				},
				{
					option: "Go outside",
					nextLevel: "outside",
				},
			],
		},

		bottomOfStairsCat: {
			message: [
				"You go back to the bottom of the stairs. <br> (The cat also decided that he likes you)",
			],
			choices: [
				{
					option: "Find the dog",
					nextLevel: "dogFind",
				},
			],
		},

		bottomOfStairsNoCat: {
			message: [
				"You go back to the bottom of the stairs.",
			],
			choices: [
				{
					option: "Find the dog",
					nextLevel: "dogFind2",
				},
				{
					option: "Go outside",
					nextLevel: "outsideNoCat",
				},
			],
		},

		outsideNoCat: {
			message: ["You walk outside, finding nothing."],
			choices: [
				{
					option: "Go back",
					nextLevel: "bottomOfStairsNoCat",
				},
			],
		},
	},
};
