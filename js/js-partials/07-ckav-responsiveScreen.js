    /*=============================================
    = RESPONSIVE FUNCTIONS
    =============================================*/
    ckav.responsiveScreen = {

        /*----------  INIT FUNCTION  ----------*/
        init: function() {
            ckav.responsiveScreen.deviceIs();
        },

        /*----------  DETECT DEVICES  ----------*/
        deviceIs: function() {

            // MEDIA QUARIES VARIABLE
            var deviceDesktop = "screen and (min-width: 992px)",
                deviceMobile = "(min-width: 200px) and (max-width: 991px)"

            enquire.register(deviceDesktop, {
                match : function() {
                    $o.$html.addClass("device-desktop");
                },
                unmatch : function() {
                    
                }
            }).register(deviceMobile, {
                match : function() {
                    $o.$html.addClass("device-mobile");
                },  
                unmatch : function() {
                    
                }
            });	
        },

    };
    