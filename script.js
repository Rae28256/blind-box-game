let currentIndex = 1;
// 用户最终购入的盲盒编号，范围为1～6
let purchasedBoxIndex = 1;

// 记录所有已经购买过的盲盒编号
const purchasedBoxIndexes =
    new Set();

// 1. 获取 DOM

const clickBoxes = document.querySelectorAll(".click-box");

// Page1六张售出覆盖图
const page1SoldImages = document.querySelectorAll(".page1-sold");

const page2 = document.getElementById("page2");
const page2Back = document.getElementById("page2Back");

const page2Left = document.getElementById("page2Left");
const page2Right = document.getElementById("page2Right");

const thumbnail = document.getElementById("thumbnail");

// Page2六张缩略图售出覆盖图
const page2ThumbSoldImages = document.querySelectorAll(".page2-thumb-sold");

const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");

const buyButton = document.getElementById("buyButton");
const buyHit = document.getElementById("buyHit");

const page3 = document.getElementById("page3");
const page3Hand = document.getElementById("page3Hand");

const page3Box = document.getElementById("page3Box");

// Page4静态背景
const page4 =
    document.getElementById("page4");

// Page4娃娃图层
const page4Doll =
    document.getElementById("page4Doll");

// Page4彩带序列帧图层
const page4Confetti =
    document.getElementById(
        "page4Confetti"
    );


// Page5娃娃详情页
const page5 =
    document.getElementById(
        "page5"
    );

// Page5继续购买按钮图片
const page5ContinueButton =
    document.getElementById(
        "page5ContinueButton"
    );

// Page5结束购买按钮图片
const page5FinishButton =
    document.getElementById(
        "page5FinishButton"
    );

// Page5六款全部买完后的宽版结束购买按钮图片
const page5FinishFullButton =
    document.getElementById(
        "page5FinishFullButton"
    );

// Page5继续购买热区
const page5ContinueHit =
    document.getElementById(
        "page5ContinueHit"
    );

// Page5结束购买热区
const page5FinishHit =
    document.getElementById(
        "page5FinishHit"
    );

// Page5六款全部买完后的宽版结束购买热区
const page5FinishFullHit =
    document.getElementById(
        "page5FinishFullHit"
    );

// Page6静态背景
const page6 =
    document.getElementById(
        "page6"
    );

// Page6小人序列帧图层
const page6Character =
    document.getElementById(
        "page6Character"
    );

// Page7回家场景背景
const page7 =
    document.getElementById(
        "page7"
    );

// Page7逐字显示的剧情文字
const page7Dialog =
    document.getElementById(
        "page7Dialog"
    );

// Page7手机点击热区
const page7PhoneHit =
    document.getElementById(
        "page7PhoneHit"
    );

// Page7手机特写画面
const page7PhoneFocus =
    document.getElementById(
        "page7PhoneFocus"
    );

// 手机特写画面上的通知弹窗
const page7Notification =
    document.getElementById(
        "page7Notification"
    );

// Page7手机通知弹窗点击热区
const page7NotificationHit =
    document.getElementById(
        "page7NotificationHit"
    );

// Page8 Sweet Shop App首页
const page8 =
    document.getElementById(
        "page8"
    );

// Page8故障动画序列图层
const page8GlitchFrame =
    document.getElementById(
        "page8GlitchFrame"
    );

// Page8故障动画的图片顺序和每帧停留时间
const page8GlitchSequence = [

    // 第一次轻微故障
    {
        src: "images/page8_glitch_01.png",
        duration: 90
    },

    // 短暂恢复为正常首页
    {
        src: "images/page8_bg.png",
        duration: 180
    },

    // 再次出现轻微故障
    {
        src: "images/page8_glitch_01.png",
        duration: 90
    },

    // 首页故障明显加重
    {
        src: "images/page8_glitch_02.png",
        duration: 180
    },

    // App强制打开商品详情页
    {
        src: "images/page8_product.png",
        duration: 300
    },

    // 商品详情第一次故障
    {
        src: "images/page8_product_glitch.png",
        duration: 100
    },

    // 商品详情短暂恢复
    {
        src: "images/page8_product.png",
        duration: 80
    },

    // 商品详情再次故障
    {
        src: "images/page8_product_glitch.png",
        duration: 250
    },

    // 最终大面积崩溃
    {
        src: "images/page8_glitch_end.png",
        duration: 350
    }
];

// Page8故障动画当前播放到的序号
let page8GlitchIndex = 0;

// Page8故障动画计时器
let page8GlitchTimer = null;

// Page8正常显示后，自动开始故障动画的计时器
let page8GlitchStartTimer = null;

// 保存已经预加载的Page8故障图片
const page8GlitchPreloadedImages = [];

// 去除序列中重复的图片路径，再进行预加载
const page8GlitchImageSources =
    [
        ...new Set(
            page8GlitchSequence.map(
                frame => frame.src
            )
        )
    ];

// 提前加载所有故障状态图
page8GlitchImageSources.forEach(
    imageSource => {

        const preloadImage =
            new Image();

        preloadImage.src =
            imageSource;

        page8GlitchPreloadedImages.push(
            preloadImage
        );
    }
);

// Page6进入Page7的纯白转场层
const page6Page7WhiteTransition =
    document.getElementById(
        "page6Page7WhiteTransition"
    );

// Page6小人动画的4张序列帧
const page6CharacterFrames = [
    "images/page6_character_00.png",
    "images/page6_character_01.png",
    "images/page6_character_02.png",
    "images/page6_character_03.png"
];

