    /*=============================================
    = PORTFOLIO FUNCTIONS
    =============================================*/
    ckav.portfolio = {

        /*----------  INIT FUNCTION  ----------*/
        init: function() {
            ckav.portfolio.popupImage()
        },

        /*----------  MAGNIFIC POPUP  ----------*/
        popupImage: function() {
            if($o.$zoomGallery && $().magnificPopup) {

                for (var i = 0; i < $o.$zoomGallery.length; i++) {
                    var loopObj = $($o.$zoomGallery);

                    ckav.popupImageFunction(loopObj);
                }
            }
        },

    };
    