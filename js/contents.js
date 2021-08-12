window.addEventListener('load', function () {
    chrome.runtime.sendMessage('AFBCgetLocalStorage', (res) => {
        const addFavorite = (searchWords) => {
            const mainContents = document.getElementsByClassName('com_content__main_contents')[0];
            if (mainContents === undefined) {
                console.log('メインコンテンツがありません。');
                return;
            }

            const str = mainContents.outerHTML;
            for (let i = 0; i < searchWords.length; i++) {
                if (str.indexOf(searchWords[i]) === -1) {
                    console.log('検索ワードが見つかりません。');
                    return;
                }
            }

            const favoriteBtn = document.getElementsByClassName('favorite_add')[0];
            if (favoriteBtn === undefined) {
                console.log('気になるボタンがありません。');
                return;
            }

            window.alert = function () {};
            favoriteBtn.click();
        };

        const movePage = (startPage, stopPage) => {
            const page = parseInt(sessionStorage.getItem('AFBCPage'));
            const target = isNaN(page) ? startPage : page;
            if (target > stopPage) {
                clearInterval(timerId);
                return;
            }
            sessionStorage.setItem('AFBCPage', target + 1);
            location = `https://www.green-japan.com/job/${target}?case=tlogin`;
        };

        if (res === undefined) {
            return;
        }
        addFavorite(res.searchWords);
        const timerId = setInterval(movePage.bind(null, parseInt(res.startPage), parseInt(res.stopPage)), 5000);
    });
});
