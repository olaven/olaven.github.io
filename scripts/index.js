// NOTE: I want to implement a contact form made in elm
window.onload = ()=>{

  /*handling clicks on circles*/
  document.onclick = (event)=>{
    click(event)
  }

  document.onmousemove = (event)=>{
    opacityChange("header", "x", event)
  }

}
