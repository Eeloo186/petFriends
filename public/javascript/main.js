axios
  .get("page/popular/list")
  .then((response) => {
    const popularList = response.data.popularList; // 불러온 게시물 목록
    const postList = document.querySelector(".popular-posts");

    // 이전 게시물 목록 삭제
    while (postList.firstChild) {
      postList.removeChild(postList.firstChild);
    }

    // 새로운 게시물 목록 추가
    for (const post of popularList) {
      const listItem = document.createElement("li");
      listItem.innerText = `${post.title} (${post.view} view)`;
      postList.appendChild(listItem);
    }
  })
  .catch((error) => {
    console.error(error); // 에러 처리
  });
