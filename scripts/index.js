
window.onload = ()=>{

  /*handling clicks on circles*/
  document.onclick = (event)=>{
    click(event)
  }

  document.onmousemove = (event)=>{
    opacityChange("header", "x", event)    
  }

}
