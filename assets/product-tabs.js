document.addEventListener("DOMContentLoaded", function() {

  document.querySelector(".z_flex_grid .z_tab_button").classList.add("z_active_tab");

  document.querySelectorAll(".z_tab_button").forEach(function(elem) {
    elem.addEventListener("click", function() {
      if( !this.classList.contains("z_active_tab")) {
        document.querySelectorAll(".z_tab_button").forEach(function(elem1) {
          elem1.classList.remove("z_active_tab");

        })
         document.querySelectorAll(".z_tab_content").forEach(function(elem1) {
          elem1.style.opacity="0";
           elem1.style.display="none";
           // elem1.style.visibility="hidden";
           

        })
        this.classList.add("z_active_tab");
       let index = this.getAttribute("index");
        console.log("index" , index)
        document.querySelector(`.z_tab_content:nth-child(${index})`).style.opacity="1";
         document.querySelector(`.z_tab_content:nth-child(${index})`).style.display="block";
         // document.querySelector(`.z_tab_content:nth-child(${index})`).style.visibility="visible";
      }
    })
  })  

})