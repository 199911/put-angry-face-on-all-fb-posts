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

var create_popup = function(){

    var reaction_bar; // reaction bar is create iff user hover on like button

    // Get and create elements
    var like_btn = document.querySelector('a.UFILikeLink._48-k');
    var popup = document.createElement("div"); 
    var message = document.createElement("h1");
    message.appendChild(
        document.createTextNode("Do you want to fire reaction?")
    );
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
        reaction_bar = document.querySelector('.uiContextualLayerParent > .accessible_elem');
        if (reaction_bar) {
            reaction_bar.style = '';
        }
    };
    no_btn.addEventListener("click", delete_popup);
    yes_btn.addEventListener("click", delete_popup);
    popup.addEventListener("mouseenter", function(){
        // hide reaction bar
        window.setTimeout( function(){
            reaction_bar = document.querySelector('.uiContextualLayerParent > .accessible_elem');
            var style = {
                'z-index': -1
            }
            var cssText = '';
            for (key in style) {
                cssText += key+': '+style[key]+'; ';
            }
            reaction_bar.setAttribute('style', cssText);
        },100); // wait a while to make sure reaction bar is created
    });

    // Append elements
    like_btn.insertBefore(popup, like_btn.firstChild);
    popup.appendChild(message);
    popup.appendChild(yes_btn);
    popup.appendChild(no_btn);

    // prepare and set CSS
    const width = 500;
    const height = 300;
    var style = {
        'position': 'fixed',
        'left': (window.innerWidth - width) / 2 + 'px',
        'top': (window.innerHeight - height) / 2 + 'px',
        'width': width + 'px',
        'height': height + 'px'
    };
    var cssText = '';
    for (key in style) {
        cssText += key+': '+style[key]+'; ';
    }
    like_btn.setAttribute('style', cssText);
    popup_new_style = {
        'cursor': 'default',
        'background': 'white',
        'z-index': 1000
    };
    for (key in popup_new_style) {
        cssText += key+': '+popup_new_style[key]+'; ';
    }
    popup.setAttribute('style', cssText);
}
