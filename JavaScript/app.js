'use strict';
let leftIndex;
let middleIndex;
let rightIndex;
let votesArray=[];
let viewsArray=[];
let attempt=0;
let maxAttempts=24;
let array=[];

const imgSection=document.getElementById('imagesSection');
const leftImg=document.getElementById('leftImg');
const middleImg=document.getElementById('middleImg');
const rightImg=document.getElementById('rightImg');


const ItemsNames=['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];


// random number
function getRandomArNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}





// constructor function
function Item(name){
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.votes = 0;
  this.views = 0;
  Item.all.push(this);
}

Item.all=[];


for(let i =0;i<ItemsNames.length;i++){
  new Item(ItemsNames[i]);
}
console.log(Item.all);





function render(){

  leftIndex=getRandomArNumber(0,((Item.all.length)-1));
  middleIndex=getRandomArNumber(0,(Item.all.length-1));
  rightIndex=getRandomArNumber(0,(Item.all.length-1));

  if(leftIndex=== middleIndex|| leftIndex=== rightIndex|| middleIndex===rightIndex){
    render();
  }
  else if (array.includes(leftIndex)){
    render();
  }
  else if (array.includes(middleIndex)){
    render();
  }
  else if (array.includes(rightIndex)){
    render();
  }else{

    array=[];
    leftImg.src = Item.all[leftIndex].path;
    leftImg.alt=Item.all[leftIndex].name;
    leftImg.title=Item.all[leftIndex].name;
    Item.all[leftIndex].views++;
    array.push(Number(leftIndex));


    middleImg.src = Item.all[middleIndex].path;
    middleImg.alt=Item.all[middleIndex].name;
    middleImg.title=Item.all[middleIndex].name;
    Item.all[middleIndex].views++;
    array.push(Number(middleIndex));

    rightImg.src = Item.all[rightIndex].path;
    rightImg.alt=Item.all[rightIndex].name;
    rightImg.title=Item.all[rightIndex].name;
    Item.all[rightIndex].views++;
    array.push(Number(rightIndex));
  }
}

render();


imgSection.addEventListener('click', handleClick);

function handleClick (event){

  if (event.target.id !== 'imagesSection'){

    if (attempt<maxAttempts){
      attempt++;
      if (event.target.id === rightImg.id){
        Item.all[rightIndex].votes++;
      }

      else if (event.target.id === middleImg.id){
        Item.all[middleIndex].votes++;
      }

      else {
        Item.all[leftIndex].votes++;
      }
      render();


    }
    else
    {

      if (event.target.id === rightImg.id){
        Item.all[rightIndex].votes++;
      }

      else if (event.target.id === middleImg.id){
        Item.all[middleIndex].votes++;
      }

      else {
        Item.all[leftIndex].votes++;}


      let ulEl=document.getElementById('listResult');
      let liEl;
      for(let i=0;i<Item.all.length-1;i++){
        votesArray.push(Item.all[i].votes);
        viewsArray.push(Item.all[i].views);
        console.log(votesArray,viewsArray);

        liEl=document.createElement('li');
        liEl.textContent=`${Item.all[i].name} has ${Item.all[i].votes} votes and ${Item.all[i].views} views.`;
        ulEl.appendChild(liEl);
      }
      console.log(viewsArray);
      console.log(votesArray);
      imagesSection.removeEventListener('click', handleClick);
      chartRender();

    }
  }
}











function chartRender(){
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
  // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: ItemsNames,
      datasets: [{
        label: 'Views',
        backgroundColor: 'rgb(104, 241, 209)',
        borderColor: 'rgb(255, 99, 132)',
        data: viewsArray,

      },
      {
        label: 'Votes',
        backgroundColor: 'rgb(0, 0, 0)',
        borderColor: 'rgb(255, 99, 132)',
        data: votesArray,
      }]
    },

    // Configuration options go here
    options: {}
  });
}
console.log(Item.all[5].path);
