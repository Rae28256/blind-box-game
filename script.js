const clickBoxes = document.querySelectorAll(".click-box");
const page2 = document.getElementById("page2");
const page2Back = document.getElementById("page2Back");

// 点击 Page1 热区，进入 Page2
clickBoxes.forEach(box => {
    box.addEventListener("click", () => {
        page2.style.display = "block";
        page2Back.style.display = "block";
    });
});

// 点击返回区域，回到 Page1
page2Back.addEventListener("click", () => {
    page2.style.display = "none";
    page2Back.style.display = "none";
});