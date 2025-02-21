$(function () {
  $("#searchMenu").keyup(function (event) {
    pageId = sessionStorage
      .getItem("currentPageID")
      .replace("#tm-section-", "")
      .trim();
    $("#products2-" + pageId + " .divProduct").remove();
    getProducts(
      pageId,
      $("#searchMenu").val(),
      $("#filtersInput-" + pageId).val() == ""
        ? undefined
        : $("#filtersInput-" + pageId).val()
    );
  });
});

let imagesProducts = [];

function closeImgProd(idProd) {
  $("#modalBackgroundImgProd").toggleClass("hide");
  $("#formModalImgProd").html("");
  getProduct(idProd);
}

function imgProduct(idImg, idProd) {
  $("#modalBackground").toggleClass("hide");
  $("#formModal").html("");

  $("#formModalImgProd").html("");
  $("#closeModalImgProd").attr("onclick", "closeImgProd(" + idProd + ")");
  if ($("#modalBackgroundImgProd").hasClass("hide")) {
    $("#modalBackgroundImgProd").toggleClass("hide");
  }

  var div = $("<div>").attr("id", "fatherImgProdModal").addClass("noClose");

  var divCarrusel = $("<div>")
    .attr("id", "myCarouselNew")
    .attr("class", "carousel carouselImgProduct")
    .attr("data-ride", "carousel")
    .addClass("noClose");

  var divCarruselinner = $("<div>")
    .attr("class", "carousel-inner")
    .addClass("noClose");

  var i = 0;
  imagesProducts.forEach((element) => {
    var divCarruselinnerItem = $("<div>")
      .attr(
        "class",
        "carousel-item imgDivProduct " + (i == idImg ? "active" : "")
      )
      .attr("id", "carousel-item" + i)
      .addClass("noClose");
    divCarruselinnerItem.append(
      $("<img>")
        .attr("class", "d-block imgProduct ")
        .attr("src", element)
        .attr("alt", "imagen " + i)
        .addClass("noClose")
    );
    divCarruselinner.append(divCarruselinnerItem);
    i++;
  });
  divCarrusel.append(divCarruselinner);

  // carrusel de direccion

  var divCarruselDirection = $("<div>")
    .attr("id", "CarruselDirection")
    .addClass("noClose");

  var aCarruselPrev = $("<a>")
    .attr("id", "carousel-prev")
    .attr("onclick", "prevNewIMg(0)")
    .addClass("noClose");
  aCarruselPrev.html("<");

  var aCarruselNext = $("<a>")
    .attr("id", "carousel-next")
    .attr("onclick", "nextNewIMg(0)")
    .addClass("noClose");
  aCarruselNext.html(">");

  divCarruselDirection.append(aCarruselPrev);

  divCarruselDirection.append(
    $("<img>")
      .attr("id", "img-carrusel")
      .attr("src", "img/61-camera-outline.gif")
  );

  divCarruselDirection.append(aCarruselNext);

  div.append(divCarrusel);
  div.append(divCarruselDirection);

  $("#formModalImgProd").append(div);
}

function searchCell(param, event) {
  if (event.key === "Enter") {
    closeCell();
  }

  pageId = sessionStorage
    .getItem("currentPageID")
    .replace("#tm-section-", "")
    .trim();
  $("#products2-" + pageId + " .divProduct").remove();
  getProducts(
    pageId,
    $("#searchMenuCell" + param).val(),
    $("#filtersInput-" + pageId).val() == ""
      ? undefined
      : $("#filtersInput-" + pageId).val()
  );
}

