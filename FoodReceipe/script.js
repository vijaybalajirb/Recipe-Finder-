
      //Function to fetch api
      async function foodData(datas){
      let x = await fetch(`https://api.edamam.com/search?q=${datas}&app_id=3fe93be3&app_key=a9f263e2371010e01a09552fbe76bac3`);
      let data=await x.json()
      console.log(data.hits)
      displayData(data.hits);

      }

      //Function to display data
      function displayData(data){  
       let body=document.getElementById("body")
       body.innerText=""

       //Getting values of Vitamin.
       for(let i=0;i<data.length;i++){
       let vitaminsArray = []
       let nutrientsName = data[i].recipe.totalNutrients
       vitaminsArray.push(nutrientsName.VITA_RAE,nutrientsName.VITB6A,nutrientsName.VITB12,nutrientsName.VITC,nutrientsName.VITD,nutrientsName.VITK1,nutrientsName.CHOLE,nutrientsName.FAT)
       let nutrientsArray = []

       //looping data to load dynamically
        for(let item = 0; item<vitaminsArray.length;item++){
            nutrientsArray.push(`${vitaminsArray[item].label} : ${vitaminsArray[item].quantity.toFixed(2)}${vitaminsArray[item].unit}`)
        }

        let card = createElement('div');
        setAttribute(card, 'class', 'card m-2 col-md-4 col-lg-3 col-sm-4 col-xs-12');
        appendChild(body, card);

        //Image
        let imgdiv=createElement("div")
        appendChild(card,imgdiv)
        let img = createElement('img');
        img.src = data[i].recipe.image;
        setAttribute(img, 'class', 'card-img-top');
        appendChild(imgdiv, img);

        let cardBody = createElement('div');
        setAttribute(cardBody, 'class', 'card-body text-center');
        appendChild(card, cardBody);

         //recipe name
        let recipeNameDiv=createElement("div")
        setAttribute(recipeNameDiv,"class","card-title")
        recipeNameDiv.innerHTML=`<b>${data[i].recipe.label}</b>`
        appendChild(cardBody,recipeNameDiv)

        
        let b3=createElement("div")
        b3.innerHTML="<br>"
        appendChild(cardBody,b3)

       //To display calories
        let caloriesDiv = createElement('div');
        appendChild(cardBody, caloriesDiv);
    
        let caloriesLabel = createElement('strong');
        caloriesLabel.innerText = 'Calories : ';
        appendChild(caloriesDiv, caloriesLabel);
    
        let calories = createElement('span');
        calories.innerText = Math.round(data[i].recipe.calories);
        appendChild(caloriesDiv, calories);

        //To display health badges
        let badges = createElement('div');
        appendChild(cardBody, badges);

        data[i].recipe.healthLabels.forEach((element) => {
        let badge = createElement('span');
        setAttribute(badge, 'class', 'badge bg-secondary health-badge');
        badge.innerText = element;
        appendChild(badges, badge);
         });

        //break
        let b=createElement("div")
        b.innerHTML="<br>"
        appendChild(cardBody,b)


        //Modal portion
        
        let ingredient=createElement("button")
        setAttribute(ingredient,"class","btn btn-outline-secondary")
        setAttribute(ingredient,"data-toggle","modal")
        setAttribute(ingredient,"data-target",`#exampleModal${i}`)   //#exampleModal${i}
        ingredient.innerText="Ingredient"
        appendChild(cardBody,ingredient)

        let modalfade=createElement("div")
        setAttribute(modalfade,"class","modal fade")
        setAttribute(modalfade,"id",`exampleModal${i}`)
        setAttribute(modalfade,"tabindex","-1")
        setAttribute(modalfade,"role","dialog")
        setAttribute(modalfade,"aria-labelledby","exampleModalCenterTitle")
        setAttribute(modalfade,"aria-hidden","true")

        appendChild(cardBody,modalfade)

        let modeldialog=createElement("div")
        setAttribute(modeldialog,"class","modal-dialog modal-dialog-centered")
        setAttribute(modeldialog,"role","document")
        appendChild(modalfade,modeldialog)

        let divcontent=createElement("div")
        setAttribute(divcontent,"class","modal-content")
        appendChild(modeldialog,divcontent)

        let modalheader=createElement("div")
        setAttribute(modalheader,"class","modal-header")
        appendChild(divcontent,modalheader)

        let modaltitle=createElement("h5")
        setAttribute(modaltitle,"class","modal-title")
        setAttribute(modaltitle,"id","exampleModalLongTitle")
        modaltitle.innerHTML="<b>Ingrediant list</b>"
        appendChild(modalheader,modaltitle)

        let buttons=createElement("button")
        setAttribute(buttons,"type","button")
        setAttribute(buttons,"class","close")
        setAttribute(buttons,"data-dismiss","modal")
        setAttribute(buttons,"aria-label","Close")
        appendChild(modaltitle,buttons)

        let span=createElement("span")
        setAttribute(span,"aria-hidden","true")
        span.innerHTML="&times;"
        appendChild(buttons,span)

        let modalbody=createElement("modal-body")
        modalbody.innerHTML=`<br><br>
        <h5>Vitamins:</h5>
        ${nutrientsArray.join("\n")}<br><br>
        <h5>Ingredient List:</h5>
        ${data[i].recipe.ingredientLines.join(",")}
        <br><br>
        <button type="button" class="btn btn-outline-warning" ><a href=${data[i].recipe.url}>Click here for detailed Description</a></button>
        `
        appendChild(modaltitle,modalbody)

          


    }



}

//Dom-fucntion

function createElement(ele){
    return document.createElement(ele)
}

function setAttribute(ele,attr,value){
    return ele.setAttribute(attr,value)
}

function appendChild(ele,child){
    return ele.appendChild(child)
}

function append(ele){
    return document.body.append(ele)
}