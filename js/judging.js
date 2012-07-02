$(function() {
    var $waiting = $( "#waitingbox" ),
        $calling = $( "#callingbox" ),
        $ready = $( "#readybox" ),
        $done = $( "#donebox" );

    $(".cat").draggable({
            revert: "invalid",
            helper: "clone",
            cursor: "move"
    });
    $(".judgingbox").droppable({
        hoverClass: 'over',
        tolerance: 'intersect',
        accept: ".cat"
    })
    $calling.droppable({
        drop: function( event, ui ) {
            $(this).removeClass('over').addClass('out');
            $item = ui.draggable;
            $item.fadeOut(function() {
                $item
                    .appendTo( $calling )
                    .fadeIn();
                    //.effect("transfer", {to: $calling}, 500, movedToCalling);
             });
        },
//        over: function() {
//               $(this).removeClass('out').addClass('over');
//        },
//        out: function() {
//                $(this).removeClass('over').addClass('out');
//        }
    });
    function movedToCalling() {

    }
});
