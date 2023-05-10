// DOM 로딩 완료시
window.addEventListener("DOMContentLoaded", () => {
  // const pictureBoxContainer = document.querySelector(".container");
  // const observer = new MutationObserver((mutations) => {
  //   mutations.forEach((mutation) => {
  //     mutation.addedNodes.forEach((node) => {
  //       console.log("TEST");
  //       if (node.classList.contains("picture-box")) {
  //         node.style.backgoundImage = `url('/imgs/spinner.gif')`;
  //       }
  //     });
  //   });
  // });
  // // picture-box-container 요소 관찰 시작
  // observer.observe(pictureBoxContainer, { childList: true });

  const pictures = document.querySelectorAll(".picture-box");
  pictures.forEach((post) => {
    // post.style.backgroundImage = `url('/imgs/spinner.gif')`;
    post.style.backgroundImage = `url('${post.querySelector('input[name="imgUrl"]').value}')`;
  });
});

// imgUrl, postId
// 게시글 클릭 시
const posts = document.querySelectorAll('.picture-box');
posts.forEach((post) => {
  post.addEventListener('click', () => {
    axios.get(``)
    .then()
    .catch();
  });
});








// 스크롤이 아래 끝까지 닿으면
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
