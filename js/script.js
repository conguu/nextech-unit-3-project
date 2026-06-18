let container = document.querySelector("#container");
let title = document.querySelector("#title");
let choicesContainer = document.querySelector("#choices");
let cat = document.querySelector("#cat");

const oof = new Audio("assets/oof.mp3");
const holdmenow = new Audio("assets/creed.mp3");
const sixseven = new Audio("assets/67-sound.mp3");
const ominousMusic = new Audio("assets/ominousBlackCube.mp3");
const catMusic = new Audio("assets/silly-cat.mp3")
const challengerApproaching = new Audio(
	"assets/champ/challenger-approaching.mp3",
);
const battle = new Audio("assets/champ/battle.mp3");

var past = [options.levels.start];
var firstLevel = options.levels.start;
renderLevel(firstLevel);

choicesContainer.addEventListener("click", function (event) {
	if (event.target.tagName === "BUTTON") {
		let clickedButton = event.target;
		var nextLevel = clickedButton.getAttribute("data-next-level");

		if (nextLevel === "challenge") {
			triggerChallengeSequence();
			return;
		} 
        if (nextLevel === "dogCouch") {
		    triggerOminousSequence();
            return;
        }

		container.classList.add("fadeOut");
		renderLevel(options.levels[nextLevel], nextLevel);

		console.log("below is the normal thing passed in when choice is clicked");
		(console.log(options.levels[nextLevel]), nextLevel);

		container.classList.remove("fadeOut");
		container.classList.add("fadeIn");

		past.push(options.levels[nextLevel]);
		console.log(past);

		if (nextLevel === "challenge") {
			challenge();
		}
	}
});

function renderLevel(level, levelName) {
	console.log(level);
	choicesContainer.innerHTML = "";

	if (levelName === "creed") {
		document.body.style.backgroundImage = "url('assets/creed-one-last-breath.gif')";
		holdmenow.play().catch(function (error) {
			console.log("Audio playback waiting for user interaction:", error);
		});
	} else if (levelName === "sixseven") {
		document.body.style.backgroundImage = "url('assets/67.gif')";
		sixseven.play().catch(function (error) {
			console.log("Audio playback waiting for user interaction:", error);
		});
	} else if (levelName === "outside" || levelName === "dance") {
        cat.style.opacity = 1;
        cat.style.left = "45%";
        cat.style.top = "12.5%";
        catMusic.play().catch(function (error) {
			console.log("Audio playback waiting for user interaction:", error);
		});
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

	if (level.choices.some((choice) => choice.option === "Restart")) {
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

function triggerOminousSequence() {
	let ominousBlackCube = document.querySelector("#ominousBlackCube");

	ominousMusic.play().catch(function (error) {
		console.log("Audio playback waiting for user interaction:", error);
	});
    
    oof.volume = 0;
    container.classList.add("fadeOut");
    document.body.style.backgroundColor = "black";

    setTimeout(function() {
        ominousBlackCube.style.left = "32.5%";
        ominousBlackCube.style.opacity = "1";
        setTimeout(function () {
            ominousBlackCube.style.left = "-100%";
            ominousBlackCube.style.opacity = "0";
            ominousMusic.pause();
            ominousMusic.currentTime = 0;
            oof.volume = 1;
            document.body.style.backdropFilter = "brightness(0.75)";
            document.body.style.backgroundColor = "slategray";
            container.classList.remove("fadeOut");
            container.classList.add("fadeIn");
            renderLevel(options.levels["dogCouch"], "dogCouch");
        }, 15000);
    }, 500);
}

function triggerChallengeSequence() {
	let newFoeImg = document.querySelector("#newFoeImage");
	let champ = document.querySelector("#champ");

	challengerApproaching.play().catch(function (error) {
		console.log("Audio playback waiting for user interaction:", error);
	});
    
	container.classList.add("fadeOut");

	newFoeImg.style.left = "0";
	newFoeImg.style.opacity = "1";

	setTimeout(function () {
		newFoeImg.style.left = "100%";
		newFoeImg.style.opacity = "0";

		setTimeout(function () {
			newFoeImg.style.left = "-50%";
		}, 200);

		setTimeout(function () {
			battle.play().catch(function (error) {
				console.log("Audio playback waiting for user interaction:", error);
			});

			champ.style.left = "40%";
			champ.style.opacity = "1";
		}, 500);
	}, 2250);
}