function addProduct() {
  $("#modalBackground").toggleClass("hide");

  getSession()
    .then(function (session) {
      $("#formModal").html("");
      if (session == "[]" || session == "") {
        session = JSON.parse(session);

        var form = $("<form>").attr("id", "miFormulario");

        form.append(
          $("<i>")
            .attr("font-size", "20vh")
            .attr("class", "fas fa-times-circle")
            .attr("style", "color: #32aa48; font-size:23vh;")
        );

        form.append($("<label>").text("error: "));
        form.append(
          $("<input>")
            .attr("type", "text")
            .attr("disabled", "disabled")
            .attr("value", "Sesión no iniciada")
            .attr("style", "text-align: center;")
        );

        // Agregar el formulario al cuerpo del documento
        $("#formModal").append(form);

        return;
      }

      var form = $("<form>").attr("id", "miFormulario");

      form.append($("<label>").text("Nombre del producto: "));
      form.append(
        $("<input>")
          .attr("type", "text")
          .attr("name", "name")
          .attr("required", "required")
      );

      form.append(
        $("<input>")
          .attr("type", "hidden")
          .attr("name", "amount")
          .attr("id", "amountInput")
      );

      var div1 = $("<div>")
        .attr("id", "amount")
        .attr("style", "margin-top:2%;");

      $.ajax({
        url: "aplication/RequestController.php?action=getAmounts", // Archivo PHP que contiene la función
        type: "GET", // Método de solicitud
        success: function (response) {
          response = (JSON.parse(response));

          var divFirst = $("<div>")
            .attr("class", "amounts noClose")
            .attr("style", "width:100%;color:black;");

          divFirst.append(
            $("<h4>").html("presentaciones").attr("class", "bold noClose")
          );

          // Iterar sobre los objetos dentro de cada categoría
          var i = 0;
          response.data.forEach(function (element) {
            var divData = $("<div>")
              .attr("class", "AmountsEach")
              .addClass("noClose")
              .attr("style", "display:inline-flex;width:50%;float: left;");

            divData.append(
              $("<input>")
                .attr("type", "checkbox")
                .attr("onclick", "AmountAdd(" + element.id + ")")
                .attr("name", element.name)
                .attr("id", "checkBox-amount-" + element.id)
                .attr("style", "width:20%;")
            );
            divData.append(
              $("<label>").text(element.name).attr("styles", "width:80%;")
            );

            divFirst.append(divData);
            i++;
          });

          div1.append(divFirst);
        },
        error: function (xhr, status, error) {
          // Manejar errores
          console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
        },
      });

      form.append(div1);
      form.append(
        $("<input>")
          .attr("type", "text")
          .attr("name", "amountOther")
          .attr("placeholder", "Otra cantidad")
      );

      form.append($("<label>").text("Descripción del producto: "));
      form.append(
        $("<textarea>")
          .attr("name", "description")
          .attr("style", "width: calc(100% - 20px);")
      );

      form.append($("<label>").text("Logo del producto: "));
      form.append(
        $("<input>")
          .attr("type", "file")
          .attr("name", "logo")
          .attr("style", "color:black;")
      );

      form.append($("<label>").text("Logo del proveedor del producto: "));
      form.append(
        $("<input>")
          .attr("type", "file")
          .attr("name", "proveedor")
          .attr("style", "color:black;")
      );

      form.append($("<label>").text("Imagenes del producto: "));
      form.append(
        $("<input>")
          .attr("type", "file")
          .attr("name", "images[]")
          .attr("multiple", "multiple")
          .attr("style", "color:black;")
      );

      form.append($("<label>").text("Archivos asociados al producto: "));
      form.append(
        $("<input>")
          .attr("type", "file")
          .attr("name", "files[]")
          .attr("multiple", "multiple")
          .attr("style", "color:black;")
      );

      var div = $("<div>")
        .attr("id", "filters")
        .attr("style", "margin-top:2%;");

      $.ajax({
        url: "aplication/RequestController.php?action=getfilters", // Archivo PHP que contiene la función
        type: "GET", // Método de solicitud
        success: function (response) {
          response = JSON.parse(response);

          for (var key in response.data) {
            var divFirst = $("<div>")
              .attr("class", "filters noClose")
              .attr("style", "width:100%;color:black;");

            if (response.data.hasOwnProperty(key)) {
              divFirst.append(
                $("<h4>").html(key).attr("class", "bold noClose")
              );
              var objetos = response.data[key];
              // Iterar sobre los objetos dentro de cada categoría
              var i = 0;
              objetos.forEach(function (element) {
                var divData = $("<div>")
                  .attr("class", "filtersEach")
                  .attr(
                    "style",
                    "display:inline-flex;width:50%;float: left;background-color:" +
                      element.color +
                      ";color:" +
                      element.text +
                      ";font-size: 16px;font-weight:bold;border-radius:20px;argin: 0.5vh 0vw;"
                  );

                divData.append(
                  $("<input>")
                    .attr("type", "checkbox")
                    .attr("onclick", "filterAdd(" + element.id + ")")
                    .attr("name", element.name)
                    .attr("id", "checkBox-" + element.id)
                    .attr(
                      "style",
                      "width:20%; background-color:" +
                        element.color +
                        ";color:" +
                        element.text +
                        ";font-size: 16px;font-weight:bold;border-radius:20px;argin: 0.5vh 0vw;"
                    )
                );
                divData.append(
                  $("<label>").text(element.name).attr("styles", "width:80%;")
                );

                divFirst.append(divData);
                i++;
              });

              //if((i % 2) == 1 ){
              //    divFirst.append($("<div>").attr("class", "filtersEach").attr("style", "display:inline-flex;width:50%;float: left;"));
              //}

              div.append(divFirst);
            }
          }
        },
        error: function (xhr, status, error) {
          // Manejar errores
          console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
        },
      });

      if (
        !(
          sessionStorage.getItem("currentPageID").trim().endsWith("14") ||
          sessionStorage.getItem("currentPageID").trim().endsWith("15")
        )
      ) {
        form.append(div);
      }

      form.append(
        $("<input>")
          .attr("type", "text")
          .attr("name", "filters")
          .attr("id", "filtersInput")
          .attr("hidden", "hidden")
      );

      form.append(
        $("<input>")
          .attr("type", "text")
          .attr("name", "section")
          .attr("hidden", "hidden")
          .attr("value", sessionStorage.getItem("currentPageID"))
      );

      form.append(
        $("<input>")
          .attr("type", "text")
          .attr("name", "action")
          .attr("hidden", "hidden")
          .attr("value", "addProduct")
      );

      form.append(
        $("<button>")
          .attr("type", "submit")
          .text("Registar nuevo Producto")
          .attr("id", "addProduct")
      );

      // Agregar el formulario al cuerpo del documento
      $("#formModal").append(form);

      // Manejar el envío del formulario
      $("#miFormulario").submit(function (event) {
        $("body").toggleClass("loaded");

        event.preventDefault(); // Prevenir el envío del formulario normal
        formData = new FormData(this);
        // Hacer una llamada AJAX al archivo PHP
        $.ajax({
          url: "aplication/RequestController.php", // Archivo PHP que contiene la función
          type: "POST", // Método de solicitud
          data: formData,
          contentType: false,
          processData: false, // Datos a enviar (datos del formulario serializados)
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
            $("body").toggleClass("loaded");

            $("#modalBackground").toggleClass("hide");
            chargeProducts(
              sessionStorage
                .getItem("currentPageID")
                .replace("#tm-section-", "")
                .trim()
            );

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
          },
        });
      });
    })
    .catch(function (error) {
      // Ha ocurrido un error al obtener la sesión
      console.log("Error al obtener la sesión:", error);
    });
}

function pagination() {
  var pageCurrent = localStorage.getItem("PageRegs");
  var total = localStorage.getItem("TotalRegs");
  var pageId = sessionStorage
    .getItem("currentPageID")
    .replace("#tm-section-", "")
    .trim();
  var el = $("#products2-" + pageId);

  // console.log((el.height() + el.offset().top) - 200 );
  // console.log( $(window).height() );
  // console.log(((el.height() + el.offset().top) - 200 <= $(window).height()));
  // console.log((pageCurrent * 10) < total);

  if (
    el.height() + el.offset().top - 200 <= $(window).height() &&
    pageCurrent * 10 < total
  ) {
    localStorage.setItem("PageRegs", pageCurrent.valueOf() - 1 + 2);
    getProducts(
      pageId,
      $("#searchMenu").val() == "" ? undefined : $("#searchMenu").val(),
      $("#filtersInput-" + pageId).val() == ""
        ? undefined
        : $("#filtersInput-" + pageId).val(),
      pageCurrent.valueOf() - 1 + 2
    );
    return;
  }
}

function pagination14() {
  var pageCurrent = localStorage.getItem("PageRegs");
  var total = localStorage.getItem("TotalRegs");
  var pageId = sessionStorage
    .getItem("currentPageID")
    .replace("#tm-section-", "")
    .trim();
  var fatherEl = $("#products2-" + pageId);
  var el = $("#products2-" + pageId + " .functionPrducts");

  if (
    el.offset().top + el.height() < $(fatherEl).height() &&
    pageCurrent * 10 < total
  ) {
    localStorage.setItem("PageRegs", pageCurrent.valueOf() - 1 + 2);
    getProducts(
      pageId,
      $("#searchMenu").val() == "" ? undefined : $("#searchMenu").val(),
      $("#filtersInput-" + pageId).val() == ""
        ? undefined
        : $("#filtersInput-" + pageId).val(),
      pageCurrent.valueOf() - 1 + 2
    );
    return;
  }
}

