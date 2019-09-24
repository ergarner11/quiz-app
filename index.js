'use strict';

let currentQuestion = 0;
let currentScore = 0; 

function handleStartQuiz(){
    $('main').on('submit','#js-start-quiz', function( event ){
        event.preventDefault();
        startQuiz();
    });
}

function startQuiz(){
    currentQuestion = 0;
    currentScore = 0;

    $('header').html(`<span class="js-question-tracker"></span>
                    <span class="js-score-tracker"></span>`)
    updateQuestionTracker();
    updateScoreTracker();
    renderNextQuestion();
}

function updateQuestionTracker(){
    $('.js-question-tracker').html(`Question: ${currentQuestion + 1}/${QUESTIONS.length}`);
}

function updateScoreTracker(){
    $('.js-score-tracker').html(`Current Score: ${currentScore}`);
}

function renderNextQuestion(){
    let newHtmlString = `<form role="form" id="js-submit-answer">
                    <p>${QUESTIONS[currentQuestion].question}</p>
                    <label>
                        <input type="radio" name="answer" value=0 required> ${QUESTIONS[currentQuestion].answers[0]}
                    </label>
                    <label>
                        <input type="radio" name="answer" value=1 required> ${QUESTIONS[currentQuestion].answers[1]}
                    </label>
                    <label>
                        <input type="radio" name="answer" value=2 required> ${QUESTIONS[currentQuestion].answers[2]}
                    </label>
                    <label>
                        <input type="radio" name="answer" value=3 required> ${QUESTIONS[currentQuestion].answers[3]}
                    </label>
                    <button type="submit">Submit</button>
                </form>`
    $('main').html(newHtmlString);
}

function handleSubmitResponse(){
    $('main').on('submit','#js-submit-answer', function(event){
        event.preventDefault();
        let indexOfResponse = $('input[name=answer]:checked').val()

        let correctResponse = (indexOfResponse == QUESTIONS[currentQuestion].indexOfCorrectAnswer);

        if(correctResponse){
            currentScore++;
        }

        updateScoreTracker();
        renderQuestionResults(correctResponse);
    });
}

function renderQuestionResults(correctResponse){
    let newHtmlString = getQuestionResultsHtml(correctResponse)
    $('main').html(newHtmlString);
}

function getQuestionResultsHtml(correctResponse){
    if( correctResponse){
        return `<form role="form" id="js-next-question">
                    <p class="feedback">That's correct!</p>
                    <button type="submit">Next</button>
                </form>`
    }

    return `<form role="form" id="js-next-question">
                <p class="feedback">Sorry, that's incorrect!</p>
                <p>The correct answer is 
                    ${QUESTIONS[currentQuestion].answers[QUESTIONS[currentQuestion].indexOfCorrectAnswer]}</p>
                <button type="submit">Next</button>
            </form>`
}

function handleNextQuestion(){
    $('main').on('submit','#js-next-question', function(event){
        event.preventDefault();
        currentQuestion++;

        if( currentQuestion < QUESTIONS.length ){
            updateQuestionTracker();
            renderNextQuestion();
        }
        else{
            renderQuizResults();
        }
    });
}

function renderQuizResults(){
    $('header').html('<h1>Music Quiz</h1>');

    let newHtmlString = `<form role="form" id="js-quiz-results">
                            <p>Congratulations! Your score is ${currentScore}/${QUESTIONS.length}</p>
                            <p>To learn more about these and other random music facts, click 
                                <a href="https://bestlifeonline.com/music-facts/
                                ?fbclid=IwAR0aBQccjRXkY6qeKrYpql--58kYF93E_t_R1mANkXr6Jd0p8ubzbl4YIJk" target="_blank">here</a>
                            </p>
                            <button type="submit">Try Again</button>
                        </form>`
    $('main').html(newHtmlString);
}

function handleRestartQuiz(){
    $('main').on('submit','#js-quiz-results', function(event){
        event.preventDefault();
        startQuiz();
    });
}

function setup(){
    handleStartQuiz();
    handleSubmitResponse();
    handleNextQuestion();
    handleRestartQuiz();
}

$(setup);