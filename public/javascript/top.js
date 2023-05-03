const noticeBtn = document.querySelector(".notice-btn");
const infoBtn = document.querySelector(".info");
const communityBtn = document.querySelector(".community");

if (window.location.href.match("notice")) {
  noticeBtn.style.backgroundColor = "white";
  noticeBtn.style.boxShadow = "0 0 0 2px black inset";
  noticeBtn.style.color = "black";
}

if (window.location.href.match("info")) {
  infoBtn.style.backgroundColor = "white";
  infoBtn.style.boxShadow = "0 0 0 2px black inset";
  infoBtn.style.color = "black";
}

if (window.location.href.match("community")) {
  communityBtn.style.backgroundColor = "white";
  communityBtn.style.boxShadow = "0 0 0 2px black inset";
  communityBtn.style.color = "black";
}

if (window.location.href.match("manager")) {
  noticeBtn.textContent = "공지사항 관리";
  infoBtn.textContent = "유저 관리";
  communityBtn.textContent = "커뮤니티 관리";
}
