export {};

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
    app.innerHTML = `
    
    <div class="desktop">

        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">My Program</div>
                <div class="title-bar-controls">
                    <button class="title-btn" aria-label="Minimize">_</button>
                    <button class="title-btn" aria-label="Maximize">□</button>
                    <button class="title-btn" aria-label="Close">×</button>
                </div>
            </div>
            <div class="window-body">
                <p>Window content goes here.</p>
            </div>
        </div>

        <div class="window" style="--width: 1000px">
            <div class="title-bar">
                <div class="title-bar-text">My Program</div>
                <div class="title-bar-controls">
                    <button class="title-btn" aria-label="Minimize">_</button>
                    <button class="title-btn" aria-label="Maximize">□</button>
                    <button class="title-btn" aria-label="Close">×</button>
                </div>
            </div>
            <div class="window-body">
                <p>temporary content</p>
            </div>
        </div>

        <div class="taskbar"></div>
    </div>

    `;


    const windows = app.querySelectorAll<HTMLDivElement>(".window");
    
    /* for dragging */
    windows.forEach((win) => {
        const titleBar = win.querySelector<HTMLDivElement>(".title-bar");
        if (!titleBar) return;

        let dragging = false;
        let offsetX = 0;
        let offsetY = 0;

        titleBar.addEventListener("mousedown", (e) => {
            dragging = true;
      
            const rect = win.getBoundingClientRect();
            offsetX = e.clientX - rect.left + (window.innerWidth * .3 * .5);
            offsetY = e.clientY - rect.top;
        });

        document.addEventListener("mousemove", (e) => {
            if (!dragging) return;

            win.style.left = `${Math.min(Math.max(e.clientX - offsetX, 0), (window.innerWidth * .70) - +win.offsetWidth)}px`;
            win.style.top = `${Math.max(Math.min(e.clientY - offsetY, (window.innerHeight * .94) - +win.offsetHeight), 0)}px`;
        });

        document.addEventListener("mouseup", () => {
            dragging = false;
        });
    });

    /* render on top clicked window */
    document.addEventListener("mousedown", (e) => {
        const target = e.target as Element;
        if (!target) return;

        const clickedWindow = target.closest(".window") as HTMLDivElement;
        if (!clickedWindow) return;

        windows.forEach((win) => {
            win.style.zIndex = "1";
        });

        clickedWindow.style.zIndex = "10";
    });
}
