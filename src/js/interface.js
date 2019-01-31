function devenirRiche() {
  alert("Swiggity swooty, your account is now empty!");
}

function zidaneMode() {
  document.body.style.backgroundImage = "url('../../images/zidane_1.jpg')";
  const jumbo = document.getElementById("jumbo");
  jumbo.style.backgroundImage = "url('../../images/zidane.jpg')";
  const footer = document.getElementById("footer");
  footer.style.backgroundImage = "url('../../images/zidane_2.jpeg')";
  const card = document.getElementById("card");
  card.style.backgroundImage = "url('../../images/zidane_3.jpeg')";
  const btn = document.getElementById("btn");
  btn.classList.add("btn-zidane");
  const leaflet = document
    .getElementById("map")
    .classList.add("leaflet-container-zidane");
}

class Display {
  displayMessage(msg) {
    document.getElementById("uri-disp").innerHTML = msg;
  }

  displayImage(img) {
    document.getElementById("img-disp").src = img;
  }

  bindButtons() {
    document.getElementById("btn").addEventListener("click", devenirRiche);
    document.getElementById("zidane-btn").addEventListener("click", zidaneMode);
  }
}

export default new Display();
