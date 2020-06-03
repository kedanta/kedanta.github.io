/*
 Copyright (c) 2019, Sven Creations. All rights reserved.

 @requires jQuery v1.7 or later (tested on 1.11.2)
 @author Sven Creations, svencreations@gmail.com
*/
"use strict";

var isFirefox = typeof InstallTrigger !== 'undefined',
mobileVar = isMobile.any;

// $('.bg-cover').imagesLoaded({
//     background: true
// }, function( imgLoad ) {
//     TweenMax.fromTo($(".bg-cover"), 0.25, {autoAlpha: 0}, {autoAlpha: 1});
// }
// );

$(window).on("load", function() {

    /* ==================================================================
	1.0 Initiate Canvas BG Animations
	================================================================== */
    var drifterBG = "#EC008C";
    if($("#minimos-4").length) {
        drifterBG = "#F8EB31";
    }

    // Initiate Canvas Background Animation
    if($("#drifter").length) {
        initDrifter("drifter", drifterBG);
    } else if($("#particles-js").length) {
        initStompParticles();
    }

    /* ==================================================================
	2.0 Initialize Countdown
	================================================================== */
    var $countDown = $(".st-countdown");
    $countDown.countdown("2019/12/01", function(event) {
        $(this).html(
            event.strftime('%D Days %H:%M:%S')
        );
    });

    $(".btn-count").hover(
        function () {
            $countDown.countdown('pause');
            $(".st-countdown").html("Bid on Flippa");
        },
        function () {
            $countDown.countdown('resume');
        }
    );

    /* ==================================================================
	3.0 Animation Function
	================================================================== */
    var $paragraph = $(".main-content p"),
    $heading = $(".main-content h3"),
    $footer = $(".main-content ul"),
    blurRadius = "20px", // Change blur radius for animation here
    paraSplit, headSplit,
    animTL = new TimelineMax({
        paused: true,
        delay: 0.05,
        onComplete: handleComplete,
        onCompleteParams: []
    });

    /* Blur radius variant for performance */
    if(isFirefox) {
        blurRadius = "0px";
    } else if(mobileVar) {
        blurRadius = "2px";
    }

    function initAnimation() {
        if($heading.length) {
            headSplit = new SplitText($heading, {
                type: "words,chars",
                wordsClass: "gpu-hack sven-word-++",
                charsClass: "sven-char-++"
            });
            animTL.staggerFromTo(headSplit.chars, 0.4, {
                y: "-50%",
                opacity: 0
            }, {
                y: "0%",
                opacity: 1,
                ease: Bounce.easeOut
            }, 0.08);
            animTL.addLabel("end");
            animTL.call(headingComplete, []);
        }

        if($paragraph.length) {
            paraSplit = new SplitText($paragraph, {
                type: "words,chars",
                wordsClass: "gpu-hack s-word sven-word-++",
                charsClass: "s-char sven-char-++"
            });
            // force3D on all chars and add rotationZ
            TweenMax.set(paraSplit.chars, {
                force3D: true,
                rotationZ: "0.01deg"
            });
            $.each(paraSplit.chars, function(index, el) {
                var textColor = $(el).css("color");
                var tweenPos = "end+=" + (index) * 0.04;
                animTL.fromTo($(el), 0.8, {
                    opacity: 0,
                    textShadow: "0 0 " + blurRadius + " " + textColor,
                    scale: 1.2,
                    color: "transparent"
                }, {
                    opacity: 1,
                    scale: 1,
                    color: textColor,
                    textShadow: "none",
                    ease: Linear.easeNone
                }, tweenPos);
            });
        }
        TweenMax.set($(".main-content"), {visibility: "visible"});
        TweenMax.set($(".preloader"), {display: "none"});
        animTL.play();
    }

    function handleComplete() {
        if($footer.length) {
            TweenMax.to($footer, 0.75, {autoAlpha: 1, ease: Linear.easeNone});
        }


    }

    function headingComplete() {
        $countDown.countdown('resume'); // Resume countdown after animation ends
    }

    /* ==================================================================
	4.0 Initialize Animation
	================================================================== */
    $countDown.countdown('pause'); // Pause countdown before animating
    initAnimation();

});
