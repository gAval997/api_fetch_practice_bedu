const movie_list = [
	{
		t: "Interstellar",
		y: 2014,
	},
	{
		t: "The Dark Knight Rises",
		y: 2012,
	},
	{
		t: "The Martian",
		y: 2015,
	},
];

function load_films_data() {
	const photos_container = document.getElementById("movies_container");

	const loading_modal = $.confirm({
		title: "Please wait...",
		content: "The movies are being retrieved, please be patient...",
		buttons: {
			confirm: {
				text: "OK",
				action: () => {
					return false;
				}
			}
		}
	});

	movie_list.forEach((movie, index) => {
		fetch(`http://www.omdbapi.com/?t=${movie.t}&apikey=c89c393d`)
		.then((response) => {
			return response.json().then((json_string) => {
				const movie_container = document.createElement("div");
				const movie_photo = document.createElement("img");
				const plot_container = document.createElement("p");
				movie_container.className = "col-12 col-md-6 col-lg-4 text-center mt-1 mb-1";
				movie_container.style = 'border: 1px solid black; border-radius: calc(1rem * 0.75);';
				movie_photo.src = json_string.Poster;
				movie_photo.width = "350";
				movie_photo.height = "350";
				plot_container.innerText = json_string.Plot;
				movie_container.appendChild(movie_photo);
				movie_container.appendChild(plot_container);
				photos_container.appendChild(movie_container);

				if (index == (movie_list.length - 1)) {
					loading_modal.close();
				}
			});
		});
	});
}

const btn_load_data = document.getElementById('btn_load_data')
btn_load_data.addEventListener('click', load_films_data);