function chargeProductsNoF(pageId) {
  $("#products2-" + pageId + " .divProduct").remove();
  // $("#filter-product-" + pageId).html('<input type="hidden" name="filtersInput-'+pageId+'" id="filtersInput-'+pageId+'" value="">');
  getProducts(pageId);
}

function chargeProducts(pageId) {
  $("#products2-" + pageId + " .divProduct").remove();
  $("#filter-product-" + pageId).html(
    '<input type="hidden" name="filtersInput-' +
      pageId +
      '" id="filtersInput-' +
      pageId +
      '" value="">'
  );
  getProducts(pageId);
  getfilters(pageId);
}

function getfilters(pageId) {
  $.ajax({
    url: "aplication/RequestController.php?action=getfilters", // Archivo PHP que contiene la función
    type: "GET", // Método de solicitud
    success: function (response) {
      response = JSON.parse(response);
      var sectionNumber = pageId;
      // var sectionNumber = pageId.substring(pageId.length - 2, pageId.length);
      $("#filter-product-" + sectionNumber).append(
        $("<h4>").html("Filtrar").attr("class", "filtertitle")
      );
      for (var key in response.data) {
        var divFirst = $("<div>")
          .attr("id", "father" + key)
          .attr(
            "class",
            key == "Clasificación" ? "filters filterCla" : "filters"
          )
          .attr("style", "width:100%;color:black;");

        if (response.data.hasOwnProperty(key)) {
          var h4 = $("<h4>").html(key).attr("class", "bold");

          if (/*isMobileDevice() &&*/ key == "Clasificación") {
            h4.attr("style", "display: none;");
          }
          if (/*isMobileDevice() &&*/ key != "Clasificación") {
            h4.attr("onclick", "toggleDivsByKey('" + key + "')");
          }
          divFirst.append(h4);
          var objetos = response.data[key];
          // Iterar sobre los objetos dentro de cada categoría

          objetos.forEach(function (element) {
            var divData = $("<div>")
              .attr("class", "filtersEach")
              .attr(
                "style",
                "display:inline-flex;width:100%;background-color:" +
                  element.color +
                  ";color:" +
                  element.text +
                  ";font-size: 16px;font-weight:bold;border-radius:20px;margin: 0.5vh 0vw;"
              ).attr("data-key", key);

            if (/*isMobileDevice() &&*/ key != "Clasificación") {
              divData.attr("style", "display: none;width: 100%;");
            }

            divData.append(
              $("<input>")
                .attr("data", key)
                .attr("type", "checkbox")
                .attr(
                  "onclick",
                  "filterAddProducts(" + element.id + "," + sectionNumber + ")"
                )
                .attr("name", element.name)
                .attr("id", "CheckboxFilter" + sectionNumber + "-" + element.id)
            );
            divData.append(
              $("<label>").text(element.name).attr("styles", "width:80%;")
            );

            divFirst.append(divData);
          });

          // if (/*isMobileDevice()*/) {
            $("#filter-product-" + sectionNumber).append(
              $("<div>")
                .attr("class", "filterLine")
                .html(
                  key == "Clasificación"
                    ? "Clasificación del producto"
                    : "Ver por " + key
                )
            );
          // }

          $("#filter-product-" + sectionNumber).append(divFirst);
        }
      }
    },
    error: function (xhr, status, error) {
      // Manejar errores
      console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
    },
  });
}

function toggleDivsByKey(key) {
  const $contenedor = $("#father" + key);

  // Calcula la altura actual
  const alturaActual = $contenedor.height();
  
  // Realiza el toggle de los divs con el atributo data-key
  $(`div[data-key="${key}"]`).fadeToggle(300, function () {
    // Calcula la nueva altura después del toggle
  });
}

function filterAdd(id) {
  if ($("#checkBox-" + id).prop("checked")) {
    $("#filtersInput").val($("#filtersInput").val() + "{" + id + "},");
  } else {
    $("#filtersInput").val(
      $("#filtersInput")
        .val()
        .replace("{" + id + "},", "")
    );
  }
}

function AmountAdd(id) {
  if ($("#checkBox-amount-" + id).prop("checked")) {
    $("#amountInput").val($("#amountInput").val() + "{" + id + "},");
  } else {
    $("#amountInput").val(
      $("#amountInput")
        .val()
        .replace("{" + id + "},", "")
    );
  }
}

function filterAddProducts(id, section) {
  if ($("#CheckboxFilter" + section + "-" + id).prop("checked")) {
    $("#filtersInput-" + section).val(
      $("#filtersInput-" + section).val() + "{" + id + "},"
    );
  } else {
    $("#filtersInput-" + section).val(
      $("#filtersInput-" + section)
        .val()
        .replace("{" + id + "},", "")
    );
  }
  pageId = sessionStorage
    .getItem("currentPageID")
    .replace("#tm-section-", "")
    .trim();
  $("#products2-" + pageId + " .divProduct").remove();
  getProducts(
    pageId,
    $("#searchMenu").val() == "" ? undefined : $("#searchMenu").val(),
    $("#filtersInput-" + pageId).val() == ""
      ? undefined
      : $("#filtersInput-" + pageId).val()
  );
}

