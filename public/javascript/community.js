// const searchValue = document.getElementById("search");
// const searchInput = document.querySelector(".searchInput");
// const searchBtn = document.querySelector(".search-btn");

// let changeSearchSort = "";

// searchBtn.addEventListener("click", () => {
//   const selectedValue = searchValue.options[searchValue.selectedIndex].value;
//   if (selectedValue == "titleDetail") {
//     changeSearchSort = `${selectedValue}`;
//     searchSort();
//   } else if (selectedValue == "title") {
//     changeSearchSort = `${selectedValue}`;
//     searchSort();
//   } else if (selectedValue == "nickname") {
//     changeSearchSort = `${selectedValue}`;
//     searchSort();
//   }
// });

// // 주소값에 따른 번호 순 함수
// function searchSort() {
//   axios
//     .get(
//       `/boards/{{boardName}}/posts?searchType=${changeSearchSort}${searchInput.value}`
//     )
//     .then((response) => {
//       console.log(response.data); // 서버 응답 확인
//       const lists = response.data;
//       const container = document.querySelector(".commu-list");
//       container.innerHTML = ""; // 이전 데이터 삭제
//       lists.forEach((list) => {
//         const postDiv = document.createElement("tr");
//         postDiv.style.cursor = "pointer";
//         postDiv.addEventListener("click", () => {
//           window.location.href = `/page/{{boardName}}/${list.id}`;
//         });
//         postDiv.innerHTML = `
//                 <td>게시글번호 : ${list.id}</td>
//                 <td>조회수 : ${list.view}</td>
//                 <td>게시물 : ${list.title}</td>
//                 <td> 작성자닉네임 : ${list.User.nickname} </td>
//                 <td>작성일 : ${list.createdAt}</td>`;
//         container.appendChild(postDiv);
//       });
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
