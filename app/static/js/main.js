const baseUri = 'https://jsonplaceholder.typicode.com';

var createPostItem = (data, shadowDepth, fullContent, actionText, index) => {
    //outer div
    let div1 = document.createElement('div');
    div1.classList = 'demo-card-wide mdl-card mdl-shadow--' + shadowDepth + 'dp my-card';

    //title section
    let div2 = document.createElement('div');
    div2.classList = 'mdl-card__title';
    div2.style = 'background: url('+ data.urlToImage +') center/cover';
    let h21 = document.createElement('h2');
    h21.classList = 'mdl-card__title-text';
    h21.innerHTML = data.title;
    div2.appendChild(h21);

    //short description
    let div3 = document.createElement('div');
    div3.classList = 'mdl-card__supporting-text';
    div3.innerHTML = (fullContent)? data.description : data.description.substring(0,50) + '...';

    //share button
    let div4 = document.createElement('div');
    div4.classList = 'mdl-card__menu';
    var btn1 = document.createElement('button');
    btn1.classList = 'mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect';
    var i1 = document.createElement('i');
    i1.classList = 'material-icons';
    i1.innerHTML = 'share';
    btn1.appendChild(i1);
    div4.appendChild(btn1);
    

    //action button
    if(actionText) {
        var div5 = document.createElement('div');
        div5.classList = 'mdl-card__actions mdl-card--border';
        let a1 = document.createElement('a');
        a1.classList = 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect';
        a1.innerHTML = actionText;
        a1.setAttribute('href', data.url);
        a1.setAttribute('target', '_blank');
        a1.setAttribute('data-post-id', index);
        div5.appendChild(a1);
    }


    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.appendChild(div4);
    if(typeof div5 !== "undefined") {
        div1.appendChild(div5);
    }

    document.getElementsByClassName('page-content')[0].appendChild(div1);
};

var fillPost = (data) => {

};

let handleResponse = response => response.json();

let handleError = (err) => {
    console.error(err);
};

var fetchPosts = () => {
    return fetch('/static/data/news.json');
};

var cleanContent = () => document.getElementsByClassName('page-content')[0].innerHTML = '';

var init = () => {
    fetchPosts()
    .then(handleResponse)
    .then(data => {
        console.log(data);
        cleanContent();
        data.articles.map((val, index) => createPostItem(val, 2, false, 'Read More', index));
    })
    .catch(handleError);
};

var initPostPage = () => {
    let currId = location.search.split('=')[1];
    fetchPosts()
    .then(handleResponse)
    .then(data => {
        cleanContent();
        data = data.articles.filter((val, index) => index == currId)[0];
        createPostItem(data, 1, true);
    })
    .catch(handleError);
};

window.addEventListener('load', () => {
    switch(location.pathname) {
        case '/' : 
        case '/index.html': 
            init();
            break;
        case '/post-page.html': 
            initPostPage();
            break;
    }
});

window.addEventListener('click', (ev) => {
    if(ev.target.dataset.postId) {
        location.href = '/post-page.html?postid=' + ev.target.dataset.postId;
    }
});

const storeSubscriptionDetails = (url, name) => {
    console.log(url, name, 'endpoint')
    fetch('/api/push/storeEndpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify({ url, name })
    })
    .then(res => res.json())
    .then(data => {
        if (data._id !== undefined) {
            console.log('Data Stored Successfully');
        }
    })
    .catch(err => console.error(err));
}

let floatBtn = document.querySelector('.float-btn');
floatBtn.addEventListener('click', (e) => {
    console.log(e.target);
    let icon = e.target.innerHTML;
    if (icon.indexOf('active') !== -1) {
        //off
    }
    else if (icon.indexOf('off') !== -1) {
        //disabled
    }
    else {
        subscribeToNotification();
    }
});

const changeButtonStatus = (status) => {
    let notificationIcon = document.querySelector('.notifications-icon');
    if (status) {
        notificationIcon.innerHTML = 'notifications_active';
        subscribeForPush();
    }
    else {
        notificationIcon.innerHTML = 'notifications_off';
    }
};

const subscribeForPush = () => {
    navigator.serviceWorker.ready
    .then((reg) => {
        console.log('here', reg);
        reg.pushManager.subscribe({ userVisibleOnly: true })
        .then(subscribe => {
            console.log(subscribe.endpoint, 'subscribed');
            storeSubscriptionDetails(subscribe.endpoint);
        })
        .catch(err => console.error(err));
    })
};

const subscribeToNotification = () => {
    if (Notification.permission === 'denied') {
        alert('User has blocked push notification.');
        return;
    }
    Notification.requestPermission()
    .then(access => {
        console.log('Notification Status')
        if (access === 'granted') {
            navigator.serviceWorker.getRegistration()
            .then(registration => {
                if (registration) {
                    changeButtonStatus(true);
                }
                else {
                    changeButtonStatus(false);
                }
            });
        }
        else {
            console.log('Push Notification not granted');
        }
    })
};