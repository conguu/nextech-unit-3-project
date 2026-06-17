let container = document.querySelector("#container");
let title = document.querySelector("#title");
let choicesContainer = document.querySelector("#choices");

var past = [options.levels.start];
var firstLevel = options.levels.start;
renderLevel(firstLevel);

choicesContainer.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        let clickedButton = event.target;
        var nextLevel = clickedButton.getAttribute("data-next-level");
        
        container.classList.add("fadeOut");
        renderLevel(options.levels[nextLevel]);
        
        console.log("below is the normal thing passed in when choice is clicked");
        console.log(options.levels[nextLevel]);
        
        container.classList.remove("fadeOut");
        container.classList.add("fadeIn");
        
        past.push(options.levels[nextLevel]);
        console.log(past);
    }
});

function renderLevel(level) {
    choicesContainer.innerHTML = "";
    
    if (!level.message || level.message.length === 0) {
        callback();
        return;
    }

    title.innerHTML = level.message[0];
    
    if (level.message.length > 1) {
        let i = 1;
        
        function time() {
            setTimeout(function() {
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
    } else {callback();}
    
    function callback() {
        choicesContainer.innerHTML = "";

        var levelChoices = level.choices;
        if (levelChoices) {
            for (var i = 0; i < levelChoices.length; i++) {
                var choiceData = levelChoices[i];
                var nextLevelAttr = choiceData.nextLevel;
                var buttonText = choiceData.option;

                choicesContainer.insertAdjacentHTML(
                    "beforeend", 
                    "<button data-next-level='" + nextLevelAttr + "'>" + buttonText + "</button>"
                );
            }
        }
    }
}