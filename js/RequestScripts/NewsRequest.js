$(function () {
    $("#searchMenu").keyup(function () {
        $("#news .divNew").remove();
        getNews( $("#searchMenu").val());
    });

});

function searchnews(param) {
    $("#news .divNew").remove();
    getNews( $("#searchMenu"+param).val());
}

function addNew() {
    $("#modalBackground").toggleClass("hide");

    getSession().then(function (session) {
        $('#formModal').html("");
        if (session == "[]" || session == "") {
            session = JSON.parse(session);

            var form = $("<form>").attr("id", "miFormulario");


            form.append($("<i>").attr("font-size", "20vh").attr("class", "fas fa-times-circle").attr("style", "color: #32aa48; font-size:23vh;"));

            form.append($("<label>").text("error: "));
            form.append($("<input>").attr("type", "text").attr("disabled", "disabled").attr("value", "Sesión no iniciada").attr("style", "text-align: center;"));

            // Agregar el formulario al cuerpo del documento
            $("#formModal").append(form);

            return;
        }
        var form = $("<form>").attr("id", "miFormulario");

        form.append($("<label>").text("titulo de la noticia: "));
        form.append($("<input>").attr("type", "text").attr("name", "name").attr("required", "required"));

        form.append($("<label>").text("Descripción de la noticia: "));
        form.append($("<textarea>").attr("name", "description").attr("style", "width: calc(100% - 20px);"));

        form.append($("<label>").text("Imagenes de la noticia: "));
        form.append($("<input>").attr("type", "file").attr("name", "images[]").attr("multiple", "multiple").attr("style", "color:black;"));

        form.append($("<input>").attr("type", "text").attr("name", "action").attr("hidden", "hidden").attr("value", "addNews"));

        form.append($("<button>").attr("type", "submit").text("Registar nueva noticia.").attr("id", "addNews    "));


        // Agregar el formulario al cuerpo del documento
        $("#formModal").append(form);

        // Manejar el envío del formulario
        $("#miFormulario").submit(function (event) {
            event.preventDefault(); // Prevenir el envío del formulario normal
            formData = new FormData(this);
            $('body').toggleClass('loaded');
            // Hacer una llamada AJAX al archivo PHP
            $.ajax({
                url: "aplication/RequestController.php", // Archivo PHP que contiene la función
                type: "POST", // Método de solicitud
                data: formData,
                contentType: false,
                processData: false,// Datos a enviar (datos del formulario serializados)
                success: function (response) {
                    // Manejar la respuesta
                    response = (JSON.parse(response));
                    $("#alerta").removeClass("bg-success");
                    $("#alerta").removeClass("bg-danger");
                    $("#alerta").removeClass("bg-warning");
                    $("#alerta").html(response.message);
                    if (response.status == 200) {
                        $("#alerta").addClass("bg-success");
                    } else if (response.status == 500) {
                        $("#alerta").addClass("bg-danger");
                    } else {
                        $("#alerta").addClass("bg-warning");
                    }
                    $('body').toggleClass('loaded');

                    $("#modalBackground").toggleClass("hide");
                    chargeNews(sessionStorage.getItem("currentPageID").replace("#tm-section-", "").trim())

                    // Mostrar la alerta
                    $("#alerta").fadeIn();


                    // Desvanecer la alerta después de 3 segundos
                    setTimeout(function () {
                        $("#alerta").fadeOut();
                    }, 3000);

                },
                error: function (xhr, status, error) {
                    // Manejar errores
                    console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
                }
            });
        });
    }).catch(function (error) {
        // Ha ocurrido un error al obtener la sesión
        console.log("Error al obtener la sesión:", error);
    });
}


function paginationNews() {
    var pageCurrent = localStorage.getItem("PageRegs");
    var total = localStorage.getItem("TotalRegs");
    var el = $("#newsFather");

    if (((el.offset().top + el.height() - 200) <= $(window).height()) && (pageCurrent * 10) < total) {
        localStorage.setItem("PageRegs", (pageCurrent.valueOf() - 1) + 2);
        getNews( ($("#searchMenu").val() == "" ? undefined : $("#searchMenu").val()), (pageCurrent.valueOf() - 1) + 2)
        return;
    }
}

function chargeNews() {
    $("#news .divNew").remove();
    getNews();
}


