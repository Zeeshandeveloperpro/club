var swiper1 = new Swiper(".custom_image_gallery .swiper", {
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  loop: true,
  navigation: {
    nextEl: ".custom_image_gallery .swiper-button-next",
    prevEl: ".custom_image_gallery .swiper-button-prev",
  },
  pagination: {
    el: ".custom_image_gallery .swiper-pagination",
    clickable: true
  }
});


// If you want to get the checked radio anytime:
function getSelectedTechnique() {
  const selected = document.querySelector('input[name="Technique_de_personnalisation"]:checked');
  if (selected) {
    console.log("Currently checked:", selected.value);
    console.log("Quantity:", selected.dataset.quantity);
    return selected.dataset.quantity;
  }
  return null;
}


function technique_select(el) {
  // el is the radio input that just changed
  const quantity = getSelectedTechnique();
  let quantityWrapper = document.querySelector(".product__info-wrapper input[name='quantity']")
          
                if(quantityWrapper) quantityWrapper.setAttribute("data-quantity" , quantity);
                let defined_minimum = document.querySelector(".defined_minimum");
                if(defined_minimum) defined_minimum.textContent = `( Min. quantity: ${quantity} )`
  console.log("Quantity:", quantity);
}


let option__change = document.querySelectorAll(".option__change");
console.log(".option__change", option__change);

if (option__change.length > 0) {
  option__change.forEach(function(option) {
    option.addEventListener("change", function() {
      console.log("change", option)
      let value = '';
      let checkedInputs = option.closest(".custom_variant_options__wrapper")?.querySelectorAll('input:checked');
      
      checkedInputs?.forEach(function(input, index) {
        value += input.value;
        if (index < checkedInputs.length - 1) {
          value += ' / ';
        }
      });
console.log("value" , value)
      let variants_varify = document.querySelector(".variants_varify");
      if (variants_varify) {
        variants_varify.querySelectorAll("option").forEach((opt) => {
          let title = opt.textContent.trim();
          console.log("title" , title)
          if (title === value.trim()) {
            let quantityWrapper = document.querySelector(".product__info-wrapper input[name='quantity']")
            let Quantity = opt.dataset.quantity;
                if(quantityWrapper) quantityWrapper.setAttribute("data-quantity" , Quantity);
                let defined_minimum = document.querySelector(".defined_minimum");
                if(defined_minimum) defined_minimum.textContent = `( Min. quantity: ${Quantity} )`
                
            console.log("Quantity" , Quantity)

            variants_varify.value = opt.value;
            let selectedId = opt.dataset.id;
            let addbutton  = document.querySelector(".clublab-add-to-cart");

            if(addbutton) addbutton.dataset.variantId = `${selectedId}`

            // Handle image upload logo design
            let image_upload = document.querySelector(".image_design_upload");
            if (image_upload) {
              let image_upload_logo_design = image_upload.querySelectorAll(".image_upload_logo_design");
              let selected = variants_varify.options[variants_varify.selectedIndex];
              
                    console.log("selected" ,selectedId )
              if (image_upload_logo_design.length > 0) {
                image_upload_logo_design.forEach((div) => div.style.display = "none");
                image_upload_logo_design.forEach((logo_item) => {
                
                  if (Number(selectedId) === Number(logo_item.dataset.id)) {
                    logo_item.style.display = "block";
                      console.log("logos" , selectedId , logo_item.dataset.id)
                 
                
                  }
                });
              }
            }

            // Slide to correct image
            let src = opt.dataset.image?.trim();
            let custom_image_gallery = document.querySelector(".custom_image_gallery");
            if (custom_image_gallery && src) {
              let slides = custom_image_gallery.querySelectorAll(".swiper-slide");
              slides.forEach(function(slide, index) {
                let img = slide.querySelector("img");
                if (img && img.getAttribute("src").trim() === src) {
                  if (swiper1) {
                    swiper1.slideTo(index);
                  }
                }
              });
            }
          }
        });
      }
    });
  });
}

