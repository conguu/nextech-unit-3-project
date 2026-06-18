function createAudio(src, volume = 1) {
  const audio = new Audio(src);
  audio.volume = volume;
  return audio;
}

const sounds = {
	alarm: createAudio("assets/audio/alarm.mp3"),
	oof: createAudio("assets/audio/oof.mp3"),
	creed: createAudio("assets/audio/creed.mp3", 0.2),
	sixseven: createAudio("assets/audio/sixseven.mp3", 0.1),
	crash: createAudio("assets/audio/crash.mp3", 0.8),
	slip: createAudio("assets/audio/slip.mp3", 0.8),
	ominous: createAudio("assets/audio/ominous.mp3"),
	whisper: createAudio("assets/audio/whisper.mp3"),
	cat: createAudio("assets/audio/cat.mp3", 0.8),
	challenger: createAudio("assets/champ/challenger.mp3", 0.4),
	battle: createAudio("assets/champ/battle.mp3", 0.8),
};

function stopAllSounds() {
  Object.values(sounds).forEach(s => { s.pause(); s.currentTime = 0; });
}

function showAchievement(text) {
	Toastify({
		text,
		duration: 3000,
		close: false,
		gravity: "bottom",
		position: "right",
		stopOnFocus: true,
		className: "button",
	}).showToast();
}

const state = {
  catCount: 0,
  hasCat: false,
};

function resetState() {
  state.catCount = 0;
  state.hasCat = false;
}