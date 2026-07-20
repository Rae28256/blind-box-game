// 人物跑步帧素材｜文件位于 images/platformer/
const platformerRunFrames = [
    'images/platformer/platformer_player_run_01.png',
    'images/platformer/platformer_player_run_02.png',
    'images/platformer/platformer_player_run_03.png',
    'images/platformer/platformer_player_run_04.png'
];

// 当前跑步帧序号与循环计时器
let platformerRunFrameIndex = 0;
let platformerRunTimer = null;

// 背景移动状态｜人物进场完成后才开始运行
let platformerBackgroundAnimationId = null;
let platformerBackgroundStartTimer = null;
let platformerBackgroundOffset = 0;
let platformerBackgroundLastTime = null;

// 长背景每秒向左移动的距离｜单位：px
const platformerBackgroundSpeed = 60;

// 水杯作为前景商品，移动速度快于背景｜单位：px/s
const platformerCupSpeed = 200;

// 水杯与水杯红框当前独立位移距离
let platformerCupOffset = 0;

// 横版游戏的初始消费状态
const platformerInitialBudget = 300;
const platformerCartCapacity = 6;

// 小熊保温杯的消费数值
const platformerCupPrice = 49;
const platformerCupSlots = 1;

// Sweet Box 的消费数值
const platformerSweetBoxPrice = 59;
const platformerSweetBoxSlots = 1;

// 当前局内的动态消费状态
let platformerBudget = platformerInitialBudget;
let platformerCartSlots = 0;

// 跳跃状态｜人物进场结束后才允许跳跃
let platformerCanJump = false;
let platformerIsJumping = false;

// 水杯是否已成功获取
let platformerCupCollected = false;

// Sweet Box 是否已成功获取
let platformerSweetBoxCollected = false;

// 将当前预算与购物车容量更新到顶部 HUD
function updatePlatformerHud() {
    const platformerBudgetValue =
        document.getElementById('platformerBudgetValue');
    const platformerCartValue =
        document.getElementById('platformerCartValue');

    if (platformerBudgetValue) {
        platformerBudgetValue.textContent =
            `¥ ${platformerBudget}`;
    }

    if (platformerCartValue) {
        platformerCartValue.textContent =
            `${platformerCartSlots}/${platformerCartCapacity}`;
    }
}

// 判断两个红色判定区是否重叠
function arePlatformerZonesOverlapping(firstZone, secondZone) {
    const firstRect = firstZone.getBoundingClientRect();
    const secondRect = secondZone.getBoundingClientRect();

    return (
        firstRect.left < secondRect.right &&
        firstRect.right > secondRect.left &&
        firstRect.top < secondRect.bottom &&
        firstRect.bottom > secondRect.top
    );
}

// 背景移动期间持续检查人物红框是否碰到水杯红框
function checkPlatformerCupCollision() {
    const platformerPickupZone =
        document.getElementById('platformerPickupZone');
    const platformerItemCup =
        document.getElementById('platformerItemCup');
    const platformerItemCupZone =
        document.getElementById('platformerItemCupZone');

    // 水杯已获取或元素不存在时，不再继续检测
    if (
        platformerCupCollected ||
        !platformerPickupZone ||
        !platformerItemCup ||
        !platformerItemCupZone
    ) {
        return;
    }

    // 不跳时红框会经过水杯并自动获取；
    // 提前跳跃时人物红框上移，可避开低位水杯
    if (
        arePlatformerZonesOverlapping(
            platformerPickupZone,
            platformerItemCupZone
        )
    ) {
        platformerCupCollected = true;

        // 成功购入小熊保温杯，扣除预算并占用 1 格购物车
        platformerBudget -= platformerCupPrice;
        platformerCartSlots += platformerCupSlots;
        updatePlatformerHud();

        platformerItemCup.style.display = 'none';
        platformerItemCupZone.style.display = 'none';
    }
}

// 只有人物正在跳跃时，才检查是否获取高位 Sweet Box
function checkPlatformerSweetBoxCollision() {
    const platformerPickupZone =
        document.getElementById('platformerPickupZone');
    const platformerProductSweetBox =
        document.getElementById('platformerProductSweetBox');
    const platformerSweetBoxZone =
        document.getElementById('platformerSweetBoxZone');

    if (
        !platformerIsJumping ||
        platformerSweetBoxCollected ||
        !platformerPickupZone ||
        !platformerProductSweetBox ||
        !platformerSweetBoxZone
    ) {
        return;
    }

    // 跳跃中的人物红框碰到高位盲盒红框，购入 Sweet Box
    if (
        arePlatformerZonesOverlapping(
            platformerPickupZone,
            platformerSweetBoxZone
        )
    ) {
        platformerSweetBoxCollected = true;

        platformerBudget -= platformerSweetBoxPrice;
        platformerCartSlots += platformerSweetBoxSlots;
        updatePlatformerHud();

        platformerProductSweetBox.style.display = 'none';
        platformerSweetBoxZone.style.display = 'none';
    }
}

