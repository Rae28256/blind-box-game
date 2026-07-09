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

// ===========================
// Step 3：左右切换动画
// ===========================

let isSliding = false;


// 右切换
page2Right.addEventListener("click", () => {

    if (isSliding) return;

    isSliding = true;


    // 下一编号
    let nextIndex = currentIndex + 1;

    if (nextIndex > 6) {
        nextIndex = 1;
    }


    // 设置备用box初始位置（右侧）
    boxNext.style.transition = "none";
    boxNext.style.transform = "translateX(100%)";


    // 强制刷新
    boxNext.offsetWidth;


    // 开启动画
    box.style.transition = "transform 0.4s ease";
    boxNext.style.transition = "transform 0.4s ease";


    // 两个box同时移动
    box.style.transform = "translateX(-100%)";
    boxNext.style.transform = "translateX(0)";


    setTimeout(() => {


        currentIndex = nextIndex;

        updateThumbnail();


        // 交换两个box的位置状态

        box.src = boxNext.src;


        box.style.transition = "none";
        box.style.transform = "translateX(0)";


        boxNext.style.transition = "none";
        boxNext.style.transform = "translateX(100%)";


        isSliding = false;


    }, 400);


});




// 左切换
page2Left.addEventListener("click", () => {


    if (isSliding) return;

    isSliding = true;



    // 上一个编号
    let nextIndex = currentIndex - 1;


    if (nextIndex < 1) {
        nextIndex = 6;
    }



    // 备用box放左边

    boxNext.style.transition = "none";
    boxNext.style.transform = "translateX(-100%)";


    boxNext.offsetWidth;



    box.style.transition = "transform 0.4s ease";
    boxNext.style.transition = "transform 0.4s ease";



    // 当前向右出去
    box.style.transform = "translateX(100%)";


    // 新box进入
    boxNext.style.transform = "translateX(0)";



    setTimeout(() => {


        currentIndex = nextIndex;

        updateThumbnail();


        // 交换状态

        box.src = boxNext.src;


        box.style.transition = "none";
        box.style.transform = "translateX(0)";


        boxNext.style.transition = "none";
        boxNext.style.transform = "translateX(-100%)";


        isSliding = false;


    }, 400);


});

function updateThumbnail() {

    thumbnail.src =
        "images/thumbnail_" + currentIndex + ".png";

}