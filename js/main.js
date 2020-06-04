pagefect();
others();
carousel();
nav_type();
PortfolioGrids();
cform();
typist();
port_close();
lightbox();
preloader();
backlink();
down_icon();
slider();
ContactForm();

var doit;
window.onresize = function(){
  clearTimeout(doit);
  doit = setTimeout(nav_type, 100);
};

function ajaxLoad (){
carousel();
others();
nav_type();
PortfolioGrids();
cform();
typist();
port_close();
lightbox();
preloader();
backlink();
down_icon();
slider();
ContactForm();
    
    var doit;
    window.onresize = function(){
      clearTimeout(doit);
      doit = setTimeout(nav_type, 100);
	};
}


//AJAX LOAD    
$("main").on('click','[data-type="ajax-load"]', function(e) {

$(".page-overlay").addClass("from-bottom");
var href = $(this).attr("href");
loadHtml();
function loadHtml() {
	setTimeout(function() {
		loadContent(href);            
		history.pushState('', 'new URL: '+href, href);        
	},1000);
}
e.preventDefault();
});
function loadContent(url) {
	var getData = $.get(url, function(response) {
		var markup = $("<main>" + response + "</main>");
		var fragment = markup.find("main").html();
		var title = markup.find("title").html();
		$('head title').html( title );
		$("main").html(fragment);
		ajaxLoad();
		window.scrollTo(0, 0);
		$(".page-overlay").addClass("from-bottom");
		setTimeout( function(){
		  $(".page-overlay").addClass("from-bottom-end");
		  setTimeout( function(){
			$(".page-overlay").removeClass("from-bottom");
			$(".page-overlay").removeClass("from-bottom-end");
		  } , 800 );
		} , 500 );

	});
}

function down_icon(){
	$('.section-down-arrow.subpage').on('click', function() {
		var vheight = $('.work-hero').height();
	  $('html, body').animate({scrollTop :vheight},800);
	  return false;
	});

 }

//BACKLINK
function backlink() {
	$('.backlink').on('click', function(e) { 
		e.preventDefault();
		var href = $(this).attr("href");
		history.pushState('', 'new URL: '+href, href); 
		
		$(".page-overlay").addClass("from-bottom");
		
		setTimeout(function() {
		location.reload();
		}, 1000);
});

}