function getProducts(section, search, filters, page) {
  // section = section.substring(section.length-2,section.length);
  $.ajax({
    url:
      "aplication/RequestController.php?action=getProducts&section=tm-section-" +
      section +
      (typeof search == "undefined" ? "" : "&search=" + search) +
      (typeof filters == "undefined" ? "" : "&filters=" + filters) +
      (typeof page == "undefined" ? "" : "&page=" + page), // Archivo PHP que contiene la función
    type: "GET", // Método de solicitud
    success: function (response) {
      //console.log(response.replace(/\\/g, ''));
      response = (JSON.parse(response));

      localStorage.setItem("TotalRegs", response.Total);
      localStorage.setItem("PageRegs", response.Page);

     // Obtener la clasificación seleccionada
     let selectedClassification = "";
     if (filters) {
       const filterIds = filters.split(",");
       filterIds.forEach(filterId => {
         const filterElement = $(`#CheckboxFilter${section}-${filterId.replace(/[{}]/g, '')}`);
         if (filterElement.length && filterElement.attr("data") === "Clasificación") {
           selectedClassification = filterElement.attr("name");
         }
       });
     }

     // Actualizar el título con la clasificación seleccionada
     const classificationTitle = selectedClassification 
       ? `<h2 style="color:black;">Clasificación seleccionada: ${selectedClassification}</h2>` 
       : "<h2>Todos los productos</h2>";

     // Limpiar el contenedor de productos y agregar el título
     $("#products2-" + section).html(classificationTitle);

       
      response.data.forEach((element) => {
        var divFather = $("<div>")
          .attr("class", "divProduct")
          .attr("onclick", "getProduct(" + element.id + ")");

        var divSon = $("<div>");
        divSon.append(
          $("<img>").attr(
            "src",
            element.logo == null
              ? ""
              : element.logo.substring(1, element.logo.length)
          )
        );
        divFather.append(divSon);
        divFather.append(
          $("<p>").attr("class", "titleProduct").html(element.name)
        );
        divFather.append(
          $("<p>").attr("class", "textProduct").html(element.description)
        );

        divFather.append($("<a>").html("Ver más información"));

        $("#products2-" + section).append(divFather);
      });
    },
    error: function (xhr, status, error) {
      // Manejar errores
      console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
    },
  });
}

