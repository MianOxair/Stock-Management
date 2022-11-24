$(document).ready(function () {
  $("#logout").click(function () {
    localStorage.setItem("usr", "");
    window.location.href = "index.html";
  });

});

document.addEventListener("DOMContentLoaded", () => {
    const addStockForm = document.querySelector("#addStock");

    addStockForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const stockName = $("#stockName").val();
      const Desc = $("#Desc").val();
      const Category = $("#Category").val();
      const Price = $("#Price").val();
      const Quantity = $("#Quantity").val();

      if (
        stockName == null ||
        Price == null ||
        stockName == "" ||
        Price == "" || 
        Quantity == ""
      ) {
        setFormMessage(
          addStockForm,
          "error",
          "Please provide the name, price and quantity as well"
        );
        return;
      }

      const data = JSON.stringify({
        name: stockName,
        description: Desc,
        quantity: Quantity,
        category: Category,
        price: Price,
        image: ".jpg",
      });

      $.ajax({
        url: "http://localhost:3030/stockManagement",
        method: "POST",
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