function getNews( search, page) {
    // section = section.substring(section.length-2,section.length);
    $.ajax({
        url: "aplication/RequestController.php?action=getNews" + (typeof search == "undefined" ? "" : "&search=" + search) + (typeof page == "undefined" ? "" : "&page=" + page), // Archivo PHP que contiene la función
        type: "GET", // Método de solicitud
        success: function (response) {
            response = (JSON.parse(response));

            localStorage.setItem("TotalRegs", response.Total);
            localStorage.setItem("PageRegs", response.Page);
            var i =1;
            response.data.forEach(element => {
                var background =  (i % 3) == 1 ? "backgreen"  :(i % 3) == 0 ? "backgreenGray" : "backgreenLess";
                var imageClass =  (i % 2) == 1 ? "image1"  : "image2";

                var divFather = $("<div>").attr("class", "divNew");

                var divOne = $("<div>").attr("class", "divNewImage");

                if (!isMobileDevice()) {
                    // Cambiar la fuente de la imagen para pantallas más pequeñas
                    divOne.addClass(imageClass);
                } 

                

                var divTwo = $("<div>").attr("class", "divNewDesc fuente-century-gothic").attr("onclick", "getNew(" + element.id + ")").addClass(background);

                
                if (isMobileDevice()) {
                    // Cambiar la fuente de la imagen para pantallas más pequeñas
                    divTwo.attr("style","background: linear-gradient(0deg,  rgba(1, 1, 1, 0.8) 0% , rgba(255, 255, 255, 0) 50% , rgba(255, 255, 255, 0) 100%),url(\""+(element.images == null ? "" : element.images.length == 0 ? "" : element.images[0])+"\");");
                } 
                
                divOne.append($("<img>").attr("src", element.images == null ? "" : element.images.length == 0 ? "" : element.images[0]));
                divFather.append(divOne);
                divTwo.append($("<p>").html(element.name ).addClass("bold titleNew"));
                divTwo.append($("<p>").html(element.description ).addClass("descNew"));
                divTwo.append($("<button>").html("Ver más información").addClass("buttonNew"));
                divFather.append(divTwo);

                $("#news").append(divFather);
                i++;
            });

        },
        error: function (xhr, status, error) {
            // Manejar errores
            console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
        }
    });
}

function getNew(id) {
    $.ajax({
        url: "aplication/RequestController.php?action=getNew&id=" + id, // Archivo PHP que contiene la función
        type: "GET", // Método de solicitud
        success: function (response) {
            response = (JSON.parse(response));
            $("#formModalNotice").html("");
            if ($("#modalBackgroundNotice").hasClass("hide")) {
                $("#modalBackgroundNotice").toggleClass("hide");
            }


            var div = $("<div>").attr("id", "fatherNewModal").addClass("noClose");
            var divCarrusel = $("<div>").attr("id", "myCarouselNew").attr("class", "carousel ").attr("data-ride", "carousel").addClass("noClose");


            var divCarruselinner = $("<div>").attr("class", "carousel-inner").addClass("noClose");

            var i = 0;
            response.data.images.forEach(element => {
                var divCarruselinnerItem = $("<div>").attr("class", "carousel-item " + (i == 0 ? "active" : "")).attr("id", "carousel-item" + i).addClass("noClose");
                divCarruselinnerItem.append($("<img>").attr("class", "d-block ").attr("src", element).attr("alt", "imagen " + i).addClass("noClose"));
                divCarruselinner.append(divCarruselinnerItem);
                i++;
            });
            divCarrusel.append(divCarruselinner);
            
            // carrusel de direccion 

            var divCarruselDirection = $("<div>").attr("id", "CarruselDirection").addClass("noClose");

            var aCarruselPrev = $("<a>").attr("id", "carousel-prev").attr("onclick", "prevNewIMg(0)").addClass("noClose");
            aCarruselPrev.html("<");



            var aCarruselNext = $("<a>").attr("id", "carousel-next").attr("onclick", "nextNewIMg(0)").addClass("noClose");
            aCarruselNext.html(">");

            divCarruselDirection.append(aCarruselPrev);

            divCarruselDirection.append($("<img>").attr("id", "img-carrusel").attr("src","img/61-camera-outline.gif"));

            divCarruselDirection.append(aCarruselNext);

            // info
            var divInfo = $("<div>").attr("id", "infoNew").addClass("noClose");

            divInfo.append($("<h5>").addClass("noClose bold").html((response.data.name ).toUpperCase()).addClass("fuente-leomn-milk").addClass("bold"));
            divInfo.append($("<p>").addClass("noClose").html(response.data.description).attr("id", "infoNewDesc").addClass("noClose").addClass("fuente-century-gothic"));


            if (localStorage.getItem("session") == 1) {
                divInfo.append($("<button>").attr("type", "button").attr("class", "btn btn-success ").html("editar").attr("style", "margin-top:2%;").attr("onclick", "getNewForUpdate(" + id + ")"));
                divInfo.append($("<br>"));
                divInfo.append($("<button>").attr("type", "button").attr("class", "btn btn-danger ").html("eliminar").attr("style", "margin-top:2%;").attr("onclick", "getNewForDelete(" + id + ")"));
            }
            div.append(divCarrusel);
            div.append(divCarruselDirection);
            div.append(divInfo);


            $("#formModalNotice").append(div);
        },
        error: function (xhr, status, error) {
            // Manejar errores
            console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
        }
    });
}

