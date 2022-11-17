$(document).ready(function () {
  $("#logout").click(function () {
    localStorage.setItem("usr", "");
    window.location.href = "index.html";
  });

});

document.addEventListener("DOMContentLoaded", () => {
    const removeStockForm = document.querySelector("#removeStock");

    removeStockForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const stockName = $("#stockName").val();
      
      if (
        stockName == null ||
        stockName == "" 
      ) {
        deleteFormMessage(
          removeStockForm,
          "error",
          "Please provide the name"
        );
        return;
      }

      const data = JSON.stringify({
        name: stockName
      });

      $.ajax({
        url: "http://localhost:3030/stockManagement",
        method: "DELETE",
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