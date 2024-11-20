document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".btn button");
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const carousel = document.querySelector('.carousel');
    const list = document.querySelector('.list');
    const runningTime = document.querySelector('.carousel .timeRunning');
    const timeRunning = 3000;
    const timeAutoNext = 7000;

    let runTimeOut;
    let runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);

    // Activate "See More" buttons with modal
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            const item = e.target.closest(".item"); // Get the closest item
            const title = item.querySelector(".title").textContent;
            const name = item.querySelector(".name").textContent;
            const des = item.querySelector(".des").textContent;
            const background = item.style.backgroundImage;

            // Create a modal
            const modal = document.createElement("div");
            modal.classList.add("modal");
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <div class="modal-header" style="${background}">
                        <h2>${title}</h2>
                    </div>
                    <div class="modal-body">
                        <h3>${name}</h3>
                        <p>${des}</p>
                    </div>
                </div>
            `;

            // Append the modal to the body
            document.body.appendChild(modal);

            // Show the modal
            modal.style.display = "block";

            // Close modal functionality
            const close = modal.querySelector(".close");
            close.addEventListener("click", () => {
                modal.remove();
            });

            // Close modal when clicking outside the content
            window.addEventListener("click", (event) => {
                if (event.target === modal) {
                    modal.remove();
                }
            });
        });
    });

    // Navigation for slider
    nextBtn.onclick = function () {
        showSlider('next');
    };

    prevBtn.onclick = function () {
        showSlider('prev');
    };

    function resetTimeAnimation() {
        runningTime.style.animation = 'none';
        runningTime.offsetHeight; // Trigger reflow
        runningTime.style.animation = null;
        runningTime.style.animation = 'runningTime 7s linear 1 forwards';
    }

    function showSlider(type) {
        let sliderItemsDom = list.querySelectorAll('.carousel .list .item');
        if (type === 'next') {
            list.appendChild(sliderItemsDom[0]);
            carousel.classList.add('next');
        } else {
            list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
            carousel.classList.add('prev');
        }

        clearTimeout(runTimeOut);

        runTimeOut = setTimeout(() => {
            carousel.classList.remove('next');
            carousel.classList.remove('prev');
        }, timeRunning);

        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextBtn.click();
        }, timeAutoNext);

        resetTimeAnimation(); // Reset the running time animation
    }

    // Start the initial animation
    resetTimeAnimation();
});
