(()=>{
    let isSubmitted = false;
    const valid = (status: number) => {
        return status >= 200 && status <= 299;
    }
    const rewirteState = (action: string) => {
        const raw = history[action];
        return function(this: any) {
            const wrapper = raw.apply(this, arguments);

            const e:any = new Event(action);

            e.state = {...arguments};
            window.dispatchEvent(e);
            return wrapper;
        }
    }
    history.pushState = rewirteState('pushState');
    history.replaceState = rewirteState('replaceState')
    const submit = (e:Event) => {
        // console.log('111112222')
        isSubmitted = true;
        const url = location.href;
        const obj = {
            user: '111',
            url
        };
        console.log(e)
        const xhr = new XMLHttpRequest()
        xhr.open('POST','http://localhost:8001', true);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(JSON.stringify(obj));
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && valid(xhr.status)){
                isSubmitted = false;
            }
        }
    }
    const fn = (e: Event) => {
        if(isSubmitted){
            return 
        } else {
            submit(e)
        }
    }
    const fn1 = (e: Event) => {
        if(isSubmitted){
            return 
        } else {
            submit(e)
        }
    }
    const fn2 = (e: Event) => {
        if(isSubmitted){
            return 
        } else {
            submit(e)
        }
    }
    const fn3 = (e: Event) => {
        if(isSubmitted){
            return 
        } else {
            submit(e)
        }
    }
    const fn4 = (e: Event) => {
        if(isSubmitted){
            return 
        } else {
            submit(e)
        }
    }
    window.addEventListener('hashchange', fn1, true);
    window.addEventListener('popstate', fn2, true);
    window.addEventListener('pushState', fn3, true);
    window.addEventListener('replaceState', fn4, true);

    // 前端用户行为上报：特别是在C端（如淘宝、京东），点击行为的上报是很重要的一件事
    const handleClick = (e:Event) => {
        const url = location.href;
        const obj = {
            user: '111',
            url,
            behavior: 'click',
            element: e.target,
            agent: window.navigator.userAgent,
            time: Date.now()
        };
        console.log(e)
        const xhr = new XMLHttpRequest()
        xhr.open('POST','http://localhost:8001', true);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(JSON.stringify(obj));
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && valid(xhr.status)){
                alert('数据上报成功');
            }
        }
    }
    document.addEventListener('click', handleClick)
})();