// 执行一次原地跳跃
function makePlatformerPlayerJump() {
    const platformerPlayer = document.getElementById('platformerPlayer');
    const platformerPickupZone = document.getElementById('platformerPickupZone');

    // 人物尚未进场完成，或正在跳跃时，不重复触发
    if (!platformerPlayer || !platformerCanJump || platformerIsJumping) {
        return;
    }

    platformerIsJumping = true;

    // 人物整体上跳 78px，再自然落回地面
    platformerPlayer.animate(
        [
            { transform: 'translateY(0)' },
            { transform: 'translateY(-115px)', offset: 0.05 },
            { transform: 'translateY(-115px)', offset: 0.45 },
            { transform: 'translateY(0)' }
        ],
        {
            duration: 1400,
            easing: 'ease-in-out'
        }
    );

    // 获取判定区与人物使用完全相同的跳跃轨迹
    if (platformerPickupZone) {
        platformerPickupZone.animate(
            [
                { transform: 'translateY(0)' },
                { transform: 'translateY(-115px)', offset: 0.05 },
                { transform: 'translateY(-115px)', offset: 0.45 },
                { transform: 'translateY(0)' }
            ],
            {
                duration: 1400,
                easing: 'ease-in-out'
            }
        );
    }

    // 跳跃结束后，允许下一次点击
    window.setTimeout(() => {
        platformerIsJumping = false;
    }, 1400);
}

// 绑定右下角跳跃热区的鼠标与触屏操作
function setupPlatformerJumpButton() {
    const platformerJumpHit = document.getElementById('platformerJumpHit');

    if (!platformerJumpHit) {
        return;
    }

    platformerJumpHit.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        makePlatformerPlayerJump();
    });
}

// 开始长背景循环移动
function startPlatformerBackgroundScroll() {
    const platformerScene = document.getElementById('platformerScene');
    const platformerBg = document.getElementById('platformerBg');
    const platformerItemCup = document.getElementById('platformerItemCup');
    const platformerItemCupZone =
        document.getElementById('platformerItemCupZone');
    const platformerProductSweetBox =
        document.getElementById('platformerProductSweetBox');
    const platformerSweetBoxZone =
        document.getElementById('platformerSweetBoxZone');

    if (!platformerScene || !platformerBg) {
        return;
    }

    // 防止重复进入游戏时叠加多个背景动画
    cancelAnimationFrame(platformerBackgroundAnimationId);

    // 如果图片尚未加载完成，加载后再开始移动
    if (!platformerBg.complete) {
        platformerBg.addEventListener(
            'load',
            startPlatformerBackgroundScroll,
            { once: true }
        );
        return;
    }

    // 每次进入横版游戏，背景从最左侧重新开始
    platformerBackgroundOffset = 0;
    platformerCupOffset = 0;
    platformerBackgroundLastTime = null;
    platformerBg.style.transform = 'translateX(0px)';

    // 水杯也从图片内预设的右侧位置开始
    if (platformerItemCup) {
        platformerItemCup.style.transform = 'translateX(0px)';
    }

    if (platformerItemCupZone) {
        platformerItemCupZone.style.transform = 'translateX(0px)';
    }

    if (platformerProductSweetBox) {
        platformerProductSweetBox.style.transform = 'translateX(0px)';
    }

    if (platformerSweetBoxZone) {
        platformerSweetBoxZone.style.transform = 'translateX(0px)';
    }

    // 长背景可移动的最大距离
    const maxScrollDistance =
        platformerBg.offsetWidth - platformerScene.clientWidth;

    // 背景宽度不足时，不执行移动
    if (maxScrollDistance <= 0) {
        return;
    }

    function moveBackground(currentTime) {
        if (platformerBackgroundLastTime === null) {
            platformerBackgroundLastTime = currentTime;
        }

        const elapsedTime =
            (currentTime - platformerBackgroundLastTime) / 1000;

        platformerBackgroundLastTime = currentTime;

        // 背景向左移动
        platformerBackgroundOffset -=
            platformerBackgroundSpeed * elapsedTime;

        // 到达长背景最右侧后，从开头重新循环
        if (platformerBackgroundOffset <= -maxScrollDistance) {
            platformerBackgroundOffset = 0;
        }

        platformerBg.style.transform =
            `translateX(${platformerBackgroundOffset}px)`;

        // 水杯作为前景商品，独立以更快速度向左移动
        platformerCupOffset -=
            platformerCupSpeed * elapsedTime;

        if (platformerItemCup) {
            platformerItemCup.style.transform =
                `translateX(${platformerCupOffset}px)`;
        }

        // 水杯红框必须使用同一独立位移，才能持续对齐水杯
        if (platformerItemCupZone) {
            platformerItemCupZone.style.transform =
                `translateX(${platformerCupOffset}px)`;
        }

        if (platformerProductSweetBox) {
            platformerProductSweetBox.style.transform =
                `translateX(${platformerCupOffset}px)`;
        }

        if (platformerSweetBoxZone) {
            platformerSweetBoxZone.style.transform =
                `translateX(${platformerCupOffset}px)`;
        }

        // 每一帧都检查低位水杯是否被人物红框碰到
        checkPlatformerCupCollision();

        // 每一帧都检查跳跃中的人物是否碰到高位 Sweet Box
        checkPlatformerSweetBoxCollision();

        platformerBackgroundAnimationId =
            requestAnimationFrame(moveBackground);
    }

    platformerBackgroundAnimationId =
        requestAnimationFrame(moveBackground);
}

