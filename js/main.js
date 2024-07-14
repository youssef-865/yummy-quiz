let row = document.getElementById("row");
let search = document.getElementById("search");

// start page

window.onload = async function() {
    await nameSearch("");
    $(".loading").fadeOut(500);
};

// $(document).ready(async function() {
//     await nameSearch("");
//     $(".loading").fadeOut(500);
// });


// sidenav

function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
    }


function closeSideNav() { 
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}


closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})



document.getElementById('serch').addEventListener('click', function() {
    displayInputSearch();
     closeSideNav();
});
document.getElementById('categories').addEventListener('click', function() {
    getCategoryApi();
    closeSideNav();
});

document.getElementById('area').addEventListener('click', function() {
    getAreaApi();
    closeSideNav();
});

document.getElementById('ingredients').addEventListener('click', function() {
    getIngredientsApi();
    closeSideNav();
});

document.getElementById('contact').addEventListener('click', function() {
    ContactsUs()();
    closeSideNav();
});



// search
function displayInputSearch() {
    let box = "";
    box += `
        <div class="col-md-6">
        <input onkeyup="nameSearch(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
        <input onkeyup="letterSearch(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
    </div>`

    row.innerHTML = box
}


async function nameSearch(term) {
    closeSideNav()
    row.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    let data = await response.json()

    if (data.meals) {
                displayMeals(data.meals);
            } else {
                displayMeals([]);
            }
                $(".loading").fadeOut(300)

}

nameSearch()



async function letterSearch(term) {
    closeSideNav()
    row.innerHTML = ""
    $(".loading").fadeIn(300)

    if (term == "") {
        term = "a";
    }
    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    let data = await response.json()

    if (data.meals) {
        displayMeals(data.meals);
    } else {
        displayMeals([]);
    }
    
    $(".loading").fadeOut(300)

}

// category
async function getCategoryApi() {
    row.innerHTML = '';
    $(".loading").fadeIn(300);
    search.innerHTML = "";

    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let data = await response.json();
    console.log(data);
    displayCategories(data.categories);
    $(".loading").fadeOut(300);
}
getCategoryApi();

function displayCategories(arr) {
    let box = "";

    for (let i = 0; i < arr.length; i++) {
        box += `
        <div class="col-md-3">
            <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute text-center text-black p-2">
                    <h3>${arr[i].strCategory}</h3>
                    <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>
        </div>
        `;
    }

    row.innerHTML = box;
}

async function getCategoryMeals(category) {
    row.innerHTML = "";
    $(".loading").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();

    displayMeals(response.meals.slice(0, 20));
    $(".loading").fadeOut(300);
}




// area
async function getAreaApi(){
    row.innerHTML = ''
    $(".loading").fadeIn(300);
    search.innerHTML = "";

    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let data = await response.json()
     console.log(data)
     displayAreaApi(data.meals)
    $(".loading").fadeOut(300)
}
getAreaApi();