// 提前加载Page6小人的4张序列帧
const page6CharacterPreloadedImages =
    page6CharacterFrames.map(
        characterFramePath => {

            const characterFrameImage =
                new Image();

            characterFrameImage.src =
                characterFramePath;

            return characterFrameImage;
        }
    );

// Page6小人当前显示的帧编号
let page6CharacterFrameIndex = 0;

// Page6小人逐帧动画计时器
let page6CharacterTimer = null;

// Page6自动进入Page7的计时器
let page6ToPage7Timer = null;

// Page7需要逐字显示的剧情文案
const page7StoryText =
    "明明已经回到家了，\n脑子里却还惦记着其他的款式……";

// Page7当前已经显示到的字符位置
let page7TextIndex = 0;

// Page7逐字显示文字的计时器
let page7TextTimer = null;

// 逐字显示Page7剧情文案
function typePage7StoryText() {

    // 所有文字显示完成后停止
    if (
        page7TextIndex >=
        page7StoryText.length
    ) {

        page7TextTimer = null;

        // 文案播放完成后播放一次手机通知音
        playPage7NotificationSound();

        // 通知音出现后短暂停顿，再自动进入手机特写画面
        setTimeout(
            () => {

                showPage7PhoneFocus();

            },
            250
        );

        return;
    }


    // 获取当前需要显示的字符
    const currentCharacter =
        page7StoryText[
        page7TextIndex
        ];


    // 将当前字符增加到文本框
    page7Dialog.textContent +=
        currentCharacter;


    // 准备显示下一个字符
    page7TextIndex += 1;


    // 普通汉字的默认显示间隔
    let characterDelay = 80;


    // 换行时稍微停顿
    if (
        currentCharacter === "\n"
    ) {

        characterDelay = 160;

    }


    // 逗号处停顿更久
    if (
        currentCharacter === "，"
    ) {

        characterDelay = 220;

    }


    // 句号、省略号、问号和感叹号处停顿
    if (
        currentCharacter === "。" ||
        currentCharacter === "…" ||
        currentCharacter === "？" ||
        currentCharacter === "！"
    ) {

        characterDelay = 320;

    }


    // 按照当前字符的时间继续显示下一个字
    page7TextTimer =
        setTimeout(
            typePage7StoryText,
            characterDelay
        );
}

// 播放Page6小人逐帧动画
function playPage6CharacterAnimation() {

    // 防止重复启动多个计时器
    clearTimeout(
        page6CharacterTimer
    );


    // 每次进入Page6都从第00帧开始
    page6CharacterFrameIndex = 0;

    page6Character.src =
        page6CharacterFrames[0];


    function showNextPage6CharacterFrame() {

        page6CharacterTimer =
            setTimeout(
                () => {

                    // 00→01→02→03→00循环
                    page6CharacterFrameIndex =
                        (
                            page6CharacterFrameIndex +
                            1
                        ) %
                        page6CharacterFrames.length;


                    page6Character.src =
                        page6CharacterFrames[
                        page6CharacterFrameIndex
                        ];


                    showNextPage6CharacterFrame();
                },
                200
            );
    }


    showNextPage6CharacterFrame();
}

// 显示Page6
function showPage6() {

    // 隐藏Page5背景
    page5.style.display =
        "none";


    // 隐藏Page5两个按钮图片
    page5ContinueButton.style.display =
        "none";

    page5FinishButton.style.display =
        "none";


    // 隐藏Page5两个按钮热区
    page5ContinueHit.style.display =
        "none";

    page5FinishHit.style.display =
        "none";


    // 清除Page5按钮残留的动画状态
    page5ContinueButton.classList.remove(
        "page5-button-active"
    );

    page5FinishButton.classList.remove(
        "page5-button-active"
    );


    // 显示Page6背景和小人
    page6.style.display =
        "block";

    page6Character.style.display =
        "block";


    // 播放Page6小人循环动画
    playPage6CharacterAnimation();

    // 清除可能残留的Page6跳转计时器
    clearTimeout(
        page6ToPage7Timer
    );


    // Page6保持1600ms后自动进入Page7
    page6ToPage7Timer =
        setTimeout(
            () => {

                playPage6ToPage7FadeTransition();

            },
            1600
        );
}

// 显示Page7
function showPage7() {

    // 停止Page6小人逐帧动画
    clearTimeout(
        page6CharacterTimer
    );


    // 隐藏Page6背景和小人
    page6.style.display =
        "none";

    page6Character.style.display =
        "none";


    // 显示Page7背景和剧情文字区域
    page7.style.display =
        "block";

    page7Dialog.style.display =
        "block";


    // 停止可能残留的Page7文字计时器
    clearTimeout(
        page7TextTimer
    );


    // 每次进入Page7时先清空文字
    page7Dialog.textContent =
        "";


    // 从文案的第一个字符重新开始
    page7TextIndex = 0;
}

// 从Page7切换到手机特写画面
function showPage7PhoneFocus() {

    // 隐藏Page7原来的背景
    page7.style.display =
        "none";

    // 隐藏Page7剧情文字
    page7Dialog.style.display =
        "none";

    // 隐藏Page7原来的手机点击热区
    page7PhoneHit.style.display =
        "none";

    // 显示手机特写画面
    page7PhoneFocus.style.display =
        "block";
    // 显示手机屏幕上的通知弹窗
    page7Notification.style.display =
        "block";
    // 显示通知弹窗的红色测试热区
    page7NotificationHit.style.display =
        "block";
}

