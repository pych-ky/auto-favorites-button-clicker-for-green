chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ AFBCStatus: 0 });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message !== 'AFBCgetLocalStorage') {
        return;
    }
    chrome.storage.local.get(['AFBCSettings', 'AFBCStatus'], (result) => {
        if (result.AFBCSettings === undefined || result.AFBCStatus === undefined) {
            return;
        }

        if (result.AFBCStatus === 0) {
            return;
        }

        let data = JSON.parse(result.AFBCSettings);
        if (data.startPage === '') {
            return;
        }

        data.searchWords = data.searchWords.filter((v) => v);
        sendResponse(data);
    });

    return true;
});