// 开始人物四帧跑步循环
function startPlatformerPlayerRun() {
    const platformerPlayer = document.getElementById('platformerPlayer');

    if (!platformerPlayer) {
        return;
    }

    // 防止重复进入横版场景时叠加多个计时器
    clearInterval(platformerRunTimer);

    // 每次进入横版场景都从第 1 帧开始
    platformerRunFrameIndex = 0;
    platformerPlayer.src =
        platformerRunFrames[platformerRunFrameIndex];

    // 每 160ms 切换一次，共 4 帧循环
    platformerRunTimer = window.setInterval(() => {
        platformerRunFrameIndex =
            (platformerRunFrameIndex + 1) %
            platformerRunFrames.length;

        platformerPlayer.src =
            platformerRunFrames[platformerRunFrameIndex];
    }, 160);
}

// 显示电脑端横版小游戏｜对应：index.html 的 #platformerScene
function showPlatformerScene() {
    const game = document.querySelector('.game');
    const platformerScene = document.getElementById('platformerScene');
    const platformerPlayer = document.getElementById('platformerPlayer');
    const platformerPickupZone = document.getElementById('platformerPickupZone');
    const platformerItemCup = document.getElementById('platformerItemCup');
    const platformerItemCupZone =
        document.getElementById('platformerItemCupZone');
    const platformerProductSweetBox =
        document.getElementById('platformerProductSweetBox');
    const platformerSweetBoxZone =
        document.getElementById('platformerSweetBoxZone');

    if (
        !game ||
        !platformerScene ||
        !platformerPlayer ||
        !platformerPickupZone ||
        !platformerItemCup ||
        !platformerItemCupZone ||
        !platformerProductSweetBox ||
        !platformerSweetBoxZone
    ) {
        return;
    }

    // 防止重复进入横版场景时保留旧的等待计时器
    clearTimeout(platformerBackgroundStartTimer);

    // 电脑端横版游戏固定使用 812 × 375 设计稿尺寸
    game.style.width = '812px';
    game.style.height = '375px';

    // 每次进入游戏时，人物先回到左侧起点
    platformerPlayer.style.left = '0px';

    // 获取判定区也先回到人物身体对应的左侧位置
    platformerPickupZone.style.left = '46px';


    // 进场过程中暂时不能跳跃
    platformerCanJump = false;
    platformerIsJumping = false;

    // 每次进入游戏时，重新显示尚未获取的水杯
    platformerCupCollected = false;
    platformerSweetBoxCollected = false;

    // 每次进入游戏时恢复初始预算与购物车容量
    platformerBudget = platformerInitialBudget;
    platformerCartSlots = 0;
    updatePlatformerHud();

    platformerItemCup.style.display = 'block';
    platformerItemCupZone.style.display = 'block';
    platformerProductSweetBox.style.display = 'block';
    platformerSweetBoxZone.style.display = 'block';

    // 显示横版游戏场景
    platformerScene.style.display = 'block';

    // 横版场景显示后，开始人物四帧跑步动画
    startPlatformerPlayerRun();

    // 下一次画面绘制时，人物跑到约 1/3 的位置
    window.requestAnimationFrame(() => {
        platformerPlayer.style.left = '190px';
        platformerPickupZone.style.left = '236px';
    });

    // 人物进场动画为 1.8 秒；结束后开启跳跃并让背景开始移动
    platformerBackgroundStartTimer = window.setTimeout(() => {
        platformerCanJump = true;
        startPlatformerBackgroundScroll();
    }, 1800);
}

// 页面加载完成后，绑定一次跳跃按钮热区
setupPlatformerJumpButton();