// 显示Page8 Sweet Shop App首页
function showPage8() {

    // 立即隐藏手机特写画面
    page7PhoneFocus.style.display =
        "none";

    // 立即隐藏通知弹窗
    page7Notification.style.display =
        "none";

    // 立即隐藏通知弹窗点击热区
    page7NotificationHit.style.display =
        "none";

    // 立即显示Page8 App首页
    page8.style.display =
        "block";

    // 清除可能残留的Page8故障计时器
    clearTimeout(
        page8GlitchStartTimer
    );

    clearTimeout(
        page8GlitchTimer
    );

    // 每次进入Page8时，先隐藏故障图层
    "none";

    // Page8正常显示1800ms后，自动开始故障动画
    page8GlitchStartTimer =
        setTimeout(
            () => {

                playPage8GlitchSequence();

            },
            800
        );
}

// 播放Page8故障图片序列
function playPage8GlitchSequence() {

    // 停止可能残留的故障动画计时器
    clearTimeout(
        page8GlitchTimer
    );

    // 每次播放都从第一张故障图开始
    page8GlitchIndex = 0;

    // 显示故障序列图层
    page8GlitchFrame.style.display =
        "block";

    // 显示当前故障状态图
    function showNextPage8GlitchFrame() {

        // 所有状态图播放完成后，停留在最终故障画面
        if (
            page8GlitchIndex >=
            page8GlitchSequence.length
        ) {

            page8GlitchTimer = null;

            // Page8故障序列结束后，先显示横屏提示页｜函数定义于 platformer.js
            showPage8RotateHint();

            return;
        }

        // 获取当前需要显示的图片和停留时间
        const currentGlitchFrame =
            page8GlitchSequence[
            page8GlitchIndex
            ];

        // 切换为当前故障图片
        page8GlitchFrame.src =
            currentGlitchFrame.src;

        // 当前图片停留结束后，进入下一张
        page8GlitchTimer =
            setTimeout(
                () => {

                    page8GlitchIndex += 1;

                    showNextPage8GlitchFrame();

                },
                currentGlitchFrame.duration
            );
    }

    // 开始播放第一张故障图
    showNextPage8GlitchFrame();
}

// 点击手机通知弹窗，进入Page8
page7NotificationHit.addEventListener(
    "click",
    () => {

        // 播放原有的泡泡点击音效
        playTapSound();

        // 立即隐藏热区，防止连续重复点击
        page7NotificationHit.style.display =
            "none";

        // 显示Page8 App首页
        showPage8();
    }
);

// 播放Page6到Page7的纯白淡入淡出转场
function playPage6ToPage7FadeTransition() {

    // 显示纯白转场层
    page6Page7WhiteTransition.style.display =
        "block";


    // 清除可能残留的转场动画状态
    page6Page7WhiteTransition.classList.remove(
        "white-transition-in"
    );

    page6Page7WhiteTransition.classList.remove(
        "white-transition-out"
    );


    // 强制浏览器刷新动画状态
    page6Page7WhiteTransition.offsetWidth;


    // 白色层逐渐覆盖Page6
    page6Page7WhiteTransition.classList.add(
        "white-transition-in"
    );


    // 白色完全覆盖后，切换为Page7
    setTimeout(
        () => {

            showPage7();


            // 从白色逐渐显示Page7
            page6Page7WhiteTransition.classList.remove(
                "white-transition-in"
            );

            page6Page7WhiteTransition.classList.add(
                "white-transition-out"
            );

        },
        500
    );


    // 转场完成后隐藏并重置白色层
    setTimeout(
        () => {

            page6Page7WhiteTransition.classList.remove(
                "white-transition-out"
            );

            page6Page7WhiteTransition.style.display =
                "none";

            // Page7完全显示后停顿400ms，再开始逐字显示文案
            page7TextTimer =
                setTimeout(
                    typePage7StoryText,
                    400
                );

        },
        1050
    );
}

// 继续购买：重置本轮状态并返回Page1
function returnToPage1AfterPurchase() {

    // 隐藏Page5背景
    page5.style.display =
        "none";


    // 隐藏Page5两个按钮图片
    page5ContinueButton.style.display =
        "none";

    page5FinishButton.style.display =
        "none";


    // 隐藏Page5两个按钮热区
    page5ContinueHit.style.display =
        "none";

    page5FinishHit.style.display =
        "none";


    // 清除Page5按钮动画状态
    page5ContinueButton.classList.remove(
        "page5-button-active"
    );

    page5FinishButton.classList.remove(
        "page5-button-active"
    );


    // 停止并重置Page4彩带动画
    clearTimeout(
        page4ConfettiTimer
    );

    page4ConfettiFrameIndex = 0;

    page4Confetti.src =
        page4ConfettiFrames[0];

    page4CanGoToPage5 = false;


    // 停止Page4娃娃缩放引导
    page4Doll.classList.remove(
        "page4-doll-guide"
    );


    // 停止Page4庆祝音效
    page4CelebrationAudio.pause();
    page4CelebrationAudio.currentTime = 0;


    // 保证Page4全部图层隐藏
    page4.style.display =
        "none";

    page4Doll.style.display =
        "none";

    page4Confetti.style.display =
        "none";


    // 重置Page3撕盒完成状态
    page3HasCompleted = false;
    page3HasStartedDragging = false;
    page3HasValidDrag = false;
    isPage3Dragging = false;


    // 重置Page3手部进度
    page3HandProgress = 0;
    page3HandRawProgress = 0;

    page3HandProgressAtPointerDown = 0;
    page3HandRawProgressAtPointerDown = 0;

    page3BoxTearStartProgress = 0;


    // 恢复Page3盲盒第00帧
    updatePage3BoxFrame(0);


    // 恢复Page3蓝手初始位置
    page3Hand.style.transition =
        "none";

    page3Hand.style.transform =
        "translate3d(0, 0, 0)";


    // 更新Page1售出覆盖图和热区
    // 同时隐藏Page2缩略图售出状态
    updateSoldState(false);
}

