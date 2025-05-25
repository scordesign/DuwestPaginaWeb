function mostrarPopup() {
    document.getElementById("popup").style.display = "block";
}

function cerrarPopup() {
    document.getElementById("popup").style.display = "none";
}

var sidebarVisible = false;

const url = new URL(location);

// sessionStorage.setItem("currentPageID",url.hash == ""?sessionStorage.getItem("currentPageID") == null ?  "#tm-section-1":sessionStorage.getItem("currentPageID")  == "undefined"?"#tm-section-1":sessionStorage.getItem("currentPageID") : url.hash );
sessionStorage.setItem("currentPageID", url.hash === "" ? "#tm-section-1" : url.hash);

//		var sessionStorage.getItem("currentPageID") = "#tm-section-1";


function duplicateItems() {
    const track = document.querySelector('.carouselProduct-track');
    const items = Array.from(document.querySelectorAll('.carouselProduct-item'));

    let currentIndex = 0;

    function moveCarousel() {
        // Mover el track hacia la izquierda
        track.style.transform = `translateX(-${currentIndex * 20}%)`;

        // Esperar hasta que la transición termine
        setTimeout(() => {
            // Si la primera imagen está fuera de la vista, moverla al final
            if (currentIndex === items.length - 1) {
                track.appendChild(track.firstElementChild);
                track.style.transition = 'none';
                track.style.transform = 'translateX(0)';
                currentIndex = 0;

                // Forzar el reflow y restaurar la transición
                void track.offsetWidth;
                track.style.transition = 'transform 0.5s linear';
            } else {
                currentIndex++;
            }
        }, 500); // La duración de la transición debe coincidir con el tiempo de espera
    }

    // Ejecutar el movimiento de forma periódica
    setInterval(moveCarousel, 2000); // Cada 2 segundos
}

