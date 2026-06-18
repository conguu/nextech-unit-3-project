let container = document.querySelector("#container");
let title = document.querySelector("#title");
let choicesContainer = document.querySelector("#choices");
let eventContainer = document.querySelector("#eventContainer");
let cat = document.querySelector("#cat");
let catCount = 0;

const alarm = new Audio("assets/audio/alarm.mp3");
const oof = new Audio("assets/audio/oof.mp3");
const holdmenow = new Audio("assets/audio/creed.mp3");
holdmenow.volume = 0.2;
const sixseven = new Audio("assets/audio/67-sound.mp3");
sixseven.volume = 0.1;
const carCrash = new Audio("assets/audio/car-crash.mp3");
carCrash.volume = 0.8;
const slip = new Audio("assets/audio/slip.mp3");
slip.volume = 0.8;
const ominousMusic = new Audio("assets/audio/ominous.mp3");
const whisperSound = new Audio("assets/audio/whisper.mp3");
const catMusic = new Audio("assets/audio/silly-cat.mp3");
catMusic.volume = 0.8;
const challengerApproaching = new Audio(
	"assets/champ/challenger-approaching.mp3",
);
challengerApproaching.volume = 0.4;
const battle = new Audio("assets/champ/battle.mp3");
battle.volume = 0.8;

setTimeout(function() {
	renderLevel(options.levels.start, "start");
	container.classList.add("fadeIn");
}, 25);

choicesContainer.addEventListener("click", function (event) {
	if (event.target.tagName === "BUTTON") {
		let clickedButton = event.target;
		var nextLevel = clickedButton.getAttribute("data-next-level");
		
		if (nextLevel === "dogCouch") {
			triggerOminousSequence();
			return;
		} else if (nextLevel === "dance") {
			catCount++;
			if (catCount >= 5) {
				triggerStopCatSequence();
				return;
			}
		} else if (nextLevel === "bottomOfStairsCat") {
			Toastify({
				text: "Achievement: New Friend",
				duration: 3000,
				newWindow: true,
				close: false,
				gravity: "bottom",
				position: "right",
				stopOnFocus: true,
				className: "button",
			}).showToast();
		} else if (nextLevel === "bottomOfStairs") {
			cat.style.visibility = "hidden";
			cat.style.opacity = "0";
			catMusic.pause();
			catMusic.currentTime = 0;
		} else if (nextLevel === "dogFind" && catCount >= 5) {
			container.classList.add("fadeOut");
			renderLevel(options.levels["bottomOfStairsNoCat"], "bottomOfStairsNoCat");
			container.classList.remove("fadeOut");
			container.classList.add("fadeIn");
			return;
		} else if (nextLevel === "challenge") {
			triggerChallengeSequence();
			return;
		}

		container.classList.add("fadeOut");
		renderLevel(options.levels[nextLevel], nextLevel);
		container.classList.remove("fadeOut");
		container.classList.add("fadeIn");
	}
});

