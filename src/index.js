const dogBar = document.querySelector('#dog-bar')
// console.log(dogBar)

document.addEventListener('DOMContentLoaded', () => {
    // Getting data and rendering it to the page
    fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(dogs => {
        dogs.forEach(dog => {
            const dogSpan = document.createElement('span')
            dogSpan.innerText = dog.name
            dogBar.append(dogSpan)
        })
        })
    
    // Adding the dog info to the page on click
    dogBar.addEventListener('click', (event) => {
        // console.log(event.target)
        fetch(`http://localhost:3000/pups/${event.target.id}`)
            .then(response => response.json())
            .then(dogs => {
                const dogInfo = document.querySelector('#dog-info')
                dogs.forEach(dog => {
                    if (dog.name === event.target.innerText) {
                        dogInfo.innerHTML = `
                        <img src=${dog.image}>
                        <h2>${dog.name}</h2>
                        <button class="btn" id=${dog.id}>${dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
                        `
                    }
                })

                // Changing good dog to bad dog and vice versa with the button
                const btn = document.querySelector('button.btn')
                btn.addEventListener('click', (e) => {
                    // console.log(e.target)
                    fetch(`http://localhost:3000/pups/${e.target.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            isGoodDog: !e.target.innerText.includes('Good')
                        })
                    })
                        .then(response => response.json())
                        .then(dog => {
                            console.log(dog)
                            btn.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
                        })
                })
            })
    })

    // Filter button to show only good dogs or all dogs
    const filterBtn = document.querySelector('#good-dog-filter')
    filterBtn.addEventListener('click', (e) => {
        if (e.target.innerText.includes('OFF')) {
            e.target.innerText = 'Filter good dogs: ON'
            dogBar.innerHTML = ''
            fetch('http://localhost:3000/pups')
                .then(response => response.json())
                .then(dogs => {
                    dogs.forEach(dog => {
                        if (dog.isGoodDog) {
                            const dogSpan = document.createElement('span')
                            dogSpan.innerText = dog.name
                            dogBar.append(dogSpan)
                        }
                    })
                })
        } else {
            e.target.innerText = 'Filter good dogs: OFF'
            dogBar.innerHTML = ''
            fetch('http://localhost:3000/pups')
                .then(response => response.json())
                .then(dogs => {
                    dogs.forEach(dog => {
                        const dogSpan = document.createElement('span')
                        dogSpan.innerText = dog.name
                        dogBar.append(dogSpan)
                    })
                })
        }
    })



})