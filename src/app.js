let body = document.querySelector('body');
let product = document.querySelector('.products');
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.close');
let card = document.querySelector('.card');
let navigate = document.querySelector('.navigate');
let item = document.querySelector('.item');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let closeMore = document.querySelector('.closeMore');
let moreOption = document.querySelector('.moreOption');
let more = document.querySelector('.More');



openShopping.addEventListener('click', ()=>{
    card.classList.add('visible');
})

closeShopping.addEventListener('click', ()=>{
    card.classList.remove('visible');
})


function requestData(page) {
    return fetch(`https://voodoo-dev-store.com/products.json?limit=24&page=${page}`).then(response => response.json())
};
let myData;


function setData(page) {
    requestData(page).then(data => {
        myData = [];
        myData = (data.products);
        initApp(myData, page);
        
    
        let openMoreList = document.querySelectorAll('.openMore');
    
        openMoreList.forEach(item => {
            item.addEventListener('click', ()=> {
                more.classList.toggle('invisible');
            })
        })
            
        
    })
};
setData(1);

closeMore.addEventListener('click', () => {
    more.classList.toggle('invisible');
})
function initApp(Data, page) {
    product.innerHTML = '';

    Data.forEach((value, key) =>{
    let newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="md:w-96 h-1/4  mt-8   ">
            <div class="w-full  flex ">
            <button onclick=showMore(${key*page}) class="openMore">
                <img class="relative w-full min-w-full w-96 2xl:h-96  h-80" src="${value.images[0] ? value.images[0].src : 'https://mspmanage.apptimus.lk/images/common/common.jpg'}" alt="">
            </button>
                <p class="absolute m-2 text-xs text-white bg-black p-1.5 rounded-lg">USED</p>
            </div>
            <div class="m-2 flex justify-between">
                <div class="text-left">
                    <p class="font-bold text-base">${value.handle}</p>
                    <p class="font-bold text-base">${value.variants[0].price} KR.</p>
                </div>
                <div class="text-right">
                    <p class="font-semibold text-base">Condition</p>
                    <p class="font-normal text-sm">Slightly used</p>
                </div>
            </div>
            <div>
                <button onclick=addToCard(${key*page}) class="w-full bg-black text-white font-bold py-3 rounded-md">
                    ADD TO CART
                </button>
            </div>
        </div>`;
        product.appendChild(newDiv);
    })
}

let listOption = [];
function showMore(key) {
    listOption = myData[key].variants;
    listOption.quantity = 1;

    // console.log( myData[key].variants)    
    reloadMore(key);
}


function reloadMore(i) {
    moreOption.innerHTML = '';
    console.log(listOption)
    listOption.forEach((value, key) => { 
        console.log(value)

        let newDiv = document.createElement('div');
            newDiv.innerHTML = `
            <div class="text-white flex justify-between flex-row border-y my-2 py-2">
                <div class=" flex ">
                    <p class="px-3">${value.title}</p>
                    <p class="px-3">${value.price} KR.</p>
                    <p class="px-3">${value.option1}</p>
                    <p class="px-3">${value.grams}</p>                    
                </div>
            </div>`   
        moreOption.appendChild(newDiv);
    });
}

let listCards = []
function addToCard(key) {
    listCards[key] = myData[key];
    listCards[key].quantity = 1;
    reloadCard();
}

function reloadCard(){
        item.innerHTML = '';
        let count = 0;
        let totalPrice = 0;

        listCards.forEach((value, key) => {
            totalPrice = totalPrice + +value.variants[0].price;
            count = count + value.quantity;
            let newDiv = document.createElement('div');
                newDiv.innerHTML = `
                <div class="">
                            <div class="flex">
                            <img class="w-16 h-full" src="${value.images[0] ? value.images[0].src : 'https://mspmanage.apptimus.lk/images/common/common.jpg'}" alt="">
                            <div class="flex flex-col h-full pl-6 font-bold">
                                <div class="flex flex-col h-full align-top">
                                    <p>${value.title}</p>
                                    <p>${value.variants[0].price} KR.</p>
                                </div>
                                <div class="flex items-end h-full">
                                    <button onclick="changeQuantity(${key}, ${value.quantity - 1}, ${false})">-</button>
                                    <p class="px-6">${value.quantity}</p>
                                    <button onclick="changeQuantity(${key}, ${value.quantity + 1}, ${true})">+</button>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="">
                            <button onclick="del(${key})">
                                <img class="h-6 w-6" src="./img/trash.png" alt="">
                            </button>
                        </div>
            `   
            newDiv.classList.add("flex","justify-between")
            item.appendChild(newDiv);
        })
       total.innerText = +totalPrice;
       quantity.innerText = count;
}

function del(key) {
    delete listCards[key];
    reloadCard();
}

function changeQuantity(key, quantity, bool){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        if (bool) {
            listCards[key].variants[0].price = (listCards[key].variants[0].price / (quantity - 1)) * (quantity);
        }else{
            listCards[key].variants[0].price = (listCards[key].variants[0].price / (quantity + 1)) * (quantity);

        }
    }
    reloadCard();
}






let currentPage = 1;
function setNavigation() {
    let newDiv = document.createElement('div');
    navigate.innerHTML = '';


    let fistIndex = currentPage < 4 ? 1 : currentPage - 3;
    let lastIndex = currentPage < 4 ? 8 : fistIndex + 7;

    if (currentPage + 4 >= 20) {
        const subIndex = currentPage + 4 - 21;

       fistIndex = fistIndex - subIndex;
       
       lastIndex = currentPage + 4 === 20 ? 21 : 21;
    }

    for (let i = fistIndex; i < lastIndex; i++) {
       if (i <= 20) {
        let button = document.createElement('button');
        button.classList.add("nav-btn", "sm:h-10", "sm:w-10", "h-8", "w-8", "border", "border-black", "rounded-full", "text-center", "sm:mx-2", "mx-1", "my-6")

        if (i == currentPage) {
            button.classList.add("bg-black", "text-white");
        }
        button.textContent = i;
        newDiv.appendChild(button);

        button.addEventListener('click', () => {
            currentPage = i;
            toggleNavButton(i);
        })
       }
    }
    navigate.appendChild(newDiv);
}
setNavigation();

function toggleNavButton(clickedIndex) {
    const navButtons = document.querySelectorAll('.nav-btn');

    navButtons.forEach((btn, index) => {
        if (clickedIndex - 1 === index) {
            btn.classList.add('bg-black', 'text-white');
        } else {
            btn.classList.remove('bg-black', 'text-white')
        }
    });

    setData(clickedIndex);
    setNavigation();
}