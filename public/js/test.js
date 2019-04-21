console.log('Client Javascript started')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit' , (e) => {
	e.preventDefault()
	const location = search.value
	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''
	fetch('/weather?address=' + location).then( (res) => {
		res.json().then( (result) => {
			if(result.err)
				messageOne.textContent = result.err
			else{
				messageOne.textContent = result.location
				messageTwo.textContent = result.data
			}
		})
	})
})