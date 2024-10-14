var filters = [];

function chargeFilters() {
    $.ajax({
        url: "aplication/RequestController.php?action=getfilters", // Archivo PHP que contiene la función
        type: "GET", // Método de solicitud
        success: function (response) {
            response = (JSON.parse(response));

            var tBody = $("#adminFilters");
            tBody.html("");
            filters = [];
            for (var key in response.data) {

                tBody.append($("<tr>").append($("<th>").attr("colspan", "3").attr("scope", "col").attr("style", "text-align: center;").html(key)));
                filters.push(key);
                if (response.data.hasOwnProperty(key)) {
                    var objets = response.data[key];
                    var i = 1;
                    objets.forEach(function (element) {
                        var trEach = $("<tr>");

                        trEach.append($("<td>").html(i));
                        trEach.append($("<td>").attr("id", "IdFilterName" + element.id).html(element.name));


                        var tdActions = $("<td>");
                        tdActions.append($("<input>").attr("type", "text").attr("id", "IdFilterCategory" + element.id).val(element.category).attr("hidden", "hidden"));
                        tdActions.append($("<button>").attr("class", "btn btn-success butttonTd").attr("onclick", "ProcessFilter(" + element.id + ",1)").html("Editar"));
                        tdActions.append($("<button>").attr("class", "btn btn-danger butttonTd").attr("onclick", "ProcessFilter(" + element.id + ",2)").html("Eliminar"));

                        trEach.append(tdActions);
                        tBody.append(trEach);
                        i++;
                    });

                }
            }
        },
        error: function (xhr, status, error) {
            // Manejar errores
            console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
        }
    });


}

function othherCatrgory(event) {
    event = event.target;

    if (event.value == "otra") {
        $(event).attr("disabled", "disabled");
        $("#categoryOther").removeAttr("hidden");
    }

}

function ProcessFilter(id, action) {

    getSession().then(function (session) {
        if (session == "[]" || session == "") {
            alert("no ha ingresado a su cuenta");
            return;
        }

        var div = $("#FilterProcess");

        div.html("");

        $('.adminContainer').animate({
            scrollTop: $('.adminContainer').scrollTop() + div.offset().top - $(".adminContainer").offset().top
        }, 2000);

        div.attr("class", "container p-3 my-5 border " + (action == 0 ? "border-primary" : action == 1 ? "border-success" : "border-danger"));

        var form = $("<form>").attr("id", "miFormularioFiltros").addClass("formAdmin");


        var name = $("#IdFilterName" + id).html();
        var category = $("#IdFilterCategory" + id).val();
        if (action == 0) {
            form.append($("<label>").text("Nombre del filtro: "));
            form.append($("<input>").attr("type", "text").attr("value", "").attr("name", "name").attr("required", "required"));

            form.append($("<label>").text("Categoria del filtro: "));

            var select = $("<select>").attr("onchange", "othherCatrgory(event)").attr("name", "category").attr("class", "form-select form-select-sm").attr("aria-label", ".form-select-sm example");

            $.each(filters, function (indexInArray, valueOfElement) {
                select.append($("<option>").attr("value", valueOfElement).html(valueOfElement));
            });
            select.append($("<option>").attr("value", "otra").html("otra categoria"));
            form.append(select);

            form.append($("<input>").attr("type", "text").attr("name", "action").attr("hidden", "hidden").attr("value", "addFilter"));
        } else if (action == 1) {
            form.append($("<label>").text("Nombre del filtro: "));
            form.append($("<input>").attr("type", "text").attr("value", name).attr("name", "name").attr("required", "required"));

            form.append($("<label>").text("Categoria del filtro: "));

            var select = $("<select>").attr("onchange", "othherCatrgory(event)").attr("name", "category").attr("class", "form-select form-select-sm").attr("aria-label", ".form-select-sm example");

            $.each(filters, function (indexInArray, valueOfElement) {
                var option = $("<option>").attr("value", valueOfElement).html(valueOfElement);
                if (category == valueOfElement) {
                    option.attr("selected", "selected");
                }
                select.append(option);
            });
            select.append($("<option>").attr("value", "otra").html("otra categoria"));
            form.append(select);



            form.append($("<input>").attr("type", "text").attr("name", "id").attr("hidden", "hidden").attr("value", id));

            form.append($("<input>").attr("type", "text").attr("name", "action").attr("hidden", "hidden").attr("value", "editFilter"));
        } else {
            form.append($("<label>").text("Esta seguro de eliminar el Filtro: "));
            form.append($("<input>").attr("type", "text").attr("value", name).attr("name", "name").attr("required", "required").attr("disabled", "disabled"));

            form.append($("<label>").text("Categoria del filtro: "));

            var select = $("<select>").attr("onchange", "othherCatrgory(event)").attr("name", "category").attr("class", "form-select form-select-sm").attr("aria-label", ".form-select-sm example").attr("disabled", "disabled");

            $.each(filters, function (indexInArray, valueOfElement) {
                var option = $("<option>").attr("value", valueOfElement).html(valueOfElement);
                if (category == valueOfElement) {
                    option.attr("selected", "selected");
                }
                select.append(option);
            });
            select.append($("<option>").attr("value", "otra").html("otra categoria"));
            form.append(select);



            form.append($("<input>").attr("type", "text").attr("name", "id").attr("hidden", "hidden").attr("value", id));

            form.append($("<input>").attr("type", "text").attr("name", "action").attr("hidden", "hidden").attr("value", "deleteFilter"));
        }
        form.append($("<input>").attr("type", "text").attr("hidden", "hidden").attr("id", "categoryOther").attr("name", "categoryOther").attr("placeholder", "Digite la otra categoria."));




        form.append($("<button>").attr("type", "submit").text((action == 0 ? "Insertar" : action == 1 ? "Editar" : "Eliminar") + " Filtro").attr("id", "button")
            .attr("class", "btn " + (action == 0 ? "btn-primary" : action == 1 ? "btn-success" : "btn-danger")));


        // Agregar el formulario al cuerpo del documento
        div.append(form);

        // Manejar el envío del formulario
        $("#miFormularioFiltros").submit(function (event) {
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
                        chargeFilters();
                        $('.adminContainer').animate({
                            scrollTop: $('.adminContainer').scrollTop() + $("#adminFilters").offset().top - $(".adminContainer").offset().top
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