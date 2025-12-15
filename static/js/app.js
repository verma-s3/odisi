import { smoother } from './gsap.js';

jQuery(document).ready(function ($) {
  fixedHeaderOnScroll();
  $('#toggle').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
    $('html').toggleClass('hidden');
    if ($(this).hasClass('active')) {
      smoother.paused(true);
    } else {
      smoother.paused(false);
    }
  });


  // Closes overlay menu after clicking on the menu link
  $('#site-navigation3 ul li a').on("click", function (e) {
    $('#toggle').click();
  });

  //*** Fixed header ***
  function fixedHeaderOnScroll() {
    const scrollTop = $(window).scrollTop();

    if (scrollTop > 10) {
      $('header').addClass('fixed-header');
    } else {
      $('header').removeClass('fixed-header');
    }
  }

  $(window).on('load scroll resize', fixedHeaderOnScroll);

  /******************************************************/
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
  /******************************************************/
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
  /*******************READ MORE BTN************************/
  $('.read-more-content').hide();
  $('.read-btn').click(function (e) {
    e.preventDefault();
    $('.read-more-content').slideToggle();
    if ($(this).text() == "Read More") {
      $(this).text("Read Less");
    } else {
      $(this).text("Read More");
    }
  });


  /******************************************************/
  //Slick SLider
  const $listslider = $('.list-slider');
  const $insightslider = $('.insight-slider');

  function listSlider($slider) {
    if (!$slider.length) return;

    const winWidth = window.innerWidth;
    const isInitialized = $slider.hasClass('slick-initialized');

    if (winWidth >= 1200) {
      if (isInitialized) {
        $slider.slick('unslick');
      }
    }

    else {
      if (!isInitialized) {
        $slider.slick({
          dots: true,
          centerMode: false,
          infinite: false,
          arrows: false,
          slidesToShow: 4,
          slidesToScroll: 1,
          speed: 600,
          cssEase: 'linear',
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3.67,
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2.67,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1.37,
              }
            }
          ]
        });
      }
    }
  }

  function insightSlider($slider) {
    if (!$slider.length) return;

    const winWidth = window.innerWidth;
    const isInitialized = $slider.hasClass('slick-initialized');

    if (winWidth >= 1024) {
      if (isInitialized) {
        $slider.slick('unslick');
      }
    }

    else {
      if (!isInitialized) {
        $slider.slick({
          dots: true,
          centerMode: false,
          infinite: false,
          arrows: false,
          slidesToShow: 2.67,
          slidesToScroll: 1,
          speed: 600,
          cssEase: 'linear',
          responsive: [
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1.37,
              }
            }
          ]
        });
      }
    }
  }


  listSlider($listslider);
  insightSlider($insightslider);

  $(window).on('resize', function () {
    listSlider($listslider);
    insightSlider($insightslider);
  });

  /******************************************************/

  $('.testi-slider').slick({
    dots: true,
    centerMode: false,
    infinite: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 600,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 2000,
  });
  /******************************************************/
  // Filters for TEAM
  $('.filter').click(function () {
    $('.filter').removeClass('selected');
    $(this).addClass('selected');
  });
  // Filter results .
  if (document.body.classList.contains('page-template-page-about-us')) {

    var teamType = document.querySelectorAll('.filter');
    var activeType = teamType[0].rel;

    $('.filter-results .img-wrapper').hide().filter('[data-src="' + activeType + '"]').show();
    $('.filter').click(function () {
      if ($(this).attr('rel')) {
        $('.filter-results .img-wrapper').hide().filter('[data-src="' + $(this).attr('rel') + '"]').show();
      } else {
        $('.filter-results .img-wrapper').hide().filter('[data-src="' + activeType + '"]').show();
      }
      return false;
    });
    /******************************************************/

    $('.spotlight-teams .filter-results .team-flex').click(function (e) {
      e.preventDefault();
      e.stopPropagation();

      const $overlay = $(this).next('.team-overlay');
      const scrollTop = smoother.scrollTop(); // get virtual scroll position

      // Set top of modal to current virtual scroll so it appears in viewport
      $overlay.css('top', scrollTop + 'px').addClass('open');
      $('html').addClass('hidden');

      // Pause scroll
      smoother.paused(true);
    });

    $('.close').click(function () {
      $('.team-overlay').removeClass('open');
      $('html').removeClass('hidden');
      smoother.paused(false);
    });

    $(document).on('click', '.team-overlay', function (e) {
      const modal = $(this).find('.team-modal');
      if (!modal.is(e.target) && modal.has(e.target).length === 0) {
        $(this).removeClass('open');
        $('html').removeClass('hidden');
        smoother.paused(false);
      }
    });
  }
  /******************************************************/

  /******************************************************/

  const $contactSection = $("#contact");
  const $openBtn = $(".openModal");
  const $formModal = $contactSection.find(".form-modal");
  let originalFormHTML = null;

  if ($formModal.length) {
    originalFormHTML = $formModal.html();
  }

  // OPEN form
  $openBtn.on("click", function (e) {
    e.stopPropagation(); // prevent immediate close
    $contactSection.addClass("form-active");
    $("html").addClass("hidden");
  });

  // CLOSE on outside click
  $contactSection.on("click", function (e) {

    // ignore clicks on button or inside modal
    if (
      $(e.target).closest(".form-modal").length ||
      $(e.target).closest(".openModal").length
    ) {
      return;
    }

    closeFormOverlay();
  });

  // prevent clicks inside modal
  $formModal.on("click", function (e) {
    e.stopPropagation();
  });

  // Gravity Forms confirmation reset
  $(document).on("gform_confirmation_loaded", function () {
    setTimeout(function () {
      if (originalFormHTML) {
        $formModal.html(originalFormHTML);
        closeFormOverlay();
      }
    }, 5000);
  });

  function closeFormOverlay() {
    $contactSection.removeClass("form-active");
    $("html").removeClass("hidden");
  }





  /******************************************************/
  document.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash;

    if (hash === "#contact") {
      const contact = document.querySelector("#contact");
      if (!contact) return;

      const smoother = ScrollSmoother.get();

      // Wait a little for smoother to be ready
      setTimeout(() => {

        smoother.scrollTo(contact, true, "top top");


        setTimeout(() => {
          smoother.resize();           // Recalculates height
          ScrollTrigger.refresh();     // Refreshes triggers and layout
        }, 300);

        history.replaceState(null, null, window.location.pathname);
      }, 300);
    }
  });





});


