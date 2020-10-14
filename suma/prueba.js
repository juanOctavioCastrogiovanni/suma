const text = '{"simpleText":"119 vistas"},"shortViewCount":{"simpleText":"119 vistas"}}},"videoActions":{"menuRenderer":{"items":'

var text2 = text.split(':"')
var flag= false
var number

text2.forEach(te=>{
    if(parseInt(te)!=null){
        number = parseInt(te)
    }
})

console.log(number)
