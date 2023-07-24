async function postToPhp(filename, body) {
    fetch(`http://www.jusoft.sk/konstelacie/test/save.php?${filename}`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain'
        },
        body: `${body}`
    })
}

async function getPhp() {
    return fetch(`http://www.jusoft.sk/konstelacie/test/save.php`, {
        mode: 'no-cors',
        })
    .then(
        response => response.text())
        .then(response => {
            console.log(response);
            return response;
})
        .catch((error) => {
            // Better way would be to throw error here and let the client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("chyba 2");
            return [];
        });
        
}

export {postToPhp, getPhp};
