 
$(document).ready( function() {

function ajaxload () {
  partslider();
	leftmenu();
  owlslider();
  backtop();
  allproject();
  lightbox();
  $('main').prepend('<div class="page-effect"></div>');
  preloader();
  mobile();
  page_anim();
  hasTouch();
  sidebar();
}

function mobile(){
  if ( $(window).width() >= 1024 ){   
    smooth_scroll();
  }  
}
ajaxload();


   // AJAX LOAD    
        $("main").on('click','[data-type="ajax-load"]', function(e) {

            TweenLite.to(".page-effect", .9, {css:{width:"101-%"}, delay:.6, easy: Quad.easeInOut });
            TweenLite.to(".right-menu", .2, {css:{width:"101-%"}, delay:.2, easy: Quad.easeInOut });
            TweenLite.to(".right-menu nav, .right-menu .social, .right-menu .close-icon", .2, {css:{opacity:"0"}, delay:.2, easy: Quad.easeInOut });
            $(".right-menu").css('z-index', '100');
            var href = $(this).attr("href");

            loadHtml();
            function loadHtml() {

                setTimeout(function() {
                    loadContent(href);            
                    history.pushState('', 'new URL: '+href, href);        
                },1500);

            }
            e.preventDefault();
        });
        window.onpopstate = function(event) {
            location.reload();
        };
        function loadContent(url) {


            var getData = $.get(url, function(response) {
                var markup = $("<main>" + response + "</main>");
                var fragment = markup.find("main").html();
                var title = markup.find("title").html();
                $('head title').html( title );

                $("main").html(fragment);


                ajaxload();
                    if($('.ws-pages').length){
                        location.reload();
                    }
                $('main').prepend('<div class="preloader"><div class="loader"><div class="loader-inner"></div></div></div>');

                $(".page-effect").css('width', '100%');
                TweenLite.to(".page-effect", .5, {css:{width:"0%"}, delay:.2, easy: Quad.easeInOut });


            });
        }


// SLIDER
function partslider () { 

// if ($('.ws-pages').length) {
//   if (window.location.href.substr(-2) !== '?r') {
//       window.location = window.location.href + '?r';
//   }
// }

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback){
    window.setTimeout(callback, 1000 / 60);
  };
})();

