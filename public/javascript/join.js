const userEmail = document.getElementById("user-email");
const selected = document.getElementById("selected");
const userSelect = document.getElementById("email-select");
const joinBtn = document.querySelector("#join-btn");
const confirmBox = document.querySelector(".confirm-box");
//유효성 검사

//아이디 중복 체크
const userIdInput = document.getElementById("user-id");

userIdInput.addEventListener("input", async () => {
  const userId = userIdInput.value;

  const response = await axios.get(`/users/check/?userId=${userId}`);
  const isDuplicate = response.data.isDuplicate;
  const userIdResult = document.getElementById("userIdResult");
  if (userId !== "") {
    if (isDuplicate) {
      userIdResult.textContent = "이미 사용하는 아이디입니다.";
      userIdResult.style.color = "red";
      userIdInput.style.border = "2px solid red";
      userIdInput.style.outline = "red";
    } else {
      userIdResult.textContent = "멋진 아이디네요!";
      userIdResult.style.color = "green";
      userIdInput.style.border = "2px solid green";
      userIdInput.style.outline = "green";
    }
  } else {
    userIdResult.textContent = "";
    userIdInput.style.border = "1px solid rgb(189, 189, 189)";
  }
});

//이름 중복 검사
const userNickInput = document.getElementById("user-name");

userNickInput.addEventListener("input", async () => {
  const nickname = userNickInput.value;

  const response = await axios.get(`/users/check/?nickname=${nickname}`);
  const isDuplicate = response.data.isDuplicate;
  const userNickResult = document.getElementById("userNickResult");
  if (nickname !== "") {
    if (isDuplicate) {
      userNickResult.textContent = "이미 사용하는 이름입니다.";
      userNickResult.style.color = "red";
      userNickInput.style.border = "2px solid red";
      userNickInput.style.outline = "red";
    } else {
      userNickResult.textContent = "멋진 이름이네요!";
      userNickResult.style.color = "green";
      userNickInput.style.border = "2px solid green";
      userNickInput.style.outline = "green";
    }
  } else {
    userNickResult.textContent = "";
    userNickInput.style.border = "1px solid rgb(189, 189, 189)";
  }
});

//제출 했을 때
joinBtn.addEventListener("click", (event) => {
  if (userNickInput.style.border == "2px solid red") {
    event.preventDefault();
    alert("이미 사용하는 이름입니다.");
    userNickInput.focus();
    return;
  }

  if (userIdInput.style.border == "2px solid red") {
    event.preventDefault();
    alert("이미 사용하는 아이디입니다.");
    userIdInput.focus();
    return;
  }

  //-----이메일 양식 검사
  if (userEmail.value !== "") {
    if (!userEmail.value.match("@")) {
      alert("이메일형식이 아닙니다.");
      event.preventDefault();
      userEmail.focus();
      return;
    }
  }

  //----------------------펫나이 숫자확인
  const petAge = document.querySelector(".petAge");
  if (petAge.value !== "" && !Number(petAge.value)) {
    alert("나이에 숫자만 입력가능합니다.");
    event.preventDefault();
  }

  //-------------비밀번호 재확인
  const password = document.getElementById("user-passward");
  const repassword = document.getElementById("user-repassward");
  if (password.value !== "") {
    if (repassword.value !== password.value) {
      alert("비밀번호가 다릅니다.");
      event.preventDefault();
      repassword.value = "";
      repassword.focus();
    }
  }
});
// -----------------------유효성 검사 끝 -----------------------

// 주소선택 함수
function execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      document.getElementById("zip-code").value = data.zonecode;
      document.getElementById("address-1").value = data.address;
    },
  }).open();
}

//펫 정보 유&무 창 움직임

const petInformation = document.getElementById("pet-information");
const petNo = document
  .getElementById("petNo")
  .addEventListener("change", () => {
    const petInputValue = document.querySelectorAll(".petInput");
    for (let i = 0; i < petInputValue.length; i++) {
      petInputValue[i].value = "";
    }
    petInformation.style.zIndex = "-1";
    petInformation.style.opacity = "0";
    setTimeout(() => {
      petInformation.style.left = "0";
    }, 200);
  });
const petYes = document
  .getElementById("petYes")
  .addEventListener("change", () => {
    petInformation.style.left = "102%";
    setTimeout(() => {
      petInformation.style.opacity = "0.5";
      petInformation.style.zIndex = "0";
      petInformation.style.opacity = "1";
    }, 300);
  });

//
