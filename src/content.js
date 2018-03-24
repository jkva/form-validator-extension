const getLabelForNode = node => {
    const id = node.id;
    const labelNode = document.querySelector('label[for="' + id + '"]');
    if (labelNode) {
        return labelNode.textContent;
    }

    return null;
};

const collectAutoCompleteInputs = () => {
    const inputs = Array.from(document.querySelectorAll('input[autocomplete]'));

    return inputs.map(node => ({
        field : node.getAttribute('autocomplete'),
        label : getLabelForNode(node),
        value : node.value
    }));
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // Ignore if not from extension
        if (sender.tab) { return; }

        if (request.message && request.message === 'POPUP_OPENED') {
            const autoCompleteInputs = collectAutoCompleteInputs();
            console.debug(autoCompleteInputs);
            sendResponse(JSON.stringify({ autoCompleteInputs }));
        }
    }
);

console.debug('content script loaded');