$(function () {
    function throttle(func, delay) {
        let lastCall = 0;
        return function (...args) {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return func(...args);
        };
    }



    //   $("#tm-section-13").on("scroll", debounce(pagination, 300)); // 300ms de espera
    //   $("#tm-section-14").on("scroll", debounce(pagination, 300)); // 300ms de espera



    $("#tm-section-12").on('scroll', throttle(pagination, 200));
    $("#tm-section-13").on('scroll', throttle(pagination, 400));
    $("#tm-section-19").on('scroll', throttle(pagination, 400));
    $("#products2-14").on('scroll', enqueueRequest(() => pagination14));
    $("#products2-18").on('scroll', enqueueRequest(() => pagination14));
    $("#products2-15").on('scroll', throttle(pagination14, 200));
    $("#tm-section-16").on('scroll', throttle(paginationNews, 200));




    // Reemplaza el estado actual del historial con la URL actual


    // window.onpopstate = function(event)  {
    //    history.go(0);
    // };


    // Intercepta el evento de retroceso
    window.onpopstate = function (event) {
        history.go(0);
    };

    // 		// Cache sections for performance
    // 	var sections = $(".tm-section");

    // 	// Function to handle section switching with transition
    // 	function switchSection(sectionId, direction) {
    // 	  var currentSection = $(sessionStorage.getItem("currentPageID"));
    // 	  var transitionClass;

    // 	  // Determine transition class based on direction (up or down)
    // 	  if (direction > 0) {
    // 		transitionClass = "slide-right"; // Right to left for ascending sections
    // 	  } else {
    // 		transitionClass = "slide-left"; // Left to right for descending sections
    // 	  }

    // 	  // Calculate direction modifier based on section numbering
    // 	  var directionModifier = sectionId.split("-")[1] - sessionStorage.getItem("currentPageID").split("-")[1];

    // 	  // Add transition class to current section
    // 	  currentSection.addClass(transitionClass);

    // 	  // Hide current section after transition
    // 	  currentSection.on("transitionend", function() {
    // 		currentSection.removeClass(transitionClass).hide();
    // 		$(this).off("transitionend"); // Remove event listener after transition
    // 	  });

    // 	  // Show new section
    // 	  $(sectionId).addClass(transitionClass).show();

    // 	  // Update current page ID
    // 	  sessionStorage.getItem("currentPageID") = sectionId;

    // 	  // Remove transition class from new section after transition
    // 	  $(sectionId).on("transitionend", function() {
    // 		$(this).removeClass(transitionClass);
    // 		$(this).off("transitionend"); // Remove event listener after transition
    // 	  });
    // 	}

    // 	// Set up click event listener for navigation links
    // 	$(".tm-main-nav a").click(function(e) {
    // 	  e.preventDefault();

    // 	  var clickedSection = $(this).data("page");
    // 	  var sectionNumber = clickedSection.split("-")[1];
    // 	  var currentNumber = sessionStorage.getItem("currentPageID").split("-")[1];

    // 	  // Calculate direction based on section numbering difference
    // 	  var direction = sectionNumber - currentNumber;

    // 	  // Call switchSection function with clicked section and direction
    // 	  switchSection(clickedSection, direction);
    // 	});

    // 	// Initial setup (assuming "#tm-section-1" is the starting page)
    // 	var sessionStorage.getItem("currentPageID") = "#tm-section-1";
    // 	$(sessionStorage.getItem("currentPageID")).show();
    //   });

    $('.popup-link').click(function () {
        $("footer").addClass("hide");
    });

    $('.close-btn').click(function () {
        $("footer").removeClass("hide");
    });

    $("body").on("click", function (event) {
        var dropDownBar = $("#dropDownBar");

        if (!(dropDownBar.hasClass("hide")) && !($(event.target).closest('#TmMainNav').length)) {
            // Si está visible, ocultarlo gradualmente
            dropDownBar.animate({
                height: "toggle"
            }, 500, function () {
                // Agregar la clase hide después de la animación
                dropDownBar.addClass("hide");
            });
        }
    });

    $("#TmMainNav").on("click", function () {
        var dropDownBar = $("#dropDownBar");

        if (dropDownBar.hasClass("hide")) {
            // Si está oculto, mostrarlo gradualmente
            dropDownBar.removeClass("hide").animate({
                height: "toggle"
            }, 500); // Puedes ajustar la duración de la animación según tus preferencias

        } else {
            // Si está visible, ocultarlo gradualmente
            dropDownBar.animate({
                height: "toggle"
            }, 500, function () {
                // Agregar la clase hide después de la animación
                dropDownBar.addClass("hide");
            });
        }
    });
    function esMovil() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function ajustarNav() {
        if (!esMovil()) {
            var posicionTmMainNav = $("#TmMainNav").offset();
            var posicionImgFlag = $("#imgFlag").offset();
            var posicionMenuBars = $("#TmMainNav").offset();
            var posicionImglogo = $("#imglogo").offset();



            var posicionBar = $("#bars-menu").offset();

            $("#tmSideBar").css({
                "width": ((posicionBar.left + ($("#bars-menu").width() * 4)) - posicionImglogo.left) + "px"
            });

            var posicionSideBar = $("#tmSideBar").offset();

            posicionTmMainNav = $("#TmMainNav").offset();
            posicionImgFlag = $("#imgFlag").offset();
            posicionMenuBars = $("#TmMainNav").offset();
            posicionImglogo = $("#imglogo").offset();


            $("#dropDownBar").css({
                "top": (posicionSideBar.top + $("#tmSideBar").height()) + "px",
                "left": (posicionImgFlag.left) + "px",
                "width": (posicionMenuBars.left - posicionImgFlag.left) + "px"
            });


        }
    }

    // Ejecutar la función al cargar la página
    ajustarNav();

    // Agregar un evento resize que llame a la función
    $(window).on('resize', function () {
        ajustarNav();
    });
});

// Setup Carousel
function setupCarousel() {

    // If current page isn't Carousel page, don't do anything.
    if ($('#tm-section-2').css('display') == "none") {
    }
    else {	// If current page is Carousel page, set up the Carousel.

        var slider = $('.tm-img-slider');
        var windowWidth = $(window).width();

        if (slider.hasClass('slick-initialized')) {
            slider.slick('destroy');
        }

        if (windowWidth < 640) {
            slider.slick({
                dots: true,
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1
            });
        }
        else if (windowWidth < 992) {
            slider.slick({
                dots: true,
                infinite: false,
                slidesToShow: 2,
                slidesToScroll: 1
            });
        }
        else {
            // Slick carousel
            slider.slick({
                dots: true,
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 2
            });
        }

        // Init Magnific Popup
        $('.tm-img-slider').magnificPopup({
            delegate: 'a', // child items selector, by clicking on it popup will open
            type: 'image',
            gallery: { enabled: true }
            // other options
        });
    }
}

// Setup Nav
function setupNav() {
    // Add Event Listener to each Nav item
    $(".tm-main-nav a").click(function (e) {
        e.preventDefault();

        var currentNavItem = $(this);
        changePage(currentNavItem);

        setupCarousel();
        setupFooter();

        // Hide the nav on mobile
        $("#tmSideBar").removeClass("show");
    });
}

