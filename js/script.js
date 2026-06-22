function resolveValue(value, state) {
	return typeof value === "function" ? value(state) : value;
}

function renderChoices(level) {
	choicesContainer.innerHTML = "";
	if (!level.choices) return;

	level.choices.forEach((choice) => {
		if (choice.condition && !choice.condition(state)) return;
		let buttonContent = choice.image ? `<img src='${choice.image}' alt='${choice.option || ""}' />` : choice.option;
		choicesContainer.insertAdjacentHTML("beforeend", `<button data-next-level='${choice.nextLevel}'>${buttonContent}</button>`);
	});
}

function renderLevel(level, levelName) {
	if (!level) return;

	if (level === levels.start) {
		resetState();
	}

	let currentEvent = resolveValue(level.event, state);

	if (currentEvent && typeof currentEvent === "object") {
		let soundsToStop = resolveValue(currentEvent.stopSounds, state);
		if (soundsToStop) {
			soundsToStop.forEach((name) => {
				if (sounds[name]) {
					sounds[name].pause();
					sounds[name].currentTime = 0;
				}
			});
		}

		let soundToPlay = resolveValue(currentEvent.sound, state);
		if (soundToPlay && sounds[soundToPlay]) {
			sounds[soundToPlay].play().catch(() => {});
		}

		document.body.style.backgroundImage = currentEvent.background || "none";

		let toastMsg = resolveValue(currentEvent.toast, state);
		if (toastMsg) toast(toastMsg);

		let showTheCat = resolveValue(currentEvent.showCat, state);
		cat.style.opacity = state.hasCat || showTheCat ? "1" : "0";
		cat.style.visibility = state.hasCat || showTheCat ? "visible" : "hidden";

		if (currentEvent.death) {
			document.body.style.backdropFilter = "brightness(0.75)";
			sounds.oof.play().catch(() => {});
		} else {
			document.body.style.backdropFilter = "none";
		}
	} else {
		document.body.style.backgroundImage = "none";
		document.body.style.backdropFilter = "none";
		cat.style.opacity = state.hasCat ? "1" : "0";
		cat.style.visibility = state.hasCat ? "visible" : "hidden";
	}

	let baseMsg = resolveValue(level.message, state);
	let returnMsg = resolveValue(level.returnMsg, state);
	let messageToDisplay = state.visited.has(levelName) && returnMsg ? returnMsg : baseMsg;
	state.visited.add(levelName);

	if (messageToDisplay && messageToDisplay.length > 0) {
		title.innerHTML = messageToDisplay[0];
		if (messageToDisplay.length > 1) {
			let i = 1;
			(function showNextText() {
				setTimeout(() => {
					title.innerHTML = messageToDisplay[i];
					i++;
					if (i < messageToDisplay.length) showNextText();
					else renderChoices(level);
				}, 1500);
			})();
		} else {
			renderChoices(level);
		}
	} else {
		renderChoices(level);
	}
}

choicesContainer.addEventListener("click", function (event) {
	const clickedButton = event.target.closest("button");
	if (!clickedButton) return;

	let nextLevel = clickedButton.getAttribute("data-next-level");

	if (nextLevel === "challenge") {
		triggerChallengeSequence();
		return;
	}
	if (nextLevel === "dogCouch") {
		triggerOminousSequence();
		return;
	}
	if (nextLevel === "dance") {
		state.hasCat = true;
		state.catCount++;
		console.log(state.catCount);
		if (state.catCount >= 5) {
			nextLevel = "stopCat";
		}
	}

	container.classList.add("fadeOut");
	setTimeout(() => {
		renderLevel(levels[nextLevel], nextLevel);
		container.classList.remove("fadeOut");
		container.classList.add("fadeIn");
	}, 300);
});

function triggerChallengeSequence() {
	let newFoeImg = document.querySelector("#newFoeImage");
	let champ = document.querySelector("#champ");

	container.classList.add("fadeOut");

	sounds.challenger.play().catch(() => {});
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
			sounds.battle.play().catch(() => {});
			champ.style.visibility = "visible";
			champ.style.left = "40%";
			champ.style.opacity = "1";
		}, 500);
	}, 2250);
}

function triggerOminousSequence() {
	let ominousBlackCube = document.querySelector("#ominousBlackCube");

	sounds.ominous.play().catch(function (error) {
		console.log("Audio playback waiting for user interaction:", error);
	});
	sounds.whisper.play().catch(function (error) {
		console.log("Audio playback waiting for user interaction:", error);
	});

	container.classList.add("fadeOut");
	document.body.style.backgroundColor = "black";
	ominousBlackCube.style.visibility = "visible";
	ominousBlackCube.style.opacity = "1";
	setTimeout(function () {
		toast("Achievement: Cube");
		ominousBlackCube.style.opacity = "0";
		sounds.ominous.pause();
		sounds.ominous.currentTime = 0;
		sounds.whisper.pause();
		sounds.whisper.currentTime = 0;
		document.body.style.backdropFilter = "brightness(0.75)";
		document.body.style.backgroundColor = "slategray";
		container.classList.remove("fadeOut");
		container.classList.add("fadeIn");
		renderLevel(levels["dogCouch"], "dogCouch");
	}, 8000);
}

setTimeout(() => {
	renderLevel(levels.start, "start");
	container.classList.add("fadeIn");
}, 25);
