// Save order to localStorage from checkout.html
function saveOrder(data) {
  const orders = JSON.parse(localStorage.getItem("mahaOrders")) || [];
  orders.push(data);
  localStorage.setItem("mahaOrders", JSON.stringify(orders));
}

// Handle order form submission
if (window.location.pathname.includes("checkout.html")) {
  const orderForm = document.getElementById("orderForm");

  orderForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(orderForm);
    const order = {
      name: formData.get("item"),
      quantity: formData.get("quantity"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      customer: formData.get("name"),
      payment: formData.get("payment"),
      status: "Confirmed",
    };

    saveOrder(order);

    orderForm.style.display = "none";
    document.getElementById("confirmation").style.display = "block";
  });
}

// Display orders on orders.html
if (window.location.pathname.includes("orders.html")) {
  const ordersList = document.getElementById("ordersList");

  const orders = JSON.parse(localStorage.getItem("mahaOrders")) || [];

  if (orders.length === 0) {
    ordersList.innerHTML = "<p>No orders found.</p>";
  } else {
    orders.forEach((order, index) => {
      const div = document.createElement("div");
      div.className = "order-card";
      div.innerHTML = `
        <h3>🍽️ ${order.name}</h3>
        <p>Quantity: ${order.quantity}</p>
        <p>Customer: ${order.customer}</p>
        <p>Address: ${order.address}</p>
        <p>Phone: ${order.phone}</p>
        <p>Status: <strong>${order.status}</strong></p>
      `;
      ordersList.appendChild(div);
    });
  }
}

// Basic smooth scroll and UX touches (optional)
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href"))?.scrollIntoView({
        behavior: "smooth"
      });
    });
  });
});
