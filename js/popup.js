(function () {
    const vm = new Vue({
        el: '#popup',
        methods: {
            openSettings: function () {
                const fileName = 'settings.html';
                const url = chrome.runtime.getURL(fileName);
                chrome.tabs.create({ url: url });
            },
        },
    });
})();
