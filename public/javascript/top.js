window.onload = () => {
  if (new URL(location.href).searchParams.get("error")) {
    alert(new URL(location.href).searchParams.get("error"));
  }
};

const header = document.querySelector("#menu-box");
const SCROLL_HEIGHT = 50;

function handleScroll() {
  const scrollHeight = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollHeight >= SCROLL_HEIGHT) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
}

window.addEventListener("scroll", handleScroll);
