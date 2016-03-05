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
    var center = {
        left: window.innerWidth/2,
        top: window.innerHeight/2
    };
    var meta = {
        width: 500,
        height: 300
    } 
    meta.left = center.left - (meta.width-10) / 2;
    meta.top = center.top - (meta.height-10) / 2;
    var $first_like_btn = $($('a.UFILikeLink._48-k')[0]);
    $first_like_btn.css('position', 'fixed');
    $first_like_btn.css('left', meta.left);
    $first_like_btn.css('top', meta.top);
    $first_like_btn.css('width', (meta.width) + 'px');
    $first_like_btn.css('height', (meta.height) + 'px');
    var popup = document.createElement("div"); 
    popup.id = "ext-pop-up";
    var message = document.createElement("h1");
    message.appendChild(
        document.createTextNode("Do you want to fire reaction?")
    );
    var yes_btn = document.createElement("button");
    yes_btn.id = "yes_btn";
    yes_btn.appendChild(
        document.createTextNode("Yes")
    );
    var no_btn = document.createElement("button");
    no_btn.id = "no_btn";
    no_btn.appendChild(
        document.createTextNode("No")
    );
    var delete_popup = function(){
        var like_btn = $first_like_btn[0];
        like_btn.removeChild(popup);
        like_btn.style.position = '';
        like_btn.style.left = '';
        like_btn.style.top = '';
        like_btn.style.width = '';
        like_btn.style.height = '';
        var reaction_bar = document.querySelector('.uiContextualLayerParent > .accessible_elem');
        console.log(reaction_bar);
        reaction_bar.style.position = '';
        reaction_bar.style.left = '';
        reaction_bar.style.top = '';
        reaction_bar.style['z-index'] = '';
    };
    no_btn.addEventListener("click", delete_popup);
    yes_btn.addEventListener("click", delete_popup);
    $first_like_btn.prepend(popup);
    popup.appendChild(message);
    popup.appendChild(yes_btn);
    popup.appendChild(no_btn);
    $div = $('#ext-pop-up');
    $div.css('position', 'fixed');
    $div.css('top', meta.top);
    $div.css('left', meta.left);
    $div.css('width', meta.width + 'px');
    $div.css('height', meta.height + 'px');
    $div.css('background','white');
    $div.css('z-index','99999');
    $div.click(function(){
        return false;
    })
    $div.mouseenter(function(){
        window.setTimeout(
        function(){
            var $emontion_bar_parent = $('.uiContextualLayerParent._khz > div');
            $emontion_bar_parent.css('position', 'fixed');
            $emontion_bar_parent.css('top', 200);
            $emontion_bar_parent.css('left', 500);
            $emontion_bar_parent.css('z-index', -1);
        },500);
    });
}