// Page5六款娃娃详情图片
const page5Images = [
    "images/page5_01.png",
    "images/page5_02.png",
    "images/page5_03.png",
    "images/page5_04.png",
    "images/page5_05.png",
    "images/page5_06.png"
];

// 提前加载Page5的六张详情图片
const page5PreloadedImages =
    page5Images.map(
        page5ImagePath => {

            const page5Image =
                new Image();

            page5Image.src =
                page5ImagePath;

            return page5Image;
        }
    );

// 根据最终购入编号更新Page5详情图片
function updatePage5() {

    // purchasedBoxIndex为1～6
    // 数组位置为0～5，所以需要减1
    const page5ArrayIndex =
        purchasedBoxIndex - 1;

    page5.src =
        page5Images[
        page5ArrayIndex
        ];

    // 显示Page5
    function showPage5() {

        // 进入Page5后立即关闭Page4点击权限
        page4CanGoToPage5 = false;


        // 停止彩带序列帧计时器
        clearTimeout(
            page4ConfettiTimer
        );


        // 停止娃娃缩放引导
        page4Doll.classList.remove(
            "page4-doll-guide"
        );


        // 隐藏Page4全部图层
        page4.style.display = "none";
        page4Doll.style.display = "none";
        page4Confetti.style.display = "none";


        // 根据最终购入编号更新Page5
        updatePage5();


        // 显示Page5
        page5.style.display = "block";
    }
}

// 显示Page5
function showPage5() {

    // 进入Page5后立即关闭Page4点击权限
    page4CanGoToPage5 = false;


    // 停止彩带序列帧计时器
    clearTimeout(
        page4ConfettiTimer
    );


    // 停止娃娃缩放引导
    page4Doll.classList.remove(
        "page4-doll-guide"
    );


    // 隐藏Page4全部图层
    page4.style.display = "none";
    page4Doll.style.display = "none";
    page4Confetti.style.display = "none";


    // 根据最终购入编号更新Page5
    updatePage5();


    // 显示Page5
    page5.style.display = "block";

    // 把本次购入的盲盒也计算进去，判断是否已经集齐6款
    const allBoxesPurchased =
        new Set([
            ...purchasedBoxIndexes,
            purchasedBoxIndex
        ]).size === 6;


    // 根据是否集齐6款切换Page5按钮
    if (allBoxesPurchased) {

        // 买满6款：隐藏原来的两个按钮
        page5ContinueButton.style.display =
            "none";

        page5FinishButton.style.display =
            "none";

        page5ContinueHit.style.display =
            "none";

        page5FinishHit.style.display =
            "none";


        // 显示宽版结束购买按钮和红色测试热区
        page5FinishFullButton.style.display =
            "block";

        page5FinishFullHit.style.display =
            "block";

    } else {

        // 未买满6款：继续显示原来的两个按钮
        page5ContinueButton.style.display =
            "block";

        page5FinishButton.style.display =
            "block";

        page5ContinueHit.style.display =
            "block";

        page5FinishHit.style.display =
            "block";


        // 隐藏宽版按钮和热区
        page5FinishFullButton.style.display =
            "none";

        page5FinishFullHit.style.display =
            "none";
    }
}

// Page5继续购买按钮：记录已购状态并返回Page1
page5ContinueHit.addEventListener(
    "click",
    () => {

        // 播放泡泡点击音效
        playTapSound();


        // 播放Page5专用按钮反馈
        page5ButtonFeedback(
            page5ContinueButton
        );


        // 将本次购入编号加入已购集合
        purchasedBoxIndexes.add(
            purchasedBoxIndex
        );


        // 立即关闭两个热区
        // 防止动画期间重复点击或点击另一个按钮
        page5ContinueHit.style.display =
            "none";

        page5FinishHit.style.display =
            "none";


        // 等按钮反馈完成后返回Page1
        setTimeout(
            () => {

                returnToPage1AfterPurchase();

            },
            400
        );
    }
);

// Page5结束购买按钮：进入Page6
page5FinishHit.addEventListener(
    "click",
    () => {

        // 播放泡泡点击音效
        playTapSound();


        // 播放Page5专用按钮反馈
        page5ButtonFeedback(
            page5FinishButton
        );


        // 立即关闭两个热区
        // 防止动画期间重复点击或点击另一个按钮
        page5ContinueHit.style.display =
            "none";

        page5FinishHit.style.display =
            "none";


        // 等按钮反馈结束后进入Page6
        setTimeout(
            () => {

                showPage6();

            },
            400
        );
    }
);

// Page5买满6款后的宽版结束购买按钮：进入Page6
page5FinishFullHit.addEventListener(
    "click",
    () => {

        // 播放泡泡点击音效
        playTapSound();


        // 播放宽版按钮的缩放反馈
        page5ButtonFeedback(
            page5FinishFullButton
        );


        // 立即关闭宽版热区，防止重复点击
        page5FinishFullHit.style.display =
            "none";


        // 同时确保原来的两个热区保持关闭
        page5ContinueHit.style.display =
            "none";

        page5FinishHit.style.display =
            "none";


        // 等按钮反馈结束后进入Page6
        setTimeout(
            () => {

                showPage6();

            },
            400
        );
    }
);

