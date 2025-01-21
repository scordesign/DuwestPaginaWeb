$(document).ready(function () {

    getSessionDefault();
    

    $("#closeModal").on("click", function () {
        $(".outWhats").toggleClass("hide");
        $("#formModalNotice").html("");
        $("#formModal").html("");
        $("#modalBackground").toggleClass("hide");
    });

    $("body").on("click", function (event) {
        var user = $(event.target).is("#user-add") || $(event.target).is(".fa-user");
        var modal =$(event.target).is(".noClose")|| $(event.target).is(".filtersEach") || $(event.target).is("textarea") || $(event.target).is("#modal") || $(event.target).is("#modalNotice") || $(event.target).is("#formModal") || $(event.target).is("#formModalNotice") || $(event.target).is("label") || $(event.target).is("input") || $(event.target).is("#miFormulario") || $(event.target).is("button") || $(event.target).is("i");

        if (!modal && !$("#modalBackground").hasClass("hide") && !user) {
            $("#formModalNotice").html("");
            $("#formModal").html("");
            $("#modalBackground").toggleClass("hide");
        }

        if (!modal && !$("#modalBackgroundNotice").hasClass("hide") && !user) {
            $("#formModalNotice").html("");
            $("#formModal").html("");
            $("#modalBackgroundNotice").toggleClass("hide");
        }
    });

    $("#closeModalNotice").on("click", function () {
        $("#formModal").html("");
        $("#formModalNotice").html("");
        $("#modalBackgroundNotice").toggleClass("hide");
    });

});

function getSessionDefault() {
    $.ajax({
        url: "aplication/RequestController.php?action=getSession",
        type: "GET",
        success: function (response) {
            if(response !== "[]" && response !== ""){
                localStorage.setItem("session","1")
                $('.adminSession').removeClass("hide");
            }else{
                localStorage.setItem("session","0")
                $('.adminSession').addClass("hide");
            }
        },
        error: function (xhr, status, error) {
            console.log(error);
           // reject(error); // Rechaza la promesa con el error
        }
    });
}


function isMobileDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Tests for match in userAgent string for mobile regex
  if (/android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent) || window.innerWidth <= 768) {
    return true;
  } else {
    return false;
  }
}

function getSession() {
    
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "aplication/RequestController.php?action=getSession",
            type: "GET",
            success: function (response) {
                response = (response == "\r\n") ? "" :response;
                resolve(response); // Resuelve la promesa con la respuesta del servidor
            },
            error: function (xhr, status, error) {
                reject(error); // Rechaza la promesa con el error
            }
        });
    });
}


// Crear el formulario dinámicamente


