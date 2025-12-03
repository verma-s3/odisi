

/**
 * Based on JavaScript by Nicholas C. Zakas
 * http://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
 * https://github.com/Automattic/_s/pull/136/commits/70d210a135e893afdb77f6a1aa1ef074e5ad4db2
 */

( function( $ ) {

	$( window ).bind( 'hashchange', function() {
	
		var element = document.getElementById( location.hash.substring( 1 ) );
	
		if ( element ) {
	
			if ( ! /^(?:a|select|input|button)$/i.test( element.tagName ) ) {
				element.tabIndex = -1;
			}
	
			element.focus();
		}
	
	});
	
	})( jQuery );


/*************************************Old Scripting****************************************/

	// /**
//  * File skip-link-focus-fix.js.
//  *
//  * Helps with accessibility for keyboard only users.
//  *
//  * Learn more: https://git.io/vWdr2
//  */
// ( function() {
// 	var isIe = /(trident|msie)/i.test( navigator.userAgent );

// 	if ( isIe && document.getElementById && window.addEventListener ) {
// 		window.addEventListener( 'hashchange', function() {
// 			var id = location.hash.substring( 1 ),
// 				element;

// 			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
// 				return;
// 			}

// 			element = document.getElementById( id );

// 			if ( element ) {
// 				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
// 					element.tabIndex = -1;
// 				}

// 				element.focus();
// 			}
// 		}, false );
// 	}
// } )();


// third point another code for accessibility
// (function ($) {
//     $(window).on('hashchange', function () {
//         var elementId = location.hash.substring(1);
//         var $element = $('#' + elementId);

//         if ($element.length) {
//             if (!/^(?:a|select|input|button|textarea)$/i.test($element.prop('tagName'))) {
//                 $element.attr('tabindex', '-1');
//             }

//             $element.focus();
//         }
//     });
// })(jQuery);

// in css file:
/* 
:focus {
  outline: 2px solid blue;
}

*/