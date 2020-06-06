    /*=============================================
    = FUNCTIONS
    =============================================*/

    /*----------  GET VARIABLE FUNCTION  ----------*/
    ckav.getvar = function (v, default_v, val_type) {
		'use strict';
		if (val_type == 'n') {
			return v ? parseInt(v, 10) : default_v;
		}
		if (val_type == 'b') {
			if (v == 'true') { return true; }
			else if (v == 'false') { return false; }
			else { return default_v; }
		}
		if (val_type == 's') {
			if (v == 'false') {
				return false;
			} else {
				return v ? v : default_v;
			};

		}
	}

    /*----------  BACKGROUND IMAGE  ----------*/
    ckav.backgroundImage = function (element) {
        element.css({ 
            backgroundImage: "url('" + element.attr("data-bg-image") + "')" 
        });
	}

	/*----------  BACKGROUND IMAGE  ----------*/
    ckav.backgroundColor = function (element) {
        element.css({ 
            backgroundColor: element.attr("data-bg-color")
        });
	}

	/*----------  TEMPLATE - FIND THEME  ----------*/
	ckav.findTheme = function (element) {
		var themeIs = $(".page-section.active-page").attr("data-theme");
		element.addClass(themeIs);
	}
	
	/*----------  BACKGROUND SLIDESHOW  ----------*/
	ckav.slideshow = function (element) {
        if($().vegas) {
			var s1 = element.attr('data-slide-image'),
				s2 = s1.split('|'),
				bgslides = [];
			
			$.each(s2, function (index, val) {
				bgslides.push({ src: val });
			});

			element.vegas({
				delay: 4000,
				slides: bgslides,
				timer: false,
				animation: 'kenburns'
			});
		}
	}

	/*----------  BACKGROUND VIDEO YOUTUBE  ----------*/
	ckav.backgroundYoutube = function(element) {
		var isMobile = {
			Android: function () {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function () {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function () {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function () {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function () {
				return navigator.userAgent.match(/IEMobile/i);
			},
			any: function () {
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
			}
		};

		if (isMobile.any()) {
			if (element.attr('data-property')) {
				element.YTPlayer();
			}
		}
		else {
			element.css("display", "block");
			if (element.attr('data-property')) {
				element.YTPlayer();
			}
		}
	}

	/*----------  HOSTED VIDEO  ----------*/
	ckav.hostVideo = function (element) {
		'use strict';

		var videofile = element.attr("data-vide-src");
		element.animate({ opacity: 1 }, 500, function () { });
		element.vide({
			mp4: videofile,
			webm: videofile,
			ogv: videofile,
			poster: videofile + ".jpg"
		}, 
		{
			volume: 1,
			playbackRate: 1,
			muted: true,
			loop: true,
			autoplay: true,
			position: 'center center', // Similar to the CSS `background-position` property.
			posterType: 'jpg', // Poster image type. "detect" — auto-detection; "none" — no poster; "jpg", "png", "gif",... - extensions.
			resizing: true, // Auto-resizing, read: https://github.com/VodkaBears/Vide#resizing
			bgColor: 'transparent', // Allow custom background-color for Vide div,
			className: '' // Add custom CSS class to Vide div
		});
	}

    /*----------  LINEAR GRADIENT  ----------*/
    ckav.linearGredient = function(element) {
        
        var grdColors = $(element).attr('data-linear-gradient'),
        grdColor = grdColors.split('|');

        element.css({ 
            background: "linear-gradient(to bottom, " + grdColor[0] + " 0%, " + grdColor[1] + " 100%)",
        });
	}
	
	/*----------  RADIAL GRADIENT  ----------*/
    ckav.radialGredient = function(element) {
		
		var rgrdColors = $(element).attr('data-radial-gradient'),
			rgrdColor = rgrdColors.split('|');

		element.css({ 
			background: "radial-gradient(circle, " + rgrdColor[0] + " 0%, " + rgrdColor[1] + " 100%)",
		});
    }

    /*----------  PARALLAX BACKGROUND  ----------*/
    ckav.parallaxImage = function(element) {
        if($().jarallax) {
            
            var parallaxConfig = {};

            parallaxConfig = {
                
            };

            element.jarallax({
                
            });

        }
    }

    /*----------  PAGE TRANSITION  ----------*/
    ckav.pageTransition = function(element) {

    }

    /*----------  OWL CAROUSEL ITEM  ----------*/
    ckav.carouselItem = function(arr) {
        if($().owlCarousel) {
            if (typeof (arr) == "string" && arr != 'false') {
                var t1 = arr.split('|');
                var t2 = {};
                $.each(t1, function (index, val) {
                    var str = val;
                    var newarr = str.split(',');
                    t2[newarr[0]] = {}
                    t2[newarr[0]] = { items: parseInt(newarr[1], 10) };
                });
                return t2;
            } 
            else if (arr === 'false') {
                return {};
            } 
            else {
                return false;
            }   
        }
    }

    /*----------  OWL CAROUSEL  ----------*/
    ckav.carousel = function(element) {
        if($().owlCarousel) {
            
            var carouselConfig,
                navLeft = '<i class="pe-7s-angle-left"></i>',
                navRight = '<i class="pe-7s-angle-right"></i>';

            // RESPONSIVE VARIABLE
            var resObj = {
                0: { items: 1 },
                420: { items: 2 },
                600: { items: 3 },
                768: { items: 3 },
                980: { items: 4 }
            }

            // CAROUSEL OBJECTS
            var carouselElement = $(element + ' .owl-carousel'),
                carouselObj = $(element);
            
            // CAROUSEL CONFIG
            carouselConfig = {
                items : ckav.getvar(carouselObj.attr('data-carousel-items'), 3, 'n'),
                margin : ckav.getvar(carouselObj.attr('data-carousel-margin'), 0, 'n'),
                loop : ckav.getvar(carouselObj.attr('data-carousel-loop'), false, 'b'),
                center : ckav.getvar(carouselObj.attr('data-carousel-center'), false, 'b'),
                mouseDrag : ckav.getvar(carouselObj.attr('data-carousel-mousedrag'), true, 'b'),
                touchDrag : ckav.getvar(carouselObj.attr('data-carousel-touchdrag'), true, 'b'),
                pullDrag : ckav.getvar(carouselObj.attr('data-carousel-pulldrag'), true, 'b'),
                freeDrag : ckav.getvar(carouselObj.attr('data-carousel-freedrag'), false, 'b'),
                stagePadding : ckav.getvar(carouselObj.attr('data-carousel-stagepadding'), 0, 'n'),
                navTextLeft : ckav.getvar(carouselObj.attr('data-carousel-navleft'), navLeft, 's'),
                navTextRight : ckav.getvar(carouselObj.attr('data-carousel-navright'), navRight, 's'),
                merge : ckav.getvar(carouselObj.attr('data-carousel-merge'), false, 'b'),
                mergeFit : ckav.getvar(carouselObj.attr('data-carousel-margefit'), true, 'b'),
                autoWidth : ckav.getvar(carouselObj.attr('data-carousel-widthauto'), false, 'b'),
                startPosition : ckav.getvar(carouselObj.attr('data-carousel-startpos'), 0, 'n'),
                URLhashListener : ckav.getvar(carouselObj.attr('data-carousel-hashurl'), false, 'b'),
                nav : ckav.getvar(carouselObj.attr('data-carousel-nav'), false, 'b'),
                rewind : ckav.getvar(carouselObj.attr('data-carousel-rewind'), true, 'b'),
                slideBy : ckav.getvar(carouselObj.attr('data-carousel-sideby'), 1, 'n'),
                slideTransition : ckav.getvar(carouselObj.attr('data-carousel-transition'), 'linear', 's'),
                dots : ckav.getvar(carouselObj.attr('data-carousel-dots'), true, 'b'),
                lazyLoad : ckav.getvar(carouselObj.attr('data-carousel-lazyload'), false, 'b'),
                lazyLoadEager : ckav.getvar(carouselObj.attr('data-carousel-dots'), 0, 'n'),
                autoplay : ckav.getvar(carouselObj.attr('data-carousel-autoplay'), false, 'b'),
                autoplayTimeout : ckav.getvar(carouselObj.attr('data-carousel-autoplaytimeout'), 5000, 'n'),
                autoplayHoverPause : ckav.getvar(carouselObj.attr('data-carousel-hoverpause'), false, 'b'),
                smartSpeed : ckav.getvar(carouselObj.attr('data-carousel-smartspeed'), 250, 'n'),
                autoplaySpeed : ckav.getvar(carouselObj.attr('data-carousel-autoplayspeed'), false, 'b'),
                video : ckav.getvar(carouselObj.attr('data-carousel-video'), false, 'b'),
                animateOut : ckav.getvar(carouselObj.attr('data-carousel-out'), 'fadeOut', 's'),
                animateIn : ckav.getvar(carouselObj.attr('data-carousel-in'), 'fadeIn', 's'),
                responsive : carouselObj.attr('data-carousel-itemrange') ? ckav.carouselItem(carouselObj.attr('data-carousel-itemrange')) : resObj,
                responsiveBaseElement : ckav.getvar(carouselObj.attr('data-carousel-rbase'), carouselObj.parent(), 's'),
            };

            carouselElement.owlCarousel({
                items : carouselConfig.items,
                margin : carouselConfig.margin,
                loop : carouselConfig.loop,
                center : carouselConfig.center,
                mouseDrag : carouselConfig.mouseDrag,
                touchDrag : carouselConfig.touchDrag,
                pullDrag : carouselConfig.pullDrag,
                freeDrag : carouselConfig.freeDrag,
                stagePadding : carouselConfig.stagePadding,
                navText : [carouselConfig.navTextLeft, carouselConfig.navTextRight],
                merge : carouselConfig.merge,
                mergeFit : carouselConfig.mergeFit,
                autoWidth : carouselConfig.autoWidth,
                startPosition : carouselConfig.startPosition,
                URLhashListener : carouselConfig.URLhashListener,
                nav : carouselConfig.nav,
                rewind : carouselConfig.rewind,
                slideBy : carouselConfig.slideBy,
                slideTransition : carouselConfig.slideTransition,
                dots : carouselConfig.dots,
                lazyLoad : carouselConfig.lazyLoad,
                lazyLoadEager : carouselConfig.lazyLoadEager,
                autoplay : carouselConfig.autoplay,
                autoplayTimeout : carouselConfig.autoplayTimeout,
                autoplayHoverPause : carouselConfig.autoplayHoverPause,
                smartSpeed : carouselConfig.smartSpeed,
                autoplaySpeed : carouselConfig.autoplaySpeed,
                video : carouselConfig.video,
                animateOut : carouselConfig.animateOut,
                animateIn : carouselConfig.animateIn,
                responsive : carouselConfig.responsive,
                responsiveBaseElement : carouselConfig.responsiveBaseElement
            });

        }

	}


    /*----------  FORM FUNCTIONS  ----------*/
    ckav.global_validation = {
		form: '',
		rules: {
			email: { required: true, email: true },
			name: { required: true },
			message: { required: true },
			phone: { required: true, number: true },
			date: { required: true, date: true },
			datetime: { required: true, date: true },
			people: { required: true, number: true }
		},
		msgpos: 'normal',
		msg: {
			email: { email: "Please, enter a valid email" }
		},
		subscribe_successMsg: "You are in list. We will inform you as soon as we finish.",
		form_successMsg: "Thank you for contact us. We will contact you as soon as possible.",

		successMsg: "",
		errorMsg: "Oops! Looks like something went wrong. Please try again later."
	}

    ckav.formVaidate = function (obj) {
		'use strict';
		var msgpos = $(obj.form).attr('data-msgpos') ? $(obj.form).attr('data-msgpos') : 'normal';
		if (msgpos == 'append') {
			$(obj.form).validate({
				onfocusout: false,
				onkeyup: false,
				rules: obj.rules,
				messages: obj.msg,
				highlight: false,
				errorPlacement: function (error, element) {
					if (msgpos == 'append') {
						error.appendTo(element.closest("form").find('.msg-wrp'));
					};
				},
				success: function (element) {
					element.remove();
				}
			});
		} else {
			$(obj.form).validate({
				onfocusout: false,
				onkeyup: false,
				rules: obj.rules,
				messages: obj.msg,
				highlight: false,
				success: function (element) {
					element.remove();
				}
			});
		};
    }
    
    ckav.resetForm = function (form) {
		'use strict';
		$(form).find('input[type="text"], input[type="email"], textarea').val(null);
	}

	ckav.contactForm = function ($form, formData, validate_data) {
		'use strict';

		if ($form.find('label.error').length > 0) { $form.find('label.error').hide(); }

		var $btn = $form.find(".btn").button('loading');
		var timer = 4000;

		if ($form.valid()) {
			$.ajax({
				url: $form.attr('action'),
				type: 'POST',
				data: formData,
				success: function (data) {
					if (data.status == 'error') {
						
						// EMAIL SUBSCRIPTION ERROR MESSAGE
						swal("Error!", data.type, "error");
						$btn.button('reset');
						ckav.resetForm($form);
					} 
					else {
						swal({
							type: "success",
							title: "Success!",
							text: validate_data.successMsg,
							timer: timer
						})
						.then(function(argument){
							if ($form.attr('data-success-redirect') === 'y') {
								window.location = ckav.config.success_url;
							}
						});
						$btn.button('reset');
						$.magnificPopup.close();
						ckav.resetForm($form);
					};
				},
				error: function () {
					swal("Error!", validate_data.errorMsg, "error");
					$btn.button('reset');
					$.magnificPopup.close();
					setTimeout(function () { swal.close(); }, timer);
				}
			});
		} else {
			$form.find("label.error").delay(timer).fadeOut('400', function () {
				$(this).remove();
			});
			$btn.button('reset');
		};
	}

	ckav.formWidget = function (obj) {
		'use strict';

		var config = {
			popup_selector: $(obj).attr('data-popup') ? '.' + $(obj).attr('data-popup') : false,
			form_type: $(obj).attr('data-formtype') ? $(obj).attr('data-formtype') : 'normal',
			form_selector: obj
		}

		var $form = $(config.form_selector);

		// VALIDATION RULES
		ckav.global_validation.form = config.form_selector;
		var validate_data = ckav.global_validation;

		// Pop up form
		if (config.popup_selector) {
			$(config.popup_selector).each(function (index, el) {
				$(this).magnificPopup({
					type: 'inline',
					preloader: false
				});
			});
		};

		// DATE AND TIME PICKER OPTIONS
		if ($form.find(".date-pick").length > 0 || $form.find(".datetime-pick").length > 0) {
			var date_script_arr = [
				"lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"
			];

			ckav.getMultiScripts(date_script_arr, '').done(function () {
				// DATE PICKER
				if ($form.find(".date-pick").length > 0) {
					$form.find(".date-pick").each(function (index, el) {
						$(this).datetimepicker({
							autoclose: true,
							startView: 2,
							minView: 2
						});
					});
				};

				// DATE TIME PICKER
				if ($form.find(".datetime-pick").length > 0) {
					$form.find(".datetime-pick").each(function (index, el) {
						$(this).datetimepicker({
							autoclose: true
						});
					});
				};
			});
		}
		

		// FORM VALIDATION
		ckav.formVaidate(validate_data);

		// FORM
		$form.find('button').off('click').on('click', function (e) {
			e.preventDefault();
			if (config.form_type == "newsletter") {
				ckav.global_validation.successMsg = ckav.global_validation.subscribe_successMsg;
			} else {
				ckav.global_validation.successMsg = ckav.global_validation.form_successMsg;
			};
			ckav.contactForm($form, $form.serializeObject(), validate_data);
			return false;
		});
	}

	$.fn.serializeObject = function () {
		'use strict';

		var o = {};
		var a = this.serializeArray();
		$.each(a, function () {

			// Field labels
			var field_label = $('[name=' + this.name + ']').attr('data-label') ? $('[name=' + this.name + ']').attr('data-label') : this.name;

			// Field values
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push({ val: this.value, label: field_label } || '');
			} else {
				//o[this.name] = this.value || '';
				o[this.name] = { val: this.value, label: field_label } || '';
			}
		});
		return o;
	};
	
	/*----------  IMAGE POPUP  ----------*/
	ckav.popupImageFunction = function(element) {
		
		// VARIABLE
		var val_delegate = ".zoom-img",
		val_type = "image",
		val_fixedContentPos = true,
		val_mainClass = "mfp-zoom-in mfp-bg",
		val_removalDelay = 500,
		val_duration = 400,
		val_imageVerticalFit = false,
		val_galleryEnabled = true,
		val_animClass1 = "val_animClass1",
		val_animClass2 = "mfp-figure mfp-with-anim";

		element.magnificPopup({
			delegate: val_delegate,
			type: val_type,
			fixedContentPos: val_fixedContentPos,
			mainClass: val_mainClass,
			removalDelay: val_removalDelay,
			duration: val_duration,
			image: {
				verticalFit: val_imageVerticalFit,
			},
			gallery: {
				enabled: val_galleryEnabled
			},
			callbacks: {
				beforeOpen: function() {
				   this.st.image.markup = this.st.image.markup.replace(val_animClass1, val_animClass2);
				}
			},
		});
	}

	/*----------  ANIMATION OUT  ----------*/
	ckav.animationOut = function(element) {

		var newO = $(element+" .animated");

		for (var i = 0; i < newO.length; i++) {
			var animateobj = $(newO[i]), 
				animateOut = animateobj.attr('data-anim-out'),
				animateIn = animateobj.attr('data-anim-in');

			if (animateOut || animateIn) {
				if (animateOut){
					var animatearrout = animateOut.indexOf('|') > -1 ? animateOut.split('|') : animateOut,
					animateclassout = typeof animatearrout == 'object' ? animatearrout[0] : animatearrout,
					animatedelayout = typeof animatearrout == 'object' ? animatearrout[1] : 0;
				}
				if (animateIn){
					var	animatearrin = animateIn.indexOf('|') > -1 ? animateIn.split('|') : animateIn,
					animateclassin = typeof animatearrin == 'object' ? animatearrin[0] : animatearrin,
					animatedelayin = typeof animatearrin == 'object' ? animatearrin[1] : 0;
				}

				
				animateobj.css({
					'-webkit-animation-delay' : animatedelayout+'s',
					'animation-delay' : animatedelayout+'s'
				});
				
				animateobj.removeClass(animateclassout).removeClass(animateclassin).addClass(animateclassout);
			}

		}
	}

	/*----------  ANIMATION IN  ----------*/
	ckav.animationIn = function(element) {

		var newO = $(element+" .animated");

		for (var i = 0; i < newO.length; i++) {
			var animateobj = $(newO[i]), 
				animateOut = animateobj.attr('data-anim-out'),
				animateIn = animateobj.attr('data-anim-in');
			
			if (animateOut || animateIn) {
				if(animateOut){
					var animatearrout = animateOut.indexOf('|') > -1 ? animateOut.split('|') : animateOut,
					animateclassout = typeof animatearrout == 'object' ? animatearrout[0] : animatearrout,
					animatedelayout = typeof animatearrout == 'object' ? animatearrout[1] : 0;	
				}

				if(animateIn){
					var	animatearrin = animateIn.indexOf('|') > -1 ? animateIn.split('|') : animateIn,
					animateclassin = typeof animatearrin == 'object' ? animatearrin[0] : animatearrin,
					animatedelayin = typeof animatearrin == 'object' ? animatearrin[1] : 0;	
				}

				animateobj.css({
					'-webkit-animation-delay' : animatedelayin+'s',
					'animation-delay' : animatedelayin+'s'
				});
				
				animateobj.removeClass(animateclassin).removeClass(animateclassout).addClass(animateclassin);
			}

		}
	}	
    