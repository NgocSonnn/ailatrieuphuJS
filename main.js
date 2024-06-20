var $ = function (id) {
  return document.getElementById(id);
};
data = [
  {
    question:
      "A flashing red traffic light signifies that a driver should do what?",
    A: "stop",
    B: "speed up",
    C: "proceed with caution",
    D: "honk the horn",
    answer: "A",
  },
  {
    question: "A knish is traditionally stuffed with what filling?",
    A: "potato",
    B: "creamed corn",
    C: "lemon custard",
    D: "raspberry jelly",
    answer: "A",
  },
  {
    question: "A pita is a type of what?",
    A: "fresh fruit",
    B: "flat bread",
    C: "French tart",
    D: "friend bean dip",
    answer: "B",
  },
  {
    question:
      "A portrait that comically exaggerates a person's physical traits is called a what?",
    A: "landscape",
    B: "caricature",
    C: "still life",
    D: "Impressionism",
    answer: "B",
  },
  {
    question: "A second-year college student is usually called a what?",
    A: "sophomore",
    B: "senior",
    C: "freshman ",
    D: "junior ",
    answer: "A",
  },
  {
    question:
      "A student who earns a J.D. can begin his or her career as a what?",
    A: "lawyer",
    B: "bricklayer",
    C: "doctor",
    D: "accountant",
    answer: "A",
  },
  {
    question: "A triptych is a work of art that is painted on how many panels?",
    A: "two",
    B: "three",
    C: "five",
    D: "eight",
    answer: "B",
  },
  {
    question:
      "According to a famous line from the existentialist play 'No Exit' what is hell?",
    A: "oneself",
    B: "other people",
    C: "little made large",
    D: "hued in green and blue",
    answer: "B",
  },
  {
    question:
      "According to a popular slogan, what state should people not 'mess with'?",
    A: "New York",
    B: "Texas",
    C: "Montana",
    D: "Rhode Island",
    answer: "B",
  },
  {
    question:
      "According to a Yale University study, what smell is the most recognizable to American adults?",
    A: "tuna",
    B: "laundry",
    C: "popcorn",
    D: "coffee",
    answer: "D",
  },
];

var logIn = function () {
  var regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  var userName = "";
  while (true) {
    userName = prompt(
      "hãy nhập tên của bạn để bắt đầu (Tên phải có độ dài từ 5 đến 10 ký tự, không có số hoặc ký tự đặc biệt):  "
    ).trim();
    if (userName == "") {
      alert("tên bạn nhập không được để trống!!");
    } else if (userName.length < 5 || userName.length > 10) {
      alert("tên bạn nhập phải có độ dài từ 5 đến 10 ký tự");
    } else if (regex.test(userName) || !isNaN(userName)) {
      alert("tên bạn nhập phải không có số hoặc ký tự đặc biệt");
    } else {
      userName = "Xin chao  " + userName + "!";
      document.getElementById("user").innerText = userName;
      break;
    }
  }
};

var score = 0;
var questionNumber = 0;

var questionDisplay = function () {
  var questionShow = data[questionNumber];
  document.getElementById("question-content").textContent =
    questionShow.question;
  document.getElementById("question-number").textContent = questionNumber + 1;
  document.getElementById("answerA").nextElementSibling.textContent =
    "A)  " + questionShow.A;
  document.getElementById("answerB").nextElementSibling.textContent =
    "B)  " + questionShow.B;
  document.getElementById("answerC").nextElementSibling.textContent =
    "C)  " + questionShow.C;
  document.getElementById("answerD").nextElementSibling.textContent =
    "D)  " + questionShow.D;
  var answerOptions = ["A", "B", "C", "D"];
  answerOptions.forEach((option) => {
    document
      .getElementById("answer" + option)
      .parentNode.classList.remove("hidden");
  });
};

var checkAnswer = function () {
  var selectAnswer = "";
  if ($("answerA").checked) {
    selectAnswer = "A";
  } else if ($("answerB").checked) {
    selectAnswer = "B";
  } else if ($("answerC").checked) {
    selectAnswer = "C";
  } else if ($("answerD").checked) {
    selectAnswer = "D";
  }
  if (!selectAnswer) {
    alert("bạn chưa chọn câu trả lời");
    return;
  }
  var correctAnswer = data[questionNumber].answer;
  if (selectAnswer === data[questionNumber].answer) {
    score++;
    alert("Đáp án chính xác!");
  } else {
    alert("Game over! Đáp án đúng là: " + correctAnswer);
    alert("End Game!");
    reMake();
  }
  questionNumber++;
  if (questionNumber < data.length) {
    questionDisplay();
  } else {
    if (score == questionNumber) {
      alert("You Win!");
    } else {
      endGame();
      reMake();
    }
  }
};

var endGame = function () {
  alert("End Game");
};

var usedSkip = false;

var skipQuestion = function () {
  if (usedSkip == true) {
    alert("Bạn đã sử dụng trợ giúp này rồi!");
    return;
  }
  questionNumber++;
  if (questionNumber < data.length) {
    questionDisplay();
  } else {
    document.getElementById("btn-skip").style.display = "none";
  }
  usedSkip = true;
};

var usedHide = false;

function hideWrongAnswers() {
  if (usedHide == true) {
    alert("Bạn đã sử dụng trợ giúp này rồi!");
    return;
  }
  var wrongAnswers = ["A", "B", "C", "D"].filter(
    (option) => option !== data[questionNumber].answer
  );
  var hiddenCount = 0;
  while (hiddenCount < 2) {
    var randomIndex = Math.floor(Math.random() * 4);
    var option = ["A", "B", "C", "D"][randomIndex];
    if (
      wrongAnswers.includes(option) &&
      !document
        .getElementById("answer" + option)
        .parentNode.classList.contains("hidden")
    ) {
      document
        .getElementById("answer" + option)
        .parentNode.classList.add("hidden");
      hiddenCount++;
    }
  }
  usedHide = true;
}

var reMake = function () {
  while (true) {
    var remake = prompt("bạn có muốn chơi lại?? (Nhập 'Y' để chơi lại)");
    remake = remake.toLocaleUpperCase();
    if (
      remake == "" ||
      remake.length < 0 ||
      remake.length > 2 ||
      !isNaN(remake)
    ) {
      alert("bạn nhập 'Y' để chơi tiếp");
    } else if (remake === "Y") {
      window.location.reload();
      break;
    }
  }
};

window.onload = function () {
  logIn();
  questionDisplay();

  document.getElementById("btn-submit").onclick = function (event) {
    event.preventDefault();
    checkAnswer();
  };
  document.getElementById("btn-skip").onclick = function (event) {
    event.preventDefault();
    skipQuestion();
  };
  document.getElementById("btn-hide").onclick = function (event) {
    event.preventDefault();
    hideWrongAnswers();
  };
};
