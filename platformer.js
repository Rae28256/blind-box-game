// 显示横版小游戏场景｜对应：index.html 的 #platformerScene
function showPlatformerScene() {
    const game = document.querySelector('.game');
    const platformerScene = document.getElementById('platformerScene');

    if (!game || !platformerScene) {
        return;
    }

    // 横版游戏设计稿尺寸
    const platformerDesignWidth = 812;
    const platformerDesignHeight = 375;

    // 电脑端保持设计稿原始尺寸；手机端才按屏幕等比缩放
    const isMobileDevice = window.matchMedia(
        '(pointer: coarse)'
    ).matches;

    let platformerWidth = platformerDesignWidth;
    let platformerHeight = platformerDesignHeight;

    if (isMobileDevice) {
        const platformerScale = Math.min(
            window.innerWidth / platformerDesignWidth,
            window.innerHeight / platformerDesignHeight
        );

        platformerWidth =
            platformerDesignWidth * platformerScale;
        platformerHeight =
            platformerDesignHeight * platformerScale;
    }

    game.style.width = `${platformerWidth}px`;
    game.style.height = `${platformerHeight}px`;

    platformerScene.style.display = 'block';

    // 若用户重新转回竖屏，则隐藏横版游戏并回到横屏提示页
    function checkReturnToPortrait() {
        const isLandscape = window.matchMedia(
            '(orientation: landscape)'
        ).matches;

        if (isLandscape) {
            return;
        }

        platformerScene.style.display = 'none';

        // 清除横版尺寸，恢复 style.css 中原本的竖屏尺寸
        game.style.width = '';
        game.style.height = '';

        window.removeEventListener(
            'resize',
            checkReturnToPortrait
        );
        window.removeEventListener(
            'orientationchange',
            checkReturnToPortrait
        );

        showPage8RotateHint();
    }

    window.addEventListener(
        'resize',
        checkReturnToPortrait
    );
    window.addEventListener(
        'orientationchange',
        checkReturnToPortrait
    );
}

// 显示横屏提示页｜对应：index.html 的 #page8RotateHint
function showPage8RotateHint() {
    const page8RotateHint = document.getElementById('page8RotateHint');

    if (!page8RotateHint) {
        return;
    }

    // 先显示竖屏横转提示
    page8RotateHint.style.display = 'block';

    // 检查用户是否已把手机旋转为横屏
    function checkPlatformerOrientation() {
        // 微信浏览器兼容：直接比较当前可用画面的宽高
        const isLandscape =
            window.innerWidth > window.innerHeight;

        if (!isLandscape) {
            return;
        }

        // 横屏后隐藏提示页，显示横版游戏
        page8RotateHint.style.display = 'none';

        // 进入后不再继续监听本次横屏提示
        window.removeEventListener(
            'resize',
            checkPlatformerOrientation
        );
        window.removeEventListener(
            'orientationchange',
            checkPlatformerOrientation
        );

        showPlatformerScene();
    }

    // 监听手机物理旋转或浏览器画面尺寸变化
    window.addEventListener(
        'resize',
        checkPlatformerOrientation
    );
    window.addEventListener(
        'orientationchange',
        checkPlatformerOrientation
    );

    // 若用户进入提示页时已是横屏，直接进入游戏
    checkPlatformerOrientation();
}