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
	let typeTimeout = null;
	let defaultMessage = "A wild CHAMP appeared!";

	let playerAbilities = [
		{ name: "Punch", damage: 5, cooldown: 0 },
		{ name: "Kick", damage: 15, cooldown: 1 },
		{ name: "Shoe Throw", damage: 25, cooldown: 3 },
	];
	let playerBag = state.hasCat ? [{ name: "Cat", damage: 50, uses: 1 }] : [];
	let cooldowns = { Punch: 0, Kick: 0, "Shoe Throw": 0 };
	let champAbilities = [
		{ name: "Punch", damage: 5, cooldown: 0 },
		{ name: "Pose", damage: 10, cooldown: 1 },
		{ name: "Chain Whip", damage: 25, cooldown: 2 },
		{ name: "Flash", damage: 35, cooldown: 2 },
		{ name: "Boogie", heal: 30, cooldown: 3 },
	];

	let cursorIndex = 0;
	let currentMenu = "main";
	let menuBag = [];
	let keyboardHandler = null;

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
	typeMessage(defaultMessage);

	function menuReset() {
		options.classList.remove("compact");
		options.innerHTML = `
			<div class="menu-row"><span class="cursor">&#9656;</span><span class="menu-item" data-action="FIGHT">FIGHT</span></div>
			<div class="menu-row"><span class="cursor">&#9656;</span><span class="menu-item" data-action="BAG">BAG</span></div>
			<div class="menu-row"><span class="cursor">&#9656;</span><span class="menu-item" data-action="RUN">RUN</span></div>
		`;
		currentMenu = "main";
		menuBag = ["FIGHT", "BAG", "RUN"];
		cursorIndex = 0;
		updateCursor();
		setupKeyboard();
	}

	function buildFightMenu() {
		options.innerHTML = "";
		options.classList.add("compact");
		menuBag = [];
		playerAbilities.forEach(function (ability) {
			let cd = cooldowns[ability.name];
			let disabled = cd > 0;
			let cls = disabled ? "menu-item disabled" : "menu-item";
			options.insertAdjacentHTML("beforeend",
				`<div class="menu-row"><span class="cursor">&#9656;</span><span class="${cls}" data-action="${ability.name.toUpperCase()}">${ability.name.toUpperCase()}</span></div>`
			);
			menuBag.push(ability.name.toUpperCase());
		});
		options.insertAdjacentHTML("beforeend",
			`<div class="menu-row"><span class="cursor">&#9656;</span><span class="menu-item" data-action="BACK">BACK</span></div>`
		);
		menuBag.push("BACK");
		currentMenu = "fight";
		cursorIndex = 0;
		updateCursor();
		setupKeyboard();

		// Hover detail handlers for ability items
		let rows = options.querySelectorAll(".menu-row");
		rows.forEach((row, i) => {
			let item = row.querySelector(".menu-item");
			if (!item || item.dataset.action === "BACK") return;
			let ability = playerAbilities.find(a => a.name.toUpperCase() === item.dataset.action);
			if (!ability) return;
			item.addEventListener("mouseenter", () => {
				let cd = cooldowns[ability.name];
				let cdText = cd > 0 ? ` (cooldown ${cd} turn${cd > 1 ? 's' : ''})` : "";
				typeMessage(`${ability.name}: -${ability.damage} HP, ${ability.cooldown} turn cooldown.${cdText}`);
			});
			item.addEventListener("mouseleave", () => {
				if (typeTimeout) clearTimeout(typeTimeout);
				msg.innerHTML = defaultMessage;
			});
		});
	}

	function buildBagMenu() {
		options.innerHTML = "";
		menuBag = [];
		if (playerBag.length === 0) {
			options.insertAdjacentHTML("beforeend",
				`<div class="menu-row"><span class="cursor">&#9656;</span><span class="menu-item disabled" data-action="EMPTY">(EMPTY)</span></div>`
			);
			menuBag.push("EMPTY");
		} else {
			playerBag.forEach(function (item) {
				options.insertAdjacentHTML("beforeend",
					`<div class="menu-row"><span class="cursor">&#9656;</span><span class="menu-item" data-action="${item.name.toUpperCase()}">${item.name.toUpperCase()}</span></div>`
				);
				menuBag.push(item.name.toUpperCase());
			});
		}
		options.insertAdjacentHTML("beforeend",
			`<div class="menu-row"><span class="cursor">&#9656;</span><span class="menu-item" data-action="BACK">BACK</span></div>`
		);
		menuBag.push("BACK");
		currentMenu = "bag";
		cursorIndex = 0;
		updateCursor();
		setupKeyboard();

		// Hover detail handlers for bag items
		let rows = options.querySelectorAll(".menu-row");
		rows.forEach((row, i) => {
			let item = row.querySelector(".menu-item");
			if (!item || item.dataset.action === "BACK" || item.dataset.action === "EMPTY") return;
			let bagItem = playerBag.find(b => b.name.toUpperCase() === item.dataset.action);
			if (!bagItem) return;
			item.addEventListener("mouseenter", () => {
				typeMessage(`${bagItem.name}: -${bagItem.damage} HP, ${bagItem.uses} use${bagItem.uses !== 1 ? 's' : ''} left.`);
			});
			item.addEventListener("mouseleave", () => {
				if (typeTimeout) clearTimeout(typeTimeout);
				msg.innerHTML = defaultMessage;
			});
		});
	}

	function updateCursor() {
		let rows = options.querySelectorAll(".menu-row");
		rows.forEach((row, i) => {
			let cursor = row.querySelector(".cursor");
			if (cursor) {
				cursor.style.visibility = i === cursorIndex ? "visible" : "hidden";
			}
		});
	}

	function setupKeyboard() {
		if (keyboardHandler) {
			document.removeEventListener("keydown", keyboardHandler);
		}
		keyboardHandler = function (e) {
			if (e.key === "ArrowDown") {
				e.preventDefault();
				let rows = options.querySelectorAll(".menu-row");
				let visibleBag = [];
				rows.forEach((row, i) => {
					let item = row.querySelector(".menu-item");
					if (item && !item.classList.contains("disabled")) {
						visibleBag.push(i);
					}
				});
				if (visibleBag.length === 0) return;
				let currentPos = visibleBag.indexOf(cursorIndex);
				if (currentPos < visibleBag.length - 1) {
					cursorIndex = visibleBag[currentPos + 1];
				} else {
					cursorIndex = visibleBag[0];
				}
				updateCursor();
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				let rows = options.querySelectorAll(".menu-row");
				let visibleBag = [];
				rows.forEach((row, i) => {
					let item = row.querySelector(".menu-item");
					if (item && !item.classList.contains("disabled")) {
						visibleBag.push(i);
					}
				});
				if (visibleBag.length === 0) return;
				let currentPos = visibleBag.indexOf(cursorIndex);
				if (currentPos > 0) {
					cursorIndex = visibleBag[currentPos - 1];
				} else {
					cursorIndex = visibleBag[visibleBag.length - 1];
				}
				updateCursor();
			} else if (e.key === " " || e.key === "Space" || e.key === "Enter") {
				e.preventDefault();
				let action = menuBag[cursorIndex];
				if (!action) return;
				handleAction(action);
			}
		};
		document.addEventListener("keydown", keyboardHandler);
	}

	function handleAction(action) {
		if (currentMenu === "main") {
			if (action === "FIGHT") {
				buildFightMenu();
			} else if (action === "BAG") {
				buildBagMenu();
			} else if (action === "RUN") {
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
			}
		} else if (currentMenu === "fight") {
			if (action === "BACK") {
				menuReset();
				return;
			}
			let ability = playerAbilities.find(a => a.name.toUpperCase() === action);
			if (ability) {
				let cd = cooldowns[ability.name];
				if (cd > 0) return;
				executeAbility(ability);
			}
		} else if (currentMenu === "bag") {
			if (action === "BACK") {
				menuReset();
				return;
			}
			let item = playerBag.find(i => i.name.toUpperCase() === action);
			if (item) {
				executeItem(item);
			}
		}
	}

	function executeAbility(ability) {
		if (keyboardHandler) {
			document.removeEventListener("keydown", keyboardHandler);
			keyboardHandler = null;
		}

		champHP = Math.max(0, champHP - ability.damage);
		cooldowns[ability.name] = ability.cooldown;
		for (let a of playerAbilities) {
			if (cooldowns[a.name] > 0) cooldowns[a.name]--;
		}
		updateHPBars();

		typeMessage(`You used ${ability.name}!`, function () {
			setTimeout(() => {
				let randChance = Math.floor(Math.random() * 10) + 1;

				if (ability.name === "Punch") {
					if (randChance <= 5) {
						typeMessage("It's not very effective...");
					} else {
						typeMessage("It's almost completely ineffective...");
					}
				} else if (ability.name === "Shoe Throw") {
					if (randChance <= 3) {
						typeMessage("It's super effective!");
					} else if (randChance <= 7) {
						typeMessage("It's incredibly effective!");
					} else {
						typeMessage("効果はバツグン！");
					}
				}

				setTimeout(() => {
					menuReset();
				}, 2000);
			}, 1000);
		});
	}

	function executeItem(item) {
		if (keyboardHandler) {
			document.removeEventListener("keydown", keyboardHandler);
			keyboardHandler = null;
		}

		champHP = Math.max(0, champHP - item.damage);
		item.uses--;
		updateHPBars();

		typeMessage(`You used ${item.name}! It's super effective!`, function () {
			setTimeout(() => {
				menuReset();
			}, 2000);
		});
	}

	function typeMessage(text, callback) {
		msg.innerHTML = "";
		if (typeTimeout) clearTimeout(typeTimeout);
		let i = 0;
		function type() {
			if (i < text.length) {
				msg.innerHTML += text[i];
				i++;
				typeTimeout = setTimeout(type, 50);
			} else {
				typeTimeout = null;
				if (callback) callback();
			}
		}
		type()
	}

	function hideElement(element) {
		element.classList.add("fadeOut");
		element.style.opacity = "0";
		element.style.visibility = "hidden";
	}
}
