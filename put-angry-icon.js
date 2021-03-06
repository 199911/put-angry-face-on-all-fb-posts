// get first like button
var get_first_like_btn = function(){
    var timeline = document.querySelector('[role=main]');
    return timeline.querySelector('a.UFILikeLink');
}

// get next like button
var get_next_like_btn = function(current_btn) {
    var timeline = document.querySelector('[role=main]');
    var elem = current_btn.parentNode;
    while( elem != timeline ) {
        if (elem.nextElementSibling) {
            var like_btn = elem.nextElementSibling.querySelector('a.UFILikeLink');
            // only like btn in feed
            if (like_btn && like_btn.parentNode.className==='_khz') {
                return like_btn;
            }
        }
        if ( elem.nextElementSibling ) {
            elem = elem.nextElementSibling;
        } else {
            elem = elem.parentNode;
        }
    }
    return false;
}

var do_action_every_second = function(action) {
    var action_id = setInterval(
        action,
        1000
    );
    return action_id;
}

var has_class = function(elem, className) {
    return elem.className.indexOf(className) > -1;
}

var put_reaction_on_all_post = function(reaction) {
    var like_button = undefined;
    var action_id = do_action_every_second(function(){
        if (!like_button) {
            like_button = get_first_like_btn();
        } else {
            like_button = get_next_like_btn(like_button);
        }
        if (like_button) {
            like_button.scrollIntoView();
            // scroll to let like_btn shown in the middle of screen
            scrollBy(0,-100);
            var feed = closest_parent_with_class(like_button, '_4-u2');
            var reaction_btns = {
                like: feed.querySelector('span[aria-label="Like"]'),
                love: feed.querySelector('span[aria-label="Love"]'),
                haha: feed.querySelector('span[aria-label="Haha"]'),
                wow: feed.querySelector('span[aria-label="Wow"]'),
                sad: feed.querySelector('span[aria-label="Sad"]'),
                angry: feed.querySelector('span[aria-label="Angry"]')
            };
            setTimeout(
                function() {
                    reaction_btns[reaction].click();
                },
                300
            );
        } else {
            console.log(action_id);
            clearInterval(action_id);
        }
    });
}

var cancel_all_emotion_on_post = function(){
    var like_button = undefined;
    var action_id = do_action_every_second(function(){
        if (!like_button) {
            like_button = get_first_like_btn();
        } else {
            like_button = get_next_like_btn(like_button);
        }
        if (like_button ) {
            like_button.scrollIntoView();
            // scroll to let like_btn shown in the middle of screen
            scrollBy(0,-100);
            console.log(like_button);
            if ( has_class(like_button, 'UFILinkBright') ) {
                setTimeout(
                    function(){
                        like_button.addEventListener("click", function(event){
                            event.preventDefault();
                        });
                        like_button.click();
                    },
                    300
                );
            }
        } else {
            console.log(action_id);
            clearInterval(action_id);
        }
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        if (request.action == "show") {
            show_emotion_bar();
        } else if (request.action == "cancel") {
            cancel_all_emotion_on_post();
        } else {
            var like_btn = get_first_like_btn();
            like_btn.scrollIntoView();
            scrollBy(0,-500);
            create_popup(request.action);
        }
});

var cssToStyleString = function(cssObj) {
    var styleString = '';
    for (key in cssObj) {
        styleString += key+': '+cssObj[key]+'; ';
    }
    return styleString;
};

var closest_parent_with_class = function (child, className) {
    var elem = child;
    while (elem.parentNode) {
        elem = elem.parentNode;
        if ( elem.className.indexOf(className) > -1 ) {
            return elem;
        }
    }
    return undefined;
};

var create_popup = function(reaction) {
    var reaction_bar; // reaction bar is create iff user hover on like button

    // Get and create elements
    var like_btn = get_first_like_btn();
    var like_btn_span = like_btn.parentNode.parentNode;
    var like_btn_span_clone = like_btn_span.cloneNode(true);
    var response_btn_panel = like_btn_span.parentNode;
    // duplicate the like_btn_span to fill in a hole
    response_btn_panel.insertBefore(like_btn_span_clone,response_btn_panel.firstChild);
    var popup = document.createElement("div");
    var message = document.createElement("h1");
    message.appendChild(
        document.createTextNode("Do you want to fire reaction?")
    );
    var btn_panel = document.createElement("div");
    var yes_btn = document.createElement("button");
    yes_btn.appendChild(
        document.createTextNode("Yes")
    );
    var no_btn = document.createElement("button");
    no_btn.appendChild(
        document.createTextNode("No")
    );

    // Define and register event listener
    popup.addEventListener("click", function(event){
        event.stopPropagation();
        event.preventDefault();
    });
    var delete_popup = function(){
        like_btn.style = '';
        like_btn_span.style = '';
        like_btn.removeChild(popup);
        response_btn_panel.removeChild(like_btn_span_clone);
    };
    yes_btn.addEventListener("click", function(){
        delete_popup();
        setTimeout(
            function(){
                put_reaction_on_all_post(reaction);
            },
            3000
        );
    });
    no_btn.addEventListener("click", delete_popup);

    // Append elements
    like_btn.insertBefore(popup, like_btn.firstChild);
    popup.appendChild(message);
    popup.appendChild(btn_panel);
    btn_panel.appendChild(yes_btn);
    btn_panel.appendChild(no_btn);

    // prepare and set CSS
    const width = 300;
    const height = 100;
    var like_btn_span_style = cssToStyleString({
        'position' : 'fixed',
        'left' : (window.innerWidth - width) / 2 + 'px',
        'top' : window.innerHeight / 2 + height + 100 + 'px',
    });
    like_btn_span.setAttribute('style', like_btn_span_style);
    // facebook button style
    yes_btn.className = "_1mf7 _4jy0 _4jy3 _4jy1 _51sy selected _42ft";
    no_btn.className = "_1mf7 _4jy0 _4jy3 _4jy1 _51sy selected _42ft";
    var like_btn_style = cssToStyleString({
        'position': 'fixed',
        'left': (window.innerWidth - width) / 2 + 'px',
        'top': (window.innerHeight - height) / 2 + 'px',
        'width': width + 'px',
        'height': height + 'px'
    });
    like_btn.setAttribute('style', like_btn_style);
    var popup_style = cssToStyleString({
        'position': 'fixed',
        'left': (window.innerWidth - width) / 2 + 'px',
        'top': (window.innerHeight - height) / 2 + 'px',
        'width': width + 'px',
        'height': height + 'px',
        'padding' : '40px',
        'cursor': 'default',
        'background': 'white',
        'z-index': 1000
    });
    popup.className = '_4-u2 mbm _5v3q _4-u8';
    popup.setAttribute('style', popup_style);
    var message_style = cssToStyleString({
        'position' : 'relative',
        'margin' : '20px 0',
        'text-align' : 'center',
        'z-index': 1000
    });
    message.setAttribute('style', message_style);
    var btn_panel_style = cssToStyleString({
        'position' : 'relative',
        'margin' : '30px 0',
        'text-align' : 'center',
        'z-index': 1000
    });
    btn_panel.setAttribute('style', btn_panel_style);
}
