$(document).ready(function () {
    $("#logout").click(function () {
      localStorage.setItem("usr", "");
      window.location.href = "index.html";
    });

    var idParam = window.location.href.slice(window.location.href.indexOf('?') + 1); 
    var idValue = idParam.split('=')[1];

    $.ajax({
      url: `http://localhost:3030/stockManagement/${idValue}`,
      method: "GET",
      success: function (res) {
        if (res!=null) {
            $("#stockName").val(res.name);
            $("#stockCategory").val(res.category);
            $("#stockDesc").val(res.description);
            $("#quantity").val(res.quantity);
            $("#price").val(res.price);
        }
      },
      error: function (err) {
        console.error(err);
      },
    });

    const addStockForm = document.querySelector("#updateStock");

    addStockForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const stockName = $("#stockName").val();
      const Desc = $("#stockDesc").val();
      const Category = $("#stockCategory").val();
      const quantity = $("#quantity").val();
      const Price = $("#price").val();

      if (
        stockName == null ||
        Price == null ||
        stockName == "" ||
        quantity == "" ||
        Price == ""
      ) {
        setFormMessage(
          addStockForm,
          "error",
          "Please provide the name and price as well"
        );
        return;
      }

      const data = JSON.stringify({
        description: Desc,
        category: Category,
        quantity: quantity,
        price: Price,
      });

      $.ajax({
        url: `http://localhost:3030/stockManagement/${idValue}`,
        method: "PATCH",
        contentType: "application/json;charset=UTF-8",
        data: data,
        success: function (res) {
          console.log(res);
          //localStorage.setItem("usr", JSON.stringify(res));
          window.location.href = "index2.html";
        },
        error: function (err) {
          console.error(err);
        },
      });
    });
  });