function renderLevel(level, levelName) {
	console.log(levelName)
	choicesContainer.innerHTML = "";
	if (levelName === "start" || levelName === "bedroom") {
		alarm.play().catch(function (error) {
			console.log("Audio playback waiting for user interaction:", error);
		});
	}
	if (levelName === "nightStand") {
		alarm.pause();
		alarm.currentTime = 0;
	} else if (levelName === "dream") {
		alarm.pause();
		alarm.currentTime = 0;
	} else if (levelName === "creed") {
		document.body.style.backgroundImage =
			"url('assets/creed-one-last-breath.gif')";
		holdmenow.play().catch(function (error) {
			console.log("Audio playback waiting for user interaction:", error);
		});
	} else if (levelName === "sixseven") {
		document.body.style.backgroundImage = "url('assets/67.gif')";
		sixseven.play().catch(function (error) {
			console.log("Audio playback waiting for user interaction:", error);
		});
	} else if (levelName === "banana") {
		slip.play().catch(function (error) {
			console.log("Audio playback waiting for user interaction:", error);
		});
		Toastify({
			text: "Achievement: Mario Kart",
			duration: 3000,
			newWindow: true,
			close: false,
			gravity: "bottom",
			position: "right",
			stopOnFocus: true,
			className: "button",
		}).showToast();
	} else if (levelName === "carCrash") {
		document.body.style.backgroundImage = "url('assets/car-crash.gif')";
		carCrash.play().catch(function (error) {
			console.log("Audio playback waiting for user interaction:", error);
		});
		Toastify({
			text: "Achievement: Vehicular Manslaughter",
			duration: 3000,
			newWindow: true,
			close: false,
			gravity: "bottom",
			position: "right",
			stopOnFocus: true,
			className: "button",
		}).showToast();
	} else if (levelName === "outside" || levelName === "dance") {
		cat.style.opacity = "1";
		cat.style.visibility = "visible";
		catMusic.play().catch(function (error) {
			console.log("Audio playback waiting for user interaction:", error);
		});
	} else if (levelName === "dogBlanket") {
		Toastify({
			text: "Achievement: Sleepy",
			duration: 3000,
			newWindow: true,
			close: false,
			gravity: "bottom",
			position: "right",
			stopOnFocus: true,
			className: "button"
		}).showToast();
	} else if (levelName === "outsideDead") {
		Toastify({
			text: "Achievement: Gravity",
			duration: 3000,
			newWindow: true,
			close: false,
			gravity: "bottom",
			position: "right",
			stopOnFocus: true,
			className: "button"
		}).showToast();
	} else {
		document.body.style.backdropFilter = "none";
		document.body.style.backgroundImage = "none";
		holdmenow.pause();
		holdmenow.currentTime = 0;
		sixseven.pause();
		sixseven.currentTime = 0;
		oof.pause();
		oof.currentTime = 0;
	}

	if (level?.choices?.some((choice) => choice.option === "Restart")) {
		document.body.style.backdropFilter = "brightness(0.75)";
		oof.play().catch(function (error) {
			console.log("Audio playback waiting for user interaction:", error);
		});
	}

	if (!level.message || level.message.length === 0) {
		callback();
		return;
	}

	title.innerHTML = level.message[0];

	if (level.message.length > 1) {
		let i = 1;

		function time() {
			setTimeout(function () {
				title.innerHTML = level.message[i];
				i++;

				if (i < level.message.length) {
					time();
				} else {
					callback();
				}
			}, 1500);
		}

		time();
	} else {
		callback();
	}

	function callback() {
		choicesContainer.innerHTML = "";

		var levelChoices = level.choices;
		if (levelChoices) {
			for (var i = 0; i < levelChoices.length; i++) {
				var choiceData = levelChoices[i];
				var nextLevelAttr = choiceData.nextLevel;
				var buttonText = choiceData.option;

				if (choiceData.image) {
					buttonContent =
						"<img src='" + choiceData.image + "' alt='" + buttonText + "' />";
				} else {
					buttonContent = buttonText;
				}

				choicesContainer.insertAdjacentHTML(
					"beforeend",
					"<button data-next-level='" +
						nextLevelAttr +
						"'>" +
						buttonContent +
						"</button>",
				);
			}
		}
	}
}

function triggerStopCatSequence() {
	container.classList.add("fadeOut");
	renderLevel(options.levels["stopCat"], "stopCat");
	container.classList.remove("fadeOut");
	container.classList.add("fadeIn");

	cat.style.opacity = 0;
	catMusic.pause();
	catMusic.currentTime = 0;

	Toastify({
		text: "Achievement: Master Dancer",
		duration: 3000,
		newWindow: true,
		close: false,
		gravity: "bottom",
		position: "right",
		stopOnFocus: true,
		className: "button",
	}).showToast();
	return;
}

function triggerOminousSequence() {
	let ominousBlackCube = document.querySelector("#ominousBlackCube");

	ominousMusic.play().catch(function (error) {
		console.log("Audio playback waiting for user interaction:", error);
	});
	whisperSound.play().catch(function (error) {
		console.log("Audio playback waiting for user interaction:", error);
	});

	container.classList.add("fadeOut");
	document.body.style.backgroundColor = "black";
	ominousBlackCube.style.visibility = "visible";
	ominousBlackCube.style.opacity = "1";
	setTimeout(function () {
		Toastify({
			text: "Achievement: Cube",
			duration: 3000,
			newWindow: true,
			close: false,
			gravity: "bottom",
			position: "right",
			stopOnFocus: true,
			className: "button",
		}).showToast();
		ominousBlackCube.style.opacity = "0";
		ominousMusic.pause();
		ominousMusic.currentTime = 0;
		whisperSound.pause();
		whisperSound.currentTime = 0;
		document.body.style.backdropFilter = "brightness(0.75)";
		document.body.style.backgroundColor = "slategray";
		container.classList.remove("fadeOut");
		container.classList.add("fadeIn");
		renderLevel(options.levels["dogCouch"], "dogCouch");
	}, 8000);
}

function triggerChallengeSequence() {
	let newFoeImg = document.querySelector("#newFoeImage");
	let champ = document.querySelector("#champ");

	challengerApproaching.play().catch(function (error) {
		console.log("Audio playback waiting for user interaction:", error);
	});

	container.classList.add("fadeOut");

	newFoeImg.style.visibility = "visible";
	newFoeImg.style.left = "0";
	newFoeImg.style.opacity = "1";

	setTimeout(function () {
		newFoeImg.style.left = "100%";
		newFoeImg.style.opacity = "0";
		newFoeImg.style.visibility = "hidden";

		setTimeout(function () {
			newFoeImg.style.left = "-50%";
		}, 200);

		setTimeout(function () {
			battle.play().catch(function (error) {
				console.log("Audio playback waiting for user interaction:", error);
			});

			champ.style.visibility = "visible";
			champ.style.left = "40%";
			champ.style.opacity = "1";
		}, 500);
	}, 2250);
}
