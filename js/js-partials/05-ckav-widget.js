    /*=============================================
    = WIDGET FUNCTIONS
    =============================================*/
    ckav.widget = {

        /*----------  INIT FUNCTION  ----------*/
        init: function() {
            ckav.widget.background();
            ckav.widget.backgroundColorFunction();
            ckav.widget.parallax();
            ckav.widget.lGradient();
            ckav.widget.rGradient();
            ckav.widget.carousel();
            ckav.widget.scrollToSection();
            ckav.widget.formWidgetFunction();
            ckav.widget.popupFunction();
            ckav.widget.tooltipFunction();
            ckav.widget.backgroundSlideshow();
            ckav.widget.backgroundYouVideo();
            ckav.widget.backgroundVideo();
        },

        /*----------  BACKGROUND  ----------*/
        background: function() {
            if($o.$backgroundImage) {
                for (var i = 0; i < $o.$backgroundImage.length; i++) {
                    var loopObj = $($o.$backgroundImage[i]);

                    // FUNCTION CALL
                    ckav.backgroundImage(loopObj);
                }
            }
        },

        /*----------  BACKGROUND  ----------*/
        backgroundColorFunction: function() {
            if($o.$backgroundColor) {
                for (var i = 0; i < $o.$backgroundColor.length; i++) {
                    var loopObj = $($o.$backgroundColor[i]);

                    // FUNCTION CALL
                    ckav.backgroundColor(loopObj);
                }
            }
        },

        /*----------  BACKGROUND SLIDESHOW  ----------*/
        backgroundSlideshow: function() {
            if($o.$slideshow) {
                for (var i = 0; i < $o.$slideshow.length; i++) {
                    var loopObj = $($o.$slideshow[i]);

                    // FUNCTION CALL
                    ckav.slideshow(loopObj);
                }
            }
        },

        /*----------  BACKGROUND VIDEO YOUTUBE  ----------*/
        backgroundYouVideo: function() {
            if($o.$youVideo) {
                for (var i = 0; i < $o.$youVideo.length; i++) {
                    var loopObj = $($o.$youVideo[i]);

                    // FUNCTION CALL
                    ckav.backgroundYoutube(loopObj);
                }
            }
        },

        /*----------  BACKGROUND VIDEO HOST  ----------*/
        backgroundVideo: function() {
            if($o.$hostVideo) {
                for (var i = 0; i < $o.$hostVideo.length; i++) {
                    var loopObj = $($o.$hostVideo[i]);

                    // FUNCTION CALL
                    ckav.hostVideo(loopObj);
                }
            }
        },

        /*----------  LINEAR GRADIENT  ----------*/
        lGradient: function() {
            if($o.$linearGradient) {
                for (var i = 0; i < $o.$linearGradient.length; i++) {
                    var loopObj = $($o.$linearGradient[i]);

                    // FUNCTION CALL
                    ckav.linearGredient(loopObj);
                }
            }
        },

        /*----------  RADIAL GRADIENT  ----------*/
        rGradient: function() {
            if($o.$radialGradient) {
                for (var i = 0; i < $o.$radialGradient.length; i++) {
                    var loopObj = $($o.$radialGradient[i]);

                    // FUNCTION CALL
                    ckav.radialGredient(loopObj);
                }
            }
        },

        /*----------  PARALLAX  ----------*/
        parallax: function() {
            if($o.$parallaxmage) {

                for (var i = 0; i < $o.$parallaxmage.length; i++) {
                    var loopObj = $($o.$parallaxmage[i]);

                    // var parallaxWrp = 'parallax' + i;
			        // $(loopObj).attr("id", parallaxWrp).addClass(parallaxWrp);

                    // FUNCTION CALL
                    // ckav.parallaxImage($("#" + parallaxWrp));
                    ckav.parallaxImage(loopObj);
                }
            }

        },

        /*----------  CAROUSEL  ----------*/
        carousel: function() {
            if($o.$carouselWidget) {
                for (var i = 0; i < $o.$carouselWidget.length; i++) {
                    var loopObj = $($o.$carouselWidget[i]);

                    var carouselObj = 'owl' + i;
                    loopObj.attr("id", carouselObj).addClass(carouselObj);
                    ckav.carousel("#" + carouselObj);
                }
            }

        },

        /*----------  SCROLL TO SECTION  ----------*/
        scrollToSection: function() {
            if($o.$scrollTo) {
                $o.$scrollTo.on("click", function(event){
                    event.preventDefault();
                    var sectionId = $(this).attr("href"),
                        $sectionId = $(sectionId),
                        headerHeight = "0",
                        bodyAndHtml = $('body, html');

                    if($sectionId.length === 0) {
                        return true;
                        console.log("NOTE: SECTION IS NOT AVAILABLE PLEASE CHECK");
                    }
                    else {
                        var sectionPosition = $sectionId.offset().top - headerHeight;
                        bodyAndHtml.animate({ scrollTop: sectionPosition }, 1200);
                    }
                });
            }
        },

        /*----------  FORM FUNCTION  ----------*/
        formWidgetFunction: function() {
            if($o.$forms) {
                for (var i = 0; i < $o.$forms.length; i++) {
                    var loopObj = $($o.$forms[i]);

                    ckav.formWidget(loopObj);
                }
            }
        },

        /*----------  POPUP  ----------*/
        popupFunction: function() {
            if($o.$setpop) {
                for (var i = 0; i < $o.$setpop.length; i++) {
                    var loopObj = $($o.$setpop[i]);

                    var popup = loopObj.attr('href');

                    loopObj.magnificPopup({
                        type: 'inline',
                        preloader: false,
                        mainClass: 'mfp-fade',
                        callbacks: {
                            beforeOpen: function () {
                                $(popup).removeClass('animate fadeInDown').addClass('animate fadeInDown');
                            }
                        }
                    });
                }
            }
        },

        /*----------  TOOLTIP  ----------*/
        tooltipFunction: function() {
            if($o.$tooltip) {
                for (var i = 0; i < $o.$tooltip.length; i++) {
                    var loopObj = $($o.$tooltip[i]);

                    loopObj.tooltip();

                }
            }
        }

    };
    