function pagefect() { 
(function($) { "use strict"; 
	
var portfolioKeyword;
	$(function() {
		$('html').addClass('modern-layout');
		$.address.change(function() {
			setActivePage();
			$('html').removeClass('is-menu-toggled-on');	
			});
		$('.nav-menu a').on("click", function() {
			if( window.isAnimating ) {
				return false;
			}
		});
	});
	function giveDetailUrl() {
		var address = $.address.value();
		var detailUrl;
		if (address.indexOf("/"+ portfolioKeyword + "/")!=-1 && address.length > portfolioKeyword.length + 2 ) {
			var total = address.length;
			detailUrl = address.slice(portfolioKeyword.length+2,total);
			console.log(detailUrl)
		} else {
			detailUrl = -1;	
		}
		return detailUrl;
	}
	
	function setActivePage() {
		var path = $.address.path();
		path = path.slice(1, path.length);
		path = giveDetailUrl() != -1 ? portfolioKeyword : path;
		$('.down-arrow').on('click', function() {
			$(".down-arrow").css("pointer-events", "none");
			setTimeout(function(){
				$(".down-arrow").css("pointer-events", "auto");
			 },700);
		});
		if(path != 'hero' && path != ''){
			$('header').addClass('second');
			$('.down-arrow').attr("href", "#/hero");
			$('header').removeClass('white-home');
		}else{
			$('header').addClass('white-home');
			$('header').removeClass('second');
			var bu = $('header nav ul li').index() + 1;
			var nexthref = $('header nav ul li:eq('+bu+')').children('a').attr('href');
			$('.down-arrow').attr("href", nexthref);
		}
		if(path == "") {
			var firstPage = $('.nav-menu li').first().find('a').attr('href');
			path = firstPage.slice(2,firstPage.length);
			
				if(!($('.page-current').length)) { 
					$('#'+ path).addClass( 'page-current' );
					current = $('#'+ path).index();
					setCurrentMenuItem();
				} else {
						PageTransitions.nextPage( $('#'+ path).index() );

				}	
			setCurrentMenuItem();
			return false;
			}
		else { 
				if(giveDetailUrl() == -1){
					
				
						if(!($('.page-current').length)) { 
							$('#'+ path).addClass( 'page-current' );
							current = $('#'+ path).index();
							setCurrentMenuItem();
						} else {
								PageTransitions.nextPage( $('#'+ path).index() );
							
						}	
						
				}
				
		}
	}	
	function setCurrentMenuItem() {
		var activePageId = $('.pt-page.page-current').attr('id');
		$('.nav-menu a[href$=' + activePageId +']').parent().addClass('current_page_item').siblings().removeClass('current_page_item');
	}	
	var current = 0;
	var inClass, outClass;
	window.nextAnimation = $('html').data("next-animation");
	window.prevAnimation = $('html').data("prev-animation");
	window.randomize = $('html').data("random-animation");
	window.isAnimating = false;
	var PageTransitions = (function() {

		var $main = $( '#main' ),
			$pages = $main.children( '.pt-page' ),
			$menuLinks = $('.nav-menu a'),
			animcursor = 1,
			endCurrPage = false,
			endNextPage = false,
			animEndEventNames = {
				'WebkitAnimation' : 'webkitAnimationEnd',
				'OAnimation' : 'oAnimationEnd',
				'msAnimation' : 'MSAnimationEnd',
				'animation' : 'animationend'
			},
			animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
			support = Modernizr.cssanimations;
		
		function init() {
		}
		function nextPage(nextPageIndex) {
			if(nextPageIndex === current) {
				return; 
			}
			
			var animation = nextPageIndex > current ? nextAnimation : prevAnimation;
			if(randomize) {
				if( animcursor > 67 ) {
					animcursor = 1;
				}
				animation = animcursor;
				++animcursor;	
			}
			
			if( window.isAnimating ) {
				return false;
			}
	
			window.isAnimating = true;
			
			var $currPage = $pages.eq( current );
			
			current = nextPageIndex; 

			var $nextPage = $pages.eq( current ).addClass( 'page-current' );
	
			switch( animation ) {
	
				case 1:
					outClass = 'pt-page-moveToLeft';
					inClass = 'pt-page-moveFromRight';
					break;
				case 2:
					outClass = 'pt-page-moveToRight';
					inClass = 'pt-page-moveFromLeft';
					break;
				case 3:
					outClass = 'pt-page-moveToTop';
					inClass = 'pt-page-moveFromBottom';
					break;
				case 4:
					outClass = 'pt-page-moveToBottom';
					inClass = 'pt-page-moveFromTop';
					break;
				case 5:
					outClass = 'pt-page-fade';
					inClass = 'pt-page-moveFromRight pt-page-ontop';
					break;
				case 6:
					outClass = 'pt-page-fade';
					inClass = 'pt-page-moveFromLeft pt-page-ontop';
					break;
				case 7:
					outClass = 'pt-page-fade';
					inClass = 'pt-page-moveFromBottom pt-page-ontop';
					break;
				case 8:
					outClass = 'pt-page-fade';
					inClass = 'pt-page-moveFromTop pt-page-ontop';
					break;
				case 9:
					outClass = 'pt-page-moveToLeftFade';
					inClass = 'pt-page-moveFromRightFade';
					break;
				case 10:
					outClass = 'pt-page-moveToRightFade';
					inClass = 'pt-page-moveFromLeftFade';
					break;
				case 11:
					outClass = 'pt-page-moveToTopFade';
					inClass = 'pt-page-moveFromBottomFade';
					break;
				case 12:
					outClass = 'pt-page-moveToBottomFade';
					inClass = 'pt-page-moveFromTopFade';
					break;
				case 13:
					outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
					inClass = 'pt-page-moveFromRight';
					break;
				case 14:
					outClass = 'pt-page-moveToRightEasing pt-page-ontop';
					inClass = 'pt-page-moveFromLeft';
					break;
				case 15:
					outClass = 'pt-page-moveToTopEasing pt-page-ontop';
					inClass = 'pt-page-moveFromBottom';
					break;
				case 16:
					outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
					inClass = 'pt-page-moveFromTop';
					break;
				case 17:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromRight pt-page-ontop';
					break;
				case 18:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromLeft pt-page-ontop';
					break;
				case 19:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromBottom pt-page-ontop';
					break;
				case 20:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromTop pt-page-ontop';
					break;
				case 21:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-scaleUpDown pt-page-delay300';
					break;
				case 22:
					outClass = 'pt-page-scaleDownUp';
					inClass = 'pt-page-scaleUp pt-page-delay300';
					break;
				case 23:
					outClass = 'pt-page-moveToLeft pt-page-ontop';
					inClass = 'pt-page-scaleUp';
					break;
				case 24:
					outClass = 'pt-page-moveToRight pt-page-ontop';
					inClass = 'pt-page-scaleUp';
					break;
				case 25:
					outClass = 'pt-page-moveToTop pt-page-ontop';
					inClass = 'pt-page-scaleUp';
					break;
				case 26:
					outClass = 'pt-page-moveToBottom pt-page-ontop';
					inClass = 'pt-page-scaleUp';
					break;
				case 27:
					outClass = 'pt-page-scaleDownCenter';
					inClass = 'pt-page-scaleUpCenter pt-page-delay400';
					break;
				case 28:
					outClass = 'pt-page-rotateRightSideFirst';
					inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
					break;
				case 29:
					outClass = 'pt-page-rotateLeftSideFirst';
					inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
					break;
				case 30:
					outClass = 'pt-page-rotateTopSideFirst';
					inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
					break;
				case 31:
					outClass = 'pt-page-rotateBottomSideFirst';
					inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
					break;
				case 32:
					outClass = 'pt-page-flipOutRight';
					inClass = 'pt-page-flipInLeft pt-page-delay500';
					break;
				case 33:
					outClass = 'pt-page-flipOutLeft';
					inClass = 'pt-page-flipInRight pt-page-delay500';
					break;
				case 34:
					outClass = 'pt-page-flipOutTop';
					inClass = 'pt-page-flipInBottom pt-page-delay500';
					break;
				case 35:
					outClass = 'pt-page-flipOutBottom';
					inClass = 'pt-page-flipInTop pt-page-delay500';
					break;
				case 36:
					outClass = 'pt-page-rotateFall pt-page-ontop';
					inClass = 'pt-page-scaleUp';
					break;
				case 37:
					outClass = 'pt-page-rotateOutNewspaper';
					inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
					break;
				case 38:
					outClass = 'pt-page-rotatePushLeft';
					inClass = 'pt-page-moveFromRight';
					break;
				case 39:
					outClass = 'pt-page-rotatePushRight';
					inClass = 'pt-page-moveFromLeft';
					break;
				case 40:
					outClass = 'pt-page-rotatePushTop';
					inClass = 'pt-page-moveFromBottom';
					break;
				case 41:
					outClass = 'pt-page-rotatePushBottom';
					inClass = 'pt-page-moveFromTop';
					break;
				case 42:
					outClass = 'pt-page-rotatePushLeft';
					inClass = 'pt-page-rotatePullRight pt-page-delay180';
					break;
				case 43:
					outClass = 'pt-page-rotatePushRight';
					inClass = 'pt-page-rotatePullLeft pt-page-delay180';
					break;
				case 44:
					outClass = 'pt-page-rotatePushTop';
					inClass = 'pt-page-rotatePullBottom pt-page-delay180';
					break;
				case 45:
					outClass = 'pt-page-rotatePushBottom';
					inClass = 'pt-page-rotatePullTop pt-page-delay180';
					break;
				case 46:
					outClass = 'pt-page-rotateFoldLeft';
					inClass = 'pt-page-moveFromRightFade';
					break;
				case 47:
					outClass = 'pt-page-rotateFoldRight';
					inClass = 'pt-page-moveFromLeftFade';
					break;
				case 48:
					outClass = 'pt-page-rotateFoldTop';
					inClass = 'pt-page-moveFromBottomFade';
					break;
				case 49:
					outClass = 'pt-page-rotateFoldBottom';
					inClass = 'pt-page-moveFromTopFade';
					break;
				case 50:
					outClass = 'pt-page-moveToRightFade';
					inClass = 'pt-page-rotateUnfoldLeft';
					break;
				case 51:
					outClass = 'pt-page-moveToLeftFade';
					inClass = 'pt-page-rotateUnfoldRight';
					break;
				case 52:
					outClass = 'pt-page-moveToBottomFade';
					inClass = 'pt-page-rotateUnfoldTop';
					break;
				case 53:
					outClass = 'pt-page-moveToTopFade';
					inClass = 'pt-page-rotateUnfoldBottom';
					break;
				case 54:
					outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
					inClass = 'pt-page-rotateRoomLeftIn';
					break;
				case 55:
					outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
					inClass = 'pt-page-rotateRoomRightIn';
					break;
				case 56:
					outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
					inClass = 'pt-page-rotateRoomTopIn';
					break;
				case 57:
					outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
					inClass = 'pt-page-rotateRoomBottomIn';
					break;
				case 58:
					outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
					inClass = 'pt-page-rotateCubeLeftIn';
					break;
				case 59:
					outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
					inClass = 'pt-page-rotateCubeRightIn';
					break;
				case 60:
					outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
					inClass = 'pt-page-rotateCubeTopIn';
					break;
				case 61:
					outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
					inClass = 'pt-page-rotateCubeBottomIn';
					break;
				case 62:
					outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
					inClass = 'pt-page-rotateCarouselLeftIn';
					break;
				case 63:
					outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
					inClass = 'pt-page-rotateCarouselRightIn';
					break;
				case 64:
					outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
					inClass = 'pt-page-rotateCarouselTopIn';
					break;
				case 65:
					outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
					inClass = 'pt-page-rotateCarouselBottomIn';
					break;
				case 66:
					outClass = 'pt-page-rotateSidesOut';
					inClass = 'pt-page-rotateSidesIn pt-page-delay200';
					break;
				case 67:
					outClass = 'pt-page-rotateSlideOut';
					inClass = 'pt-page-rotateSlideIn';
					break;
	
			}
	
			$currPage.addClass( outClass ).on( animEndEventName, function() {
				$currPage.off( animEndEventName );
				endCurrPage = true;
				if( endNextPage ) {
					onEndAnimation( $currPage, $nextPage );
				}
			} );
	
			$nextPage.addClass( inClass ).on( animEndEventName, function() {
				$nextPage.off( animEndEventName );
				endNextPage = true;
				if( endCurrPage ) {
					onEndAnimation( $currPage, $nextPage );
				}
			} );
	
			if( !support ) {
				onEndAnimation( $currPage, $nextPage );
			}
	
		}
	
		function onEndAnimation( $outpage, $inpage ) {
			endCurrPage = false;
			endNextPage = false;
			resetPage( $outpage, $inpage );
			window.isAnimating = false;
			setCurrentMenuItem();
		}
	
		function resetPage( $outpage, $inpage ) {
			$outpage.removeClass(outClass);
			$inpage.removeClass(inClass);
			$pages.eq( current ).siblings().removeClass( 'page-current' );
		}
		init();
		return { 
			init : init,
			nextPage : nextPage
		};
	})();
	window.nextPage = function(index) {
		return new PageTransitions.nextPage(index);
		};
})(jQuery);

return false;

}
  

