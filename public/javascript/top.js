window.onload = () => {
  if (new URL(location.href).searchParams.get("error")) {
    alert(new URL(location.href).searchParams.get("error"));
  }
};
