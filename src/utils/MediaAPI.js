const apiUrl = "http://media.mw.metropolia.fi/wbma/";

const getAllMedia = () => {
    return fetch(apiUrl + 'media/').then(response => {
        return response.json();
    }).then(json => {
        return Promise.all(json.map(item => {
            return fetch(apiUrl + 'media/' + item.file_id).then(response => {
                return response.json();
            });
        })).then(items => {
            return items;
        })
    })
};

const getSingleMedia = (id) => {
    return fetch(apiUrl + 'media/' + id).then(response => {
        return response.json();
    });
};

/*
.then(json => {
        return json;
    });
 */

const login = (username, password) => {
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    };
    return fetch(apiUrl + 'login', settings).then(response => {
        return response.json();
    });
};

const register = (user) => {
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    };
    return fetch(apiUrl + 'users', settings).then(response => {
        return response.json();
    });
};

const getUser = (token) => {
    const settings = {
        headers: {
            'x-access-token': token,
        }
    };
    return fetch(apiUrl + 'users/user', settings).then(response => {
        return response.json();
    });
};

export {getAllMedia, getSingleMedia, login, register, getUser};