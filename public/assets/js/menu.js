const placeOrderBtn = document.getElementById("placeOrderBtn");

placeOrderBtn.addEventListener("click", async () => {
  const response = await fetch("/api/items");
  menuItems = await response.json();
  orderArray = [];
  totalPrice = 0;

  JSON.parse(menuItems).appetizerItems.forEach((element) => {
    let quantity = document.getElementById(element.id + "Quantity").value;
    if (quantity > 5 || quantity < 0) {
      alert("You can order only 5 plates at a time");
      return;
    }

    if (quantity) {
      totalPrice += quantity * element.price;
      orderArray.push({ quantity: quantity, item: element.name });
    }
  });

  JSON.parse(menuItems).mainItems.forEach((element) => {
    let quantity = document.getElementById(element.id + "Quantity").value;
    if (quantity > 5 || quantity < 0) {
      alert("You can order only 5 plates at a time");
      return;
    }
    if (quantity) {
      totalPrice += quantity * element.price;
      orderArray.push({ quantity: quantity, item: element.name });
    }
  });

  JSON.parse(menuItems).dessertItems.forEach((element) => {
    let quantity = document.getElementById(element.id + "Quantity").value;
    if (quantity > 5 || quantity < 0) {
      alert("You can order only 5 plates at a time");
      return;
    }
    if (quantity) {
      totalPrice += quantity * element.price;
      orderArray.push({ quantity: quantity, item: element.name });
    }
  });

  orderString = JSON.stringify(orderArray);
  console.log(orderString);
  if (totalPrice > 0) {
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
    } catch (error) {
      alert(error);
    }
  }
});
