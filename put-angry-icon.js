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

var put_angry_face_on_all_post = function() {
    var angry_icons = $$('._39m[data-reaction="8"]');
    for(var i = 0; i < angry_icons.length; ++i){
        $$('._39m[data-reaction="8"]')[i].click();
    }
}

var cancel_all_action_on_post = function(){
    var cancel_btns = $$('a.UFILikeLink.UFILinkBright');
    for(var i = 0; i < cancel_btns.length; ++i){
        $$('a.UFILikeLink.UFILinkBright')[i].click();
    }
}