import React from 'react';

const url = "http://media.mw.metropolia.fi/wbma/media/";

const getAllMedia = () => {
    return fetch(url).then(response => {
        return response.json();
    }).then(json => {
        return Promise.all(json.map(item => {
            return fetch(url + item.file_id).then(response => {
                return response.json();
            });
        })).then(items => {
            return items;
        })
    })
};

export {getAllMedia};