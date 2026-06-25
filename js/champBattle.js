function triggerChallengeSequence() {
	let newFoeImg = document.querySelector("#newFoeImage");
	let champ = document.querySelector("#champ");
	let battleUI = document.querySelector("#battleUI");

	container.classList.add("fadeOut");

	sounds.challenger.play().catch(() => {});
	newFoeImg.style.visibility = "visible";
	newFoeImg.style.left = "49.95%";
	newFoeImg.style.transform = "translateX(-50%)";
	newFoeImg.style.opacity = "1";

	setTimeout(function () {
		document.querySelector("body").style.fontFamily = "Pokemon";
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
	let champHP = 100;
	let playerAbilities = [
		{ name: "Punch", damage: 5, cooldown: 0 },
		{ name: "Kick", damage: 15, cooldown: 1 },
		{ name: "Shoe Throw", damage: 25, cooldown: 2 },
	];
	let playerItems = state.hasCat ? [{ name: "Cat", damage: 50, uses: 1 }] : [];
	let playerRun = false;
	let champAbilities = [
		{ name: "Punch", damage: 5, cooldown: 0 },
		{ name: "Pose", damage: 10, cooldown: 1 },
		{ name: "Chain Whip", damage: 25, cooldown: 2 },
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

	let options = document.querySelector("#battleOptions");
	let msg = document.querySelector("#battleMessage");

	updateHPBars();
	menuReset();
	typeMessage("A wild CHAMP appeared!");

	function menuReset() {
		options.classList.remove("compact");
		options.innerHTML = `
			<button>FIGHT</button>
			<button>ITEMS</button>
			<button>RUN</button>
			`;
	}

	function typeMessage(text, callback) {
		msg.innerHTML = "";
		let i = 0;
		function type() {
			if (i < text.length) {
				msg.innerHTML += text[i];
				i++;
				setTimeout(type, 50);
			} else if (callback) {
				callback();
			}
		}
		type();
	}

	function hideElement(element) {
		element.classList.add("fadeOut");
		element.style.opacity = "0";
		element.style.visibility = "hidden";
	}

	options.addEventListener("click", function (e) {
		let btn = e.target.closest("button");
		if (!btn) return;

		if (btn.textContent === "FIGHT") {
			options.innerHTML = "";
			options.classList.add("compact");
			playerAbilities.forEach(function (ability) {
				options.insertAdjacentHTML("beforeend", `<button>${ability.name.toUpperCase()}</button>`);
			});
			options.insertAdjacentHTML("beforeend", `<button>BACK</button>`);
		} else if (btn.textContent === "ITEMS") {
			options.innerHTML = "";
			if (playerItems.length === 0) {
				options.insertAdjacentHTML("beforeend", `<button style="pointer-events: none"> (NO ITEMS) </button>`)
			} else {
				playerItems.forEach(function (item) {
					options.insertAdjacentHTML("beforeend", `<button>${item.name.toUpperCase()}</button>`);
				});
			}
			options.insertAdjacentHTML("beforeend", `<button>BACK</button>`);
		} else if (btn.textContent === "RUN") {
			typeMessage("YOU run away.");
			setTimeout(() => {
				hideElement(champ);
				hideElement(battleUI);
				sounds.battle.pause();
				sounds.battle.currentTime = 0;

				setTimeout(() => {
					document.querySelector("body").style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
					container.classList.remove("fadeOut");
					renderLevel(levels["hi"], "hi");
				}, 250);
			}, 2500);
		} else {
			menuReset();
		}
	});
}
