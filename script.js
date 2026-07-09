let currentIndex = 1;

// 1. 获取 DOM

const clickBoxes = document.querySelectorAll(".click-box");
const page2 = document.getElementById("page2");
const page2Back = document.getElementById("page2Back");

const page2Left = document.getElementById("page2Left");
const page2Right = document.getElementById("page2Right");

const thumbnail = document.getElementById("thumbnail");

const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");

// 2. 初始化状态（必须在DOM之后）
page2.style.display = "none";
page2Back.style.display = "none";
page2Left.style.display = "none";
page2Right.style.display = "none";
thumbnail.style.display = "none";

arrowLeft.style.display = "none";
arrowRight.style.display = "none";


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

        arrowLeft.style.display = "block";
        arrowRight.style.display = "block";


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

    arrowLeft.style.display = "none";
    arrowRight.style.display = "none";


});

// ===========================
// Step 3：左右切换动画
// ===========================

let isSliding = false;

// 当前显示的box
let activeBox = box;

// 等待进入的box
let nextBox = boxNext;

// ===========================
// Step 3：左右切换动画
// ===========================


page2Right.addEventListener("click", () => {


    buttonFeedback(arrowRight);

    if (isSliding) return;

    isSliding = true;


    let nextIndex = currentIndex + 1;

    if (nextIndex > 6) {
        nextIndex = 1;
    }



    // 新box放右侧

    nextBox.style.transition = "none";
    nextBox.style.transform = "translateX(100%)";


    nextBox.offsetWidth;



    activeBox.style.transition =
        "transform 0.4s ease";

    nextBox.style.transition =
        "transform 0.4s ease";



    // 同时移动

    activeBox.style.transform =
        "translateX(-100%)";


    nextBox.style.transform =
        "translateX(0)";




    setTimeout(() => {


        currentIndex = nextIndex;

        updateThumbnail();



        // 交换角色

        let temp = activeBox;

        activeBox = nextBox;

        nextBox = temp;



        // 重置备用box

        nextBox.style.transition = "none";

        nextBox.style.transform =
            "translateX(100%)";


        activeBox.style.transition = "none";

        activeBox.style.transform =
            "translateX(0)";



        isSliding = false;



    }, 400);


});





page2Left.addEventListener("click", () => {


    buttonFeedback(arrowLeft);
    
    if (isSliding) return;

    isSliding = true;



    let nextIndex = currentIndex - 1;


    if (nextIndex < 1) {
        nextIndex = 6;
    }




    // 新box放左侧

    nextBox.style.transition = "none";

    nextBox.style.transform =
        "translateX(-100%)";



    nextBox.offsetWidth;




    activeBox.style.transition =
        "transform 0.4s ease";


    nextBox.style.transition =
        "transform 0.4s ease";



    // 当前向右离开

    activeBox.style.transform =
        "translateX(100%)";



    // 新box进入

    nextBox.style.transform =
        "translateX(0)";




    setTimeout(() => {


        currentIndex = nextIndex;

        updateThumbnail();



        // 交换角色

        let temp = activeBox;

        activeBox = nextBox;

        nextBox = temp;



        // 重置备用box

        nextBox.style.transition = "none";

        nextBox.style.transform =
            "translateX(-100%)";



        activeBox.style.transition = "none";

        activeBox.style.transform =
            "translateX(0)";



        isSliding = false;



    }, 400);



});






function updateThumbnail() {

    thumbnail.src =
        "images/thumbnail_" + currentIndex + ".png";

}

function buttonFeedback(button){

    button.classList.remove("button-active");


    // 强制刷新动画状态
    button.offsetWidth;


    button.classList.add("button-active");


    setTimeout(()=>{

        button.classList.remove("button-active");

    },300);

}