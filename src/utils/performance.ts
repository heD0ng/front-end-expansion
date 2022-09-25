(()=>{
    const times:any = {};
    const fn = () => {
        const t = performance.timing;
        // 白屏时间
        times.fp = t.domInteractive - t.fetchStart
        // 首字节事件
        times.ttfb = t.responseStart - t.fetchStart;
        // 约等于首屏时间
        times.loadPage = t.loadEventEnd - t.fetchStart;
    }
    window.addEventListener('load', fn, true);
    window.addEventListener('unload', () => {
        window.removeEventListener('load', fn)
    }, true)
})()