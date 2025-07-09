$(function () {
    $("#user-add").on("click", function () {
        $("#formModal").html("");

        $("#modalBackground").toggleClass("hide");


        getSession().then(function (session) {
            
            if (session.trim() !== "[]") {
                session = JSON.parse(session);

                var form = $("<form>").attr("id", "miFormulario");


                form.append($("<i>").attr("font-size", "20vh").attr("class", "fas fa-user-circle").attr("style", "color: #32aa48; font-size:23vh;"));

                form.append($("<label>").text("Correo: "));
                form.append($("<input>").attr("type", "text").attr("disabled", "disabled").attr("value", session.mail).attr("style", "text-align: center;"));

                form.append($("<label>").text("Usuario: "));
                form.append($("<input>").attr("type", "text").attr("disabled", "disabled").attr("value", session.user).attr("style", "text-align: center;"));

                form.append($("<label>").text("nombre: "));
                form.append($("<input>").attr("type", "text").attr("disabled", "disabled").attr("value", session.name).attr("style", "text-align: center;"));


                form.append($("<button>").attr("type", "button").text("cerrar sesión").attr("id", "closeSession").attr("onclick", "closeUser()"));


                form.append($("<button>").attr("type", "button").text("Registar nuevo usuario").attr("id", "register").attr("onclick", "addNewUser()"));



                // Agregar el formulario al cuerpo del documento
                $("#formModal").append(form);

                return;
            }

            $('#formModal').html("");

            var form = $("<form>").attr("id", "miFormulario");


            form.append($("<label>").text("usuario: "));
            form.append($("<input>").attr("type", "text").attr("name", "user").attr("required", "required"));

            form.append($("<label>").text("Contraseña: "));
            form.append($("<input>").attr("type", "password").attr("name", "password").attr("required", "required"));

            form.append($("<input>").attr("type", "text").attr("name", "action").attr("hidden", "hidden").attr("value", "LoggingUser"));

            form.append($("<button>").attr("type", "submit").text("iniciar sesión"));


            // Agregar el formulario al cuerpo del documento
            $("#formModal").append(form);



            // Manejar el envío del formulario
            $("#miFormulario").submit(function (event) {
                event.preventDefault(); // Prevenir el envío del formulario normal

                // Hacer una llamada AJAX al archivo PHP
                $.ajax({
                    url: "aplication/RequestController.php", // Archivo PHP que contiene la función
                    type: "POST", // Método de solicitud
                    data: $(this).serialize(), // Datos a enviar (datos del formulario serializados)
                    success: function (response) {
                        // Manejar la respuesta
                        response = JSON.parse(response);
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

                        $("#modalBackground").toggleClass("hide");


                        // Mostrar la alerta
                        $("#alerta").fadeIn();

                        getSessionDefault();
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

    });
});

function chargeUsers() {
    $.ajax({
        url: "aplication/RequestController.php?action=getUsers", // Archivo PHP que contiene la función
        type: "GET", // Método de solicitud
        success: function (response) {
            response = (JSON.parse(response));
            var tBody = $("#adminUsers");
            tBody.html("");
            var i = 1;
            response.data.forEach(function (element) {
                var trEach = $("<tr>");

                trEach.append($("<td>").html(i));

                trEach.append($("<td>").attr("id", "IdUsername" + element.id).html(element.name));
                trEach.append($("<td>").attr("id", "IdUsermail" + element.id).html(element.mail));
                trEach.append($("<td>").attr("id", "IdUseruser" + element.id).html(element.user));
                trEach.append($("<td>").attr("id", "IdUseradminUser" + element.id).html(element.adminUser == 1 ? "si" : "no"));


                var tdActions = $("<td>");
                tdActions.append($("<input>").attr("type", "text").attr("id", "IdUserCategory" + element.id).val(element.category).attr("hidden", "hidden"));
                tdActions.append($("<button>").attr("class", "btn btn-success butttonTd").attr("onclick", "ProcessUser(" + element.id + ",1)").html("Editar"));
                tdActions.append($("<button>").attr("class", "btn btn-danger butttonTd").attr("onclick", "ProcessUser(" + element.id + ",2)").html("Eliminar"));

                trEach.append(tdActions);
                tBody.append(trEach);
                i++;
            });
        },
        error: function (xhr, status, error) {
            // Manejar errores
            console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
        }
    });
}

function showPass(event) {
    event = event.target;
    var selector  = ".password , .comfirm";
    if (event.checked) {
        $(selector).removeAttr("type");
        $(selector).attr("type", "text");
    } else {
        $(selector).removeAttr("type");
        $(selector).attr("type", "password");
    }
}

function addNewUser() {
    $('#formModal').html("");

    var form = $("<form>").attr("id", "miFormulario");

    form.append($("<label>").text("Nombre: "));
    form.append($("<input>").attr("type", "text").attr("name", "name").attr("required", "required"));

    form.append($("<label>").text("Correo electrónico: "));
    form.append($("<input>").attr("type", "email").attr("name", "mail").attr("required", "required"));

    form.append($("<label>").text("usuario: "));
    form.append($("<input>").attr("type", "text").attr("name", "user").attr("required", "required"));

    form.append($("<label>").text("Contraseña: "));
    form.append($("<input>").attr("type", "password").attr("name", "password").attr("class", "password").attr("required", "required"));

    form.append($("<label>").text("Confirmar contraseña: ").addClass("my-2"));
    form.append($("<input>").attr("type", "password").attr("value", "").attr("name", "comfirm").attr("class", "comfirm").attr("required", "required"));

    var divCheckPass = $("<div>").addClass("checkAdmin").addClass("my-2").addClass("noClose") ;

    divCheckPass.append($("<input>").attr("type", "checkbox").attr("onclick", "showPass(event)").attr("style", "width:20%;"));      
    divCheckPass.append($("<label>").text("Ver contraseña").attr("styles", "width:80%;"));     
    
    form.append(divCheckPass);

    form.append($("<input>").attr("type", "text").attr("name", "action").attr("hidden", "hidden").attr("value", "RegiterUser"));

    form.append($("<button>").attr("type", "submit").text("Registar usuario"));


    // Agregar el formulario al cuerpo del documento
    $("#formModal").append(form);



    // Manejar el envío del formulario
    $("#miFormulario").submit(function (event) {
        event.preventDefault(); // Prevenir el envío del formulario normal

        // Hacer una llamada AJAX al archivo PHP
        $.ajax({
            url: "aplication/RequestController.php", // Archivo PHP que contiene la función
            type: "POST", // Método de solicitud
            data: $(this).serialize(), // Datos a enviar (datos del formulario serializados)
            success: function (response) {
                // Manejar la respuesta
                response = (JSON.parse(response));
                $("#alerta").removeClass("bg-success");
                $("#alerta").removeClass("bg-danger");
                $("#alerta").removeClass("bg-warning");
                $("#alerta").html(response.message);
                if (response.status == 200) {
                    $("#alerta").addClass("bg-success");
                    $("#modalBackground").toggleClass("hide");
                } else if (response.status == 500) {
                    $("#alerta").addClass("bg-danger");
                } else {
                    $("#alerta").addClass("bg-warning");
                }

                // Mostrar la alerta
                $("#alerta").fadeIn();

                if (sessionStorage.getItem("")) {
                    chargeUsers();
                    chargeFilters();
                    chargeAmounts();
                }

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
}

function closeUser() {
    $.ajax({
        url: "aplication/RequestController.php?action=destroySession",
        type: "GET",
        success: function (response) {
            $("#alerta").removeClass("bg-success");
            $("#alerta").removeClass("bg-danger");
            $("#alerta").removeClass("bg-warning");

            if (response.trim() === "true") {
                $("#alerta").html("sesión cerrada");
                $("#alerta").addClass("bg-success");
            } else {
                $("#alerta").html("error al cerrar sesión");
                $("#alerta").addClass("bg-danger");
            }

            if (!$("#modalBackground").hasClass("hide")) {
                 $("#modalBackground").toggleClass("hide");
            }
           


            // Mostrar la alerta
            $("#alerta").fadeIn();

            if (sessionStorage.getItem("currentPageID") == "#tm-section-17") {
                var currentNavItem = $("#tmNavLink1");
                changePage(currentNavItem);

                setupCarousel();
                setupFooter();

                // Hide the nav on mobile
                $("#tmSideBar").removeClass("show");
            }

            // Desvanecer la alerta después de 3 segundos
            setTimeout(function () {
                $("#alerta").fadeOut();
            }, 3000);
            getSessionDefault();


            // Resuelve la promesa con la respuesta del servidor
        },
        error: function (xhr, status, error) {
            $("#alerta").removeClass("bg-success");
            $("#alerta").removeClass("bg-danger");
            $("#alerta").removeClass("bg-warning");
            $("#alerta").html("error");

            $("#alerta").addClass("bg-danger");


            $("#modalBackground").toggleClass("hide");


            // Mostrar la alerta
            $("#alerta").fadeIn();


            // Desvanecer la alerta después de 3 segundos
            setTimeout(function () {
                $("#alerta").fadeOut();
            }, 3000);
            reject(error); // Rechaza la promesa con el error
        }
    });
}



function ProcessUser(id, action) {

    getSession().then(function (session) {
        if (session == "[]" || session == "") {
            alert("no ha ingresado a su cuenta");
            return;
        }

        session = JSON.parse(session);

        if (!session.adminUser) {
            alert("No tiene permisos para realizar esta acción");
            return;
        }

        var div = $("#UserProcess");

        div.html("");

        $('.adminContainer').animate({
            scrollTop: $('.adminContainer').scrollTop() + div.offset().top - $(".adminContainer").offset().top
        }, 2000);

        div.attr("class", "container p-3 my-5 border " + (action == 0 ? "border-primary" : action == 1 ? "border-success" : "border-danger"));

        var form = $("<form>").attr("id", "miFormularioUsuarios").addClass("formAdmin");


        var name = $("#IdUsername" + id).html();
        var mail = $("#IdUsermail" + id).html();
        var user = $("#IdUseruser" + id).html();
        var adminUser = $("#IdUseradminUser" + id).html() == "si" ? true : false;

        if (action == 1) {


            form.append($("<label>").text("Nombre del usuario: "));
            form.append($("<input>").attr("type", "text").attr("value", name).attr("name", "name").attr("required", "required"));

            form.append($("<label>").text("Correo del usuario: "));
            form.append($("<input>").attr("type", "text").attr("value", mail).attr("name", "mail").attr("required", "required"));

            form.append($("<label>").text("Usuario: "));
            form.append($("<input>").attr("type", "text").attr("value", user).attr("name", "user").attr("required", "required"));

            var divCheck = $("<div>").addClass("checkAdmin");

            divCheck.append($("<input>").attr("type", "checkbox").attr("name", "adminUser").attr("style", "width:20%;").prop('checked', adminUser));      
            divCheck.append($("<label>").text("Administrador de usuarios").attr("styles", "width:80%;"));     
            
            form.append(divCheck);

            form.append($("<label>").text("Contraseña del usuario: "));
            form.append($("<input>").attr("type", "password").attr("value", "").attr("name", "password").attr("class", "password"));

            form.append($("<label>").text("Confirmar contraseña: "));
            form.append($("<input>").attr("type", "password").attr("value", "").attr("name", "comfirm").attr("class", "comfirm"));

            var divCheckPass = $("<div>").addClass("checkAdmin");

            divCheckPass.append($("<input>").attr("type", "checkbox").attr("onclick", "showPass(event)").attr("style", "width:20%;"));      
            divCheckPass.append($("<label>").text("Ver contraseña").attr("styles", "width:80%;"));     
            
            form.append(divCheckPass);

            form.append($("<input>").attr("type", "text").attr("name", "id").attr("hidden", "hidden").attr("value", id));

            form.append($("<input>").attr("type", "text").attr("name", "action").attr("hidden", "hidden").attr("value", "editUser"));
        } else {
            form.append($("<label>").text("Esta seguro de eliminar el Usuario: "));
            form.append($("<input>").attr("type", "text").attr("value", name).attr("name", "name").attr("required", "required").attr("disabled", "disabled"));


            form.append($("<input>").attr("type", "text").attr("name", "id").attr("hidden", "hidden").attr("value", id));

            form.append($("<input>").attr("type", "text").attr("name", "action").attr("hidden", "hidden").attr("value", "deleteUser"));
        }
        form.append($("<input>").attr("type", "text").attr("hidden", "hidden").attr("id", "categoryOther").attr("name", "categoryOther").attr("placeholder", "Digite la otra categoria."));




        form.append($("<button>").attr("type", "submit").text((action == 0 ? "Insertar" : action == 1 ? "Editar" : "Eliminar") + " Usuario").attr("id", "button")
            .attr("class", "btn " + (action == 0 ? "btn-primary" : action == 1 ? "btn-success" : "btn-danger")));


        // Agregar el formulario al cuerpo del documento
        div.append(form);

        // Manejar el envío del formulario
        $("#miFormularioUsuarios").submit(function (event) {
            event.preventDefault(); // Prevenir el envío del formulario normal
            formData = new FormData(this);
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

                    

                    // Mostrar la alerta
                    $("#alerta").fadeIn();

                    div.html("");
                    div.removeAttr("class");

                    if (session.user === user) {
                        setTimeout(function () {
                            $("#alerta").fadeOut();
                            closeUser();
                        }, 3000);
                        return
                    }

                    if (response.status == 200) {
                        chargeUsers();
                        $('.adminContainer').animate({
                            scrollTop: $('.adminContainer').scrollTop() + $("#adminUsers").offset().top - $(".adminContainer").offset().top
                        }, 2000);
                    }
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