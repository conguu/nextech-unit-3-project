function triggerChallengeSequence() {
	let newFoeImg = document.querySelector("#newFoeImage");
	let champ = document.querySelector("#champ");
	let battleUI = document.querySelector("#battleUI");

	container.classList.add("fadeOut");

	sounds.challenger.play().catch(() => {});
	newFoeImg.style.visibility = "visible";
	newFoeImg.style.left = "50%";
	newFoeImg.style.transform = "translateX(-50%)";
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
			champ.style.left = "50%";
			champ.style.transform = "translateX(-50%)";
			champ.style.opacity = "1";

			battleUI.style.visibility = "visible";
			battleUI.style.opacity = "1";
			champBattle();
		}, 500);
	}, 2250);
}

function champBattle() {
	let playerHP = 100;
	let champHP = 90;

	let playerOptions = {
		fight: [
			{ name: "Punch", damage: 5, cooldown: 0 },
			{ name: "Kick", damage: 15, cooldown: 1 },
			{ name: "Fireball", damage: 20, cooldown: 2 },
			{ name: "Shoe Throw", damage: 30, cooldown: 2 },
		],
		item: state.hasCat ? { name: "Cat", damage: 50, uses: 1 } : {},
		run: false,
	};

	let champAbilities = [
		{ name: "Punch", damage: 5, cooldown: 0 },
		{ name: "Pose", damage: 10, cooldown: 1 },
		{ name: "Chain Whip", damage: 30, cooldown: 2 },
		{ name: "Flash", damage: 35, cooldown: 2 },
		{ name: "Boogie", heal: 30, cooldown: 3 },
	];

	function updateHPBars() {
		let champPercent = Math.max(0, (champHP / 100) * 100);
		document.querySelector("#champHpBar").style.width = champPercent + "%";
		document.querySelector("#champHP").textContent = champHP + " / 100";

		let playerPercent = Math.max(0, (playerHP / 100) * 100);
		document.querySelector("#playerHpBar").style.width = playerPercent + "%";
		document.querySelector("#playerHP").textContent = playerHP + " / 100";

		if (champPercent <= 30) document.querySelector("#champHpBar").style.background = "#e74c3c";
		if (playerPercent <= 30) document.querySelector("#playerHpBar").style.background = "#e74c3c";
	}

	updateHPBars();
}
