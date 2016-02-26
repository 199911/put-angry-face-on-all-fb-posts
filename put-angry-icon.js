var scroll_to_bottom_feed = function() {
    var position_y = 0;
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
    var emontion_bar_parent = $$('.uiContextualLayerParent ._khz > div');
    for (var i = 0; i < emontion_bar_parent.length; ++i) {
        emontion_bar_parent[i].className = "_1oxj _10ir";
    }
}

var put_angry_face_on_all_post = function() {
    var angry_icons = $$('._39m[data-reaction="8"]');
    var cnt = 0;
    var action_id = setInterval(
        function(){ 
            if (cnt < angry_icons.length){
                console.log(angry_icons[cnt]);
                angry_icons[cnt].click();
                cnt += 1;
            } else {
                clearInterval(action_id);
            }
        }, 
        1000
    );
}

var cancel_all_emotion_on_post = function(){
    var cancel_btns = $$('a.UFILikeLink.UFILinkBright');
    for(var i = 0; i < cancel_btns.length; ++i){
        $$('a.UFILikeLink.UFILinkBright')[i].click();
    }
}