function rafThrottle(fn) {
  var busy = false;
  return function() {
    if (busy) return;
    busy = true;
    fn.apply(this, arguments);
    requestAnimFrame(function() {
      busy = false;
    });
  };
};

  var $wsPages = $(".ws-pages");
  var $headings = $(".slider-text-heading");
  var bgParts = 24;
  var staggerVal = 65;
  var staggerStep = 4;
  var textH = $(".ws-text").height();
  var winW = $(window).width();
  var winH = $(window).height();
  var curPage = 1;
  var numOfPages = $(".ws-bg").length;
  var changeAT = 0.5;
  var waveStartDelay = 0.2;
  var waveStagger = 0.013;
  var waveBlocked = false;
  var index = 1;
  var startY = 0;
  var deltaY = 0;
  var headingsY = 0;
  var $parts;

  function initBgs() {
    var arr = [];
    var partW = 100 / bgParts;

    for (var i = 1; i <= bgParts; i++) {
      var $part = $('<div class="ws-bg__part">');
      var $inner = $('<div class="ws-bg__part-inner">');
      var innerLeft = 100 / bgParts * (1 - i);

      $inner.css("left", innerLeft + "vw");
      $part.append($inner);
      $part.addClass("ws-bg__part-" + i).width(partW + "%");
      arr.push($part);
    }

    $(".ws-bg").append(arr);
    $wsPages.addClass("s--ready");
    $parts = $(".ws-bg__part");
  };

  initBgs();

  function changePages() {
    var y = (curPage - 1) * winH * -1;
    var textY = textH * (curPage - 1) * -1;
    var leftMax = index - 1;
    var rightMin = index + 1;

    TweenLite.to(".ws-bg__part-" + index, changeAT, {y: y});

    for (var i = leftMax; i > 0; i--) {
      var d = (index - i) * waveStagger;
      TweenLite.to(".ws-bg__part-" + i, changeAT - d, {y: y, delay: d});
    }

    for (var j = rightMin; j <= bgParts; j++) {
      var d = (j - index) * waveStagger;
      TweenLite.to(".ws-bg__part-" + j, changeAT - d, {y: y, delay: d});
    }

    TweenLite.to($headings, changeAT, {y: textY});
  };

  function waveChange() {
    waveBlocked = true;
    var y = (curPage - 1) * winH * -1;
    var textY = textH * (curPage - 1) * -1;

    for (var i = 1; i <= bgParts; i++) {
      var d = (i - 1) * waveStagger + waveStartDelay;
      TweenLite.to(".ws-bg__part-" + i, changeAT, {y: y, delay: d});
    }

    TweenLite.to($headings, changeAT, {y: textY, delay: d});

    var delay = (changeAT + waveStagger * (bgParts - 1)) * 2000;
    setTimeout(function() {
      waveBlocked = false;
    }, delay);
  };

  function navigateUp() {
    if (curPage > 1) curPage--;
  };

  function navigateDown() {
    if (curPage < numOfPages) curPage++;
  };

  function navigateWaveUp() {
    if (curPage === 1) return;
    curPage--;
    waveChange();
  };

  function navigateWaveDown() {
    if (curPage === numOfPages) return;
    curPage++;
    waveChange();
  };

  function movePart($part, y) {
    var y = y - (curPage - 1) * winH;
    var headY = headingsY - (curPage - 1) * textH;
    TweenLite.to($part, changeAT, {y: y, ease: Back.easeOut.config(4)});
    TweenLite.to($headings, changeAT, {y: headY});
  };

  function moveParts(y, index) {
    var leftMax = index - 1;
    var rightMin = index + 1;
    var stagLeft = 0;
    var stagRight = 0;
    var stagStepL = 0;
    var stagStepR = 0;
    var sign = (y > 0) ? -1 : 1;

    movePart(".ws-bg__part-" + index, y);

    for (var i = leftMax; i > 0; i--) {
      var step = index - i;
      var sVal = staggerVal - stagStepL;
      stagStepL += (step <= 15) ? staggerStep : 1;
      if (sVal < 0) sVal = 0;
      stagLeft += sVal;
      var nextY = y + stagLeft * sign;
      if (Math.abs(y) < Math.abs(stagLeft)) nextY = 0;
      movePart(".ws-bg__part-" + i, nextY);
    }

    for (var j = rightMin; j <= bgParts; j++) {
      var step = j - index;
      var sVal = staggerVal - stagStepR;
      stagStepR += (step <= 15) ? staggerStep : 1;
      if (sVal < 0) sVal = 0;
      stagRight += sVal;
      var nextY = y + stagRight * sign;
      if (Math.abs(y) < Math.abs(stagRight)) nextY = 0;
      movePart(".ws-bg__part-" + j, nextY);
    }
  };

  var mousemoveHandler = rafThrottle(function(e) {
    var y = e.pageY;
    var x = e.pageX;
    index = Math.ceil(x / winW * bgParts);

    deltaY = y - startY;
    headingsY = textH * deltaY / winH;
    moveParts(deltaY, index);
  });

  var touchmoveHandler = rafThrottle(function(e) {
    e.preventDefault();
    var y = e.originalEvent.touches[0].pageY;
    var x = e.originalEvent.touches[0].pageX;
    index = Math.ceil(x / winW * bgParts);

    deltaY = y - startY;
    headingsY = textH * deltaY / winH;
    moveParts(deltaY, index);
  });

  var swipeEndHandler = function() {
    $(document).off("mousemove", mousemoveHandler);
    $(document).off("touchmove", touchmoveHandler);
    $(document).off("mouseup touchend", swipeEndHandler);

    if (!deltaY) return;

    if (deltaY / winH >= 0.5) navigateUp();
    if (deltaY / winH <= -0.5) navigateDown();
    changePages();
  };

  $(document).on("mousedown touchstart", ".ws-bg__part", function(e) {
    startY = e.pageY || e.originalEvent.touches[0].pageY;
    deltaY = 0;

    $(document).on("mousemove", mousemoveHandler);
    $(document).on("touchmove", touchmoveHandler);

    $(document).on("mouseup touchend", swipeEndHandler);
  });

  $(document).on("mousewheel DOMMouseScroll", function(e) {
    if (waveBlocked) return;
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
      navigateWaveUp();
    } else { 
      navigateWaveDown();
    }
  });

  $(document).on("keydown", function(e) {
    if (waveBlocked) return;
    if (e.which === 38) {
      navigateWaveUp();
    } else if (e.which === 40) {
      navigateWaveDown();
    }
  });

  $(window).on("resize", function() {
    winW = $(window).width();
    winH = $(window).height();
    changePages();
  });

  $('.navigate .next').on('click', function() {
  	navigateWaveUp();
  });
  $('.navigate .prev').on('click', function() {
  	navigateWaveDown();
  });


 }


// LEFT MENU

