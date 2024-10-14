document.addEventListener('DOMContentLoaded', function() {
    var popupLinks = document.querySelectorAll('.popup-link');
    var popupContainer = document.querySelector('.popup-container');
    var popupTitle = document.getElementById('popup-title');
    var popupTitle = document.getElementById('popup-subtitle');
    var popupText = document.getElementById('popup-text');
    var closeBtn = document.querySelector('.close-btn');

    popupLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var title = link.getAttribute('data-title');
            var subtitle = link.getAttribute('data-subtitle');
            var text = link.getAttribute('data-text');
            document.getElementById('popup-title').textContent = title;
            document.getElementById('popup-subtitle').textContent = subtitle;
            document.getElementById('popup-text').textContent = text;
            popupContainer.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function() {
        popupContainer.style.display = 'none';
        // Mostrar la sección #tm-section-10 al cerrar el popup
        $("#tm-section-10").fadeIn(1000);
        // Ocultar las demás secciones si es necesario
        $(".tm-section").not("#tm-section-10").hide();
        // Desplazar la página hacia la #tm-section-10
        sessionStorage.setItem("currentPageID","#tm-section-10");
        // sessionStorage.getItem("currentPageID") = "#tm-section-10";
        console.log(sessionStorage.getItem("currentPageID")+'<<<<<<<<<<<<<<<<');
        $("html, body").animate({
            scrollTop: $("#tm-section-10").offset().top
        }, 1000);
    });

    popupContainer.addEventListener('click', function(event) {
        // Evitar que el clic en el popup se propague al contenedor
        event.stopPropagation();
    });
});