function getNewForUpdate(id) {
    $.ajax({
        url: "aplication/RequestController.php?action=getNew&id=" + id, // Archivo PHP que contiene la función
        type: "GET", // Método de solicitud
        success: function (responseNew) {
            //console.log(response.replace(/\\/g, ''));
            responseNew = (JSON.parse(responseNew));
            getSession().then(function (session) {


                if (!($("#modalBackgroundNotice").hasClass("hide"))) {
                    $("#modalBackgroundNotice").toggleClass("hide");
                }
                if ($("#modalBackground").hasClass("hide")) {
                    $("#modalBackground").toggleClass("hide");
                }
                $('#formModal').html("");
                if (session == "[]" || session == "") {
                    session = JSON.parse(session);

                    var form = $("<form>").attr("id", "miFormulario");


                    form.append($("<i>").attr("font-size", "20vh").attr("class", "fas fa-times-circle").attr("style", "color: #32aa48; font-size:23vh;"));

                    form.append($("<label>").text("error: "));
                    form.append($("<input>").attr("type", "text").attr("disabled", "disabled").attr("value", "Sesión no iniciada").attr("style", "text-align: center;"));

                    // Agregar el formulario al cuerpo del documento
                    $("#formModal").append(form);

                    return;
                }



                var form = $("<form>").attr("id", "miFormulario");


                form.append($("<label>").text("Titulo de la noticia: "));
                form.append($("<input>").attr("type", "text").attr("value", responseNew.data.name).attr("name", "name").attr("required", "required"));

                form.append($("<label>").text("Descripción de la noticia: "));
                form.append($("<textarea>").attr("name", "description").attr("style", "width: calc(100% - 20px);").val(responseNew.data.description));

                form.append($("<label>").text("Imagenes de la noticia: "));
                form.append($("<input>").attr("type", "file").attr("name", "images[]").attr("multiple", "multiple").attr("style", "color:black;"));

                var divImg = $("<div>").addClass("noClose");
                responseNew.data.images.forEach(element => {
                    // var pDocs = $("<p>").addClass("noClose");
                    // pDocs.append($("<a>").attr("href", element).attr("target", "_blank").html(element.split("/")[element.split("/").length-1]).addClass("noClose").addClass("fuente-century-gothic").addClass("DocNews"));            
                    var divContent = $("<div>").addClass("ContentFiles").addClass("noClose");
                    var divContentFile = $("<div>").addClass("ContentFile").html("<a href=\"" + element + "\" target=\"_blank\" class=\"noClose\">" + element.split("/")[element.split("/").length - 1] + "</a>").addClass("noClose");
                    var divContentActions = $("<div>").addClass("ContentFileActions").addClass("noClose");
                    divContentActions.append($("<button>").attr("type", "button").attr("class", "btn btn-danger").attr("onclick", "deleteDocs(\"" + element + "\"," + responseNew.data.id + "," + 1 + ")").html("<i class=\"far fa-trash-alt\"></i>").addClass("noClose"));
                    divContent.append(divContentFile);
                    divContent.append(divContentActions);
                    divImg.append(divContent);
                });
                form.append(divImg);
                
                


                form.append($("<input>").attr("type", "text").attr("name", "id").attr("hidden", "hidden").attr("value", responseNew.data.id));

                form.append($("<input>").attr("type", "text").attr("name", "action").attr("hidden", "hidden").attr("value", "editNews"));


                form.append($("<button>").attr("type", "submit").text("Editar noticia").attr("id", "editNews"));


                // Agregar el formulario al cuerpo del documento
                $("#formModal").append(form);

                // Manejar el envío del formulario
                $("#miFormulario").submit(function (event) {
                    event.preventDefault(); // Prevenir el envío del formulario normal
                    formData = new FormData(this);
                    $('body').toggleClass('loaded');
                    // Hacer una llamada AJAX al archivo PHP
                    $.ajax({
                        url: "aplication/RequestController.php", // Archivo PHP que contiene la función
                        type: "POST", // Método de solicitud
                        data: formData,
                        contentType: false,
                        processData: false,// Datos a enviar (datos del formulario serializados)
                        success: function (response) {
                            // Manejar la respuesta
                            response = (JSON.parse(response));
                            $("#alerta").removeClass("bg-success");
                            $("#alerta").removeClass("bg-danger");
                            $("#alerta").removeClass("bg-warning");
                            $("#alerta").html(response.message);
                            if (response.status == 200) {
                                $("#alerta").addClass("bg-success");
                            } else if (response.status == 500) {
                                $("#alerta").addClass("bg-danger");
                            } else {
                                $("#alerta").addClass("bg-warning");
                            }

                            $('body').toggleClass('loaded');
                            $("#modalBackground").toggleClass("hide");


                            // Mostrar la alerta
                            $("#alerta").fadeIn();

                            chargeNews(sessionStorage.getItem("currentPageID").replace("#tm-section-", "").trim())

                            // Desvanecer la alerta después de 3 segundos
                            setTimeout(function () {
                                $("#alerta").fadeOut();
                            }, 3000);

                        },
                        error: function (xhr, status, error) {
                            // Manejar errores
                            console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
                        }
                    });
                });
            }).catch(function (error) {
                // Ha ocurrido un error al obtener la sesión
                console.log("Error al obtener la sesión:", error);
            });
        },
        error: function (xhr, status, error) {
            // Manejar errores
            console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
        }
    });
}

