document.addEventListener('DOMContentLoaded', () => {
  db.collection("platos").get().then((querySnapshot) => {
    const menuContainer = document.getElementById("menuContainer");
    menuContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const plato = doc.data();
      const platoDiv = document.createElement("div");
      platoDiv.className = "plato";
      platoDiv.innerHTML = `
        <h3>${plato.nombre}</h3>
        <p>Ingredientes: ${plato.ingredientes}</p>
        <p>Precio: ${plato.precio}</p>
      `;
      menuContainer.appendChild(platoDiv);
    });
  });
});