// Quantity calculation
function quantity_input(el) {
  let total_value = 0;
  document.querySelectorAll(".quantity_sub_selector").forEach((selector) => {
    total_value += Number(selector.value);
  });

  let quantity__input = document.querySelector(".product__info-container .quantity__input");
  if (quantity__input) {
    quantity__input.value = total_value;
  }
  console.log(total_value);
}

function blur_input(el) {
  if(el.value.trim() === "") el.value = 0
  quantity_input(el)
  let quantity__input = document.querySelector(".product__info-container .quantity__input");
  if (quantity__input) {
   changequantity(quantity__input)
  }

}
// Resizeable and dragable

$(".image_upload_logo_design").each(function (index) {
    let container = $(this);

    let uniqueId = "id-" + (index + 1);
    container.attr("id", uniqueId);
    let Handle = container.find(".resizable .handle"); 
    // Apply draggable & resizable to its child
    container.find(".resizable").draggable({
        containment: container
    }).resizable({
        containment: container,
        // handles: { e: '.handle' },
        resize: function(event, ui) {
            // Get width and height in pixels
            var wPx = ui.size.width;
            var hPx = ui.size.height;
            console.log("ui.size" , ui.size)
            // Convert px to cm
            var wCm = ((wPx / 15) * 2.54).toFixed(2);
            var hCm = ((hPx / 15) * 2.54 ).toFixed(2);

            console.log("h:", hCm + " cm", "w:", wCm + " cm", event.target);

            $(event.target)
                .closest(".first_image_print")
                .find(".size-display")
                .text(wCm + " × " + hCm + " cm");
        }
    });
});


async function download_image(el) {
  let   htmlelement = el.closest(".print");
   el.style.visibility = "hidden"; 
  if(htmlelement) {
    const canvas = await html2canvas(htmlelement , {scale: 2});
    const dataUrl = canvas.toDataURL('image/png');
   
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'upload_logo_design.png';
     
  a.click();
  setTimeout(()=> {el.style.visibility = "visible"},1000)

    console.log("dataUrl" , a)
  }

}
let thumbnail_logo_item = document.querySelectorAll(".thumbnail_logo_item");
let first_image_print  = document.querySelectorAll(".first_image_print");
if(thumbnail_logo_item.length > 0) {
  thumbnail_logo_item.forEach((item) => {
 item.addEventListener("click" , () => {
    if(item.classList.contains("active")) return;
    let targetClick = item.classList.contains("front") ? 'front' : 'back';
 
    thumbnail_logo_item.forEach(list => list.classList.remove("active"));
    thumbnail_logo_item.forEach((list) => {
        if(list.classList.contains(targetClick)) {
          list.classList.add("active")
        }
    })
    first_image_print.forEach(image => image.style.display = "none");
    first_image_print.forEach((image) => {
       if(image.classList.contains(targetClick)) {
      image.style.display = "block"
       }
    });

 })
  })

}

function gpo_group__childs() {

  let elem = document.querySelector(".gpo-group__childs");
  console.log("elem" , elem)
  if(!elem) {
    setTimeout(gpo_group__childs , 500)
return;
  }
  else {
appendscript(elem);
  }

}
function appendscript(elem) {
  let techniqes = elem.querySelectorAll("input[name='Technique de personnalisation']")
  if(techniqes.length > 0) {
    techniqes.forEach((techniqe) => {
      techniqe.addEventListener("change" , () => {
         gpoPriceupdate()
      })
    })
   let test = elem.querySelectorAll("input");
   test.forEach((t) => {
     if(t.getAttribute("name") != 'Technique de personnalisation') {
     t.addEventListener("change" , () => {
   
      let check = elem.querySelector("input[name='Technique de personnalisation']:checked");
      if(check && check.value === "Sérigraphie")
      {
        let adons = document.querySelectorAll(".show-addon-for-option.has-success");
        if(adons.length > 1) {
          let price = 0;
          adons.forEach((addon , index) => {
            // if()
console.log(index)
          })
        }
        console.log("Sérigraphie")
          console.log("t" , t)
      }
      else {
        console.log("Not Sérigraphie")
      }
     
    
    })
    }
   })
  }
  console.log("techniqes" , techniqes)
}


gpo_group__childs();



