var scroll_to_bottom_feed = function() {
    var position_y = -1;
    var scroll_action_id = setInterval(
        function(){ 
            if (position_y !== scrollY){
                position_y = scrollY;
                scrollBy(0,99999);
            } else {
                clearInterval(scroll_action_id);
            }
        }, 
        1000
    );
}

var do_action_every_second = function(action) {
    var action_id = setInterval(
        action, 
        1000
    );
    return action_id;
}

var create_put_reaction_action = function(reaction_id) {
    var all_like_btns = document.querySelectorAll('a.UFILikeLink._48-k');
    var cnt = 0;
    return function() {
        var feed = closest_parent_with_class(all_like_btns[cnt], '_4-u2');
        feed.scrollIntoView();
        var reaction_panel = feed.querySelector('._1oxj.uiLayer');
        var reactions = reaction_panel.querySelectorAll('._iu- ._iuw');
        setTimeout(
            function(){
                reactions[reaction_id].click();
            },
            300
        );
        cnt += 1;
    };
}

var put_reaction_on_all_post = function(reaction) {
    if (reaction === 'like') {
        reaction_id = 0;
    } else if (reaction === 'love') {
        reaction_id = 1;
    } else if (reaction === 'haha') {
        reaction_id = 2;
    } else if (reaction === 'wow') {
        reaction_id = 3;
    } else if (reaction === 'sad') {
        reaction_id = 4;
    } else if (reaction === 'angry') {
        reaction_id = 5;
    }
    var put_reaction_action = create_put_reaction_action(reaction_id);
    var action_id = do_action_every_second(put_reaction_action);
    // stop the action
    var all_like_btns = document.querySelectorAll('a.UFILikeLink._48-k');
    setTimeout(
        function() {
            clearInterval(action_id);
        },
        1000 * all_like_btns.length + 100
    );
}

var cancel_all_emotion_on_post = function(){
    var cancel_btns = $('a.UFILikeLink.UFILinkBright');
    var cnt = 0;
    var action_id = do_action_every_second(function() {
        cancel_btns[cnt].click();
        cnt += 1;
    });
    // stop the action
    setTimeout(
        function() {
            clearInterval(action_id);
        },
        1000 * cancel_btns.length + 100
    );
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        if (request.action == "scroll") {
            scroll_to_bottom_feed();
        } else if (request.action == "show") {
            show_emotion_bar();
        } else if (request.action == "cancel") {
            cancel_all_emotion_on_post();
        } else {
            // scroll the first feed, _4-u2 is the class of the feed
            var like_btn = document.querySelector('a.UFILikeLink._48-k');
            var feed = closest_parent_with_class(like_btn, '_4-u2');
            feed.scrollIntoView({block: "end", behavior: "smooth"});
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
    var like_btn = document.querySelector('a.UFILikeLink._48-k');
    var like_btn_span = document.querySelector('a.UFILikeLink._48-k').parentNode.parentNode
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
        put_reaction_on_all_post(reaction);
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
