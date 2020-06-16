
function ALERTFunction() {
    alert("Yet this function is NOT Complete (UNDERCONSTRUCTION)!");
  }

function hidediv()
{
    
    document.getElementById("alert").style.visibility="hidden";
    document.getElementById("alert").style.display="none";

    // document.getElementById("alert").style.display="none";
}
 setTimeout("hidediv()",3000);


function dashboard()
{
    document.getElementById("qrcodee").style.display="none";
    document.getElementById("right-com").style.display = "block";
    document.getElementById("das").style.color= "red";
    document.getElementById("qr").style.color= "black";
}
function Qrcode(){
    document.getElementById("qrcodee").style.display="block";
    document.getElementById("right-com").style.display = "none";
    document.getElementById("das").style.color= "black";
    document.getElementById("qr").style.color= "red";

}

function passwordToggle(){
    var y = document.getElementById("abc");
    var x = document.getElementById("myInput");
    y.classList.toggle("fa-eye");
    y.classList.toggle("fa-eye-slash");
    
    if (x.type === "password") {
        x.type = "text";
    } else {
      x.type = "password";
    }
}

