document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("/page/popular")
    .then((response) => {
      console.log(response.data); // 서버 응답 확인
      const viewlist = response.data;
      const container = document.querySelector(".popular-posts");
      viewlist.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.innerHTML = `
            <p class="post-view">조회수: ${post.view}</p>
            <p class="post-title">${post.title}</p>
            <p class='post-name'>${post.User.nickname}</p>
          `;
        container.appendChild(postDiv);
      });
    })
    .catch((error) => {
      console.error(error);
    });
});
