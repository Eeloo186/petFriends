// 사이드바 따라오는 코드
const sidebarWrapper = document.querySelector(".sidebar");
const sidebarHeight = sidebarWrapper.offsetHeight;
const initialTop =
  sidebarWrapper.getBoundingClientRect().top + window.pageYOffset;

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  const isSidebarVisible = sidebarHeight + windowHeight >= documentHeight;

  if (!isSidebarVisible) {
    const distanceToTop = scrollTop - initialTop + windowHeight / 1.67;
    sidebarWrapper.style.position = "absolute";
    sidebarWrapper.style.top = `${distanceToTop}px`;
  } else {
    sidebarWrapper.style.position = "fixed";
    sidebarWrapper.style.top = "auto";
    sidebarWrapper.style.bottom = "0";
  }
});

//맨 위로
document.querySelector(".scrollup").addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
