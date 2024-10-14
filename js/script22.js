document.addEventListener('DOMContentLoaded', function() {
    var popupLinks = document.querySelectorAll('.popup-link1');
    var popupContainer1 = document.querySelector('.popup-container1');
    var popupTitle1 = document.getElementById('popup-title1');
    var popupTitle1 = document.getElementById('popup-subtitle1');
    var popupText1 = document.getElementById('popup-text1');
    var popupImg1 = document.getElementById('popup-img1');
    var closeBtn = document.querySelector('.close-btn1');

    popupLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var title1 = link.getAttribute('data-title1');
            var subtitle1 = link.getAttribute('data-subtitle1');
            var text1 = link.getAttribute('data-text1');
            var img1 = link.getAttribute('data-img1');
            document.getElementById('popup-title1').textContent = title1;
            document.getElementById('popup-subtitle1').textContent = subtitle1;
            document.getElementById('popup-text1').textContent = text1;
            // document.getElementById('popup-img1'). = img1;
            $("#popup-img1").attr("src", img1);
            console.log($("#popup-img1"));
            console.log(img1);

            popupContainer1.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function() {
        popupContainer1.style.display = 'none';
        // Mostrar la sección #tm-section-10 al cerrar el popup
        $("#tm-section-11").fadeIn(1000);
        // Ocultar las demás secciones si es necesario
        $(".tm-section").not("#tm-section-11").hide();
        // Desplazar la página hacia la #tm-section-10
        sessionStorage.setItem("currentPageID","#tm-section-11");

        // sessionStorage.getItem("currentPageID") = "#tm-section-11";
        console.log(sessionStorage.getItem("currentPageID")+'<<<<<<<<<<<<<<<<');
        $("html, body").animate({
            scrollTop: $("#tm-section-11").offset().top
        }, 1000);
    });

    popupContainer1.addEventListener('click', function(event) {
        // Evitar que el clic en el popup se propague al contenedor
        event.stopPropagation();
    });
    
});