window.addEventListener("scroll", function () {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight) {
    loadMoreContent();
  }
});

function loadMoreContent() {
    // spinner는 로딩 이미지(모래시계, progress bar 등)
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";

  // AJAX 요청을 보내서 추가 콘텐츠를 불러옵니다.
  // (create element, appendchild 등을 통해 사진 box 생성)
  // 요청이 끝난 후에는 spinner.style.display = "none";으로 로딩 스피너를 감추어줍니다.
}
