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

async function saveMembers(body, searchParams) {
    let response = await fetch(`http://localhost:3005/users/members/${searchParams}`, {
        method: 'POST',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain'
        },
        body: `${body}`
    })

    if (response.status === 200) {
        console.log("prechadza post saveMembers");
        return response;
    }

    throw new Error(response.status);
}

async function getMembers(searchParams) {
    return fetch(`http://localhost:3005/users/members/${searchParams}`, {
        })
    .then(
        response => {
            console.log("prechadza post getMembers");
            console.log(response);
            response.text()
            .then(t => {
              console.log("som tu t " + t);
                }
              )
             .catch((error) => {
            // Better way would be to throw error here and let the client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("chyba 2");
            return "";})
        });
}

export {postToPhp, getPhp, saveMembers};