function leftmenu (){
  $('header .menu').on('click', function() {
  	$('.right-menu').toggleClass('active');
  });

  $('.right-menu .close-icon').on('click', function() {
    $('.right-menu').removeClass('active');
  });

  $('.right-menu nav ul li.hassub i').on('click', function() {
  	$(this).parent().children('ul').slideToggle();
  });


}

 
  // OWL CAROUSEL
  function owlslider() { 
    var owlcar = $('.owl-carousel');
    if (owlcar.length) {
        owlcar.each(function () {
            var $owl = $(this);
            var itemsData = $owl.data('items');
            var autoplayData = $owl.data('autoplay');
            var autoPlayTimeoutData = $owl.data('autoplaytimeout');
            var dotsData = $owl.data('dots');
            var navData = $owl.data('nav');
            var marginData = $owl.data('margin');
            var stagePaddingData = $owl.data('stagepadding');
            var itemsDesktopData = $owl.data('items-desktop');
            var itemsTabletData = $owl.data('items-tablet');
            var itemsTabletSmallData = $owl.data('items-tablet-small');
            $owl.owlCarousel({
                  items: itemsData
                , dots: dotsData
                , nav: navData
                , margin: marginData
                , loop: true
                , stagePadding: stagePaddingData
                , autoplay: autoplayData
                , autoplayTimeout: autoPlayTimeoutData
                , navText: ["<i class='fas fa-arrow-left'></i>","<i class='fas fa-arrow-right'></i>"]
                , responsive:{
                        0:{
                            items:itemsTabletSmallData,
                            stagePadding:0
                        },
                        600:{
                            items:itemsTabletData,
                            stagePadding:0
                        },
                        1000:{
                            items:itemsDesktopData
                        }
                    }
            , });
        });
    }
}



// ALL PROJECT
function allproject() {
  $(".see-all").on('click', function() {
      $('.all-projects').addClass('active');
  }); 
    $(".all-projects .close-icon").on('click', function() {
      $('.all-projects').removeClass('active');
  }); 
}


// LIGHTBOX
function lightbox() {
  $('.lightbox').magnificPopup({
        type:'image',
        gallery:{enabled:true},
        zoom:{enabled: true, duration: 300}
    });
}


function smooth_scroll() {
  if ($('#smooth-scroll').length) {
    var elem = document.querySelector("#smooth-scroll");
    var scrollbar = Scrollbar.init(elem,
    {
      renderByPixels: true,
      damping:0.05
    }); 
      $(".back-top").on('click', function() {
        TweenLite.to(scrollbar, 1.5, {scrollTop:0, ease:Power4.easeInOut});
  }); 
  }
}

// BACK TOP TOP
function backtop() {
  $(".back-top").on('click', function() {
    if ($("body").hasClass("smooth-scroll")) {
        TweenLite.to(scrollbar, 1.5, {scrollTop:0, ease:Power4.easeInOut});
      } else {
        $("html,body").animate({scrollTop: 0}, 800);
      }
  }); 
}


// animate each

function page_anim() { 

    var controller = new ScrollMagic.Controller();

    

    $('.box-animation').each(function(){
      var $this = $(this);
      var $thisHeight = $(this).height();
        
      var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
      .addTo(controller);
        
      
      scene.triggerHook(1)
      
      scene.on('enter', function(){
        $this.delay($this.attr('data-delay')).queue(function(next){
          TweenMax.to($this, 0.6, {force3D:true, opacity:1, y:0, scale:1, delay:0.1, ease:Power2.easeOut});
          next();
        });
      });
      
      scene.on('leave', function(event){
        $this.removeClass('active');
      });
      
      if ($("body").hasClass("smooth-scroll")) {
        scrollbar.addListener(() => {
          scene.refresh()
        });
      }
    })
    
    $('.text-animation').each(function(){
      var words = $(this).text().split(" ");
      var total = words.length;
      $(this).empty();
      for (index = 0; index < total; index ++){
        $(this).append($("<span /> ").text(words[index]));
      }
    });
    
    $('.text-animation span').each(function(){
      var words = $(this).text().split(" ");
      var total = words.length;
      $(this).empty();
      for (index = 0; index < total; index ++){
        $(this).append($("<span /> ").text(words[index]));
      }
    });
    
    $('.text-animation').each(function(){
      var $this = $(this);
      var $thisHeight = $(this).height();
      
      var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
        .addTo(controller);
      
      scene.triggerHook(1)
      
      scene.on('enter', function(){       
        
        var tl = new TimelineLite();
            
        $this.find('span > span').each(function(index, element) {
          tl.to(element, 0.6, {y:0, opacity:1, delay:0.1, ease:Power2.easeOut}, index * 0.03)
        });
      });
        
      });
}


  function preloader() {
     $('body').waitForImages(function() {
        $(".loader").fadeOut();
        $(".preloader").fadeOut("slow");
    });

}

function hasTouch() {
    return 'ontouchstart' in document.documentElement
           || navigator.maxTouchPoints > 0
           || navigator.msMaxTouchPoints > 0;
}

if (hasTouch()) { // remove all :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
}


 /*--------------------------------------------------
   SIDEBAR JS
---------------------------------------------------*/ 

function sidebar(){

  $('.sidebar-menu').on("click", function(){
      $('.sidebar').addClass('open');
  });
  $('.sidebar-close').on("click", function(){
      $('.sidebar').removeClass('open');
  });

}



}); // document read end 



