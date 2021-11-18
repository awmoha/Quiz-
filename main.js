const questions = [
    {
      question: "Raskar räven över isen?",
      type: "radiobutton",
      answers: [
        { text: "Sant", isCorrect: true },
        { text: "Falskt", isCorrect: false }
      ]
    },
    {
      question:
        "Är mors lilla Olle i skogen?",
      type: "radiobutton",
      answers: [
        { text: "Sant", isCorrect: true },
        { text: "Falskt", isCorrect: false }
      ]
    },
    {
      question: "Har du en gris i säcken?",
      type: "radiobutton",
      answers: [
        { text: "Sant", isCorrect: false },
        { text: "Falskt", isCorrect: true }
      ]
    },
    {
      question: "Blir det snö i vinter?",
      type: "radiobutton",
      answers: [
        { text: "Ja", isCorrect: false },
        { text: "Nej", isCorrect: false },
        { text: "Kanske", isCorrect: true }
      ]
    },
    {
      question: 'Finns det någon fisk i sjön?',
      type: "radiobutton",
      answers: [
        { text: "Ja", isCorrect: true },
        { text: "Nej", isCorrect: false },
        { text: "Kanske", isCorrect: false }
      ]
    },
    {
      question: "Vad heter gås i plural?",
      type: "radiobutton",
      answers: [
        { text: "Gåsar", isCorrect: false },
        { text: "Gäss", isCorrect: true },
        { text: "Gäster", isCorrect: false }
      ]
    },
    {
      question: 'Markera alla ord som innheåller ordet "björn"?',
      type: "checkbox",
      answers: [
        { text: "Björnbär", isCorrect: true },
        { text: "Björntjänst", isCorrect: true },
        { text: "Bamse", isCorrect: false },
        { text: "Gummibjörn", isCorrect: true }
      ]
    }

   
  
  ];
  
  let allAnswers = [];
  
  const welcomeScreen = document.querySelector("#welcome");
  const startButton = document.querySelector("#start_button");
  
  const questionScreen = document.querySelector("#question_container");
  const questionTitleContainer = document.querySelector("#question_title");
  const questionAnswersContainer = document.querySelector(
    "#question_answer_options"
  );
  const nextButton = document.querySelector("#question_button_next");
  const resetButton = document.querySelector("#question_button_reset");
  const errorMessage = document.querySelector("#question_error");
  
  const answersScreen = document.querySelector("#answers_container");
  const startOverButton = document.querySelector("#answers_button_reset");
  const scoreLabel = document.querySelector("#answers_score");
  const answersContent = document.querySelector("#answers_content");
  
  const screens = [welcomeScreen, questionScreen, answersScreen];
  const SCREEN_WELCOME = 0;
  const SCREEN_QUESTION = 1;
  const SCREEN_ANSWERS = 2;
  
  function showScreen(screenIndex) {
    screens.forEach((screen, index) => {
      if (screenIndex === index) {
        screen.hidden = false;
      } else {
        screen.hidden = true;
      }
    });
  }
  
  function startQuiz() {
    showScreen(SCREEN_QUESTION);
    // Visa första frågan
    showQuestion(0);
  }
  
  let currentQuestionIndex = 0;
  function showQuestion(questionIndex) {
    // Spara aktuellt fråge index för att användas av nästa knapp event list
    currentQuestionIndex = questionIndex;
    //Hämta aktuellt frågeobjekt
    let question = questions[questionIndex];
    // Lägg fråga title i DOM
    questionTitleContainer.textContent = question.question;
    // Skapa HTML string med svararet
    let answersHtml = "";
    question.answers.forEach((answer, answerIndex) => {
      answersHtml += createAnswerOptionHtml(
        question.type,
        answer.text,
        answerIndex
      );
    });
    // Lägg till HTML-svar i containerns DOM
    questionAnswersContainer.innerHTML = answersHtml;
  
    // Ställ in nästa knapptext
    if (questionIndex === questions.length - 1) {
      nextButton.textContent = "Get results!";
    } else {
      nextButton.textContent = "Next";
    }
  }
  
  function createAnswerOptionHtml(type, text, answerIndex) {
    if (type === "radiobutton") {
      return `
      <div class="label_cover">
        <input type="radio" name="answer" id="${answerIndex}">
        <label for="${answerIndex}" class="label_radio">${text}</label>
      </div>
     `;
    } else {
      return `
      <div class="label_cover">
        <input type="checkbox" name="answer" id="${answerIndex}">
        <label for="${answerIndex}" class="label_checkbox">${text}</label>
      </div>`;
    }
  }
  
  function getAnswersFromInputs(answerInputs) {
    let answers = [];
    answerInputs.forEach((input) => {
      answers.push(input.checked === true);
    });
    return answers;
  }
  
  function showResults() {
    showScreen(SCREEN_ANSWERS);
  
    let score = 0;
    let resultsHtml = "";
    questions.forEach((question, questionIndex) => {
      // Ta svar på fråga från den svarsgruppen
      let questionAnswers = allAnswers[questionIndex];
  
      // Kontrollera om svaret är rätt och öka poängen om det är det.
      let isCorrect = question.answers.every((answer, answerIndex) => {
        return answer.isCorrect === questionAnswers[answerIndex];
      });
      if (isCorrect) {
        score++;
      }
  
      // Skapa HTML med frågor och svar och lägg till det i resultatinnehålls
      resultsHtml += createResultsHtml(question, questionAnswers);
    });
    answersContent.innerHTML = resultsHtml;
  
    let scoreColor;
    if (score > 0.90 * questions.length) {
      scoreColor = "green";
    } else if (score > 0.5 * questions.length  ) {
      scoreColor = "orange";
    } else {
      scoreColor = "red";
    }
    scoreLabel.textContent = `Correct answers: ${score}/${questions.length}`;
    scoreLabel.style.color = scoreColor;
  }
  
  function createResultsHtml(question, userAnswers) {
    let result = `<h3>${question.question}</h3>
    <ul>
    `;
    question.answers.forEach((answer, index) => {
      let isChecked = userAnswers[index];
      let isCorrect = answer.isCorrect;
  
      let color = "black";
      if (isChecked) {
        if (isCorrect) {
          color = "green";
        } else {
          color = "red";
        }
      }
      result += `<li style="color: ${color}">${answer.text}</li>`;
    });
    result += `</ul>`;
  
    return result;
  }
  
  startButton.addEventListener("click", () => {
    startQuiz();
  });
  
  resetButton.addEventListener("click", () => {
    startQuiz();
  });
  
  startOverButton.addEventListener("click", () => {
    startQuiz();
  });
  
  nextButton.addEventListener("click", () => {
    // Hämta input elements från DOM
    let answerInputs = questionAnswersContainer.querySelectorAll(
      "[name='answer']"
    );
    // Läs deras tillstånd som svar som [sant, falskt, falskt].
    let currentAnswers = getAnswersFromInputs(answerInputs);
    //Kontrollera om minst ett svar är sant (ett alternativ valt)
    let hasCheckedOptions = currentAnswers.some((element) => element);
    if (!hasCheckedOptions) {
      // Om inte, visa fel och returnera omedelbart
      errorMessage.style.opacity = "1";
      return;
    }
    // Om svaret är valt, dölj felmeddelandet (det kan fortfarande visas efter föregående försök)
    errorMessage.style.opacity = "0";
    //Och spara våra svar i den globala svarsuppsättningen
    allAnswers[currentQuestionIndex] = currentAnswers;
  
    // Visa nästa skärm om vi har svarat på den sista frågan
    if (currentQuestionIndex === questions.length - 1) {
      showResults();
    } else {
      // Eller Visa nästa fråga om det finns fler frågor
      showQuestion(currentQuestionIndex + 1);
    }
  });
  
  showScreen(SCREEN_WELCOME);
  
  //Ändra mode
  const mode = document.getElementById("mode");
  
  mode.addEventListener("click", () => {
    document.body.classList.toggle("dark");
   
  });
  