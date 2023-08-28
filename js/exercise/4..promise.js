const isVip = true

const checkingVip = new Promise ((resolve, reject) => {
    if (isVip) {
        resolve("Member is Vip")
    }   else {
        reject("Member isn't vip")
    }
})

console.log(checkingVip)