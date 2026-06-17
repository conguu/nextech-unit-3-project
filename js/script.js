let container = document.querySelector("#container");
let title = document.querySelector("#title");
let choices = document.querySelector("#choices");
let choice = document.querySelector("#choices button");

var past = [options.levels.start];
var firstLevel = options.levels.start;
renderLevel(firstLevel);

choice.addEventListener("click", function() {
    var nextLevel = $(this).attr("data-next-level");
    $("#container").animateCss("fadeOut", function() {
        renderLevel(options.levels[nextLevel]);
        
        console.log("below is the normal thing passed in when choice is clicked");
        console.log(options.levels[nextLevel]);
        
        $("#container").removeClass("fadeOut");
        $("#container").addClass("fadeIn");
        
        past.push(option.levels[nextLevel]);
        console.log(past);
    
        
    });
});

function renderLevel(level) {
    choices.innerHTML = "";
    title.innerHTML = level.message[0];
        
    if(level.message.length !== 0){
        let i = 1;
        
        function time(){
            setTimeout(function() {
                $("#title").text(level.message[i]); 
                i ++;
                
                if (i < level.message.length){  //wait before the function is executed again
                    time()
                }else{
                    callback(); //
                }
            }, 1500)
        }
        
        time();
    }
    // this line below need to be execute after the if loop is over.
    
    function callback(){
        $("#choices").empty();
    

        var choices = level.choices;
        if (choices) {
            for (var i = 0; i < choices.length; i++) {
                var choice = choices[i];
                $("#choices").append("<button class='btn btn-outline-secondary' data-next-level='" + choice.nextLevel + "'>" + choice.text + "</button>");
            }
        }
    }
}