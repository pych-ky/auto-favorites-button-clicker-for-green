(function () {
    const vm = new Vue({
        el: '#settings',
        data: {
            startPage: '',
            stopPage: '',
            searchWords: [],
        },
        methods: {
            saveSetting: function () {
                const json = JSON.stringify(this.$data);
                chrome.storage.local.set({ AFBCSettings: json });
            },
        },
        attached: function () {
            chrome.storage.local.get(['AFBCSettings'], (result) => {
                if (result.AFBCSettings === undefined) {
                    return;
                }
                const data = JSON.parse(result.AFBCSettings);
                this.$set('startPage', data.startPage);
                this.$set('stopPage', data.stopPage);
                this.$set('searchWords', data.searchWords);
            });
        },
    });
})();
