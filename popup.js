async function deleteLink(event) {
    try {
	const button = event.target.parentElement;
	const li = button.parentElement;
	const url = li.textContent
	const resp = await fetch("http://localhost:8081/links",
				 {
				     method: 'DELETE',
				     headers: {
					 'Content-Type': 'application/json'
				     },
				     body: JSON.stringify({ url: url })
				 }
				);
	if (!resp.ok) {
	    throw new Error(`Delete Failed with status ${resp.status}`);
	}
	li.remove();
    } catch (error) {
	console.error('Error: ', error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:8081/links")
	.then(resp => resp.json())
	.then(links => {
	    const ul = document.getElementById('url-list');
	    let ct = 0;
	    links.forEach(link => {
		const li = document.createElement('li');
		const a = document.createElement('a');
		a.setAttribute('href', link.url);
		a.textContent = link.url;
		li.appendChild(a);
		const button = document.createElement('button');
		button.setAttribute('type', 'button');
		button.addEventListener('click', deleteLink);
		const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
		svg.setAttribute("aria-hidden", "true");
		svg.setAttribute("viewBox", "0 0 24 24");
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", "M6 18L18 6M6 6l12 12");
		svg.appendChild(path);
		button.appendChild(svg);
		li.appendChild(button);
		ul.appendChild(li);
		ct++;
	    });
	});
});