// 点击Page4进入对应的Page5详情页
page4.addEventListener(
    "click",
    () => {

        // 彩带动画没有播放完成时，点击无效
        if (!page4CanGoToPage5) {
            return;
        }


        // 立即关闭权限，防止连续点击重复触发
        page4CanGoToPage5 = false;


        // 播放原有的泡泡点击音效
        playTapSound();


        // 显示对应的Page5
        showPage5();
    }
);

// Page4彩带动画的7张序列帧
const page4ConfettiFrames = [
    "images/page4_confetti_00.png",
    "images/page4_confetti_01.png",
    "images/page4_confetti_02.png",
    "images/page4_confetti_03.png",
    "images/page4_confetti_04.png",
    "images/page4_confetti_05.png",
    "images/page4_confetti_06.png"
];

// 提前加载Page4的7张彩带序列帧
const page4ConfettiPreloadedImages =
    page4ConfettiFrames.map(
        confettiFramePath => {

            const confettiFrameImage =
                new Image();

            confettiFrameImage.src =
                confettiFramePath;

            return confettiFrameImage;
        }
    );

// Page4彩带动画当前帧
let page4ConfettiFrameIndex = 0;

// Page4彩带动画计时器
let page4ConfettiTimer = null;

// Page4是否允许点击进入Page5
// 必须等彩带动画播放完成后才能变为true
let page4CanGoToPage5 = false;


// 播放Page4彩带序列帧动画
function playPage4ConfettiAnimation() {

    // 防止动画被重复启动
    clearTimeout(
        page4ConfettiTimer
    );

    // 彩带播放期间禁止点击进入Page5
    page4CanGoToPage5 = false;

    // 从头播放一次Page4庆祝音效
    page4CelebrationAudio.pause();
    page4CelebrationAudio.currentTime = 0;

    page4CelebrationAudio
        .play()
        .catch(() => {
            // 浏览器暂时阻止播放时，不影响彩带动画
        });

    page4ConfettiFrameIndex = 0;

    page4Confetti.src =
        page4ConfettiFrames[0];

    page4Confetti.style.display =
        "block";


    // 每次切换到下一帧前的等待时间
    const page4ConfettiFrameTimes = [
        120,
        150,
        165,
        210,
        230,
        240
    ];


    function showNextConfettiFrame() {


        if (
            page4ConfettiFrameIndex >=
            page4ConfettiFrames.length - 1
        ) {

            // 彩带动画完成后，启动娃娃点击引导
            page4Doll.classList.add(
                "page4-doll-guide"
            );

            // 彩带动画完成后，允许点击进入Page5
            page4CanGoToPage5 = true;

            return;
        }


        const currentFrameTime =
            page4ConfettiFrameTimes[
            page4ConfettiFrameIndex
            ];


        page4ConfettiTimer =
            setTimeout(
                () => {

                    page4ConfettiFrameIndex += 1;

                    page4Confetti.src =
                        page4ConfettiFrames[
                        page4ConfettiFrameIndex
                        ];

                    showNextConfettiFrame();
                },
                currentFrameTime
            );
    }


    showNextConfettiFrame();
}

// Page4六款娃娃图片
const page4DollImages = [
    "images/page4_doll_01.png",
    "images/page4_doll_02.png",
    "images/page4_doll_03.png",
    "images/page4_doll_04.png",
    "images/page4_doll_05.png",
    "images/page4_doll_06.png"
];

// 提前加载Page4的六张娃娃图片
const page4DollPreloadedImages =
    page4DollImages.map(
        dollImagePath => {

            const dollImage =
                new Image();

            dollImage.src =
                dollImagePath;

            return dollImage;
        }
    );

// 根据最终购入编号更新Page4娃娃
function updatePage4Doll() {

    // purchasedBoxIndex为1～6
    // 数组位置为0～5，所以需要减1
    const page4DollArrayIndex =
        purchasedBoxIndex - 1;

    page4Doll.src =
        page4DollImages[
        page4DollArrayIndex
        ];
}

// 显示Page4
function showPage4() {

    // 停止Page3撕纸音效
    page3PaperTearAudio.pause();

    clearTimeout(
        page3PaperTearAudio.stopTimer
    );


    // 隐藏Page3全部图层
    page3.style.display = "none";
    page3Box.style.display = "none";
    page3Hand.style.display = "none";

    document.getElementById(
        "page3Arrow"
    ).style.display = "none";


    // 根据最终购入编号更新娃娃
    updatePage4Doll();


    // 显示Page4背景和对应娃娃
    page4.style.display = "block";
    page4Doll.style.display = "block";

    // 播放一次Page4彩带炸开动画
    playPage4ConfettiAnimation();
}

// Page3连续撕纸音效
// 当前只加载，暂时不连接拖动播放
const page3PaperTearAudio =
    new Audio(
        "images/page3_paper_tear.mp3"
    );

page3PaperTearAudio.preload = "auto";
// 撕纸音效使用音频文件的最大音量
page3PaperTearAudio.volume = 1;

// Page4彩带庆祝音效
// 当前只加载，暂时不播放
const page4CelebrationAudio =
    new Audio(
        "images/page4_celebration.mp3"
    );

page4CelebrationAudio.preload =
    "auto";

page4CelebrationAudio.volume =
    1;