function getProduct(id) {
  var section = sessionStorage
    .getItem("currentPageID")
    .substring(
      sessionStorage.getItem("currentPageID").length - 2,
      sessionStorage.getItem("currentPageID").length
    );
  $.ajax({
    url: "aplication/RequestController.php?action=getProduct&id=" + id, // Archivo PHP que contiene la función
    type: "GET", // Método de solicitud
    success: function (response) {
      //console.log(response.replace(/\\/g, ''));
      response = (JSON.parse(response));

      $(".outWhats").toggleClass("hide");

      $("#formModal").html("");
      if ($("#modalBackground").hasClass("hide")) {
        $("#modalBackground").toggleClass("hide");
      }

      var div = $("<div>").attr("id", "fatherProductModal").addClass("noClose");

      var divlogo = $("<div>")
        .attr("class", "carousel divLogo")
        .attr("data-ride", "carousel")
        .addClass("noClose");
      var divAmount = $("<div>")
        .attr("id", "amount")
        .attr("class", "amount")
        .addClass("noClose");

      // var divCarruselinner = $("<div>").attr("class", "carousel-inner").addClass("noClose");

      // var i = 0;
      // response.data.listImg.forEach(element => {
      //     var divCarruselinnerItem = $("<div>").attr("class", "carousel-item " + (i == 0 ? "active" : "")).attr("id", "carousel-item" + i).addClass("noClose");
      //     divCarruselinnerItem.append($("<img>").attr("class", "d-block w-100").attr("src", element).attr("alt", "imagen " + i).addClass("noClose"));
      //     divCarruselinner.append(divCarruselinnerItem);
      //     i++;
      // });
      // divCarrusel.append(divCarruselinner);
      // var aCarruselPrev = $("<a>").attr("id", "carousel-control-prev").attr("onclick", "prevProductIMg(0)").attr("class", "carousel-control-prev").attr("href", "#carouselExampleIndicators").attr("role", "button").attr("data-slide", "prev").addClass("noClose");
      // aCarruselPrev.append($("<span>").attr("class", "carousel-control-prev-icon").attr("aria-hidden", "true").addClass("noClose"));
      // aCarruselPrev.append($("<span>").attr("class", "sr-only").html("Anterior").addClass("noClose"));

      // var aCarruselNext = $("<a>").attr("id", "carousel-control-next").attr("onclick", "nextProductIMg(0)").attr("class", "carousel-control-next").attr("href", "#carouselExampleIndicators").attr("role", "button").attr("data-slide", "next").addClass("noClose");
      // aCarruselNext.append($("<span>").attr("class", "carousel-control-next-icon").attr("aria-hidden", "true").addClass("noClose"));
      // aCarruselNext.append($("<span>").attr("class", "sr-only").html("Siguiente").addClass("noClose"));

      // divCarrusel.append(aCarruselPrev);
      // divCarrusel.append(aCarruselNext);

      // info

      var divCarrusel = $("<div>")
        .attr("id", "myCarouselProduct")
        .attr("class", "carousel ")
        .attr("data-ride", "carousel")
        .addClass("noClose");

      var divCarruselinner = $("<div>")
        .attr("class", "carousel-inner")
        .addClass("noClose");

      imagesProducts = response.data.listImg;

      var i = 0;
      imagesProducts.forEach((element) => {
        var divCarruselinnerItem = $("<div>")
          .attr("class", " carousel-item " + (i == 0 ? "active" : ""))
          .attr("id", "carousel-item" + i)
          .addClass("noClose");
        divCarruselinnerItem.append(
          $("<img>")
            .attr("onclick", "imgProduct(" + i + "," + id + ")")
            .attr("class", "imgCarousel d-block w-50")
            .attr("src", element)
            .attr("alt", "imagen " + i)
            .addClass("noClose")
        );
        divCarruselinner.append(divCarruselinnerItem);
        i++;
      });
      divCarrusel.append(divCarruselinner);
      var aCarruselPrev = $("<a>")
        .attr("id", "carousel-control-prev")
        .attr("onclick", "prevProductIMg(0)")
        .attr("class", "carousel-control-prev")
        .attr("role", "button")
        .attr("data-slide", "prev")
        .addClass("noClose");
      aCarruselPrev.append(
        $("<span>")
          .attr("class", "carousel-control-prev-icon")
          .attr("aria-hidden", "true")
          .addClass("noClose")
      );
      aCarruselPrev.append(
        $("<span>")
          .attr("class", "sr-only")
          .html("Anterior")
          .addClass("noClose")
      );

      var aCarruselNext = $("<a>")
        .attr("id", "carousel-control-next")
        .attr("onclick", "nextProductIMg(0)")
        .attr("class", "carousel-control-next")
        .attr("role", "button")
        .attr("data-slide", "next")
        .addClass("noClose");
      aCarruselNext.append(
        $("<span>")
          .attr("class", "carousel-control-next-icon")
          .attr("aria-hidden", "true")
          .addClass("noClose")
      );
      aCarruselNext.append(
        $("<span>")
          .attr("class", "sr-only")
          .html("Siguiente")
          .addClass("noClose")
      );

      divCarrusel.append(aCarruselPrev);
      divCarrusel.append(aCarruselNext);

      var divInfo = $("<div>").attr("id", "infoProduct").addClass("noClose");

      var divLogoinnerItem = $("<img>")
        .attr("class", "d-block logoImg")
        .attr(
          "src",
          response.data.logo == "" || response.data.logo == null
            ? ""
            : response.data.logo.substring(1, response.data.logo.length)
        )
        .addClass("noClose");
      divlogo.append(divLogoinnerItem);

      if (response.data.amountImgs.length != 0) {
        response.data.amountImgs.forEach((element) => {
          var amountElement = $("<img>")
            .attr("src", element)
            .attr("class", "d-block h-100 noClose");
          divAmount.append(amountElement);
        });
      }

      divInfo.append(
        $("<h5>")
          .addClass("noClose")
          .html(response.data.name.toUpperCase())
          .addClass("fuente-leomn-milk")
          .addClass("bold")
      );

      if (isMobileDevice()) {
        divInfo.append(divCarrusel);
        divInfo.append($("<br>"));
      }

      divInfo.append(
        $("<p>")
          .addClass("noClose")
          .html(response.data.description)
          .attr("id", "infoProductDesc")
          .addClass("noClose")
          .addClass("fuente-century-gothic")
      );

      var divlogoProveedor = $("<div>")
        .attr("class", "carousel proveedor")
        .attr("data-ride", "carousel")
        .addClass("noClose");
      var divLogoProveedorinnerItem = $("<img>")
        .attr("class", "d-block ProveedorImg")
        .attr(
          "src",
          response.data.proveedor == "" || response.data.proveedor == null
            ? ""
            : response.data.proveedor.substring(
                1,
                response.data.proveedor.length
              )
        )
        .addClass("noClose");
      divlogoProveedor.append(divLogoProveedorinnerItem);
      divInfo.append(divlogoProveedor);

      divInfo.append(
        $("<p>")
          .html("Presentaciones: " + response.data.amountName)
          .attr("id", "infoProductAmount")
          .addClass("noClose")
          .addClass("fuente-century-gothic")
      );

      if (response.data.filters != null && response.data.filters != "") {
        var filtersProduct = "";
        i = 0;
        response.data.filters
          .replaceAll("{", "")
          .replaceAll("}", "")
          .split(",")
          .forEach((element) => {
            var filtersProductElement = $(
              "#CheckboxFilter" + section + "-" + element
            );
            if (filtersProductElement.attr("data") != "Proveedores") {
              if (filtersProduct.includes(filtersProductElement.attr("data"))) {
                filtersProduct =
                  filtersProduct.substring(
                    0,
                    filtersProduct.indexOf(filtersProductElement.attr("data")) +
                      filtersProductElement.attr("data").length +
                      1
                  ) +
                  " " +
                  filtersProductElement.attr("name") +
                  "," +
                  filtersProduct.substring(
                    filtersProduct.indexOf(filtersProductElement.attr("data")) +
                      filtersProductElement.attr("data").length +
                      1 /*+ filtersProductElement.attr("name").length + 2*/,
                    filtersProduct.length
                  ) +
                  ", ";
              } else {
                filtersProduct +=
                  "  " +
                  filtersProductElement.attr("data") +
                  ": " +
                  filtersProductElement.attr("name") +
                  ", ";
              }
            }
          });

        filtersProduct = filtersProduct.replaceAll(", 0", " ");
        filtersProduct = filtersProduct.endsWith(", ")
          ? filtersProduct.substring(0, filtersProduct.length - 2)
          : filtersProduct;
        filtersProduct = filtersProduct.startsWith("0")
          ? filtersProduct
              .substring(1, filtersProduct.length)
              .replaceAll("0", " ")
          : filtersProduct.replaceAll("0", " ");
        filtersProduct = filtersProduct.replace(",  ", "<br>");
        filtersProduct = filtersProduct.replace(",,", "");
        filtersProduct = filtersProduct.replace(", ,", "");
        filtersProduct = filtersProduct.endsWith(", ") ? filtersProduct.substring(0,filtersProduct.length - 2 ) : filtersProduct;

        divInfo.append(
          $("<p>")
            .addClass("filtersProduct")
            .html(filtersProduct)
            .addClass("noClose")
            .addClass("fuente-century-gothic")
        );
      }

      if (response.data.listDocs != null) {
        divInfo.append(
          $("<a>")
            .attr("href", response.data.ficha)
            .attr("target", "_blank")
            .html("Ficha tecnica")
            .addClass("noClose")
            .addClass("fuente-century-gothic")
            .addClass("btn")
            .addClass("btn-primary")
            .addClass("DocProductsFicha")
        );

        divInfo.append(
          $("<a>")
            .attr("href", response.data.hoja)
            .attr("target", "_blank")
            .html("Hoja de seguridad")
            .addClass("noClose")
            .addClass("fuente-century-gothic")
            .addClass("btn")
            .addClass("btn-primary")
            .addClass("DocProductsHoja")
        );
      }

      // var divImg = $("<div>").attr("class","noClose imagenProducto");
      // divImg.append($("<img>").attr("src",response.data.listImg == null?"": response.data.listImg[0]).addClass("noClose"));
      // divInfo.append(divImg);

      // --------------------------------------------------------------------------------------------------------------------------

      if (!isMobileDevice()) {
        divInfo.append(divCarrusel);
        divInfo.append($("<br>"));
      }

      // ---------------------------------------------------------------------------------------------------------------------------

      if (localStorage.getItem("session") == 1) {
        divInfo.append(
          $("<button>")
            .attr("type", "button")
            .attr("class", "btn btn-success ")
            .html("editar")
            .attr("style", "margin-top:2%;")
            .attr("onclick", "getProductForUpdate(" + id + ")")
        );
        divInfo.append($("<br>"));
        divInfo.append(
          $("<button>")
            .attr("type", "button")
            .attr("class", "btn btn-danger ")
            .html("eliminar")
            .attr("style", "margin-top:2%;")
            .attr("onclick", "getProductForDelete(" + id + ")")
        );
        divInfo.append($("<br>"));
      }
      var href =
        "https://api.whatsapp.com/send/?phone=573213139743&text=Hola estoy interesado en el producto " +
        response.data.name +
        ".&type=phone_number&app_absent=0";

      var whatsapp = $("<a>").attr("href", href).attr("target", "_blank");
      whatsapp.append(
        $("<img>")
          .attr("src", "img/Boton-Producto-Whatsapp.png")
          .attr("id", "whatsmobile")
          .addClass("noClose")
      );

      divInfo.append(whatsapp);

      div.append(divlogo);
      div.append(divAmount);
      div.append(divInfo);

      $("#formModal").append(div);
    },
    error: function (xhr, status, error) {
      // Manejar errores
      console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
    },
  });
}

