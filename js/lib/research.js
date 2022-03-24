const findTargets = () => {
    const contents = document.getElementsByClassName('comment-content')[0];
    const str = contents.outerHTML;
    if (str.indexOf('検索文字列') !== -1) {
        alert('Found');
    } else {
        console.log('Not Found');
    }
};

const run = () => {
    const page = sessionStorage.getItem('page') ?? 100;
    if (page > 400) {
        return false;
    }
    const next = parseInt(page) + 1;
    sessionStorage.setItem('page', next);
    location = `http://hogefuga.com/${page}.html`;
};

findTargets();
setInterval(run, 1000);