function getNewForDelete(id) {
    $.ajax({
        url: "aplication/RequestController.php?action=getNew&id=" + id, // Archivo PHP que contiene la función
        type: "GET", // Método de solicitud
        success: function (responseNew) {
            //console.log(response.replace(/\\/g, ''));
            responseNew = (JSON.parse(responseNew));
            getSession().then(function (session) {
                if (!($("#modalBackgroundNotice").hasClass("hide"))) {
                    $("#modalBackgroundNotice").toggleClass("hide");
                }
                if ($("#modalBackground").hasClass("hide")) {
                    $("#modalBackground").toggleClass("hide");
                }
                $('#formModal').html("");
                if (session == "[]" || session == "") {
                    session = JSON.parse(session);

                    var form = $("<form>").attr("id", "miFormulario");


                    form.append($("<i>").attr("font-size", "20vh").attr("class", "fas fa-times-circle").attr("style", "color: #32aa48; font-size:23vh;"));

                    form.append($("<label>").text("error: "));
                    form.append($("<input>").attr("type", "text").attr("disabled", "disabled").attr("value", "Sesión no iniciada").attr("style", "text-align: center;"));

                    // Agregar el formulario al cuerpo del documento
                    $("#formModal").append(form);

                    return;
                }



                var form = $("<form>").attr("id", "miFormulario");

                form.append($("<h4>").text("Esta seguro de eliminar la noticia: ").addClass("noClose"));

                form.append($("<label>").text("Nombre de la noticia: "));
                form.append($("<input>").attr("type", "text").attr("disabled", "disabled").attr("value", responseNew.data.name).attr("name", "name").attr("required", "required"));

                form.append($("<input>").attr("type", "text").attr("name", "id").attr("hidden", "hidden").attr("value", responseNew.data.id));

                form.append($("<input>").attr("type", "text").attr("name", "action").attr("hidden", "hidden").attr("value", "deleteNews"));


                form.append($("<button>").attr("type", "submit").text("Eliminar la noticia").attr("id", "deleteNews"));


                // Agregar el formulario al cuerpo del documento
                $("#formModal").append(form);

                // Manejar el envío del formulario
                $("#miFormulario").submit(function (event) {
                    event.preventDefault(); // Prevenir el envío del formulario normal
                    formData = new FormData(this);
                    $('body').toggleClass('loaded');
                    // Hacer una llamada AJAX al archivo PHP
                    $.ajax({
                        url: "aplication/RequestController.php", // Archivo PHP que contiene la función
                        type: "POST", // Método de solicitud
                        data: formData,
                        contentType: false,
                        processData: false,// Datos a enviar (datos del formulario serializados)
                        success: function (response) {
                            // Manejar la respuesta
                            response = (JSON.parse(response));
                            $("#alerta").removeClass("bg-success");
                            $("#alerta").removeClass("bg-danger");
                            $("#alerta").removeClass("bg-warning");
                            $("#alerta").html(response.message);
                            if (response.status == 200) {
                                $("#alerta").addClass("bg-success");
                            } else if (response.status == 500) {
                                $("#alerta").addClass("bg-danger");
                            } else {
                                $("#alerta").addClass("bg-warning");
                            }
                            $('body').toggleClass('loaded');

                            $("#modalBackground").toggleClass("hide");


                            // Mostrar la alerta
                            $("#alerta").fadeIn();

                            chargeNews(sessionStorage.getItem("currentPageID").replace("#tm-section-", "").trim())

                            // Desvanecer la alerta después de 3 segundos
                            setTimeout(function () {
                                $("#alerta").fadeOut();
                            }, 3000);

                        },
                        error: function (xhr, status, error) {
                            // Manejar errores
                            console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
                        }
                    });
                });
            }).catch(function (error) {
                // Ha ocurrido un error al obtener la sesión
                console.log("Error al obtener la sesión:", error);
            });
        },
        error: function (xhr, status, error) {
            // Manejar errores
            console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
        }
    });
}

