// const menuItems = require('../../../utils/items') Fetch the items.js to check id
const placeOrderBtn = document.getElementById("placeOrderBtn");

placeOrderBtn.addEventListener("click", async () => {
  // window.location.href = "/signup";
  const response = await fetch("/api/items");
  menuItems = await response.json();
  orderArray = [];
  totalPrice = 0;

  JSON.parse(menuItems).appetizerItems.forEach((element) => {
    let quantity = document.getElementById(element.id + "Quantity").value;

    if (quantity) {
      totalPrice += quantity * element.price;
      orderArray.push({ quantity: quantity, item: element.id });
    }
  });

  orderString = JSON.stringify(orderArray);
  console.log(orderString);
  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: orderString,
        totalPrice: totalPrice,
      }),
    });

    await response.json();
    window.location.href = "/menu";
    // orderPaced => POST /menu body
    // orderPlaced = response.orderPlaced
    // orderPlaced = true;
    // window.location.reload();
  } catch (error) {
    alert(error);
  }

  // try {
  //   const response = await fetch("/menu", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       order: orderString,
  //       totalPrice: totalPrice,
  //     }),
  //   });
    
  // } catch (error) {
  //   alert(error);
  // }
});
