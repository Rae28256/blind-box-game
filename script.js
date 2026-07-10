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

const buyButton = document.getElementById("buyButton");
const buyHit = document.getElementById("buyHit");

const page3 = document.getElementById("page3");

// 2. 初始化状态（必须在DOM之后）
page2.style.display = "none";
page2Back.style.display = "none";
page2Left.style.display = "none";
page2Right.style.display = "none";
thumbnail.style.display = "none";

arrowLeft.style.display = "none";
arrowRight.style.display = "none";

buyButton.style.display = "none";

buyHit.style.display = "none";

page3.style.display = "none";


const box = document.getElementById("box");
const boxNext = document.getElementById("boxNext");
const boxMotion = document.getElementById("boxMotion");


box.style.display = "none";
boxNext.style.display = "none";

// 点击 Page1 热区，进入 Page2
clickBoxes.forEach(clickBox => {
    clickBox.addEventListener("click", () => {
        // Page1盲盒点击音效
        playTapSound();

        // 开启手机方向监听
        enableBoxOrientation();


        // 获取当前点击的是第几个盲盒
        currentIndex = Number(clickBox.dataset.id);

        // 更新缩略图
        updateThumbnail();

        page2.style.display = "block";


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

        buyButton.style.display = "block";

        buyHit.style.display = "block";


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

    buyButton.style.display = "none";

    buyHit.style.display = "none";


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

    // 右按钮声音
    playTapSound();

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

    // 左按钮点击音效
    playTapSound();

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


// ===========================
// Page2 购入 → Page3
// ===========================

buyHit.addEventListener("click", () => {

    // 购入按钮点击音效

    playTapSound();


    // 按钮反馈

    buttonFeedback(buyButton);



    // 等待动画结束

    setTimeout(() => {


        // 隐藏Page2

        page2.style.display = "none";

        page2Back.style.display = "none";
        page2Left.style.display = "none";
        page2Right.style.display = "none";


        thumbnail.style.display = "none";

        box.style.display = "none";
        boxNext.style.display = "none";


        arrowLeft.style.display = "none";
        arrowRight.style.display = "none";

        buyButton.style.display = "none";

        buyHit.style.display = "none";



        // 显示Page3

        page3.style.display = "block";


    }, 500);


});



function updateThumbnail() {

    thumbnail.src =
        "images/thumbnail_" + currentIndex + ".png";

}

function buttonFeedback(button) {

    button.classList.remove("button-active");


    // 强制刷新动画状态
    button.offsetWidth;


    button.classList.add("button-active");


    setTimeout(() => {

        button.classList.remove("button-active");

    }, 250);

}

// ===========================
// 按钮声音
// ===========================

let tapAudioContext = null;


function playTapSound() {

    const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;


    if (!AudioContextClass) return;


    if (!tapAudioContext) {

        tapAudioContext =
            new AudioContextClass();

    }


    if (tapAudioContext.state === "suspended") {

        tapAudioContext.resume();

    }


    const oscillator =
        tapAudioContext.createOscillator();


    const gainNode =
        tapAudioContext.createGain();


    oscillator.type = "triangle";


    oscillator.frequency.setValueAtTime(
        500,
        tapAudioContext.currentTime
    );


    oscillator.frequency.exponentialRampToValueAtTime(
        750,
        tapAudioContext.currentTime + 0.09
    );


    gainNode.gain.setValueAtTime(
        0.18,
        tapAudioContext.currentTime
    );


    gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        tapAudioContext.currentTime + 0.1
    );


    oscillator.connect(gainNode);

    gainNode.connect(
        tapAudioContext.destination
    );


    oscillator.start();

    oscillator.stop(
        tapAudioContext.currentTime + 0.1
    );

}

// ===========================
// Page2盲盒手机跟随计算
// ===========================

let motionStartBeta = null;
let motionStartGamma = null;


function limitMotionValue(value, min, max) {

    return Math.max(
        min,
        Math.min(max, value)
    );

}


function handleBoxOrientation(event) {

    // 只在Page2运行
    if (page2.style.display !== "block") return;


    // 没有获取到手机方向数据时不运行
    if (
        event.beta === null ||
        event.gamma === null
    ) {

        return;

    }


    // 第一次获取数据时记录手机初始角度
    if (
        motionStartBeta === null ||
        motionStartGamma === null
    ) {

        motionStartBeta = event.beta;
        motionStartGamma = event.gamma;

        return;

    }


    // 计算手机与初始位置的角度差
    const betaDifference =
        limitMotionValue(
            event.beta - motionStartBeta,
            -20,
            20
        );


    const gammaDifference =
        limitMotionValue(
            event.gamma - motionStartGamma,
            -20,
            20
        );


    // 最大上下移动12px
    const moveY =
        betaDifference / 20 * 12;


    // 最大左右移动12px
    const moveX =
        gammaDifference / 20 * 12;


    // 最大旋转2度
    const rotate =
        gammaDifference / 20 * 2;


    boxMotion.style.transform =
        `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rotate}deg)`;

}

// 手机方向监听是否已经开启
let orientationListening = false;


async function enableBoxOrientation() {

    // 防止重复添加监听
    if (orientationListening) return;


    // 当前设备不支持手机方向数据
    if (!("DeviceOrientationEvent" in window)) {

        return;

    }


    const OrientationEvent =
        window.DeviceOrientationEvent;


    // iPhone和iPad需要用户授权
    if (
        typeof OrientationEvent.requestPermission ===
        "function"
    ) {

        try {

            const permission =
                await OrientationEvent.requestPermission();


            if (permission !== "granted") {

                return;

            }

        } catch (error) {

            console.log(
                "手机方向权限申请失败",
                error
            );

            return;

        }

    }


    // 安卓通常会直接执行到这里
    window.addEventListener(
        "deviceorientation",
        handleBoxOrientation,
        true
    );


    orientationListening = true;

}