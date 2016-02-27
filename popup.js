function send(action) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: action}, function(response) {
            console.log(response)
        });
    });
}
document.addEventListener('DOMContentLoaded', function() {
    var body = document.querySelectorAll('body')[0];
    body.addEventListener('click', function(e){
        var action = e.target.getAttribute('data-action');
        console.log( action );
        send(action);
    });
});