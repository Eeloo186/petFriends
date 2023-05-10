// imgUrl, postId
// 게시글 클릭 시
const posts = document.querySelectorAll(".picture-box");
posts.forEach((post) => {
  post.addEventListener("click", () => {
    axios.get(``).then().catch();
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
  // AJAX 요청을 보내서 추가 콘텐츠를 불러옵니다.
  // (create element, appendchild 등을 통해 사진 box 생성)
  const loadedPicCount = document.querySelectorAll(".picture-box").length;
  axios
    .get(`/boards/picture/posts?sortType=${changeNumberSort}&picCount=${loadedPicCount}`)
    .then((response) => {
      const posts = response.data;
      const picContainer = document.querySelector(".container");
      posts.forEach((post) => {
        // console.log(post);
        const pictureBox = document.createElement("div");
        pictureBox.setAttribute("class", "picture-box");
        pictureBox.innerHTML = `
      <input type="hidden" name="imgUrl" value="${post.imgUrl}" />
      <input type="hidden" name="postId" value="${post.id}" />
      <button class="transparent-button">버튼</button>
      <div class="bottom-area">
        <div class="view-count">조회수 : ${post.view}</div>
        <button class="icon-button"><i class="fa fa-heart"></i></button>
        <div class="like-count">${post.likeCount}</div>
      </div>
    `;
        console.log(`pictureBox ${post.id} 추가`);
        pictureBox.style.backgroundImage = `url('${post.imgUrl}')`;
        picContainer.appendChild(pictureBox);
      });
    })
    .catch();
}
