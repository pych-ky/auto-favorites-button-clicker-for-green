Vue.component('status-toggle', {
    template: `
                <label class="toggle-switchy" for="status" data-size="">
                    <input type="checkbox" id="status" v-model="status" @change="saveStatus">
                    <span class="toggle">
                        <span class="switch"></span>
                    </span>
                </label>
              `,
    data: {
        status: '',
    },
    methods: {
        saveStatus: function () {
            const status = this.$data.status ? 1 : 0;
            chrome.storage.local.set({ AFBCStatus: status });
        },
    },
    attached: function () {
        chrome.storage.local.get(['AFBCStatus'], (result) => {
            if (result.AFBCStatus === undefined) {
                return;
            }
            const status = result.AFBCStatus === 1 ? true : false;
            this.$set('status', status);
        });
    },
});
