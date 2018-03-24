const collectFormData = () => {
    return { foo : 'bar' };
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        // Ignore if not from extension
        if(sender.tab) { return; }


        if (request.message && request.message === 'POPUP_OPENED') {
            const formData = collectFormData;
            sendResponse({ formData });
        }
    }
);

console.debug('content script loaded');