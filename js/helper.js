let container = document.querySelector("#container");
let title = document.querySelector("#title");
let choicesContainer = document.querySelector("#choices");
let eventContainer = document.querySelector("#eventContainer");
let cat = document.querySelector("#cat");

function createAudio(src, volume = 1) {
	const audio = new Audio(src);
	audio.volume = volume;
	return audio;
}

const sounds = {
	alarm: createAudio("assets/audio/alarm.mp3", 0.5),
	oof: createAudio("assets/audio/oof.mp3", 0.5),
	creed: createAudio("assets/audio/creed.mp3", 0.1),
	sixSeven: createAudio("assets/audio/sixSeven.mp3", 0.05),
	crash: createAudio("assets/audio/crash.mp3", 0.4),
	slip: createAudio("assets/audio/slip.mp3", 0.4),
	ominous: createAudio("assets/audio/ominous.mp3"),
	whisper: createAudio("assets/audio/whisper.mp3"),
	cat: createAudio("assets/audio/cat.mp3", 0.7),
	challenger: createAudio("assets/champ/challenger.mp3", 0.2),
	battle: createAudio("assets/champ/battle.mp3", 0.4),
};

function stopAllSounds() {
	Object.values(sounds).forEach((s) => {
		s.pause();
		s.currentTime = 0;
	});
}

const state = {
	catCount: 0,
	hasCat: false,
	catLeft: false,
	achievementGiven: false,
	visited: new Set(),
};

function resetState() {
	state.catCount = 0;
	state.hasCat = false;
	state.catLeft = false;
	state.achievementGiven = false;
	state.visited.clear();
	stopAllSounds();
}

function toast(text) {
	Toastify({
		text,
		duration: 5000,
		close: false,
		gravity: "bottom",
		position: "right",
		stopOnFocus: true,
		className: "button",
	}).showToast();
}