// Page3盲盒撕开状态图
const page3BoxFrames = [

    "images/page3_box_00.png",

    "images/page3_box_01.png",

    "images/page3_box_02.png",

    "images/page3_box_03.png",

    "images/page3_box_04.png",

    "images/page3_box_05.png"

];

// Page3盲盒当前显示的状态帧
let page3BoxFrameIndex = 0;
let page3BoxTearStartProgress = 0;

// 更新Page3盲盒状态图
function updatePage3BoxFrame(
    nextFrameIndex
) {

    // 限制帧编号只能在0～5之间
    const safeFrameIndex =
        Math.max(
            0,
            Math.min(
                page3BoxFrames.length - 1,
                nextFrameIndex
            )
        );


    // 记录当前帧编号
    page3BoxFrameIndex =
        safeFrameIndex;


    // 更换盲盒图片
    page3Box.src =
        page3BoxFrames[
        page3BoxFrameIndex
        ];

}

// 提前加载Page3的6张盲盒状态图
const page3BoxPreloadedImages =
    page3BoxFrames.map(
        framePath => {

            const frameImage =
                new Image();


            frameImage.src =
                framePath;


            return frameImage;

        }
    );

// Page3鼠标是否正在按住拖动，松开后变回false
let isPage3Dragging = false;
// Page3是否已经开始过拖动，后续用于让粉色箭头在第一次拖动后保持隐藏
let page3HasStartedDragging = false;
// Page3鼠标按下时的横向位置
let page3PointerStartX = 0;
// Page3鼠标按下时的纵向位置
let page3PointerStartY = 0;
// 本次操作是否达到有效拖动距离
let page3HasValidDrag = false;
// Page3是否已经完成撕盒并开始跳转
let page3HasCompleted = false;

// Page3手部指尖轨迹起点
const page3HandPathStartX = 58;
const page3HandPathStartY = 358;


// Page3手部指尖轨迹终点
const page3HandPathEndX = 280;
const page3HandPathEndY = 438;


// Page3手部完整轨迹移动量
const page3HandPathMoveX =
    page3HandPathEndX -
    page3HandPathStartX;


const page3HandPathMoveY =
    page3HandPathEndY -
    page3HandPathStartY;

// Page3手部当前所在的轨迹进度
// 0代表起点，1代表终点
let page3HandProgress = 0;

// Page3手部未经阻力处理的原始进度
// 后续用它计算稳定、连续的撕纸阻力
let page3HandRawProgress = 0;

// 鼠标按下时，手部原来的轨迹进度
let page3HandProgressAtPointerDown = 0;

// 鼠标按下时，未经阻力处理的原始进度
let page3HandRawProgressAtPointerDown = 0;

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

// Page4初始状态
page4.style.display = "none";
page4Doll.style.display = "none";

// Page5初始状态
page5.style.display = "none";

page5ContinueButton.style.display =
    "none";

page5FinishButton.style.display =
    "none";

page5ContinueHit.style.display =
    "none";

page5FinishHit.style.display =
    "none";

// Page6初始状态
page6.style.display =
    "none";

page6Character.style.display =
    "none";

// Page7初始状态
page7.style.display =
    "none";

page7Dialog.style.display =
    "none";

page7PhoneHit.style.display =
    "none";

page7PhoneFocus.style.display =
    "none";

page7Notification.style.display =
    "none";

page7NotificationHit.style.display =
    "none";

page8.style.display =
    "none";

page8GlitchFrame.style.display =
    "none";

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

        // 进入Page2时显示已售缩略图状态
        updateSoldState(true);

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


    // 从当前编号开始向右寻找下一款未售盲盒
    let nextIndex =
        currentIndex;

    do {

        nextIndex += 1;


        // 超过6号后回到1号
        if (nextIndex > 6) {

            nextIndex = 1;

        }

    } while (
        // 如果该编号已经售出，就继续向右寻找
        purchasedBoxIndexes.has(
            nextIndex
        ) &&
        // 只剩当前这一款时，允许停回当前编号
        nextIndex !== currentIndex
    );


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



    // 从当前编号开始向左寻找下一款未售盲盒
    let nextIndex =
        currentIndex;

    do {

        nextIndex -= 1;


        // 小于1号后回到6号
        if (nextIndex < 1) {

            nextIndex = 6;

        }

    } while (
        // 如果该编号已经售出，就继续向左寻找
        purchasedBoxIndexes.has(
            nextIndex
        ) &&
        // 只剩当前这一款时，允许停回当前编号
        nextIndex !== currentIndex
    );



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

    // 记录用户最终购入的是第几款盲盒
    purchasedBoxIndex = currentIndex;

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
        // 显示Page3放大盲盒
        document.getElementById("page3Box").style.display = "block";
        // 显示Page3粉色箭头
        document.getElementById("page3Arrow").style.display = "block";
        // 显示Page3手部图标
        document.getElementById("page3Hand").style.display = "block";


    }, 500);


});

// 更新Page1和Page2的售出状态
function updateSoldState(
    showPage2SoldState = false
) {

    // 更新Page1售出覆盖图和点击热区
    page1SoldImages.forEach(
        (
            soldImage,
            arrayIndex
        ) => {

            // 数组从0开始，盲盒编号从1开始
            const boxNumber =
                arrayIndex + 1;

            const isSold =
                purchasedBoxIndexes.has(
                    boxNumber
                );


            // 显示或隐藏Page1售出覆盖图
            soldImage.style.display =
                isSold
                    ? "block"
                    : "none";


            // 已售盲盒热区不能点击
            clickBoxes[
                arrayIndex
            ].style.pointerEvents =
                isSold
                    ? "none"
                    : "auto";
        }
    );


    // 更新Page2缩略图售出覆盖图
    page2ThumbSoldImages.forEach(
        (
            soldImage,
            arrayIndex
        ) => {

            const boxNumber =
                arrayIndex + 1;

            const isSold =
                purchasedBoxIndexes.has(
                    boxNumber
                );


            // 只有进入Page2时才显示缩略图售出状态
            soldImage.style.display =
                showPage2SoldState &&
                    isSold
                    ? "block"
                    : "none";
        }
    );
}

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

