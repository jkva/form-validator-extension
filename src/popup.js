const categoryByField = {};

const getCategoriesByField = node => {
    let current = node.parentNode;
    let list = [];

    while (current && current.nodeType !== 'BODY') {
        if (current.classList && current.classList.contains('category')) {
            list.push(current.id);
        }
        current = current.parentNode;
    }

    return list;
};

const onPopup = response => {
    const inputs = JSON.parse(response).autoCompleteInputs;

    if (!inputs.length) { return }

    document.body.classList.add('with-autocomplete-inputs');

    const fieldMarkers = Array.from(document.querySelectorAll('fieldset li'));

    fieldMarkers.forEach(node => {
        node.classList.add(node.textContent);
        categoryByField[node.textContent] = getCategoriesByField(node);
    });

    inputs.forEach(input => {
        document.body.classList.add('with-autocomplete-' + input.field);
        categoryByField[input.field].forEach(
            category => document.body.classList.add('with-autocomplete-' + category)
        );
    });

    document.body.focus();
};

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { message: 'POPUP_OPENED' }, onPopup);
});