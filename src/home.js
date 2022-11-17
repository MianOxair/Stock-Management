$(document).ready(function () {
  $("#logout").click(function () {
    localStorage.setItem("usr", "");
    window.location.href = "index.html";
  });

  $.ajax({
    url: "http://localhost:3030/stockManagement",
    method: "GET",
    success: function (res) {
      //console.log(res);
      //localStorage.setItem("usr", JSON.stringify(res));
      //window.location.href = "index2.html";
      if (res?.length > 0) {
        Array.from(res, (item) => {
          $("#Item-table").append(`<tr><td> ${item.name}</td><td> ${item.description}</td><td> ${item.category}</td><td> ${item.price}</td><td> ${item.quantity}</td></tr>`);
        });
      }
    },
    error: function (err) {
      console.error(err);
    },
  });
});
