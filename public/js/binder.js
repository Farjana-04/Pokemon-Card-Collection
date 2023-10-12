
const addToBinderButtons = document.querySelectorAll('.add-to-binder-btn');

addToBinderButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const cardId = this.getAttribute('data-card-id');
    const name = this.getAttribute('data-card-name');
    const imageUrl = this.getAttribute('data-card-image');

    fetch('/api/binder/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ card_id: cardId, name, imageUrl }),
    })
      .then(function (response) {
        if (response.ok) {

          alert('Card added to your binder!');
        } else {

          alert('Failed to add the card to your binder.');
        }
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  });
});

const deleteFromBinderButtons = document.querySelectorAll('.delete-from-binder-btn');

deleteFromBinderButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const cardId = this.getAttribute('data-card-id');


    fetch(`/api/binder/delete/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        if (response.ok) {
          window.location.reload()

        } else {

          alert('Failed to delete the card from your binder.');
        }
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  });
});