// Page5按钮专用点击反馈
function page5ButtonFeedback(button) {

    // 移除上一次动画状态
    button.classList.remove(
        "page5-button-active"
    );


    // 强制浏览器刷新动画状态
    button.offsetWidth;


    // 重新启动Page5按钮动画
    button.classList.add(
        "page5-button-active"
    );


    // 动画完整播放后移除状态
    setTimeout(
        () => {

            button.classList.remove(
                "page5-button-active"
            );

        },
        400
    );
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
// Page7手机“叮咚”通知音
// ===========================

function playPage7NotificationSound() {

    const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;


    if (!AudioContextClass) return;


    // 与现有按钮和晃动音效共用声音环境
    if (!tapAudioContext) {

        tapAudioContext =
            new AudioContextClass();

    }


    function createPage7NotificationSound() {

        const currentTime =
            tapAudioContext.currentTime;


        // 创建单独一声提示音
        function createNotificationTone(
            frequency,
            startDelay,
            duration,
            volume
        ) {

            const oscillator =
                tapAudioContext.createOscillator();

            const gainNode =
                tapAudioContext.createGain();


            oscillator.type =
                "sine";

            oscillator.frequency.setValueAtTime(
                frequency,
                currentTime + startDelay
            );


            // 声音从很轻开始
            gainNode.gain.setValueAtTime(
                0.001,
                currentTime + startDelay
            );

            // 快速出现
            gainNode.gain.exponentialRampToValueAtTime(
                volume,
                currentTime + startDelay + 0.015
            );

            // 柔和消失
            gainNode.gain.exponentialRampToValueAtTime(
                0.001,
                currentTime + startDelay + duration
            );


            oscillator.connect(
                gainNode
            );

            gainNode.connect(
                tapAudioContext.destination
            );


            oscillator.start(
                currentTime + startDelay
            );

            oscillator.stop(
                currentTime +
                startDelay +
                duration
            );
        }


        // 第一声“叮”：较高、较短
        createNotificationTone(
            800,
            0,
            0.22,
            1
        );


        // 第二声“咚”：稍低、稍长
        createNotificationTone(
            660,
            0.16,
            0.30,
            0.70
        );
    }


    // 兼容手机浏览器暂停声音环境的情况
    if (
        tapAudioContext.state ===
        "suspended"
    ) {

        tapAudioContext
            .resume()
            .then(() => {

                createPage7NotificationSound();

            })
            .catch(() => { });

    } else {

        createPage7NotificationSound();

    }
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

// ===========================
// Page3鼠标按下
// ===========================

page3.addEventListener(
    "pointerdown",
    event => {

        // 电脑端只响应鼠标左键
        if (
            event.pointerType === "mouse" &&
            event.button !== 0
        ) {

            return;

        }


        event.preventDefault();


        // 记录正在拖动
        isPage3Dragging = true;

        // 记录鼠标按下的位置
        page3PointerStartX =
            event.clientX;

        page3PointerStartY =
            event.clientY;

        // 记录鼠标按下时手部已有的轨迹进度
        page3HandProgressAtPointerDown =
            page3HandProgress;

        // 记录按下时未经阻力处理的原始进度
        page3HandRawProgressAtPointerDown =
            page3HandRawProgress;


        // 每次按下时，先视为没有发生有效拖动
        page3HasValidDrag = false;


        // 第一次拖动后隐藏粉色箭头
        document.getElementById(
            "page3Arrow"
        ).style.display = "none";


        // 持续接收当前鼠标或手指的移动事件
        page3.setPointerCapture(
            event.pointerId
        );

    }
);

// ===========================
// Page3鼠标移动距离判断
// ===========================

page3.addEventListener(
    "pointermove",
    event => {

        // 没有按住鼠标时不执行
        if (!isPage3Dragging) {

            return;

        }


        // 计算鼠标距离按下位置的移动量
        const moveDistanceX =
            event.clientX -
            page3PointerStartX;


        const moveDistanceY =
            event.clientY -
            page3PointerStartY;


        // 计算实际移动距离
        const totalMoveDistance =
            Math.hypot(
                moveDistanceX,
                moveDistanceY
            );


        // 移动达到40px后，判定为有效拖动
        if (totalMoveDistance >= 40) {
            page3HasValidDrag = true;
            page3HasStartedDragging = true;

            if (page3BoxFrameIndex === 0) {
                page3BoxTearStartProgress = page3HandProgress;
                updatePage3BoxFrame(1);
            }
        }


        // 获取Page3在当前电脑窗口中的实际尺寸
        const page3Rect =
            page3.getBoundingClientRect();


        // 将电脑屏幕中的鼠标移动量
        // 转换为375×812设计稿中的移动量
        const designMoveX =
            moveDistanceX *
            (375 / page3Rect.width);


        const designMoveY =
            moveDistanceY *
            (812 / page3Rect.height);


        // 计算鼠标移动在斜向轨迹上的投影
        const pathLengthSquared =
            page3HandPathMoveX *
            page3HandPathMoveX +
            page3HandPathMoveY *
            page3HandPathMoveY;


        const progressChange =
            (
                designMoveX *
                page3HandPathMoveX +
                designMoveY *
                page3HandPathMoveY
            ) /
            pathLengthSquared;

        // 记录本次计算前的手部进度
        // 后续用来判断蓝手是否真正向前移动
        const previousPage3HandProgress =
            page3HandProgress;

        // 计算未经阻力处理的原始进度
        const nextPage3HandRawProgress =
            Math.max(
                0,
                Math.min(
                    1,
                    page3HandRawProgressAtPointerDown +
                    progressChange
                )
            );


        // 原始进度同样只能前进，不能后退
        page3HandRawProgress =
            Math.max(
                page3HandRawProgress,
                nextPage3HandRawProgress
            );

        // 给原始进度加入连续的撕纸阻力曲线
        // 开始和结束稍慢，中间较顺畅
        const resistedPage3HandProgress =
            page3HandRawProgress < 0.5
                ? 2 *
                page3HandRawProgress *
                page3HandRawProgress
                : 1 -
                Math.pow(
                    -2 * page3HandRawProgress + 2,
                    2
                ) / 2;


        // 使用阻力处理后的进度控制蓝手
        // 手部仍然只能前进，不能向后退
        page3HandProgress =
            Math.max(
                page3HandProgress,
                resistedPage3HandProgress
            );

        // 根据当前进度计算手部移动距离
        const page3HandMoveX =
            page3HandPathMoveX *
            page3HandProgress;


        const page3HandMoveY =
            page3HandPathMoveY *
            page3HandProgress;


        // 让手部只沿设定的斜向轨迹移动
        page3Hand.style.transform =
            `translate3d(${page3HandMoveX}px, ${page3HandMoveY}px, 0)`;

        // 只有达到有效拖动距离，并且蓝手真正向前移动时
        // 才开始播放撕纸音效
        if (
            page3HasValidDrag &&
            page3HandProgress >
            previousPage3HandProgress
        ) {
            if (page3PaperTearAudio.paused) {

                // 音频已经播放结束时，从头重新播放
                if (page3PaperTearAudio.ended) {
                    page3PaperTearAudio.currentTime = 0;
                }

                page3PaperTearAudio
                    .play()
                    .catch(() => {
                        // 浏览器暂时阻止播放时不影响其他交互
                    });
            }


            // 每次蓝手继续前进时，重新计算停止时间
            clearTimeout(
                page3PaperTearAudio.stopTimer
            );

            page3PaperTearAudio.stopTimer =
                setTimeout(
                    () => {
                        page3PaperTearAudio.pause();
                    },
                    280
                );
        }

        if (page3HasValidDrag) {
            const remainingProgress = Math.max(
                0.001,
                1 - page3BoxTearStartProgress
            );

            const page3BoxTearProgress = Math.max(
                0,
                Math.min(
                    1,
                    (page3HandProgress - page3BoxTearStartProgress) /
                    remainingProgress
                )
            );

            const nextPage3BoxFrame = Math.round(
                1 + page3BoxTearProgress * 4
            );

            updatePage3BoxFrame(nextPage3BoxFrame);

            // 蓝手到达终点并且盲盒完全撕开后
            // 只触发一次Page4跳转
            if (
                page3HandProgress >= 0.999 &&
                page3BoxFrameIndex === 5 &&
                !page3HasCompleted
            ) {
                page3HasCompleted = true;

                // 短暂停留，让用户看清完全撕开的状态
                setTimeout(
                    () => {
                        showPage4();
                    },
                    380
                );
            }
        }
    }
);

// ===========================
// Page3鼠标松开
// ===========================

page3.addEventListener(
    "pointerup",
    event => {

        // 结束当前拖动
        isPage3Dragging = false;

        // 本次拖动没有达到40px时
        // 手部返回本次按下之前的位置
        if (!page3HasValidDrag) {

            page3HandProgress =
                page3HandProgressAtPointerDown;


            // 误触回位时，原始进度也恢复
            page3HandRawProgress =
                page3HandRawProgressAtPointerDown;


            const returnHandX =
                page3HandPathMoveX *
                page3HandProgress;


            const returnHandY =
                page3HandPathMoveY *
                page3HandProgress;


            // 记录回位前的当前位置
            const currentHandTransform =
                page3Hand.style.transform ||
                "translate3d(0, 0, 0)";


            // 计算回位后的状态
            const returnHandTransform =
                `translate3d(${returnHandX}px, ${returnHandY}px, 0)`;


            // 最终位置设置为回位位置
            page3Hand.style.transform =
                returnHandTransform;


            // 播放短暂回位动画
            page3Hand.animate(
                [

                    {
                        transform:
                            currentHandTransform
                    },

                    {
                        transform:
                            returnHandTransform
                    }

                ],
                {

                    duration: 150,

                    easing: "ease-out"

                }
            );

        }


        // 本次没有发生有效拖动，
        // 并且用户此前也没有完成过拖动
        if (
            !page3HasValidDrag &&
            !page3HasStartedDragging
        ) {

            // 重新显示粉色箭头
            document.getElementById(
                "page3Arrow"
            ).style.display = "block";

        }


        // 释放当前鼠标或手指
        if (
            page3.hasPointerCapture(
                event.pointerId
            )
        ) {

            page3.releasePointerCapture(
                event.pointerId
            );

        }


        // 重置本次拖动状态
        page3HasValidDrag = false;

    }
);