function displayAreaApi(arr) {
    let box = "";

    for (let i = 0; i < arr.length; i++) {
        box += `
      <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    row.innerHTML = box
}

async function getAreaMeals(area) {
    row.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let data = await response.json()


    displayMeals(data.meals.slice(0, 20))
    $(".loading").fadeOut(300)

}



// gredient

async function getIngredientsApi() {
    row.innerHTML = '';
    $(".loading").fadeIn(300);
    search.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let data = await response.json();
    console.log(data);
    displayIngredients(data.meals.slice(0, 20));
    $(".loading").fadeOut(300)
}

getIngredientsApi();

function displayIngredients(arr) {
    let box = "";

    for (let i = 0; i < arr.length; i++) {
        box += `
          <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split("").slice(0,20).join("")}</p>
                </div>
        </div>`
    }

    row.innerHTML = box;
}


async function getIngredientsMeals(ingredients) {
    row.innerHTML = ""
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    let data = await response.json()


    displayMeals(data.meals.slice(0, 20));
    $(".loading").fadeOut(300)

}
// mealDetails
async function getMealDetails(mealID) {
    closeSideNav();
    row.innerHTML = "";
    $(".loading").fadeIn(300);

    search.innerHTML = "";
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        let data = await response.json();
        console.log(data);
        displayMealDetails(data.meals[0]);
    } catch (error) {
        console.error('Error fetching meal details:', error);
    } finally {
        $(".loading").fadeOut(300);
    }
}

function displayMealDetails(meal) {
    search.innerHTML = "";

    let ingredients = ``;
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    let tags = meal.strTags?.split(",") || [];
    let tagsStr = tags.map(tag => `<li class="alert alert-danger m-2 p-1">${tag}</li>`).join('');

    let box = `
    <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area: </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category: </span>${meal.strCategory}</h3>
        <h3>Recipes:</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
        </ul>
        <h3>Tags:</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagsStr}
        </ul>
        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">YouTube</a>
    </div>`;

    row.innerHTML = box;
}

function displayMeals(arr) {
    let box = "";

    for (let i = 0; i < arr.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    row.innerHTML = box
}

// contact

 function ContactsUs() {
     row.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
     <div class="container w-75 text-center">
         <div class="row g-4">
             <div class="col-md-6">
                 <input id="nameInput" onkeyup="regexValid()" type="text" class="form-control" placeholder="Enter Your Name">
                 <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                     Special characters and numbers not allowed
                 </div>
             </div>
             <div class="col-md-6">
                 <input id="emailInput" onkeyup="regexValid()" type="email" class="form-control " placeholder="Enter Your Email">
                 <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                     Email not valid *exemple@yyy.zzz
                 </div>
             </div>
             <div class="col-md-6">
                 <input id="phoneInput" onkeyup="regexValid()" type="text" class="form-control " placeholder="Enter Your Phone">
                 <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                     Enter valid Phone Number
                 </div>
             </div>
             <div class="col-md-6">
                 <input id="ageInput" onkeyup="regexValid()" type="number" class="form-control " placeholder="Enter Your Age">
                 <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                     Enter valid age
                 </div>
             </div>
             <div class="col-md-6">
                 <input  id="passwordInput" onkeyup="regexValid()" type="password" class="form-control " placeholder="Enter Your Password">
                 <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                     Enter valid password *Minimum eight characters, at least one letter and one number:*
                 </div>
             </div>
             <div class="col-md-6">
                 <input  id="repasswordInput" onkeyup="regexValid()" type="password" class="form-control " placeholder="Repassword">
                 <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                     Enter valid repassword 
                 </div>
             </div>
         </div>
         <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
     </div>
 </div> `
    

document.getElementById("nameInput").addEventListener("focus", () => { nameInputTouched = true; });
document.getElementById("emailInput").addEventListener("focus", () => { emailInputTouched = true; });
document.getElementById("phoneInput").addEventListener("focus", () => { phoneInputTouched = true; });
document.getElementById("ageInput").addEventListener("focus", () => { ageInputTouched = true; });
document.getElementById("passwordInput").addEventListener("focus", () => { passwordInputTouched = true; });
document.getElementById("repasswordInput").addEventListener("focus", () => { repasswordInputTouched = true; });
}



function regexValid() {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^\d{11}$/;
    const ageRegex = /^(1[89]|[2-9]\d)$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    let nameInputValue = document.getElementById("nameInput").value.trim();
    let emailInputValue = document.getElementById("emailInput").value.trim();
    let phoneInputValue = document.getElementById("phoneInput").value.trim();
    let ageInputValue = document.getElementById("ageInput").value.trim();
    let passwordInputValue = document.getElementById("passwordInput").value.trim();
    let repasswordInputValue = document.getElementById("repasswordInput").value.trim();

    let isNameValid = nameRegex.test(nameInputValue);
    let isEmailValid = emailRegex.test(emailInputValue);
    let isPhoneValid = phoneRegex.test(phoneInputValue);
    let isAgeValid = ageRegex.test(ageInputValue);
    let isPasswordValid = passwordRegex.test(passwordInputValue);
    let isRepasswordValid = passwordInputValue === repasswordInputValue;

    document.getElementById("nameAlert").classList.toggle("d-none", nameInputValue === '' || isNameValid);
    document.getElementById("emailAlert").classList.toggle("d-none", emailInputValue === '' || isEmailValid);
    document.getElementById("phoneAlert").classList.toggle("d-none", phoneInputValue === '' || isPhoneValid);
    document.getElementById("ageAlert").classList.toggle("d-none", ageInputValue === '' || isAgeValid);
    document.getElementById("passwordAlert").classList.toggle("d-none", passwordInputValue === '' || isPasswordValid);
    document.getElementById("repasswordAlert").classList.toggle("d-none", repasswordInputValue === '' || isRepasswordValid);

    let submitButton = document.getElementById("submitBtn");

    if (isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isRepasswordValid) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
    }





