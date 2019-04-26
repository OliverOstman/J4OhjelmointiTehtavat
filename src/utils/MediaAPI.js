const apiUrl = "http://media.mw.metropolia.fi/wbma/";

const getAllMedia = () => {
    return fetch(apiUrl + 'media/' + "?limit=50").then(response => {
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

const getUserMedia = (token) => {
    const settings = {
        headers: {
            'x-access-token': token,
        }
    };
    return fetch(apiUrl + 'media/user', settings).then(response => {
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

const getUserUsername = (token, user) => {
    const settings = {
        headers: {
            'x-access-token': token,
        }
    };
    return fetch(apiUrl + "users/" + user, settings).then(response => {
        return response.json();
    });
};

const checkUser = (username) => {
    return fetch(apiUrl + 'users/username/' + username).then(response => {
        return response.json();
    });
};

const deleteMedia = (id, token) => {
    const settings = {
        method: 'DELETE',
        headers: {
            'x-access-token': token,
        },
    };
    return fetch(apiUrl + 'media/' + id, settings)
        .then(handleFetchErrors)
        .then(response => {
            return response.json();
        });
};

const handleFetchErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

const getFilesByTag = (tag) => {
    return fetch(apiUrl + 'tags/' + tag).then(response => {
        return response.json();
    });
};

const modify = (id, data, token) => {
    const options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
            'x-access-token': token,
        },
    };

    return fetch(apiUrl + 'media/' + id, options)
        .then(handleFetchErrors)
        .then(response => {
            return response.json();
        });
};

export {getAllMedia, getSingleMedia, login, register, getUser, checkUser, getFilesByTag, getUserMedia, getUserUsername, deleteMedia, modify};