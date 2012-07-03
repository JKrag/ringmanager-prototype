$(function() {
    var $waiting = $( "#waitingbox" ),
        $calling = $( "#callingbox" ),
        $ready = $( "#readybox" ),
        $done = $( "#donebox" );

    $(".cat").draggable({
            revert: "invalid",
            helper: "original",
            cursor: "move"
    });
    $(".judgingbox").droppable({
        hoverClass: 'over',
        tolerance: 'intersect',
        accept: ".cat",
        drop: function( event, ui ) {
            $item = ui.draggable;
            $item.css('top','');
            $item.css('left','');
            //$item.css().clear
            $item.appendTo($(this));

            $('#waitingbox>div').tsort();
            $('#callingbox>div').tsort();
            $('#readybox>div').tsort();
            $('#donebox>div').tsort();

        }
    })
    function animatedSort() {
            var dropPos = ui.helper.position();
            console.log("item dropped at left = "+parseInt(dropPos.left)+" top = "+parseInt(dropPos.top));
            var $item = ui.draggable;
            var $itemId = $item.attr('id');
            var $target = $(this);
            var $targetId  = $target.attr('id');
            console.log("Adding item " + $itemId + " to " + $targetId);
            $item.appendTo($target);


            var $Ul = $('#callingbox');
            $Ul.css({position:'relative'});
            var $lineHeight;
            var itemselector = $targetId+'>div';
            console.log('itemselector = '+itemselector)
            var $items = $target.children();
            console.log($targetId + ' now has ' + $items.size() + ' elements');

            $items.each(function(i,el){
                var iY = $(el).position().top;
                var iX = $(el).position().left;
                //console.log(iY)
                $.data(el,'t',iY);
                $.data(el,'l',iX);
                if (i===0) {
                    $iBase = iY;
                    $X_Base = iX;
                    $lineHeight = 42;
                }
                //if (i===1) $lineHeight = iY - $X_Base;
            });
            console.log('iBase='+$iBase)
            console.log('$lineHeight='+$lineHeight)
            console.log('SORTING')
            $items.tsort().each(function(i,el){
                var $El = $(el);
                var $ElId = $El.attr('id');
                var $Y_from; 
                //console.log('ElId = '+$ElId)
                //console.log('item.id = ' + $(this).attr('id'))
                var $Y_to = i * $lineHeight + $iBase;
                if ($ElId == $itemId) {
                    $Y_from = parseInt(dropPos.top);
                    $X_from = parseInt(dropPos.left);
                    console.log('Moving new ' + $ElId + ' from ' + $X_from + ', ' + $Y_from + ' to ' + $X_Base + ', ' + $Y_to);
                    $El.css({position:'absolute',top:$Y_from,left:$X_from}).animate({top:$Y_to,left:$X_Base},700);
                }
                else {
                    $Y_from = $.data(el,'t');  
                    console.log('Moving existing ' + $ElId + ' from ' + $Y_from + ' to ' + $Y_to);
                    $El.css({position:'absolute',top:$Y_from}).animate({top:$Y_to},700);
                } 

            });

    }
});
