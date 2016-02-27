function send(action) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: action}, function(response) {
            console.log(response)
        });
    });
}
document.addEventListener('DOMContentLoaded', function() {
    var btns = document.querySelectorAll('button');
    console.log(btns);
    for( var i = 0; i < btns.length; ++i) {
        console.log(i);
        btns[i].addEventListener(
            'click', 
            function(){
                console.log('clicked');
                var action = this.getAttribute('data-action');
                console.log( action );
                send(action);
            }
        );
    }
});