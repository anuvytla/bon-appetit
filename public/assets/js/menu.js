// Selecting the UI elements
const placeOrderBtn = document.getElementById("placeOrderBtn");

// Event listener
placeOrderBtn.addEventListener("click", async () => {
  const response = await fetch("/api/items");
  menuItems = await response.json();
  orderArray = [];
  totalPrice = 0;

  // Reading the input by the user and basic validation to send the item and its quantity
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

  // Reading the input by the user and basic validation to send the item and its quantity
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

  // Reading the input by the user and basic validation to send the item and its quantity
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

  // Sending the order details to the backend
  orderString = JSON.stringify(orderArray);
  
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
