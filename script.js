let currentIndex = 1;

// 1. 获取 DOM

const clickBoxes = document.querySelectorAll(".click-box");
const page2 = document.getElementById("page2");
const page2Back = document.getElementById("page2Back");

const page2Left = document.getElementById("page2Left");
const page2Right = document.getElementById("page2Right");

const thumbnail = document.getElementById("thumbnail");

// 2. 初始化状态（必须在DOM之后）
page2.style.display = "none";
page2Back.style.display = "none";
page2Left.style.display = "none";
page2Right.style.display = "none";
thumbnail.style.display = "none";

const box = document.getElementById("box");
const boxNext = document.getElementById("boxNext");


box.style.display = "none";
boxNext.style.display = "none";

// 点击 Page1 热区，进入 Page2
clickBoxes.forEach(clickBox => {
    clickBox.addEventListener("click", () => {

        // 获取当前点击的是第几个盲盒
        currentIndex = Number(clickBox.dataset.id);

        // 更新缩略图
        updateThumbnail();

        page2.style.display = "block";
        page2Back.style.display = "block";
        page2Left.style.display = "block";
        page2Right.style.display = "block";
        thumbnail.style.display = "block";

        box.style.display = "block";
        boxNext.style.display = "block";
    });
});

// 点击返回区域，回到 Page1
page2Back.addEventListener("click", () => {
    page2.style.display = "none";
    page2Back.style.display = "none";
    page2Left.style.display = "none";
    page2Right.style.display = "none";
    thumbnail.style.display = "none";

    box.style.display = "none";
    boxNext.style.display = "none";


});

// Step 3：左右切换逻辑

page2Left.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 1) {
        currentIndex = 6;
    }

    updateThumbnail();

    // 下一个盲盒进入
    boxNext.style.transform = "translateX(0)";
});

page2Right.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex > 6) {
        currentIndex = 1;
    }

    updateThumbnail();

    // 先回到右侧
    boxNext.style.transition = "none";
    boxNext.style.transform = "translateX(100%)";


    // 强制浏览器刷新状态
    setTimeout(() => {

        // 开启动画
        boxNext.style.transition = "transform 0.4s ease";

        // 滑入中心
        boxNext.style.transform = "translateX(0)";

    }, 20);

});

function updateThumbnail() {

    thumbnail.src =
        "images/thumbnail_" + currentIndex + ".png";

}