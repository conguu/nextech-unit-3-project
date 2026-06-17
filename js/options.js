var options = {
    levels: {
        start: {
            message: ["Your alarm clock rings, waking you up."],
            choices: [
                {
                    option: "Get out of bed",
                    nextLevel: "bedroom",
                },

                {
                    option: "Go back to sleep",
                    nextLevel: "dream",
                },
            ]
        },

        bedroom: {
            message: ["You get out of bed."],
            choices: [
                {
                    option: "Turn off alarm clock",
                    nextLevel: "nightStand",
                },

                {
                    option: "Leave your bedroom",
                    nextLevel: "hallNaked",
                },
            ]
        },
    }
}