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
const boxShake = document.getElementById("boxShake");


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

    // 右切换开始前恢复默认位置
    boxMotionLocked = true;

    resetBoxMotion();

    lastMotionGamma = null;

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

        // 右切换结束后恢复手机晃动
        boxMotionLocked = false;

        lastMotionGamma = null;


    }, 400);


});





page2Left.addEventListener("click", () => {

    // 左按钮点击音效
    playTapSound();

    buttonFeedback(arrowLeft);

    if (isSliding) return;

    // 左切换开始前恢复默认位置
    boxMotionLocked = true;

    resetBoxMotion();

    lastMotionGamma = null;

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

        // 左切换结束后恢复手机晃动
        boxMotionLocked = false;

        lastMotionGamma = null;



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
// Box 1、2、4、5、6晃动“唰”声
// ===========================

function playSwooshSound() {

    const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;


    if (!AudioContextClass) return;


    if (!tapAudioContext) {

        tapAudioContext =
            new AudioContextClass();

    }


    function createSwooshSound() {

        const currentTime =
            tapAudioContext.currentTime;


        const soundDuration =
            0.18;


        const noiseBuffer =
            tapAudioContext.createBuffer(
                1,
                tapAudioContext.sampleRate *
                soundDuration,
                tapAudioContext.sampleRate
            );


        const noiseData =
            noiseBuffer.getChannelData(0);


        for (
            let index = 0;
            index < noiseData.length;
            index++
        ) {

            const soundProgress =
                index / noiseData.length;


            const envelope =
                Math.sin(
                    Math.PI * soundProgress
                );


            noiseData[index] =
                (Math.random() * 2 - 1) *
                envelope;

        }


        const noiseSource =
            tapAudioContext.createBufferSource();


        const soundFilter =
            tapAudioContext.createBiquadFilter();


        const gainNode =
            tapAudioContext.createGain();


        noiseSource.buffer =
            noiseBuffer;


        soundFilter.type =
            "bandpass";


        soundFilter.frequency.setValueAtTime(
            650,
            currentTime
        );


        soundFilter.frequency.exponentialRampToValueAtTime(
            1800,
            currentTime + soundDuration
        );


        soundFilter.Q.value =
            0.7;


        gainNode.gain.setValueAtTime(
            0.001,
            currentTime
        );


        gainNode.gain.linearRampToValueAtTime(
            0.16,
            currentTime + 0.035
        );


        gainNode.gain.exponentialRampToValueAtTime(
            0.001,
            currentTime + soundDuration
        );


        noiseSource.connect(
            soundFilter
        );


        soundFilter.connect(
            gainNode
        );


        gainNode.connect(
            tapAudioContext.destination
        );


        noiseSource.start(
            currentTime
        );


        noiseSource.stop(
            currentTime + soundDuration
        );

    }


    if (
        tapAudioContext.state ===
        "suspended"
    ) {

        tapAudioContext.resume().then(() => {

            createSwooshSound();

        }).catch(() => { });

    } else {

        createSwooshSound();

    }

}

// ===========================
// Box 3晃动清脆铃铛声
// ===========================

function playBellSound() {

    const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;


    if (!AudioContextClass) return;


    // 与其他音效共用声音环境
    if (!tapAudioContext) {

        tapAudioContext =
            new AudioContextClass();

    }


    function createBellSound() {

        const currentTime =
            tapAudioContext.currentTime;


        // 创建铃铛的主要音调
        const mainTone =
            tapAudioContext.createOscillator();


        // 创建铃铛的高频泛音
        const highTone =
            tapAudioContext.createOscillator();


        const mainGain =
            tapAudioContext.createGain();


        const highGain =
            tapAudioContext.createGain();


        // 使用柔和清脆的正弦波
        mainTone.type =
            "sine";


        highTone.type =
            "sine";


        // 铃铛主要音高
        mainTone.frequency.setValueAtTime(
            880,
            currentTime
        );


        // 铃铛高频泛音
        highTone.frequency.setValueAtTime(
            1320,
            currentTime
        );


        // 主要音调快速出现，再逐渐消失
        mainGain.gain.setValueAtTime(
            0.13,
            currentTime
        );


        mainGain.gain.exponentialRampToValueAtTime(
            0.001,
            currentTime + 0.45
        );


        // 高频泛音更轻、更短
        highGain.gain.setValueAtTime(
            0.055,
            currentTime
        );


        highGain.gain.exponentialRampToValueAtTime(
            0.001,
            currentTime + 0.28
        );


        mainTone.connect(
            mainGain
        );


        highTone.connect(
            highGain
        );


        mainGain.connect(
            tapAudioContext.destination
        );


        highGain.connect(
            tapAudioContext.destination
        );


        mainTone.start(
            currentTime
        );


        highTone.start(
            currentTime
        );


        mainTone.stop(
            currentTime + 0.45
        );


        highTone.stop(
            currentTime + 0.28
        );

    }


    // 兼容手机浏览器暂停声音环境
    if (
        tapAudioContext.state ===
        "suspended"
    ) {

        tapAudioContext.resume().then(() => {

            createBellSound();

        }).catch(() => { });

    } else {

        createBellSound();

    }

}

// ===========================
// 根据当前Box选择晃动音效
// ===========================

function playCurrentBoxShakeSound() {

    // 两次音效间隔不足时不播放
    if (!canPlayShakeSound()) {

        return;

    }


    // 第3个Box播放铃铛声
    if (currentIndex === 3) {

        playBellSound();

    } else {

        // 其他Box播放“唰”声
        playSwooshSound();

    }

}

// ===========================
// Page2盲盒手机跟随计算
// ===========================

let motionStartBeta = null;
let motionStartGamma = null;

// 记录上一次手机水平角度
let lastMotionGamma = null;


// 停止晃动后的回正计时器
let motionReturnTimer = null;


// 左右轮播时暂停手机晃动
let boxMotionLocked = false;

// 上一次播放晃动音效的时间
let lastShakeSoundTime = 0;


// 两次晃动音效的最小间隔
const shakeSoundCooldown = 600;


// 判断当前是否可以播放晃动音效
function canPlayShakeSound() {

    const currentTime =
        performance.now();


    // 距离上一次播放不足350ms时不播放
    if (
        currentTime - lastShakeSoundTime <
        shakeSoundCooldown
    ) {

        return false;

    }


    // 记录本次播放时间
    lastShakeSoundTime =
        currentTime;


    return true;

}


// 让Box立即恢复默认位置
function resetBoxMotion() {

    clearTimeout(
        motionReturnTimer
    );


    boxMotion.style.transform =
        "translate3d(0, 0, 0) rotate(0deg)";


    // 停止快速甩动回弹动画
    const shakeAnimations =
        boxShake.getAnimations();


    shakeAnimations.forEach(animation => {

        animation.cancel();

    });


    boxShake.style.transform =
        "translate3d(0, 0, 0) rotate(0deg)";

}


function limitMotionValue(value, min, max) {

    return Math.max(
        min,
        Math.min(max, value)
    );

}


function handleBoxOrientation(event) {

    // 只在Page2运行
    if (page2.style.display !== "block") return;


    // 左右轮播期间暂停手机晃动
    if (
        boxMotionLocked ||
        isSliding
    ) {

        return;

    }


    // 没有获取到水平角度时不运行
    if (event.gamma === null) return;


    // 第一次获取方向数据时设置起始位置
    if (lastMotionGamma === null) {

        lastMotionGamma =
            event.gamma;

        motionStartGamma =
            event.gamma;

        return;

    }


    // 相邻两次数据的角度变化
    // 只用于判断手机是否还在晃动
    const gammaMovement =
        event.gamma - lastMotionGamma;


    lastMotionGamma =
        event.gamma;


    // 过滤非常轻微的传感器噪声
    if (
        Math.abs(gammaMovement) < 0.08
    ) {

        return;

    }

    // 只有明显晃动时才播放音效
    if (
        Math.abs(gammaMovement) >= 0.6
    ) {

        playCurrentBoxShakeSound();

    }

    // 当前角度与本次起始角度之间的差值
    const gammaDifference =
        limitMotionValue(
            event.gamma - motionStartGamma,
            -12,
            12
        );


    // 最大水平移动40px
    const moveX =
        gammaDifference / 12 * 40;


    // 不进行上下移动
    const moveY = 0;


    // 根据水平位置产生小幅度旋转
    const rotate =
        moveX / 40 * 6;


    boxMotion.style.transform =
        `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rotate}deg)`;


    // 检测到新晃动时，重新计算停止时间
    clearTimeout(
        motionReturnTimer
    );


    motionReturnTimer =
        setTimeout(() => {

            motionReturnTimer = null;


            // 当前停止角度成为下一次晃动的新起点
            motionStartGamma =
                lastMotionGamma;


            // 回到画面中央
            resetBoxMotion();

        }, 150);

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

// ===========================
// 盲盒快速甩动回弹动画
// ===========================

function playBoxShakeAnimation(
    shakeX,
    shakeY
) {

    // 限制最大旋转角度
    const shakeRotate =
        limitMotionValue(
            shakeX / 8,
            -6,
            6
        );


    // 停止上一次尚未结束的回弹动画
    const runningAnimations =
        boxShake.getAnimations();


    runningAnimations.forEach(animation => {

        animation.cancel();

    });


    // 播放新的甩动回弹动画
    boxShake.animate(
        [

            {
                transform:
                    "translate3d(0, 0, 0) rotate(0deg)"
            },

            {
                offset: 0.35,

                transform:
                    `translate3d(${shakeX}px, ${shakeY}px, 0) rotate(${shakeRotate}deg)`
            },

            {
                offset: 0.65,

                transform:
                    `translate3d(${-shakeX * 0.3}px, ${-shakeY * 0.3}px, 0) rotate(${-shakeRotate * 0.35}deg)`
            },

            {
                transform:
                    "translate3d(0, 0, 0) rotate(0deg)"
            }

        ],
        {

            duration: 420,

            easing:
                "cubic-bezier(0.22, 0.8, 0.3, 1)",

            fill: "none"

        }
    );

}