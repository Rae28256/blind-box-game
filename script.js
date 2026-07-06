const clickBoxes = document.querySelectorAll(".click-box");
const page2 = document.getElementById("page2");

clickBoxes.forEach(box => {
    box.addEventListener("click", () => {
        page2.style.display = "block";
    });
});