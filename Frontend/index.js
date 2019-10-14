const shoeListUl = document.querySelector('#shoe-list')
const shoeShowDiv = document.querySelector('#main-shoe')

  fetch('http://localhost:3000/shoes')
  .then(response => response.json())
  .then(shoeList => {
    addShoeToShowDiv(shoeList[0])
    shoeList.forEach(shoe => {
      let shoeListLi = document.createElement('li')
      let lineBreak = document.createElement('br')
      shoeListLi.className = 'list-group-item'
      shoeListLi.innerText = shoe.name
      shoeListLi.addEventListener('click', (event) => {
        addShoeToShowDiv(shoe)
      })
      shoeListUl.append(shoeListLi, lineBreak)
    })
  })

  function removeChildren(parentNode) {  
    while (parentNode.firstChild) { 
      parentNode.removeChild(parentNode.firstChild)  
    }
  }

  // WANTED TO TRY OUT THIS SUPER EXPLICIT BUILDER FUNCTION—YIKES! \\
  function addShoeToShowDiv(shoe) {
    removeChildren(shoeShowDiv)
    let shoeImg = document.createElement('img')
    let shoeCardDiv = document.createElement('div')
    let shoeNameH4 = document.createElement('h4')
    let shoeDescriptionP = document.createElement('p')
    let shoePriceP = document.createElement('p')
    let shoePriceSml = document.createElement('sml')
    let shoeFormDiv = document.createElement('div')
    let shoeReviewH5 = document.createElement('h5')
    let shoeReviewUl = document.createElement('ul')
    let reviewForm = document.createElement('form')
    let reviewFormDiv = document.createElement('div')
    let reviewFormTextArea = document.createElement('textarea')
    let reviewFormSubmit = document.createElement('input')

    shoeImg.className = 'card-img-top'
    shoeImg.id = 'shoe-image'
    shoeImg.src = shoe.image
    shoeImg.alt = shoe.name

    shoeCardDiv.className = 'card-body'

    shoeNameH4.className = 'card-title'
    shoeNameH4.id = 'shoe-name'
    shoeNameH4.innerText = shoe.name

    shoeDescriptionP.className = 'card-text'
    shoeDescriptionP.id = 'shoe-description'
    shoeDescriptionP.innerText = shoe.description
    
    shoePriceP.className = 'card-text'

    shoePriceSml.className = 'text-muted'
    shoePriceSml.id = 'shoe-price'
    shoePriceSml.innerText = `$${shoe.price}`

    shoeFormDiv.className = 'container'
    shoeFormDiv.id = 'form-container'

    shoeReviewH5.className = 'card-header'
    shoeReviewH5.innerText = 'Reviews'

    shoeReviewUl.className = 'list-group list-group-flush'
    shoeReviewUl.id = 'reviews-list'

    reviewForm.id = 'new-review'
    reviewFormDiv.className = 'form-group'
    reviewFormTextArea.className = 'form-control'
    reviewFormTextArea.id = 'review-content'
    reviewFormTextArea.rows = '3'
    reviewFormSubmit.type = 'submit'
    reviewFormSubmit.className = 'btn btn-primary'

    // NEEDS TO BE ABSTRACTED INTO HELPER FUNCTION \\
    shoe.reviews.forEach( review => {
      let shoeReviewLi = document.createElement('li')
      shoeReviewLi.className = 'list-group-item'
      shoeReviewLi.innerText = review.content
      shoeReviewUl.append(shoeReviewLi)
    })

    shoePriceP.append(shoePriceSml)
    reviewFormDiv.append(reviewFormTextArea, reviewFormSubmit)
    reviewForm.append(reviewFormDiv)
    shoeFormDiv.append(reviewForm)
    shoeCardDiv.append(shoeNameH4, shoeDescriptionP, shoePriceP, shoeFormDiv)
    shoeShowDiv.append(shoeImg, shoeCardDiv, shoeReviewH5, shoeReviewUl)
    
    reviewForm.addEventListener('submit', (event) => {
      event.preventDefault()
      submitReview(shoe)  
    })
  }

  function submitReview(shoe) { 
    let reviewContent = event.target['review-content'].value

    fetch(`http://localhost:3000/shoes/${shoe.id}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        content: reviewContent
      })
    })
    .then(response => response.json())
    .then(updatedShoe => {
      shoe.reviews.push(updatedShoe)
      addShoeToShowDiv(shoe)
    })
  }
