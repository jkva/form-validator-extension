const getLabelForNode = node => {
    const id = node.id;
    const labelNode = document.querySelector('label[for="' + id + '"]');
    if (labelNode) {
        return labelNode.textContent;
    }

    return null;
};

const detectOffscreen = node => {
    const nodeRect = node.getBoundingClientRect();

    const height = window.innerHeight;
    const width = window.innerWidth;

    if (nodeRect.left < 0 || nodeRect.top < 0) {
        return true;
    }

    return false;
};

const collectAutoCompleteInputs = () => {
    const inputs = Array.from(document.querySelectorAll('input[autocomplete]:not([type="hidden"])'));

    return inputs.map(node => ({
        field : node.getAttribute('autocomplete'),
        label : getLabelForNode(node),
        value : node.value,
        offscreen: detectOffscreen(node)
    }));
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // Ignore if not from extension
        if (sender.tab) { return; }

        if (request.message && request.message === 'POPUP_OPENED') {
            const autoCompleteInputs = collectAutoCompleteInputs();
            sendResponse(JSON.stringify({ autoCompleteInputs }));
        }
    }
);

console.debug('content script loaded');