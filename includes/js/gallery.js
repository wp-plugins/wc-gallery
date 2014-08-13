/**
 * @author Chris Baldelomar
 * @website http://wordpresscanvas.com/
 */


( function( $ ) {
	"use strict";

	var body = $( 'body' ),
		_window = $( window );

	var calculateGrid = function($container) {
		var columns = parseInt( $container.data('columns') );
		var gutterWidth = $container.data('gutterWidth');
		var containerWidth = $container.width();

		if ( isNaN( gutterWidth ) ) {
			gutterWidth = 5;
		}
		else if ( gutterWidth > 30 || gutterWidth < 0 ) {
			gutterWidth = 5;
		}

		if ( columns > 1 ) {
			if ( containerWidth < 568 ) {
				columns -= 2;
				if ( columns > 4 ) {
					columns = 4;
				}
			}
			/* else if ( containerWidth < 768 ) { 
				columns -= 1;
			} */

			if ( columns < 2 ) {
				columns = 2;
			}
		}

		gutterWidth = parseInt( gutterWidth );

		var allGutters = gutterWidth * ( columns - 1 );
		var contentWidth = containerWidth - allGutters;

		var columnWidth = Math.floor( contentWidth / columns );

		return {columnWidth: columnWidth, gutterWidth: gutterWidth, columns: columns};
	}

	var runMasonry = function( duration, $container) {
		var $postBox = $container.children('.gallery-item');

		var o = calculateGrid($container);

		$postBox.css({'width':o.columnWidth+'px', 'margin-bottom':o.gutterWidth+'px', 'padding':'0'});

		$container.masonry( {
			itemSelector: '.gallery-item',
			columnWidth: o.columnWidth,
			gutter: o.gutterWidth,
			transitionDuration: duration 
		} );
	}


	$(document).ready(function(){
		$('.gallery-masonry').each( function() {
			var $container = $(this);

			imagesLoaded( $container, function() {
				runMasonry(0, $container);

				$container.css('visibility', 'visible');
			});

			$(window).resize(function() {
				runMasonry(0, $container);
			});
		});


		if( jQuery().magnificPopup) {
			$('.gallery-link-file').each( function() {
				$(this).magnificPopup({
					delegate: '.gallery-icon a',
					gallery: {
						enabled: true
					},
					type:'image',
					image: {
						titleSrc: function(item) {
							return $(item.el).parent().next('.gallery-caption').html();
						}
					}
				});
			});
		}

		if( jQuery().wcflexslider) {
			$(window).load(function() {
				$('.wcflexslider-container').each( function() {
					var $this = $(this);
					var $flex = $(this).children('.gallery.wcflexslider');
					var columns = parseInt( $flex.data('columns') );
					var columnsTablet = columns - 1;
					var columnsPhone = columns - 2;
					var gutterWidth = $flex.data('gutterWidth');
					var hideControls = $flex.data('hideControls');
					var showNav = hideControls ? false : true;
					var containerWidth = $this.width();

					gutterWidth = parseInt( gutterWidth );

					if ( $flex.hasClass('wcslider') ) {
						$flex.wcflexslider({
							prevText: "",
							nextText: "",
							smoothHeight: false,
							slideshow: false,
							animation:"fade"
						});
					}
					else if ( $flex.hasClass('wcslider2') ) {
						$flex.wcflexslider({
							prevText: "",
							nextText: "",
							smoothHeight: true,
							slideshow: false,
							animation:"slide"
						});
					}
					else if ( $flex.hasClass('wcsliderauto') ) {
						$flex.wcflexslider({
							prevText: "",
							nextText: "",
							smoothHeight: true,
							slideshow: true,
							animation:"slide"
						});
					}
					else if ( $flex.hasClass('wccarousel') ) {
						$flex.wcflexslider({
							prevText: "",
							nextText: "",
							smoothHeight: false,
							slideshow: false,
							animation: "slide",
							animationLoop: false,
							itemWidth: 270,
							itemMargin: gutterWidth 
						});
					}
					else if ( $flex.hasClass('wcslider3bottomlinks') || $flex.hasClass('wcslider4bottomlinks') ) {
						$flex.wcflexslider({
							prevText: "",
							nextText: "",
							smoothHeight: false,
							slideshow: true,
							animation:"slide"
						});
					}
				});
			});
		}
		if( jQuery().owlCarousel) {
			$('.wcowlcarousel').each( function() {
				var $this = $(this);
				var $owl = $this.children('.owl-carousel');
				var columns = parseInt( $owl.data('columns') );
				var columnsTablet = columns - 1;
				var columnsPhone = columns - 2;
				var gutterWidth = $owl.data('gutterWidth');
				var hideControls = $owl.data('hideControls');
				var showNav = hideControls ? false : true;
				var containerWidth = $this.width();

				gutterWidth = parseInt( gutterWidth );
				if ( 1 > columnsTablet ) {
					columnsTablet = 1;
				}
				if ( 1 > columnsPhone ) {
					columnsPhone = 1;
				}

				if ( $this.hasClass('wcowlautowidth') ) {
					$owl.owlCarousel({
						margin: gutterWidth,
						loop: true,
						dots: false,
						autoWidth: true,
						responsive: {
							0:{
								nav: false,
							},
							569:{
								nav: showNav,
							}
						}
					});
				}
				else if ( $this.hasClass('wcowlcolumns') ) {
					$owl.owlCarousel({
						margin: gutterWidth,
						loop: true,
						dots: false,
						items: columns,
						responsive: {
							0:{
								nav: false
							},
							569:{
								nav: showNav
							}
						}
					});
				}
				else if ( $this.hasClass('wcowlslider') ) {
					$owl.owlCarousel({
						margin: 0,
						loop: true,
						dots: false,
						items: 1,
						autoHeight:true,
						responsive: {
							0:{
								nav: false
							},
							569:{
								nav: showNav
							}
						}
					});
				}
			});

		}
	});
} )( jQuery );
