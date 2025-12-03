jQuery(document).ready(function ($) {
  // fixedHeaderOnScroll();
  $('#toggle').click(function () {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
    $('html').toggleClass('hidden');
    // if ($('header').hasClass('fixed-header')) {
    //   $('header').toggleClass('overlay-header');
    // }
  });


  // Closes overlay menu after clicking on the menu link
  $('#site-navigation3 ul li a').on("click", function (e) {
    $('#toggle').click();
  });

  // AOS.init({
  //   startEvent: 'DOMContentLoaded',
  //   duration: 1000,
  //   easing: 'ease-in-quad',
  //   disable: 'mobile',
  //   once: true
  // });

  // AOS.refresh();

  //     AOS.init({
  //   startEvent: 'DOMContentLoaded',
  //   duration: 800,
  //   easing: 'ease-in-quad',
  //   disable: 'mobile',
  //   once: true
  // });

  // AOS.refresh();

  // window.addEventListener('pageshow', function () {
  //   setTimeout(() => {
  //     window.scrollBy(0, 1); // Nudge scroll to trigger observers
  //     window.scrollBy(0, -1);
  //     AOS.refreshHard();
  //   }, 50);
  // });

  // $(window).one('scroll', function() {
  //   AOS.refresh();
  // });

  // if ('scrollRestoration' in history) {
  //   history.scrollRestoration = 'manual';
  // }


  // //*** Smooth Scroll ***
  window.addEventListener('load', function () {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // buffer for fonts/images
      }
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, null, targetId);
      }
    });
  });


  //*** Fixed header ***
  // function fixedHeaderOnScroll(){
  //   // var heroHeight = window.innerHeight; //use me if want to display fixed header according to innerHeight.
  //   // if ($(this).scrollTop() >= heroHeight) {// 
  //   if ($(this).scrollTop() >= 0) {        // If page is scrolled 
  //       $('header').addClass('fixed-header');    // Fade in the arrow
  //   } else {
  //       $('header').removeClass('fixed-header');   // Else fade out the arrow
  //   }
  // }

  /************************************************
  uncomment follwoing code if window.innerheight is
  included in fixedHeaderOnScroll function.  
  *************************************************/

  // $(window).on('load scroll resize', function () {
  //   fixedHeaderOnScroll();
  // });

  // $(window).on('load', function () {
  //   fixedHeaderOnScroll();
  // });

  // $(window).scroll(function () {
  //   fixedHeaderOnScroll();
  // });


  // $(window).resize(function() {
  //   fixedHeaderOnScroll();
  // });


  //*** Scroll to Top *** use with less *** use with html ***
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 600) {        // If page is scrolled more than 50px
      $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
      $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
  });

  $('#return-to-top').click(function () {      // When arrow is clicked
    $('body,html').animate({
      scrollTop: 0                       // Scroll to top of body
    }, 500);
  });//End Scroll to Top



  //*** Flexslider ***
  // var $flexslider = $('.flex-slider');
  // $flexslider.flexslider({
  //   smoothHeight: false,
  //   slideshow: true,
  //   arrows: false,
  //   dots: true,
  //   controlNav: true,
  //   directionNav: true,
  //   slideshowSpeed: 5000,
  //   useCSS: false /* Chrome fix*/
  // });// End Flexslider



  //Slick SLider
  // $('.slider').slick({
  //   dots: false,
  //   centerMode: true,
  //   infinite: true,
  //   arrows: true,
  //   slidesToShow: 4.67,
  //   responsive: [
  //     {
  //       breakpoint: 1500,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         infinite: true,
  //       }
  //     },
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         infinite: true,
  //       }
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2
  //       }
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1
  //       }
  //     }
  //     // You can unslick at a given breakpoint now by adding:
  //     // settings: "unslick"
  //     // instead of a settings object
  //   ]
  // });


});
