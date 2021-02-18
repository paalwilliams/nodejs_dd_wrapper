const getQuestions = (mounts, notNull) => {
    let questions = [
        {
        type: "list",
        name: "disksel",
        message: "Choose Your disk",
        choices: mounts,
        validate: notNull,
        },
        {
        type: "input",
        name: "imgpath",
        message: "Input the path to your image",
        validate: notNull,
        },
        {
        type: "confirm",
        name: "output",
        message: "Would you like visible status output?",
        default: false,
        },
    ]
    return questions
};

module.exports = getQuestions;
    