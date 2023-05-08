const numberSelet = document.getElementById("number-sort");
const highNum = document.querySelector(".highNum");
const rowNum = document.querySelector(".rowNum");
const highView = document.querySelector(".highView");
const rowView = document.querySelector(".rowView");
const newest = document.querySelector(".newest");
const old = document.querySelector(".old");

// 각 버튼의 클릭 이벤트에 handleSortBtnClick 함수를 전달
highView.addEventListener("click", () =>
  handleSortBtnClick(highView, "highView")
);
rowView.addEventListener("click", () => handleSortBtnClick(rowView, "rowView"));
newest.addEventListener("click", () => handleSortBtnClick(newest, "newest"));
old.addEventListener("click", () => handleSortBtnClick(old, "old"));

// 페이지가 로드될 때 데이터를 가져옴
let changeNumberSort = "newest";
listSort();

// 주소값에 따른 번호 순 함수
function listSort() {
  axios
    .get(`/page/community/${changeNumberSort}`)
    .then((response) => {
      console.log(response.data); // 서버 응답 확인
      const lists = response.data;
      const container = document.querySelector(".commu-list");
      container.innerHTML = ""; // 이전 데이터 삭제
      lists.forEach((list) => {
        const postDiv = document.createElement("tr");
        postDiv.style.cursor = "pointer";
        postDiv.addEventListener("click", () => {
          window.location.href = `/page/communityView/${list.id}`;
        });
        postDiv.innerHTML = `
              <td>게시글번호 : ${list.id}</td>
              <td>조회수 : ${list.view}</td>
              <td>게시물 : ${list.title}</td>
              <td> 작성자닉네임 : ${list.User.nickname} </td>
              <td>작성일 : ${new Date(list.createdAt)
                .toISOString()
                .substring(0, 10)}</td>`;
        container.appendChild(postDiv);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

// 버튼 눌렀을 때 css변경&axios로 데이터 불러오기

const sortBtns = document.querySelectorAll(".sort-btn");

function handleSortBtnClick(clickedBtn, sortType) {
  if (clickedBtn.classList.contains("sort-btn-click")) {
    clickedBtn.classList.remove("sort-btn-click");
  } else {
    clickedBtn.classList.add("sort-btn-click");
    changeNumberSort = sortType;
    sortBtns.forEach((otherBtn) => {
      if (otherBtn !== clickedBtn) {
        // 다른버튼 !== 클릭한버튼
        otherBtn.classList.remove("sort-btn-click");
      }
    });
  }
  listSort();
}

// 뒤로 가기 클릭 시 데이터를 다시 가져옴
// window.addEventListener("popstate", (event) => {
//   const state = event.state;
//   if (state) {
//     changeNumberSort = state.sortType;
//     sortBtns.forEach((btn) => {
//       if (btn.dataset.sort === changeNumberSort) {
//         btn.classList.add("sort-btn-click");
//       } else {
//         btn.classList.remove("sort-btn-click");
//       }
//     });
//     listSort();
//   }
// });
