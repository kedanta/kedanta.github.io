    /*=============================================
    = INTIAL FUNCTIONS
    =============================================*/
    ckav.intials = {

        /*----------  INIT FUNCTION  ----------*/
        init: function() {
            ckav.intials.pageTransition();
        },

        /*----------  PAGE TRANSITION  ----------*/
        pageTransition: function() {

            if($o.$sectionPost) {
                $o.$sectionPost.on("click", function(){
                    $(this).addClass("active-navigation");
                    $o.$ckavBody.toggleClass("active-popup-section");

                    var popupIs = $(this).attr("href");
                    $o.$popupSection.removeClass("active-section");
                    $(popupIs).addClass("active-section");
                    
                    setTimeout(function() { 
                        $(".active-section").css("display", "flex");
                        ckav.animationIn(".active-section");
                    }, 300);
                });
            }

            if($o.$closeSection) {
                $o.$closeSection.on("click", function() {
                    $o.$sectionPost.removeClass("active-navigation");
                    ckav.animationOut(".active-section");
                    setTimeout(function() {  
                        $o.$popupSection.removeClass("active-section");
                        $o.$popupSection.css("display", "none");
                        $o.$ckavBody.removeClass("active-popup-section");
                    }, 200);
                    
                });
            }

            // if($o.$closePopup) {
            //     $o.$closePopup.on("click", function() {
            //         $o.$navigationLink.removeClass("active-navigation");
            //         $o.$popupSection.removeClass("active-section");
            //         $o.$ckavBody.removeClass("active-popup");
            //     });
            // }

            // if($o.$menuIcon) {
            //     $o.$menuIcon.on("click", function(){
            //         $(this).toggleClass("active");
            //         $o.$ckavBody.toggleClass("active-menu");

            //         if($o.$ckavBody.hasClass("active-menu")) {
            //             $o.$navigationLink.on("click", function(){
            //                 $o.$ckavBody.removeClass("active-menu");
            //                 $o.$menuIcon.removeClass("active");
            //             });
            //         }
            //     });
            // }  

        },

    };
    