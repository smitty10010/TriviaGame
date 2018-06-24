$(document).ready(function() {
    // create an object that has 10 questions and anwers
    var timeDisplay;
    var correct = 0;
    var incorrect = 0;
    var question;
    var answer;
    var correctAnswer;
    var questionIndex = 0;

    var triviaGame = {
        timeRunning: false,
        timer: 15,
        questions: [{
                question: "Which US president was a licensed bartender?",
                choices: ["Abraham Lincoln", "Barak Obama", "Grover Cleavland", "Benjamin Franklin"],
                correct_answer: "Abraham Lincoln",
            },
            {
                question: "Which US president subdued his own would be assassin?",
                choices: ["Ronald Reagen", "Abraham Lincoln", "Daniel Day-Lewis", "Andrew Jackson"],
                correct_answer: "Andrew Jackson",
            },
            {
                question: "what is abc3?",
                choices: ["a3", "b", "c", "d"],
                correct_answer: "c",
            },
            {
                question: "what is abc4?",
                choices: ["a", "b", "c", "d"],
                correct_answer: "c",
            },
            {
                question: "what is abc5?",
                choices: ["a", "b", "c", "d"],
                correct_answer: "c",
            },
            {
                question: "what is abc6?",
                choices: ["a", "b", "c", "d"],
                correct_answer: "c",
            },
            {
                question: "what is abc7?",
                choices: ["a", "b", "c", "d"],
                correct_answer: "c",
            },
            {
                question: "what is abc8?",
                choices: ["a", "b", "c", "d"],
                correct_answer: "c",
            },
            {
                question: "what is abc9?",
                choices: ["a", "b", "c", "d"],
                correct_answer: "c",
            },
            {
                question: "what is abc10?",
                choices: ["a", "b", "c", "d"],
                correct_answer: "c",
            },
        ],
        startGame: $("#start").on("click", function() {
            triviaGame.startTimer();
            triviaGame.displayQuestionAndChoices();
            triviaGame.answerSelection();
            triviaGame.hideStartButton();
        }),
        continueGame: function() {
            triviaGame.timer = 15;
            triviaGame.startTimer();
            triviaGame.displayQuestionAndChoices();
            triviaGame.answerSelection();
            triviaGame.displayFinalScore();
        },
        startTimer: function() {
            newDiv = $("<div>");
            $("#timer").html(newDiv);
            newDiv.text("Time Remaining: " + triviaGame.timer);
            timeDisplay = setInterval(triviaGame.countDown, 1000);
        },
        countDown: function() {
            triviaGame.timer--;
            newDiv.text("Time Remaining: " + triviaGame.timer);
            if (triviaGame.timer === 0) {
                clearInterval(timeDisplay);
                incorrect++;
                triviaGame.continueGame();
            }
        },

        displayQuestionAndChoices: function() {
            questionElement = $("<h2 class=question>");
            question = triviaGame.questions[questionIndex].question;
            correctAnswer = triviaGame.questions[questionIndex].correct_answer;
            questionElement.text(question);
            $("#question").html(questionElement);
            for (i = 0; i < 4; i++) {
                answers = $("<h4 class=choices>");
                $("#choices").append(answers.text(triviaGame.questions[questionIndex].choices[i]));
            }
            questionIndex++;
        },
        answerSelection: function() {
            $(".choices").on("click", function() {
                answer = $(this).text();
                clearInterval(timeDisplay);
                triviaGame.checkAnswer();
            })
        },
        checkAnswer: function() {
            if (answer === correctAnswer) {
                alert("correct");
                correct++;
                console.log("correct: " + correct);
                triviaGame.continueGame();
            } else {
                alert("incorrect");
                incorrect++;
                console.log("incorrect: " + incorrect);
                triviaGame.continueGame();
            }
        },
        displayFinalScore: function() {
            if (questionIndex > 3) {
                $("#answers").append(correct, incorrect);
            }
        },
        hideStartButton: function() {
            $("#start").hide();
        }


    };
    console.log(triviaGame.questions);
    // create an on click event to start the whole game


    // triviaGame.startTimer();

    // on click shows first question and starts the timer
    // timer will last 15 seconds per a question
    // if timer runs out then answer is displayed and then moves on to next question
    // if player selects the correct answer then correct is displayed for 5 seconds then moves on to next question
    // if player selects incorrect answer then the correct answer is displayed for 5 seconds then moves on to next question
    // after question 10 is finished then display total wrong answers and total correct ansers and a reset button
})