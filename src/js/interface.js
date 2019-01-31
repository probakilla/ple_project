function devenirRiche() {
  alert("Swiggity swooty, your account is now empty!");
}

function zidaneMode() {
  document.body.classList.add("zidane-leaderprice");
  document.getElementById("jumbo").classList.add("zidane-leaderprice2");
  document.getElementById("footer").classList.add("zidane-dior");
  document.getElementById("card").classList.add("zidane-clap");
  document.getElementById("btn").classList.add("btn-zidane");
  document.getElementById("map").classList.add("leaflet-container-zidane");
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
