function load_pets_photos() {
	const photos_container = document.getElementById("photos_container");

	const loading_modal = $.confirm({
		title: "Please wait...",
		content: "The pets are being retrieved, please be patient.",
		buttons: {
			confirm: {
				text: "OK",
				action: () => {
					return false;
				}
			}
		}
	});

	for (let i=0; i < 10; i++) {
		fetch('https://dog.ceo/api/breeds/image/random')
		.then((response) => {
			return response.json().then((json_string) => {
				const pet_container = document.createElement("div");
				const pet_photo = document.createElement("img");
				pet_container.className = "col-12 col-md-6 col-lg-4 text-center mt-1 mb-1";
				pet_container.style = 'border: 1px solid black; border-radius: calc(1rem * 0.75);';
				pet_photo.src = json_string.message;
				pet_photo.width = "250";
				pet_photo.height = "250";
				pet_container.appendChild(pet_photo);
				photos_container.appendChild(pet_container);

				if (i === 9) {
					loading_modal.close();
				}
			});
		});
	}
}

const btn_load_data = document.getElementById('btn_load_data')
btn_load_data.addEventListener('click', load_pets_photos);
