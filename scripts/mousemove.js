/*functions to trigger on mousemove*/

/*changing the opacity of an element based on x or y pos of mouse*/
let opacityChange = (id, ax, evt)=>{
  let axis;
  let total;
  if(ax === "x"){
    axis = evt.clientX;
    total = window.screen.availWidth;
  }
  else if(ax === "y"){
    axis = evt.clientY;
    total = window.screen.availHeight;
  } else {
    throw "valid axis needed";
    return;
  }

  get.id(id).style.backgroundColor = "rgba(0,0,0, "+((axis/total)/2)+")";
}
