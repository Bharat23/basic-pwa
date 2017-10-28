const baseUri = 'https://jsonplaceholder.typicode.com';

var createPostItem = (data, shadowDepth, fullContent, actionText) => {
    //outer div
    let div1 = document.createElement('div');
    div1.classList = 'demo-card-wide mdl-card mdl-shadow--' + shadowDepth + 'dp my-card';

    //title section
    let div2 = document.createElement('div');
    div2.classList = 'mdl-card__title';
    let h21 = document.createElement('h2');
    h21.classList = 'mdl-card__title-text';
    h21.innerHTML = data.title;
    div2.appendChild(h21);

    //short description
    let div3 = document.createElement('div');
    div3.classList = 'mdl-card__supporting-text';
    div3.innerHTML = (fullContent)? data.body : data.body.substring(0,50) + '...';

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
        a1.setAttribute('data-post-id', data.id);
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
    return fetch('/data/blogs.json');
};

var cleanContent = () => document.getElementsByClassName('page-content')[0].innerHTML = '';

var init = () => {
    fetchPosts()
    .then(handleResponse)
    .then(data => {
        console.log(data);
        cleanContent();
        data.map(val => createPostItem(val, 2, false, 'Read More'));
    })
    .catch(handleError);
};

var initPostPage = () => {
    let currId = location.search.split('=')[1];
    fetchPosts()
    .then(handleResponse)
    .then(data => {
        cleanContent();
        data = data.filter(val => val.id == currId)[0];
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