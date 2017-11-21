'use strict';

(function(){
$(function(){




	// FANCYBOX
	if( $("[data-fancybox='gallery']").length != 0 )
		$("[data-fancybox='gallery']").fancybox({
			afterShow : function( instance, current ) {
			},
			animationEffect : "fade",
			transitionEffect: "zoom-in-out"
		});

	//WOW
	new WOW({
		offset: 30
	}).init();


	// SKROLLR
	if( !isMobile ){

		var skr = skrollr.init({
			smoothScrolling: false,
			forceHeight: false,
			mobileDeceleration: 0.004
		});
		setTimeout( function(){skr.refresh()}, 10);
	}

	//Owl.Carousel
	if( $(".index-carousel").length != 0 )
	$(".index-carousel").owlCarousel({
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    //autoWidth: true,
	    //rewind: true,
	    mergeFit: true,
	    center: true,
	    loop: true,
	    items:1,
	    //margin:30,
	    //mouseDrag: false,
	    autoplay: true,
	    autoplayTimeout: 6000,
	    smartSpeed:450
	});

  // Flikity Carousel
  	var arrowStyle = { 
		  x0: 10,
		  x1: 60, y1: 50,
		  x2: 70, y2: 40,
		  x3: 30
		}
  // PARTNERS
	var carouselPartners = $('.carousel-partners .carousel-content').flickity({
		autoPlay: 2000,
		arrowShape: arrowStyle,
		//imagesLoaded: true,
		//prevNextButtons: false,
		wrapAround: true,
		adaptiveHeight: true,
		//selectedAttraction: 0.2,
		//friction: 0.2,
		//rightToLeft: true,
		pageDots: false,
		//contain: true,
		//percentPosition: true,
		cellAlign: 'center'
	});



	//FORM
	(function() {

		if (!String.prototype.trim) {
			(function() {
				// Make sure we trim BOM and NBSP
				var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
				String.prototype.trim = function() {
					return this.replace(rtrim, '');
				};
			})();
		}

		[].slice.call( document.querySelectorAll( '.input__field' ) ).forEach( function( inputEl ) {

			if( inputEl.value.trim() !== '' ) {
				classie.add( inputEl.parentNode, 'input--filled' );
			}

			// events:
			inputEl.addEventListener( 'focus', onInputFocus );
			inputEl.addEventListener( 'blur', onInputBlur );
		} );

		function onInputFocus( ev ) {
			classie.add( ev.target.parentNode, 'input--filled' );
		}

		function onInputBlur( ev ) {
			if( ev.target.value.trim() === '' ) {
				classie.remove( ev.target.parentNode, 'input--filled' );
			}
		}
	})();











	//RESIZE
	$( window ).on("resize", function(e){});

	//SCROLL
	var header_status = false;
	$( window ).on("scroll", function(e){
		if($(window).scrollTop() > 300 && header_status == false){
			header_status = true; 
		}else if($(window).scrollTop() < 300 && header_status == true){
			header_status = false;
		}
	});





	var images = 						 		document.images,
			imagesTotalCount = 			images.length,
			imagesLoadedCount = 		0,
			preloadPercent = 		 $(".percent");

	for ( var i = 0; i < imagesTotalCount ; i++ ) {
		var image_clone = new Image();
				image_clone.onload = 		image_loaded;
				image_clone.onerror = 	image_loaded;
				image_clone.src = 			images[i].src;

	}

	function image_loaded (){
		imagesLoadedCount++;

		var per = ( ( 100 / imagesTotalCount ) * imagesLoadedCount ) << 0 ;
		var ser = ( ( 400 * Math.PI / imagesTotalCount ) * imagesLoadedCount ) << 0 ;

		setTimeout( function(){
			$(preloadPercent).text(  per +  "%"); 
		}, 220)

		$(".logo-circle-1").eq(0).css("stroke-dasharray", ser).css("stroke-width", 3);

		if ( imagesLoadedCount >= imagesTotalCount )

			setTimeout( function (){
				$(".preloader").slideToggle();
				$( "body" ).css("overflow-y", "auto");
			}, 600)

	}






















          
          var star = $(".dust-container circle");

          function fnRectang(){

            var rectMorph = new TimelineMax({
              repeat: -1,
              yoyo: true
            });
            rectMorph
            .to( star, 4, {
              attr: {
              	r: 1,
                cx: "55%",
								cy: "60%"
              }
            })
            .to( star, 3, {
              attr: {
              	r: 1,
                cx: "42%",
								cy: "65%"
              }
            })
            .to( star, 4, {
              attr: {
              	r: 1,
                cx: "35%",
								cy: "45%"
              }
            })


          }
          //fnRectang();




          function fnRotation(){
            TweenMax.to( star,  1, {
              rotation: 360,
              transformOrigin: "center center",
              repeat: 1, 
              ease: Back.easeOut
            });
          }









//KONVA
    var width = window.innerWidth;
    var height = window.innerHeight;
    
    var stage = new Konva.Stage({
      container: 'dust-content',
      width: width,
      height: height
    });

    var layer = new Konva.Layer();

		var circle = new Konva.Circle({
		      x: 300,
		      y: 130,
		      radius: 10,
		      fill: 'white',
		     // stroke: 'black',
		      strokeWidth: 4
		});

    //layer.add(circle);
    //stage.add(layer);



      var tl = new TimelineMax({
        repeat: -1,
        yoyo: true
      });

       window.olo = function (){
       	xa = tl;
  			tl
					.to(circle, 2, {
            konva: {
              x: getRandomInt ( 300, 500),
              y: getRandomInt( 300, 200)
            },
            ease: Power4.easeOut
        	})
        	.to(circle, 2, {
              konva: {
              x: getRandomInt ( 300, 500),
              y: getRandomInt( 300, 200)
              }
          }).to(circle, 2, {
              konva: {
              x: getRandomInt ( 300, 500),
              y: getRandomInt( 300, 200)
              }
            });

				}
				olo();


	});
}) (jQuery);

var xa;
	
/*
    //CANVAS
  window.olo = function(){

    var canvas = document.getElementsByClassName("dust-container")[1];
    var ctx = canvas.getContext("2d")

    var x = canvas.width / 2,
    		y = canvas.height / 2,
    		r = 1,
    		a1 = 0 * Math.PI,
    		a2 = 2 * Math.PI, 
    		c = false;

    ctx.beginPath();
    ctx.arc( x, y, r, a1, a2, c);
    ctx.lineWidth = 10;
    //ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

    TweenLite.to(canvas, 1.5, {
    	css:{left:'100px', top:'200px'},
    	yoyo: true,
    	repeat: -1

    })

    console.log( ctx );
   }
  



*/

var isWebkit = /Webkit/i.test(navigator.userAgent),
		isChrome = /Chrome/i.test(navigator.userAgent),
		isMobile = !!("ontouchstart" in window),
		isAndroid = /Android/i.test(navigator.userAgent);



// COMMON FUNCTION



function checkView( width ){
	return ($( document ).width() > width);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function scrolledDiv(el) {
	try{
	  var docViewTop = $(window).scrollTop(),
		docViewBottom = docViewTop + $(window).height(),
		elTop = $(el).offset().top,
		elBottom = elTop + $(el).height()/1.8;
	}catch(err){console.error();}

  	return ((elBottom <= docViewBottom) && (elTop >= docViewTop));
}