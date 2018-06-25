$(document).ready(function() {
    // established some global variables 
    var timeDisplay;
    var correct = 0;
    var incorrect = 0;
    var question;
    var answer;
    var correctAnswer;
    var questionIndex = 0;
    // object containing all questions and functions for game
    var triviaGame = {
        // establish the start time
        timer: 15,
        // create question properties
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
                question: "This president is the only president to have served more than two terms in office.",
                choices: ["John Adams", "John Quincy Adams", "Franklin D. Roosevelt", "Ulysses S. Grant"],
                correct_answer: "Franklin D. Roosevelt",
            },
            {
                question: "Who was the president that reestablished relations with the Peoples Repbulic of China?",
                choices: ["Gerald Ford", "Richard Nixon", "Benjamin Harrison", "James Garfield"],
                correct_answer: "Richard Nixon",
            },
            {
                question: "Which president is the only president to blow chunks on a foregin head of state?",
                choices: ["George H. W. Bush", "Calvin Collidge", "George W. Bush", "Harry S. Truman"],
                correct_answer: "George H. W. Bush",
            },
            {
                question: "Which president desegregated the military?",
                choices: ["Bill Clinton", "William Taft", "Abraham Lincoln", "Harry S. Truman"],
                correct_answer: "Harry S. Truman",
            },
            {
                question: "Who was the first Vice President that ascended to the presidency after a president died in office?",
                choices: ["Andrew Johnson", "John Adams", "John Tyler", "Calvin Coolidge"],
                correct_answer: "John Tyler",
            },
            {
                question: "This president is the only president to have never had a party affiliation?",
                choices: ["James Polk", "George Washington", "Franklin Pierce", "Thomas Jefferson"],
                correct_answer: "George Washington",
            },
            {
                question: "This former president begged Woodrow Wilson to be allowed to enlist and go fight in Europe during WWI.",
                choices: ["Theodore Roosevelt", "William Taft", "Warren G. Harding", "Franklin D. Roosevelt"],
                correct_answer: "Theodore Roosevelt",
            },
            {
                question: "This president employed a power move where he would negotiate with people while using the toilet in front of them.",
                choices: ["Bill Clinton", "Donald Trump", "Lyndon B. Johnson", "Herbert Hoover"],
                correct_answer: "Lyndon B. Johnson",
            },
            {
                question: "",
                choices: ["", "", "", ""],
                correct_answer: "",
            },
        ],
        // on click event to start the game
        startGame: $("#start").on("click", function() {
            triviaGame.startTimer();
            triviaGame.displayQuestionAndChoices();
            triviaGame.answerSelection();
            triviaGame.hideStartButton();
        }),
        // function to keep the game running once a question is answered
        continueGame: function() {
            triviaGame.timer = 15;
            triviaGame.clear();
            triviaGame.startTimer();
            triviaGame.displayQuestionAndChoices();
            triviaGame.answerSelection();
            triviaGame.displayFinalScore();
            console.log(questionIndex);
        },
        // funciton that starts the timer and displays it to the user
        startTimer: function() {
            timeElement = $("<h3>");
            $("#timer").html(timeElement);
            timeElement.text("Time Remaining: " + triviaGame.timer);
            timeDisplay = setInterval(triviaGame.countDown, 1000);
        },
        // function that counts the timer down also marks question incorrect if timer runs out
        countDown: function() {
            triviaGame.timer--;
            timeElement.text("Time Remaining: " + triviaGame.timer);
            if (triviaGame.timer === 0) {
                clearInterval(timeDisplay);
                incorrect++;
                triviaGame.clear();
                $("#answer").append("<h3>Sorry, times up. The correct answer is " + correctAnswer + ".</h3>");
                setTimeout(triviaGame.continueGame, 3000);

            }
        },
        // function that displays the questions and choices
        displayQuestionAndChoices: function() {
            questionElement = $("<h2 class=question>");
            question = triviaGame.questions[questionIndex].question;
            correctAnswer = triviaGame.questions[questionIndex].correct_answer;
            questionElement.text(question);
            $("#question").html(questionElement);
            for (i = 0; i < 4; i++) {
                answers = $("<h4 class=choices>");
                answers.text(triviaGame.questions[questionIndex].choices[i])
                $("#choices").append(answers);
            }

        },
        // on click event that selects the player's answer
        answerSelection: function() {
            $(".choices").on("click", function() {
                answer = $(this).text();
                questionIndex++;
                clearInterval(timeDisplay);
                triviaGame.checkAnswer();
            })
        },
        // function that checks the answer
        checkAnswer: function() {
            if (answer === correctAnswer) {
                correct++;
                triviaGame.clear();
                $("#answer").append("<h3>Correct!</h3>");
                setTimeout(triviaGame.continueGame, 3000);

            } else {
                incorrect++;
                triviaGame.clear();
                $("#answer").append("<h3>Sorry, the correct answer is " + correctAnswer + ".</h3>");
                setTimeout(triviaGame.continueGame, 3000);

            }
        },
        // clears all html inputs
        clear: function() {
            $("#choices, #questions, #correct, #incorrect, #answer").empty();
        },


        //displays the results after all 10 questions have been viewed
        displayFinalScore: function() {
            if (questionIndex > 9) {
                var correctElement = $("<h3 id=correct>");
                var incorrectElement = $("<h3 id=incorrect>");
                correctElement.text("Correct Answers: " + correct);
                incorrectElement.text("Incorrect Answers: " + incorrect);
                $("#answer").prepend(correctElement, incorrectElement);
                clearInterval(timeDisplay);
                $("#choices, .question, #timer").empty();
                triviaGame.showRestartButton();
            }
        },
        //Hides the start button
        hideStartButton: function() {
            $("#start").hide();
        },
        // hides restart button
        hideRestartButton: function() {
            $("#restart").hide();
        },
        // shows restart button
        showRestartButton: function() {
            $("#restart").show();
        },
        // on click event for restart button
        restartButton: $("#restart").on("click", function() {
            questionIndex = 0;
            clearInterval(timeDisplay);
            question.timer = 15;
            triviaGame.clear();
            triviaGame.startTimer();
            triviaGame.displayQuestionAndChoices();
            triviaGame.answerSelection();
            triviaGame.hideStartButton();
            triviaGame.hideRestartButton();
            correct = 0;
            incorrect = 0;
        }),


    };
    // hides the restart button at the begining
    triviaGame.hideRestartButton();
})