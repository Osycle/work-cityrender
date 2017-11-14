'use strict';

(function(){
$(function(){



	loadedInit();


	//WOW
	new WOW({
		offset: 200
	}).init();


	// AOS
	AOS.init({
	  offset: 0,
	  once: true,
	  duration: 1000,
	  delay: 100
	});
	setTimeout(function(){AOS.refresh()}, 300);
	// SKROLLR
	if( !isMobile )
	skrollr.init({
		smoothScrolling: false,
		mobileDeceleration: 0.004
	});
						 
						

	//menu init
	$(".nav-menu").initMenu({
		"menuToggleBtn": ".menu-toggle",
		"subMenu": ".sub-menu-1",
		"modalMenu": "#menuModal",
		menuHoverIn: function(){}
	});


function phoneDap(){
	if ( checkView(992) )
		return;
	$(".copyright")
		.before( $(".social") )
}

function dropbtn(){
	$(".dropdown-lang .dropbtn").on("click", function(){

		$( $(this)
			.siblings(".dropdown-content") )
			.toggleClass("active");

	});
	$(".dropdown-lang .dropdown-content").on("mouseleave", function(){
		$(this)
		.removeClass("active");
	});
}
dropbtn();



//RESIZE
$( window ).on("resize", function(e){

	// body

});
//SCROLL
var header_status = false;
$( window ).on("scroll", function(e){
	if($(window).scrollTop() > 300 && header_status){
		//$(".header-scroll").addClass("in");
		header_status = true; 
	}else if($(window).scrollTop() < 300 && header_status){
		//$(".header-scroll").removeClass("in");
		header_status = false;
	}

});





	});//$
}) (jQuery);


var isWebkit = /Webkit/i.test(navigator.userAgent),
		isChrome = /Chrome/i.test(navigator.userAgent),
		isMobile = !!("ontouchstart" in window),
		isAndroid = /Android/i.test(navigator.userAgent);


function loadedInit(){

	//SCROLLR
	$("[data-scroll-animated]").map(function(i, el){
		var el = $(el) ;
		var scrollOffset = [];
	 	$( el.attr("data-scroll-animated").split(',') )
	 		.map(function(i, el){
				scrollOffset.push( el.trim() );
			})

		i % 2 == 1 ? 
		el.attr("data-"+scrollOffset[0], "transform: translate3d(-30%, 0%, 0px);")
			.attr("data-"+scrollOffset[1], "transform: translate3d( 0%, 0%, 0px);")
		:
		el.attr("data-"+scrollOffset[0], "transform: translate3d(30%, 0%, 0px);")
			.attr("data-"+scrollOffset[1], "transform: translate3d( 0%, 0%, 0px);")
	})
	//WOW
	$(".animation").map(function(i, el){
		$(el).addClass("fadeInUp")
	})

}


//COMMON FUNTIONS

function sendForm(th){

	this.onsubmit = function(e){ e.preventDefault();}
	var require = $(th).serialize();
	send(require+"&to="+to);

	$(th).find("input").val("");
}

function ajPost(u, d, s, c){
	$.ajax({
		type: 		"POST",
		url: 			u,
		data: 		d,
		success: 	s,
		statusCode: {
			404: function(){alert("Страница не найдена");}
		},
		complete: c
	});
}
 $.fn.fadeToggleBool = function( dura ){
 	var self = $( $(this) ),
 		 bool = self.css("display") == "none";

	self.fadeToggle({

		duration: dura,
		easing: "linear"

	});

	return bool;
 }

function modalShadow( el ){

	if( $(modal_shadow).length == 0 && el.jquery) 
		return;

	if( modal_shadow.fadeToggleBool() ){
		modal_shadow.on("click", function(){
			if(el.length != 0)
				el.trigger("click");
			});
	}else
		modal_shadow.off("click");
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









function Menu( menu, options ){

	var self = this;
	menu = $( menu );

	//ПОЛЯ
	this.menuClass						= menu[0].className;
	this.menuToggleBtn 				= $( $(options.menuToggleBtn) ) ;
	this.menuToggleBtnParent  = $(this.menuToggleBtn).parent();
	this.subMenu 							= $( menu.find(options.subMenu) );
	this.modalMenu  					= $( $(options.modalMenu) );
	this.modalMenuStatus 		 	= false; 

	//МЕТОДЫ
	this.menuToggle					= function(){
		$( this.menuToggleBtn ).trigger("click");
		return this.modalMenuStatus = !this.modalMenuStatus;
	}


	menu.find("[class|='sub']").closest("li").addClass("sub-parent");
	$(".min-navbar").append( menu.clone() ).find( "."+this.menuClass ).addClass("min");

	this.modalMenu.on('show.bs.modal', function (e) {
		if (self.modalMenu.length === 0) return;

		options.modalMenuShow();

	})
	this.modalMenu.on('shown.bs.modal', function (e) {
		if (self.modalMenu.length === 0) return;

		options.modalMenuShown();
		
	})
	this.modalMenu.on('hide.bs.modal', function (e) {
		if (self.modalMenu.length === 0) return;
		options.modalMenuHidden();

	})
	this.modalMenu.on('hidden.bs.modal', function (e) {
		if (self.modalMenu.length === 0) return;
		self.menuToggleBtn.addClass("collapsed");
		options.modalMenuHidden();

	})

	//HOVER MENU
	menu.find("li").hover(
		function(){
			options.menuHoverIn();
	},function(){
			options.menuHoverOut();
	});



	//HOVER SUB-MENU
	this.subMenu.hover(
		function(){
			adposmenu(this);
			options.subHoverIn();
		},
		function(){
			options.subHoverOut();
		});




	this.menuToggleBtn.on("click", function(){
		if(this.modalMenuStatus)
			$(this).addClass("collapsed");
		else
			$(this).removeClass("collapsed");

		options.menuToggle();
	});
	

	//	FUNCITON

	function adposmenu(subMenu){
		//Адаптация положение подменю в зависимости от размера экрана
		var el = $(subMenu).find("li ul");
		if (el.length === 0) return;
		if ( $( window ).width() < el.width() + el.offset().left ) 
			el.addClass("left");
	}
}





window.$.fn.initMenu = function(option){

	var options = $.extend({
		"menuToggleBtn"					: false, 		// Кнопка бара
		"subMenu"								: false, 		// Класс подменю
		"modalMenu"							: false, 		// Модальное меню

		"menuToggle"						: Function, 	// Переключение
		"menuHoverIn"						: Function,
		"menuHoverOut"					: Function,
		"subHoverIn"						: Function,
		"subHoverOut"						: Function,
		"modalMenuShow"					: Function, 	// Открытие меню
		"modalMenuShown"				: Function,		// Меню раскрыт
		"modalMenuHide"					: Function, 	// Раскрытие Меню
		"modalMenuHidden"				: Function 		// Меню скрыт


	}, option );
	var menu = new Menu(this, options);

	return menu;

}







function checkView( width ){
	return ($( document ).width() > width);
}

