$(function() {
        var $waiting = $( "#waitingbox" ),
            $calling = $( "#callingbox" ),
            $ready = $( "#readybox" ),
            $done = $( "#donebox" );

        $(".cat").draggable({
                revert: "invalid"
        });
        $(".item").draggable({
                revert: "invalid"
        });
        $("#draggable").draggable({
                revert: "invalid"
        });
        $calling.droppable({
                tolerance: 'touch',
                //accept: ".cat",
                drop: function( event, ui ) {
                    confirm("drop?");
                    // $item.fadeOut(function() {
                    //     $item
                    //         .find( "a.ui-icon-refresh" )
                    //             .remove()
                    //         .end()
                    //         .css( "width", "96px")
                    //         .append( trash_icon )
                    //         .find( "img" )
                    //             .css( "height", "72px" )
                    //         .end()
                    //         .appendTo( $calling )
                    //         .fadeIn();
                    // });
                }
        });
        $("#trash").droppable({
                tolerance: 'touch',
                over: function() {
                       $(this).removeClass('out').addClass('over');
                },
                out: function() {
                        $(this).removeClass('over').addClass('out');
                },
                drop: function() {
                        var answer = confirm('Permantly delete this item?');
                        $(this).removeClass('over').addClass('out');
                }
        });
});
