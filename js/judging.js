$(function() {
    //store all elements involved in last "move all" operation 
    var removedCats;
    var calledCats;
    var readiedCats;
    var doneCats;

    var $waiting = $( "#waitingbox" ),
        $calling = $( "#callingbox" ),
        $ready = $( "#readybox" ),
        $done = $( "#donebox" );

    function swapCallButton(undo) { $('#all2calling').toggle(!undo); $('#undocall').toggle(undo); }

    function swapReadyButton(undo) { $('#all2ready').toggle(!undo); $('#undoready').toggle(undo); }

    function swapDoneButton(undo) { $('#all2done').toggle(!undo); $('#undodone').toggle(undo); }

    function swapClearButton(undo) { $('#allclear').toggle(!undo); $('#undoclear').toggle(undo); }

    function allButtonsGreen() {
        swapCallButton(false);
        swapReadyButton(false);
        swapDoneButton(false);
        swapClearButton(false);
    }

    function sortAll() {
        $('#waitingbox>div').tsort();
        $('#callingbox>div').tsort();
        $('#readybox>div').tsort();
        $('#donebox>div').tsort();
    }

    $('#all2calling').click(function() {
        calledCats =  $('#waitingbox>div').appendTo($('#callingbox'));
        sortAll();
        allButtonsGreen();
        swapCallButton(true);
    });
    $('#undocall').hide().click(function() {
        console.log('undo call')
        calledCats.appendTo('#waitingbox');
        sortAll();
        allButtonsGreen();
    });

    $('#all2ready').click(function() {
        readiedCats = $('#callingbox>div').appendTo($('#readybox'));
        sortAll();
        allButtonsGreen();
        swapReadyButton(true);
    });
    $('#undoready').hide().click(function() {
        console.log('undo ready')
        readiedCats.appendTo('#callingbox');
        sortAll();
        allButtonsGreen();
    });

    $('#all2done').click(function() {
        doneCats = $('#readybox>div').appendTo($('#donebox'));
        sortAll();
        allButtonsGreen();
        swapDoneButton(true);
    });
    $('#undodone').hide().click(function() {
        console.log('undo done')
        doneCats.appendTo('#readybox');
        sortAll();
        allButtonsGreen();
    });

    $('#allclear').click(function() {
        console.log('clear')
        removedCats = $('#donebox>div').detach();
        allButtonsGreen();
        swapClearButton(true);
    });
    $('#undoclear').hide().click(function() {
        console.log('undo clear')
        removedCats.appendTo('#donebox');
        allButtonsGreen();
    });

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
            allButtonsGreen();
            $item = ui.draggable;
            $item.css('top','');
            $item.css('left','');
            //$item.css().clear
            $item.appendTo($(this));

            sortAll();
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
