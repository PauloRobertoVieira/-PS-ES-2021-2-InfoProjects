const API_URL = process.env.REACT_APP_API_URL || ""

function request(endpoint, options = {}) {
    const opt = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
        body: options.body ? JSON.stringify(options.body) : null,
    };
    console.log(opt)

    return fetch(`${API_URL}${endpoint}`, opt).then((resp) => resp.json())
}

export { request }