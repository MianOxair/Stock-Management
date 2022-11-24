$(document).ready(function () {
  $("#logout").click(function () {
    localStorage.setItem("usr", "");
    window.location.href = "index.html";
  });

  $.ajax({
    url: "http://localhost:3030/stockManagement",
    method: "GET",
    success: function (res) {
      if (res?.length > 0) {
        Array.from(res, (item) => {
          $("#Item-table").append(`
            <tr>
              <td><a href="index-Update.html?id=${item._id}"> ${item.name} </a></td>
              <td> ${item.category}</td>
              <td> ${item.price}</td>
              <td> ${item.quantity}</td>
              <td><a  id="${item._id}"> <img  alt="" src="./assets/trash-icon.svg" height="16" width="16"></img> </a></td>
            </tr>`);
        });
      }
    },
    error: function (err) {
      console.error(err);
    },
  });

  $("#Item-table").on("click", "a", function (e) {
    
    if (e.target.tagName == "A") {
      return;
    }

    e.preventDefault();
    
  	var result = confirm('Do you want to delete this item?');
    if(!result){
      return false;
    }
    
    var idValue = $(this).attr("id");
    $.ajax({
      url: `http://localhost:3030/stockManagement/${idValue}`,
      method: "DELETE",
      success: function (res) {
        if (res!=null) {
            alert(res.message);
            window.location.reload();
        }
      },
      error: function (err) {
        console.error(err);
      },
    });

  });
});
