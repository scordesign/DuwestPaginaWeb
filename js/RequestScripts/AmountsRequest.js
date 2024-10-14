

function chargeAmounts() {
    $.ajax({
        url: "aplication/RequestController.php?action=getAmounts", // Archivo PHP que contiene la función
        type: "GET", // Método de solicitud
        success: function (response) {
            response = JSON.parse(JSON.parse(response));

            var tBody = $("#adminAmounts");
            tBody.html("");

            var i = 1;
            response.data.forEach(function (element) {
                var trEach = $("<tr>");

                trEach.append($("<td>").html(i));

                var tdImg = $("<td>");

                tdImg.append($("<img>").attr("src", (element.patch === null ? "" : element.patch)));

                trEach.append(tdImg);
                trEach.append($("<td>").attr("id", "IdAmountName" + element.id).html(element.name));

                var tdActions = $("<td>");
                tdActions.append($("<input>").attr("type", "text").attr("id", "IdAmountCategory" + element.id).val(element.category).attr("hidden", "hidden"));
                tdActions.append($("<button>").attr("class", "btn btn-success butttonTd").attr("onclick", "ProcessAmount(" + element.id + ",1)").html("Editar"));
                tdActions.append($("<button>").attr("class", "btn btn-danger butttonTd").attr("onclick", "ProcessAmount(" + element.id + ",2)").html("Eliminar"));

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


function ProcessAmount(id, action) {

    getSession().then(function (session) {
        if (session == "[]" || session == "") {
            alert("no ha ingresado a su cuenta");
            return;
        }

        var div = $("#AmountProcess");

        div.html("");

        $('.adminContainer').animate({
            scrollTop: $('.adminContainer').scrollTop() + div.offset().top - $(".adminContainer").offset().top
        }, 2000);

        div.attr("class", "container p-3 my-5 border " + (action == 0 ? "border-primary" : action == 1 ? "border-success" : "border-danger"));

        var form = $("<form>").attr("id", "miFormularioCantidades").addClass("formAdmin");


        var name = $("#IdAmountName" + id).html();
        var category = $("#IdAmountCategory" + id).val();
        if (action == 0) {
            form.append($("<label>").text("Nombre del Cantidad: "));
            form.append($("<input>").attr("type", "text").attr("value", "").attr("name", "name").attr("required", "required"));

            form.append($("<label>").text("Imagen de la cantidad: "));
            form.append($("<input>").attr("type", "file").attr("name", "image").attr("style", "color:black;"));


            form.append($("<input>").attr("type", "text").attr("name", "action").attr("hidden", "hidden").attr("value", "addAmount"));
        } else if (action == 1) {
            form.append($("<label>").text("Nombre del Cantidad: "));
            form.append($("<input>").attr("type", "text").attr("value", name).attr("name", "name").attr("required", "required"));


            form.append($("<label>").text("Imagen de la cantidad: "));
            form.append($("<input>").attr("type", "file").attr("name", "image").attr("style", "color:black;"));



            form.append($("<input>").attr("type", "text").attr("name", "id").attr("hidden", "hidden").attr("value", id));

            form.append($("<input>").attr("type", "text").attr("name", "action").attr("hidden", "hidden").attr("value", "editAmount"));
        } else {
            form.append($("<label>").text("Nombre del Cantidad: "));
            form.append($("<input>").attr("type", "text").attr("value", name).attr("name", "name").attr("required", "required").attr("disabled", "disabled"));





            form.append($("<input>").attr("type", "text").attr("name", "id").attr("hidden", "hidden").attr("value", id));

            form.append($("<input>").attr("type", "text").attr("name", "action").attr("hidden", "hidden").attr("value", "deleteAmount"));
        }

        form.append($("<button>").attr("type", "submit").text((action == 0 ? "Insertar" : action == 1 ? "Editar" : "Eliminar") + " Cantidad").attr("id", "button")
            .attr("class", "btn " + (action == 0 ? "btn-primary" : action == 1 ? "btn-success" : "btn-danger")));


        // Agregar el formulario al cuerpo del documento
        div.append(form);

        // Manejar el envío del formulario
        $("#miFormularioCantidades").submit(function (event) {
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
                    response = JSON.parse(JSON.parse(response));
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

                    if (response.status == 200) {
                        chargeAmounts();
                        $('.adminContainer').animate({
                            scrollTop: $('.adminContainer').scrollTop() + $("#adminAmounts").offset().top - $(".adminContainer").offset().top
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