function others(){

    $('.second .title').on('click', function() {
        $(this).toggleClass('open');
        $(this).next('.tab-content').slideToggle('open');
    });
}



 
// OWL CAROUSEL JS  

function carousel() {
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
				, navText: ["<i class='fas fa-angle-left'></i>","<i class='fas fa-angle-right'></i>"]
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




function nav_type() {
	var window_height = $(window).height();
	var window_width = $(window).width();
	var nav_a_height = $('header nav ul li a').width();
	var nav_total = $('header nav ul li').length;
	var nav_height = (nav_a_height * nav_total);
	var logo_height = $('.logo').height();

	if ( (nav_height + logo_height + 400) > window_height || window_width < 900 ){
		$('header').addClass('mobile-version');
	}else {
		$('header').removeClass('mobile-version');
	}

	$('.mobile-btn').on('click', function() {
		$('header').addClass('yes');
		$('.mobile-btn').toggleClass('itsopend');
		$('header.mobile-version nav').toggleClass('opened');
	});
	
	
	$('header.mobile-version nav ul li a').on('click', function() {
		$('.mobile-btn').removeClass('itsopend');
		$('header.mobile-version nav, .mobile-btn').removeClass('opened');
	});
}





//PORTFOLIO GRIDS
function PortfolioGrids() {
    var $container = $('.masonry');
    $container.imagesLoaded( function() {   
        $container.isotope({
          layoutMode: 'packery',
          itemSelector: '.grid-item',
          gutter:0,
          transitionDuration: "0.5s",
          columnWidth: '.grid-item'
        });
    })
        $('.portfolio_filter ul li a').on("click", function(){
          $(".portfolio_filter ul li a").removeClass("select-cat");
          $(this).addClass("select-cat");        
          var selector = $(this).attr('data-filter');
          $(".masonry").isotope({
              filter: selector,
              animationOptions: {
                  duration: 750,
                  easing: 'linear',
                  queue: false,
        }
      });
          return false;
      });   

      $(".filter-icon").on("click", function() {
        $('.portfolio_filter').addClass('show');   
      });

      $(".portfolio_filter, .portfolio_filter ul li a").on("click", function (event) {
        if (!$(event.target).is(".portfolio_filter ul li a")) {
                $('.portfolio_filter').removeClass('show');
                return false;
            }
        }); 
  
      // Infinite Scroll
      var curPage = 1;
      var pagesNum = $("#pagination-selector").find("li a:last").text();   // Number of pages
  
      $container.infinitescroll({
          itemSelector: '.grid-item',
          nextSelector: '.portfolio-pagination li a',
          navSelector: '#pagination-selector',
          extraScrollPx: 0,
          bufferPx: 0,
          maxPage: 6,
          loading: {
              finishedMsg: "No more works",
              msgText: '<div class="loader"><span></span></div>',
              speed: 'slow',
              selector: '.load-more',
          },
      },
      // trigger Masonry as a callback
      function( newElements ) {
  
            var $newElems = $( newElements );
            $newElems.imagesLoaded(function(){  // Append masonry        
              $newElems.animate({ opacity: 1 });
              $container.isotope( 'appended', $newElems, true ); 
            });
            // Check last page
            curPage++;
            if(curPage == pagesNum) {
              $( '.load-more button' ).remove();
            }
            $('.load-more').find('button').css('visibility', 'visible');
          });
  
          $container.infinitescroll( 'unbind' );
          // jQuery
      $container.on( 'append.infinitescroll', function( event, response, path, items ) {
        console.log( 'Loaded: ' + path );
      });
  
  
          $( '.load-more button' ).on('click', function() {
            setTimeout(function()
             { 
              port_load();   
              $('.grid-item').addClass('in-view'); 
              },1000);      
            $container.infinitescroll( 'retrieve' );
            $('.load-more').find('button').css('visibility', 'hidden');
            return false;
		  });
		  
	
    }



//CONTACT FORM
function cform() {
	$("form .form-group input, form .form-group textarea").focus(function(){
  
	  $(this).parents('.form-group').addClass('in');
  
	  $('form .form-group input, form .form-group textarea').blur(function()
		  {
			  if( !$(this).val() ) {
					$(this).parents('.form-group').removeClass('in');
			  }
		  });
	});
}
  


// HOME TEXT TYPE EFFECT 
function typist() {
    var typist;
    typist = document.querySelector("#element");
    new Typist(typist, {
      letterInterval: 60,
      textInterval: 3000
    });

}


function port_close() {

    $(window).scroll( function(){
		var st = $(this).scrollTop();
		var sh = $('.work-hero').outerHeight();
		if( st >= sh ){
			$('#backpage').addClass('dark');
		}else{
			$('#backpage').removeClass('dark');
		}
    });

}



// MAGNIFIC POPUP    
function lightbox() {
    $('.lightbox').magnificPopup({
          type:'image',
          gallery:{enabled:true},
          zoom:{enabled: true, duration: 300}
      });
  }

  

function preloader() {

	var width = 100,
	perfData = window.performance.timing,
	EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
	time = parseInt((EstimatedTime / 1000) % 60) * 40;


var PercentageID = $("#precent"),
	start = 0,
	end = 100,
	durataion = time;
animateValue(PercentageID, start, end, durataion);

function animateValue(id, start, end, duration) {

var range = end - start,
		current = start,
		increment = end > start ? 1 : -1,
		stepTime = Math.abs(Math.floor(duration / range)),
		obj = $(id);

var timer = setInterval(function () {
	current += increment;
	$(obj).text(current + "%");
	$(".loader_bar").css({width: current + '%'})

	if (current == end) {
		clearInterval(timer);
	}
}, stepTime);
}


setTimeout(function () {
$('.preloader-wrap').fadeOut(400);
}, time);

}


//SLIDER
function slider () {

	var homeImgURLs = [];
  jQuery('.slider-images ul li').each(function(index) {
	homeImgURLs.push({
	  src: jQuery(this).attr('data-src'),
	  fade: 1000
	});
  });
  
  var delay_data = jQuery('.slider-images').data('delay');
  
  
	jQuery(".slider-images").vegas({
	  slides: homeImgURLs,
		  animation: ['kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight'],
		  delay: delay_data * 1000,
		  shuffle:true
	  });
  }


  //CONTACT FORM
  function ContactForm() {	
	
	if( jQuery('#contact-formular').length > 0 ){
		$('#contactform').submit(function(){
			var action = $(this).attr('action');
			$("#message").slideUp(750,function() {
				$('#message').hide();
				$('#submit').attr('disabled','disabled');		
				$.post(action, {
					name: $('#name').val(),
					email: $('#email').val(),
					comments: $('#comments').val()
				},
				function(data){
					document.getElementById('message').innerHTML = data;
					$('#message').slideDown('slow');
					$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
					$('#submit').removeAttr('disabled');
					if(data.match('success') != null) $('#contactform').slideUp('slow');		
				}
			);		
			});		
			return false;		
		});		
	}

}//End ContactForm		