function SetInfoSection(section) {


    switch (section) {
        case "#tm-section-19":
            chargeProducts(19);
            break;
        case "#tm-section-12":
            chargeProducts(12);
            break;
        case "#tm-section-13":
            chargeProducts(13);
            break;
        case "#tm-section-14":
            chargeProductsNoF(14);
            break;
        case "#tm-section-18":
            chargeProductsNoF(18);
            break;
        case "#tm-section-16":
            chargeNews();
            break;
        case "#tm-section-17":
            chargeUsers();
            chargeFilters();
            chargeAmounts();
            break;
        default:
            break;
    }

    $("footer").removeClass("hide");
    switch (section) {
        case '#tm-section-19':
        case '#tm-section-18':
            $("footer-link").hide();
        case '#tm-section-8':
        case '#tm-section-2':
        case '#tm-section-10':
        case '#tm-section-3':
        case '#tm-section-11':
        case '#tm-section-12':
        case '#tm-section-13':
        case '#tm-section-14':
        case '#tm-section-15':
        case '#tm-section-16':
        case '#popup-container':
            $("footer").hide();
            break;
        case '#loaderpage':
        case '#loader-wrapper':
            // Hide footer (original functionality)
            $("footer-link").hide();
            break;
        // Hide footer2 specifically for #popup-container
        default:
            // if (sessionStorage.getItem("currentPageID") == "#tm-section-10" && esMovil()) {
            //     $("footer").hide();
            // } else {
            //     $("footer").show();
            // }
            $("footer").show();
    }
}


// Add Event Listener to each Nav item
$("#tmNavLink1").click(function (e) {
    changOthers(e, this);
});

function changOthers(e, element) {
    e.preventDefault();

    var currentNavItem = $(element);
    changePage(currentNavItem);

    setupCarousel();
    setupFooter();

    // Hide the nav on mobile
    $("#tmSideBar").removeClass("show");
}


function changePage(currentNavItem) {
    // Update Nav items
    $(".tm-main-nav a").removeClass("active");
    currentNavItem.addClass("active");


    SetInfoSection(currentNavItem.data().page);
    if (currentNavItem.data("page") != '#popup-container') {
        $(sessionStorage.getItem("currentPageID")).hide();

        // Show current page
        // sessionStorage.getItem("currentPageID") = currentNavItem.data("page");
        sessionStorage.setItem("currentPageID", currentNavItem.data("page"));
        $(sessionStorage.getItem("currentPageID")).fadeIn(1000);
        var newSection = sessionStorage.getItem("currentPageID");



        history.pushState({ page: newSection }, "", newSection);
    }


    // Change background image
    var bgImg = currentNavItem.data("bgImg");
    $.backstretch("img/" + bgImg);
}


// Setup Nav Toggle Button
function setupNavToggle() {

    $("#tmMainNavToggle").on("click", function () {
        $(".sidebar").toggleClass("show");
    });
}

// If there is enough room, stick the footer at the bottom of page content.
// If not, place it after the page content
function setupFooter() {

    var padding = 100;
    var footerPadding = 40;
    var mainContent = $("section" + sessionStorage.getItem("currentPageID"));
    var mainContentHeight = mainContent.outerHeight(true);
    var footer = $(".footer-link");
    var footerHeight = footer.outerHeight(true);
    var totalPageHeight = mainContentHeight + footerHeight + footerPadding + padding;
    var windowHeight = $(window).height();

    /*if(totalPageHeight > windowHeight){
        $(".tm-content").css("margin-bottom", footerHeight + footerPadding + "px");
        footer.css("bottom", footerHeight + "px");  			
    }
    else {
        $(".tm-content").css("margin-bottom", "0");
        footer.css("bottom", "0px");  				
    }  		*/
}

// Everything is loaded including images.
$(window).on("load", function () {



    // Render the page on modern browser only.
    if (renderPage) {
        // Remove loader
        $('body').addClass('loaded');

        // Page transition
        var allPages = $(".tm-section");

        // Handle click of "Continue", which changes to next page
        // The link contains data-nav-link attribute, which holds the nav item ID
        // Nav item ID is then used to access and trigger click on the corresponding nav item
        var linkToAnotherPage = $("a.tm-btn[data-nav-link]");

        if (linkToAnotherPage != null) {

            linkToAnotherPage.on("click", function () {
                var navItemToHighlight = linkToAnotherPage.data("navLink");
                $("a" + navItemToHighlight).click();
            });
        }

        SetInfoSection(sessionStorage.getItem("currentPageID"));


        // Hide all pages
        allPages.hide();

        // $("#tm-section-1").fadeIn();

        $(sessionStorage.getItem("currentPageID")).fadeIn();

        // Set up background first page
        var bgImg = $("#tmNavLink1").data("bgImg");

        $.backstretch("img/" + bgImg, { fade: 500 });

        // Setup Carousel, Nav, and Nav Toggle
        setupCarousel();
        setupNav();
        setupNavToggle();
        setupFooter();

        // Resize Carousel upon window resize
        $(window).resize(function () {
            setupCarousel();
            setupFooter();
        });
    }
});