function nextNewIMg(currentImg) {
    var nextPage = $(".carousel-item").length - 1 < (currentImg + 1) ? 0 : (currentImg + 1);
    $(".carousel-item").removeClass("active");
    $("#carousel-item" + nextPage).addClass("active");
    $("#carousel-next").removeAttr("onclick");
    $("#carousel-next").attr("onclick", "nextNewIMg(" + nextPage + ")");
}

function prevNewIMg(currentImg) {
    var nextPage = 0 > (currentImg - 1) ? ($(".carousel-item").length - 1) : (currentImg - 1);
    $(".carousel-item").removeClass("active");
    $("#carousel-item" + nextPage).addClass("active");
    $("#carousel-prev").removeAttr("onclick");
    $("#carousel-prev").attr("onclick", "prevNewIMg(" + nextPage + ")");

}
var currentImg = 0; // Imagen inicial
var intervalTime = 3000; // Tiempo en milisegundos (3000 ms = 3 segundos)

function autoNextImg() {
    currentImg = $(".carousel-item.active").index(); // Obtener la imagen activa
    nextNewIMg(currentImg); // Llamar la función que cambia la imagen
}

// Iniciar el carrusel automáticamente cada 3 segundos
var autoSlide = setInterval(autoNextImg, intervalTime);

// Detener el auto-slide al pasar el mouse sobre el carrusel (opcional)
$(".carousel").hover(
    function() {
        clearInterval(autoSlide);
    },
    function() {
        autoSlide = setInterval(autoNextImg, intervalTime);
    }
);

function deleteDocs(docName, id, Type) {
    $.ajax({
        url: "aplication/RequestController.php", // Archivo PHP que contiene la función
        type: "POST", // Método de solicitud
        data: {
            "action": "deleteImg",
            "docName": docName, // Variable1 que deseas enviar
            "id": id, // Variable2 que deseas enviar
            "type": Type // Variable3 que deseas enviar
        },
        success: function (response) {
            // Manejar la respuesta
            response = (JSON.parse(response));
            chargeNews()
            getNewForUpdate(id);


        },
        error: function (xhr, status, error) {
            // Manejar errores
            console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
        }
    });
}
