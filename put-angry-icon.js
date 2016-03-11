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

var show_emotion_bar = function() {
    var emontion_bar_parent = $('.uiContextualLayerParent._khz > div');
    for (var i = 0; i < emontion_bar_parent.length; ++i) {
        emontion_bar_parent[i].className = "_1oxj _10ir";
    }
}

var click_btn_on_all_post_one_by_one = function(icons) {
    var cnt = 0;
    var action_id = setInterval(
        function(){ 
            if (cnt < icons.length){
                icons[cnt].click();
                cnt += 1;
            } else {
                clearInterval(action_id);
            }
        }, 
        1000
    );
}

var put_reaction_on_all_post = function(emotion) {
    var reaction;
    if (emotion === 'like') {
        reaction = 1;
    } else if (emotion === 'love') {
        reaction = 2;
    } else if (emotion === 'haha') {
        reaction = 4;
    } else if (emotion === 'wow') {
        reaction = 3;
    } else if (emotion === 'sad') {
        reaction = 7;
    } else if (emotion === 'angry') {
        reaction = 8;
    }
    var icons = $('._39m[data-reaction="'+reaction+'"]');
    click_btn_on_all_post_one_by_one(icons);
}

var cancel_all_emotion_on_post = function(){
    var cancel_btns = $('a.UFILikeLink.UFILinkBright');
    click_btn_on_all_post_one_by_one(cancel_btns);
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
            create_popup();
            // put_reaction_on_all_post(request.action);
        }
});

var cssToStyleString = function(cssObj) {
    var styleString = '';
    for (key in cssObj) {
        styleString += key+': '+cssObj[key]+'; ';
    }
    return styleString;
}

var create_popup = function(){

    var reaction_bar; // reaction bar is create iff user hover on like button

    // Get and create elements
    var like_btn = document.querySelector('a.UFILikeLink._48-k');
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
        like_btn.removeChild(popup);
    };
    no_btn.addEventListener("click", delete_popup);
    yes_btn.addEventListener("click", delete_popup);

    // Append elements
    like_btn.insertBefore(popup, like_btn.firstChild);
    popup.appendChild(message);
    popup.appendChild(btn_panel);
    btn_panel.appendChild(yes_btn);
    btn_panel.appendChild(no_btn);

    // prepare and set CSS
    // facebook button style
    yes_btn.className = "_1mf7 _4jy0 _4jy3 _4jy1 _51sy selected _42ft"; 
    no_btn.className = "_1mf7 _4jy0 _4jy3 _4jy1 _51sy selected _42ft";
    const width = 300;
    const height = 100;
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
        'margin' : '20px 0',
        'text-align' : 'center'
    });
    message.setAttribute('style', message_style);
    var btn_panel_style = cssToStyleString({
        'margin' : '30px 0',
        'text-align' : 'center'
    });
    btn_panel.setAttribute('style', btn_panel_style);
}
