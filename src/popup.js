chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { message: 'POPUP_OPENED' }, response => {
        console.debug('response back', JSON.parse(response));
    });
});