let scrollAmount = 0;

function nextProdIMg() {
  const $miDiv = $("#carousel-product");
  const maxScroll = $miDiv[0].scrollWidth - $miDiv.width();

  scrollAmount += 100; // Incrementar el desplazamiento
  if (scrollAmount > maxScroll) {
    scrollAmount = 0; // Resetear al principio si se supera el máximo
  }

  $miDiv.animate({ scrollLeft: scrollAmount }, 500); // Animar el scroll horizontal
}

function prevProdIMg() {
  const $miDiv = $("#carousel-product");
  const maxScroll = $miDiv[0].scrollWidth - $miDiv.width();

  scrollAmount -= 100; // Disminuir el desplazamiento
  if (scrollAmount < 0) {
    scrollAmount = maxScroll; // Resetear al final si se pasa del inicio
  }

  $miDiv.animate({ scrollLeft: scrollAmount }, 500); // Animar el scroll horizontal
}

function getProductForUpdate(id) {
  $.ajax({
    url: "aplication/RequestController.php?action=getProduct&id=" + id, // Archivo PHP que contiene la función
    type: "GET", // Método de solicitud
    success: function (responseProduct) {
      //console.log(response.replace(/\\/g, ''));
      responseProduct = (JSON.parse(responseProduct));
      getSession()
        .then(function (session) {
          $("#formModal").html("");
          if (session == "[]" || session == "") {
            session = JSON.parse(session);

            var form = $("<form>").attr("id", "miFormulario");

            form.append(
              $("<i>")
                .attr("font-size", "20vh")
                .attr("class", "fas fa-times-circle")
                .attr("style", "color: #32aa48; font-size:23vh;")
            );

            form.append($("<label>").text("error: "));
            form.append(
              $("<input>")
                .attr("type", "text")
                .attr("disabled", "disabled")
                .attr("value", "Sesión no iniciada")
                .attr("style", "text-align: center;")
            );

            // Agregar el formulario al cuerpo del documento
            $("#formModal").append(form);

            return;
          }

          var form = $("<form>").attr("id", "miFormulario");

          form.append($("<label>").text("Nombre del producto: "));
          form.append(
            $("<input>")
              .attr("type", "text")
              .attr("value", responseProduct.data.name)
              .attr("name", "name")
              .attr("required", "required")
          );

          form.append($("<label>").text("Descripción del producto: "));
          form.append(
            $("<textarea>")
              .attr("name", "description")
              .attr("style", "width: calc(100% - 20px);")
              .val(responseProduct.data.description)
          );

          form.append($("<label>").text("Logo del producto: "));
          form.append(
            $("<input>")
              .attr("type", "file")
              .attr("name", "logo")
              .attr("style", "color:black;")
          );

          form.append($("<label>").text("Logo del proveedor del producto: "));
          form.append(
            $("<input>")
              .attr("type", "file")
              .attr("name", "proveedor")
              .attr("style", "color:black;")
          );

          form.append($("<label>").text("Imagenes del producto: "));
          form.append(
            $("<input>")
              .attr("type", "file")
              .attr("name", "images[]")
              .attr("multiple", "multiple")
              .attr("style", "color:black;")
          );

          var divImg = $("<div>").addClass("noClose");
          responseProduct.data.listImg.forEach((element) => {
            // var pDocs = $("<p>").addClass("noClose");
            // pDocs.append($("<a>").attr("href", element).attr("target", "_blank").html(element.split("/")[element.split("/").length-1]).addClass("noClose").addClass("fuente-century-gothic").addClass("DocProducts"));
            var divContent = $("<div>")
              .addClass("ContentFiles")
              .addClass("noClose");
            var divContentFile = $("<div>")
              .addClass("ContentFile")
              .html(
                '<a href="' +
                  element +
                  '" target="_blank" class="noClose">' +
                  element.split("/")[element.split("/").length - 1] +
                  "</a>"
              )
              .addClass("noClose");
            var divContentActions = $("<div>")
              .addClass("ContentFileActions")
              .addClass("noClose");
            divContentActions.append(
              $("<button>")
                .attr("type", "button")
                .attr("class", "btn btn-danger")
                .attr(
                  "onclick",
                  'deleteDocsPro("' +
                    element +
                    '",' +
                    responseProduct.data.id +
                    "," +
                    1 +
                    ")"
                )
                .html('<i class="far fa-trash-alt"></i>')
                .addClass("noClose")
            );
            divContent.append(divContentFile);
            divContent.append(divContentActions);
            divImg.append(divContent);
          });
          form.append(divImg);

          form.append($("<label>").text("Archivos asociados al producto: "));
          form.append(
            $("<input>")
              .attr("type", "file")
              .attr("name", "files[]")
              .attr("multiple", "multiple")
              .attr("style", "color:black;")
          );

          var divFile = $("<div>").addClass("noClose");
          responseProduct.data.listDocs.forEach((element) => {
            // var pDocs = $("<p>").addClass("noClose");
            // pDocs.append($("<a>").attr("href", element).attr("target", "_blank").html(element.split("/")[element.split("/").length-1]).addClass("noClose").addClass("fuente-century-gothic").addClass("DocProducts"));
            var divContent = $("<div>")
              .addClass("ContentFiles")
              .addClass("noClose");
            var divContentFile = $("<div>")
              .addClass("ContentFileDoc")
              .html(
                '<a href="' +
                  element +
                  '" target="_blank" class="noClose">' +
                  element.split("/")[element.split("/").length - 1] +
                  "</a>"
              )
              .addClass("noClose");
            var divContentActions = $("<div>")
              .addClass("ContentFileActions")
              .addClass("noClose");
            divContentActions.append(
              $("<button>")
                .attr("type", "button")
                .attr("class", "btn btn-danger")
                .attr(
                  "onclick",
                  'deleteDocsPro("' +
                    element +
                    '",' +
                    responseProduct.data.id +
                    "," +
                    0 +
                    ")"
                )
                .html('<i class="far fa-trash-alt"></i>')
                .addClass("noClose")
            );
            var divContentSelect = $("<div>")
              .addClass("selectFile")
              .addClass("noClose");
            var selectContent = $("<select>")
              .attr(
                "onchange",
                'updateFicha("' +
                  element +
                  '",' +
                  responseProduct.data.id +
                  ", event )"
              )
              .addClass("form-select")
              .addClass("noClose");

            var hoja = $("<option>").val("hoja").html("hoja");
            var ficha = $("<option>").val("ficha").html("ficha");
            var select = $("<option>").val("Seleccione").html("Seleccione");
            if (responseProduct.data.hoja == element) {
              hoja.attr("selected", "selected");
            } else if (responseProduct.data.ficha == element) {
              ficha.attr("selected", "selected");
            } else {
              select.attr("selected", "selected");
            }
            selectContent.append(select);
            selectContent.append(ficha);
            selectContent.append(hoja);
            divContentSelect.append(selectContent);

            divContent.append(divContentFile);
            divContent.append(divContentSelect);
            divContent.append(divContentActions);
            divFile.append(divContent);
          });
          form.append(divFile);

          form.append(
            $("<input>")
              .attr("type", "hidden")
              .attr("name", "amount")
              .attr("id", "amountInput")
              .val(responseProduct.data.amount + ",")
          );
          if (
            responseProduct.data.amount != null ||
            responseProduct.data.amount != ""
          ) {
            var div1 = $("<div>")
              .attr("id", "amount")
              .attr("style", "margin-top:2%;");

            $.ajax({
              url: "aplication/RequestController.php?action=getAmounts", // Archivo PHP que contiene la función
              type: "GET", // Método de solicitud
              success: function (response) {
                response = (JSON.parse(response));

                var divFirst = $("<div>")
                  .attr("class", "amounts noClose")
                  .attr("style", "width:100%;color:black;");

                divFirst.append(
                  $("<h4>").html("presentaciones").attr("class", "bold noClose")
                );

                // Iterar sobre los objetos dentro de cada categoría
                var i = 0;
                response.data.forEach(function (element) {
                  var divData = $("<div>")
                    .attr("class", "AmountsEach")
                    .addClass("noClose")
                    .attr("style", "display:inline-flex;width:50%;");

                  var input = $("<input>")
                    .attr("type", "checkbox")
                    .attr("onclick", "AmountAdd(" + element.id + ")")
                    .attr("name", element.name)
                    .attr("id", "checkBox-amount-" + element.id)
                    .attr("style", "width:20%;");
                  if (
                    responseProduct.data.amount.includes("{" + element.id + "}")
                  ) {
                    input.prop("checked", true);
                  }
                  divData.append(input);

                  divData.append(
                    $("<label>").text(element.name).attr("styles", "width:80%;")
                  );

                  divFirst.append(divData);
                  i++;
                });

                div1.append(divFirst);
              },
              error: function (xhr, status, error) {
                // Manejar errores
                console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
              },
            });
          }
          form.append(div1);
          form.append(
            $("<input>")
              .attr("type", "text")
              .attr("name", "amountOther")
              .attr("placeholder", "Otra cantidad")
              .val(responseProduct.data.amountOther)
          );

          if (
            (responseProduct.data.filters != null ||
              responseProduct.data.filters != "") &&
            sessionStorage.getItem("currentPageID") != "#tm-section-14"
          ) {
            var div = $("<div>")
              .attr("id", "filters")
              .attr("style", "margin-top:2%;")
              .addClass("noClose");

            $.ajax({
              url: "aplication/RequestController.php?action=getfilters", // Archivo PHP que contiene la función
              type: "GET", // Método de solicitud
              success: function (response) {
                response = JSON.parse(response);

                for (var key in response.data) {
                  var divFirst = $("<div>")
                    .attr("class", "filters noClose")
                    .attr("style", "width:100%;color:black;");

                  if (response.data.hasOwnProperty(key)) {
                    divFirst.append(
                      $("<h4>").html(key).attr("class", "bold noClose")
                    );
                    var objetos = response.data[key];
                    // Iterar sobre los objetos dentro de cada categoría
                    objetos.forEach(function (element) {
                      var divData = $("<div>")
                        .attr("class", "filtersEach")
                        .attr("style", "display:inline-flex;width:50%;");
                      var input = $("<input>")
                        .attr("type", "checkbox")
                        .attr("onclick", "filterAdd(" + element.id + ")")
                        .attr("name", element.name)
                        .attr("id", "checkBox-" + element.id)
                        .attr("style", "width:20%;");
                      if (
                        responseProduct.data.filters.includes(
                          "{" + element.id + "}"
                        )
                      ) {
                        input.prop("checked", true);
                      }
                      divData.append(input);
                      divData.append(
                        $("<label>")
                          .text(element.name)
                          .attr("styles", "width:80%;")
                      );

                      divFirst.append(divData);
                    });
                    div.append(divFirst);
                  }
                }
              },
              error: function (xhr, status, error) {
                // Manejar errores
                console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
              },
            });

            form.append(div);

            form.append(
              $("<input>")
                .attr("type", "text")
                .attr("name", "filters")
                .attr("id", "filtersInput")
                .attr("hidden", "hidden")
                .val(responseProduct.data.filters + ",")
            );
          }

          form.append(
            $("<input>")
              .attr("type", "text")
              .attr("name", "section")
              .attr("hidden", "hidden")
              .attr("value", sessionStorage.getItem("currentPageID"))
          );

          form.append(
            $("<input>")
              .attr("type", "text")
              .attr("name", "id")
              .attr("hidden", "hidden")
              .attr("value", responseProduct.data.id)
          );

          form.append(
            $("<input>")
              .attr("type", "text")
              .attr("name", "action")
              .attr("hidden", "hidden")
              .attr("value", "editProducts")
          );

          form.append(
            $("<button>")
              .attr("type", "submit")
              .text("Editar producto")
              .attr("id", "editProducts")
          );

          // Agregar el formulario al cuerpo del documento
          $("#formModal").append(form);

          // Manejar el envío del formulario
          $("#miFormulario").submit(function (event) {
            $("body").toggleClass("loaded");
            event.preventDefault(); // Prevenir el envío del formulario normal
            formData = new FormData(this);
            // Hacer una llamada AJAX al archivo PHP
            $.ajax({
              url: "aplication/RequestController.php", // Archivo PHP que contiene la función
              type: "POST", // Método de solicitud
              data: formData,
              contentType: false,
              processData: false, // Datos a enviar (datos del formulario serializados)
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
                $("body").toggleClass("loaded");

                $("#modalBackground").toggleClass("hide");

                // Mostrar la alerta
                $("#alerta").fadeIn();

                chargeProducts(
                  sessionStorage
                    .getItem("currentPageID")
                    .replace("#tm-section-", "")
                    .trim()
                );

                // Desvanecer la alerta después de 3 segundos
                setTimeout(function () {
                  $("#alerta").fadeOut();
                }, 3000);
              },
              error: function (xhr, status, error) {
                // Manejar errores
                console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
              },
            });
          });
        })
        .catch(function (error) {
          // Ha ocurrido un error al obtener la sesión
          console.log("Error al obtener la sesión:", error);
        });
    },
    error: function (xhr, status, error) {
      // Manejar errores
      console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
    },
  });
}

