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
        accept: ".cat",
        drop: function( event, ui ) {
            $(this).removeClass('over').addClass('out');
            $item = ui.draggable;
            $item.appendTo($(this));
        }
    })
});
