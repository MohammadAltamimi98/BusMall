'use strict';
let leftIndex;
let middleIndex;
let rightIndex;
let results;
let clickNum=0;





const imgSection=document.getElementById('images-section');
const leftImg=document.getElementById('left-img');
const middleImg=document.getElementById('middle-img');
const rightImg=document.getElementById('right-img');
const result=document.getElementById('myList');

const ItemsNames=['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];


// random number
function getRandomArNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}



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
  leftImg.src = Item.all[leftIndex].path;
  leftImg.alt=Item.all[leftIndex].name;
  leftImg.title=Item.all[leftIndex].name;
  Item.all[leftIndex].views+=1;


  do { middleIndex=getRandomArNumber(0,Item.all.length-1);
    middleImg.src = Item.all[middleIndex].path;
    middleImg.alt=Item.all[middleIndex].name;
    middleImg.title=Item.all[middleIndex].name;
  } while(middleIndex===leftIndex);
  Item.all[middleIndex].views+=1;

  do{
    rightIndex=getRandomArNumber(0,Item.all.length-1);
    rightImg.src = Item.all[rightIndex].path;
    rightImg.alt=Item.all[rightIndex].name;
    rightImg.title=Item.all[rightIndex].name;}
  while(rightIndex===middleIndex|| rightIndex=== leftIndex);
  Item.all[rightIndex].views+=1;





  console.log(leftIndex);
  console.log(middleIndex);
  console.log(rightIndex);
}


imgSection.addEventListener('click', handleClick);

function handleClick (event){
  if (event.target.id !== 'images-section')
  {
    if (event.target.id === rightImg.id)
    {
      Item.all[rightIndex].votes++;
    }

    else if (event.target.id === middleImg.id)
    {
      Item.all[middleIndex].votes++;
    }

    else {
      // (event.target.id === leftImg.id)
      Item.all[leftIndex].votes++;

    }



    console.table(Item.all);
    render();

    clickNum=clickNum+1;

    if(clickNum===25){
      results=document.createElement('button');
      result.appendChild(results);
      //   console.log(result,results);
      results.textContent='View Results';
      results.addEventListener('click',Calculate);
      // reset=document.createElement('button');
      // result.appendChild(reset);
      // //   console.log(result,results);
      // reset.textContent='Reset';
      // results.addEventListener('click',reset);
    }

  }

}


function Calculate(event){
  const ul = document.createElement('ul');
  result.appendChild(ul);
  for(let i=0; i<Item.all.length; i++){
    const li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${Item.all[i].name} had ${Item.all[i].votes} votes, and was seen ${Item.all[i].views} times.`;
  }

  clickNum=0;
}



// function reset (event){

//   clickNum=0;
// }

render();