function getProductForDelete(id) {
  $.ajax({
    url: "aplication/RequestController.php?action=getProduct&id=" + id, // Archivo PHP que contiene la función
    type: "GET", // Método de solicitud
    success: function (responseProduct) {
      //console.log(response.replace(/\\/g, ''));
      responseProduct = (JSON.parse(responseProduct));
      getSession()
        .then(function (session) {
          $("#formModal").html("");
          if (session == "[]" || session == "") {
            session = JSON.parse(session);

            var form = $("<form>").attr("id", "miFormulario");

            form.append(
              $("<i>")
                .attr("font-size", "20vh")
                .attr("class", "fas fa-times-circle")
                .attr("style", "color: #32aa48; font-size:23vh;")
            );

            form.append($("<label>").text("error: "));
            form.append(
              $("<input>")
                .attr("type", "text")
                .attr("disabled", "disabled")
                .attr("value", "Sesión no iniciada")
                .attr("style", "text-align: center;")
            );

            // Agregar el formulario al cuerpo del documento
            $("#formModal").append(form);

            return;
          }

          var form = $("<form>").attr("id", "miFormulario");

          form.append(
            $("<h4>")
              .text("Esta seguro de eliminar el producto: ")
              .addClass("noClose")
          );

          form.append($("<label>").text("Nombre del producto: "));
          form.append(
            $("<input>")
              .attr("type", "text")
              .attr("disabled", "disabled")
              .attr("value", responseProduct.data.name)
              .attr("name", "name")
              .attr("required", "required")
          );

          form.append(
            $("<input>")
              .attr("type", "text")
              .attr("name", "id")
              .attr("hidden", "hidden")
              .attr("value", responseProduct.data.id)
          );

          form.append(
            $("<input>")
              .attr("type", "text")
              .attr("name", "action")
              .attr("hidden", "hidden")
              .attr("value", "deleteProducts")
          );

          form.append(
            $("<button>")
              .attr("type", "submit")
              .text("Eliminar producto")
              .attr("id", "deleteProducts")
          );

          // Agregar el formulario al cuerpo del documento
          $("#formModal").append(form);

          // Manejar el envío del formulario
          $("#miFormulario").submit(function (event) {
            $("body").toggleClass("loaded");
            event.preventDefault(); // Prevenir el envío del formulario normal
            formData = new FormData(this);
            // Hacer una llamada AJAX al archivo PHP
            $.ajax({
              url: "aplication/RequestController.php", // Archivo PHP que contiene la función
              type: "POST", // Método de solicitud
              data: formData,
              contentType: false,
              processData: false, // Datos a enviar (datos del formulario serializados)
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
                $("body").toggleClass("loaded");

                $("#modalBackground").toggleClass("hide");

                // Mostrar la alerta
                $("#alerta").fadeIn();

                chargeProducts(
                  sessionStorage
                    .getItem("currentPageID")
                    .replace("#tm-section-", "")
                    .trim()
                );

                // Desvanecer la alerta después de 3 segundos
                setTimeout(function () {
                  $("#alerta").fadeOut();
                }, 3000);
              },
              error: function (xhr, status, error) {
                // Manejar errores
                console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
              },
            });
          });
        })
        .catch(function (error) {
          // Ha ocurrido un error al obtener la sesión
          console.log("Error al obtener la sesión:", error);
        });
    },
    error: function (xhr, status, error) {
      // Manejar errores
      console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
    },
  });
}

