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
            message: ["You get out of bed, alarm clock still ringing."],
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

        dream: {
            message: ["You go back to sleep, dreaming of..."],
            choices: [
                {
                    option: "Falling off of a building",
                    nextLevel: "creed",
                },

                {
                    option: "67",
                    nextLevel: "sixseven",
                },
            ]
        },

            creed: {
                message: [""],
                choices: [
                    {
                        option: "Wake up",
                        nextLevel: "start",
                    },
                ]
            },

            sixseven: {
                message: [""],
                choices: [
                    {
                        option: "Wake up",
                        nextLevel: "start",
                    },
                ]
            },
    }
}