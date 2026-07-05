document.querySelectorAll(".click-box").forEach(box => {

    box.addEventListener("click", (e) => {

        const id = e.target.dataset.id;

        console.log("点击了盲盒：", id);

        // 👉 切到第二页
        document.getElementById("page1").classList.remove("active");
        document.getElementById("page2").classList.add("active");

        // 👉 更新缩略图
        updateThumb(id);

    });

});