function nextProductIMg(currentImg) {
  var nextPage =
    $(".carousel-item").length - 1 < currentImg + 1 ? 0 : currentImg + 1;
  $(".carousel-item").removeClass("active");
  $("#carousel-item" + nextPage).addClass("active");
  $("#carousel-control-next").removeAttr("onclick");
  $("#carousel-control-next").attr(
    "onclick",
    "nextProductIMg(" + nextPage + ")"
  );
}

function prevProductIMg(currentImg) {
  var nextPage =
    0 > currentImg - 1 ? $(".carousel-item").length - 1 : currentImg - 1;
  $(".carousel-item").removeClass("active");
  $("#carousel-item" + nextPage).addClass("active");
  $("#carousel-control-prev").removeAttr("onclick");
  $("#carousel-control-prev").attr(
    "onclick",
    "prevProductIMg(" + nextPage + ")"
  );
}

function deleteDocsPro(docName, id, Type) {
  $.ajax({
    url: "aplication/RequestController.php", // Archivo PHP que contiene la función
    type: "POST", // Método de solicitud
    data: {
      action: "deleteDocsPro",
      docName: docName, // Variable1 que deseas enviar
      id: id, // Variable2 que deseas enviar
      type: Type, // Variable3 que deseas enviar
    },
    success: function (response) {
      // Manejar la respuesta
      response = (JSON.parse(response));
      chargeProducts(
        sessionStorage
          .getItem("currentPageID")
          .replace("#tm-section-", "")
          .trim()
      );
      getProductForUpdate(id);
    },
    error: function (xhr, status, error) {
      // Manejar errores
      console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
    },
  });
}

function updateFicha(docName, id, event) {
  if (event.target.value == "Seleccione") {
    return;
  }
  $.ajax({
    url: "aplication/RequestController.php", // Archivo PHP que contiene la función
    type: "POST", // Método de solicitud
    data: {
      action: "UpdateDocsPro",
      docName: docName, // Variable1 que deseas enviar
      id: id, // Variable2 que deseas enviar
      type: event.target.value, // Variable3 que deseas g
    },
    success: function (response) {
      // Manejar la respuesta
      response = JSON.parse(response);
      chargeProducts(
        sessionStorage
          .getItem("currentPageID")
          .replace("#tm-section-", "")
          .trim()
      );
      getProductForUpdate(id);
    },
    error: function (xhr, status, error) {
      // Manejar errores
      console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
    },
  });
}

function closeCell() {
  $(".filter-product").toggleClass("hideCell");
}

function seeFilters(event) {
  $("#searchMenuCell0").val("");
  $(".filter-product").toggleClass("hideCell");
  searchCell(0, event);
}
