document.addEventListener('DOMContentLoaded', () => {
  const platoForm = document.getElementById("platoForm");
  platoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const ingredientes = document.getElementById("ingredientes").value;
    const precio = document.getElementById("precio").value;
    db.collection("platos").add({ nombre, ingredientes, precio })
      .then(() => {
        platoForm.reset();
        loadPlatos();
      })
      .catch((error) => console.error("Error adding document: ", error));
  });

  function loadPlatos() {
    db.collection("platos").get().then((querySnapshot) => {
      const adminMenuContainer = document.getElementById("adminMenuContainer");
      adminMenuContainer.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const plato = doc.data();
        const platoDiv = document.createElement("div");
        platoDiv.className = "plato";
        platoDiv.innerHTML = `
          <h3>${plato.nombre}</h3>
          <p>Ingredientes: ${plato.ingredientes}</p>
          <p>Precio: ${plato.precio}</p>
          <button onclick="deletePlato('${doc.id}')">Eliminar</button>
        `;
        adminMenuContainer.appendChild(platoDiv);
      });
    });
  }

  window.deletePlato = (id) => {
    db.collection("platos").doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      loadPlatos();
    }).catch((error) => console.error("Error removing document: ", error));
  };

  loadPlatos();
});