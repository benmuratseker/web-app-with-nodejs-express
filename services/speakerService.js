const axios = require('axios');

function speakerService(){
    function getSpeakerById(id){
        return new Promise((reslve, reject) => {
            axios
            .get('http://localhost:3000/speakers/' + id)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

    return {getSpeakerById}
}

module.exports = speakerService();