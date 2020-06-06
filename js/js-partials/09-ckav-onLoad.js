    /*=============================================
    = WINDOW LOAD FUNCTIONS
    =============================================*/
    ckav.onLoad = {

        /*----------  INIT FUNCTION  ----------*/
        init: function() {
            ckav.responsiveScreen.init();
            ckav.onLoad.pageLoader()
        },

        /*----------  PAGE LOADER  ----------*/
        pageLoader: function() {
            if($o.$pageloader) {
                $("#loader").fadeOut(600, function() {
                    $("#loader").css("display", "none");
                });
            }

        },

    };
    