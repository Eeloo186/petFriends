const buttons = document.querySelectorAll('.memberinfo-btn');
// 각 버튼 클릭 이벤트 팝업창 호출
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        const popup = this.nextElementSibling;
        popup.style.display = 'block';
    });
});
// x 클릭하면 팝업 창을 닫기.
const close = document.querySelectorAll('.close');
close.forEach(function(btn) {
    btn.addEventListener('click', function() {
        const popup = this.parentNode.parentNode;
        popup.style.display = 'none';
    });
});
// 팝업 밖을 클릭하면 팝업 창을 닫기
const popups = document.querySelectorAll('.popup');
window.addEventListener('click', function(event) {
    popups.forEach(function(popup) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });
});