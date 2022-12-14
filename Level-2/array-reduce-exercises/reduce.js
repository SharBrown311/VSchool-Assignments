//Part 1
function total(arr) {
    const added = arr.reduce((a,b) => a + b , 0)
    return added
 }
 
 console.log(total([1,2,3])); // 6
 
 //Part 2

 function stringConcat(arr) {
  return arr.reduce((final, num)=> final.concat(num) , '')
}
 
 console.log(stringConcat([1,2,3])); // "123"
 
 //Part 3
//  function totalVotes(arr) {
//     return arr.reduce((final, voter) =>final += voter.voted, 0)
//  }
 
//  var voters = [
//      {name:'Bob' , age: 30, voted: true},
//      {name:'Jake' , age: 32, voted: true},
//      {name:'Kate' , age: 25, voted: false},
//      {name:'Sam' , age: 20, voted: false},
//      {name:'Phil' , age: 21, voted: true},
//      {name:'Ed' , age:55, voted:true},
//      {name:'Tami' , age: 54, voted:true},
//      {name: 'Mary', age: 31, voted: false},
//      {name: 'Becky', age: 43, voted: false},
//      {name: 'Joey', age: 41, voted: true},
//      {name: 'Jeff', age: 30, voted: true},
//      {name: 'Zack', age: 19, voted: false}
//  ];
//  console.log(totalVotes(voters)); // 7
 

 //Part 4
 function shoppingSpree(arr) {
    return arr.reduce((final, total) => final += total.price, 0)
 }
 
 var wishlist = [
     { title: "Tesla Model S", price: 90000 },
     { title: "4 carat diamond ring", price: 45000 },
     { title: "Fancy hacky Sack", price: 5 },
     { title: "Gold fidgit spinner", price: 2000 },
     { title: "A second Tesla Model S", price: 90000 }
 ];
 
 console.log(shoppingSpree(wishlist)); // 227005
 

 //Part 5

 function flatten(arr) {
    return arr.reduce((final, newArr) => final.concat(newArr))
 }
 
 var arrays = [
     ["1", "2", "3"],
     [true],
     [4, 5, 6]
 ];
 
 console.log(flatten(arrays)); // ["1", "2", "3", true, 4, 5, 6];
 
 //Part 6

 var voters = [
    {name:'Bob' , age: 30, voted: true},
    {name:'Jake' , age: 32, voted: true},
    {name:'Kate' , age: 25, voted: false},
    {name:'Sam' , age: 20, voted: false},
    {name:'Phil' , age: 21, voted: true},
    {name:'Ed' , age:55, voted:true},
    {name:'Tami' , age: 54, voted:true},
    {name: 'Mary', age: 31, voted: false},
    {name: 'Becky', age: 43, voted: false},
    {name: 'Joey', age: 41, voted: true},
    {name: 'Jeff', age: 30, voted: true},
    {name: 'Zack', age: 19, voted: false}
];

const voterResults = (voters) => {
    const red =  voters.reduce((tally, voter) => {
        if(voter.age >=18  && voter.age <=30 && voter.voted) {
            tally.numYoungVotes++;
        }
        else if (voter.age >= 18 && voter.age <= 25) {
            tally.numYoungPeople++;
        }
        else if (voter.age >=26  && voter.age <= 35 && voter.voted) {
            tally.numMidVotes++;
        }
        else if (voter.age >= 26 && voter.age <= 35) {
           tally.numMidsPeople++;
        }
        else if (voter.age >= 36 && voter.voted) {
            tally.numOldVotesPeople++;
        }
        else if (voter.age >= 36) {
            tally.numOldsPeople++;
        }
        return {...tally}
    }
    ,
    {
    numYoungVotes: 0, 
    numYoungPeople: 0,
    numMidsPeople: 0,
    numMidVotes: 0, 
    numOldVotesPeople: 0, 
    numOldsPeople: 0
    });
    return red;
};

console.log(voterResults(voters));

/*
{ numYoungVotes: 1,
  numYoungPeople: 4,
  numMidVotes: 3,
  numMidPeople: 4,
  numOldVotes: 3,
  numOldPeople: 4
}
*/
