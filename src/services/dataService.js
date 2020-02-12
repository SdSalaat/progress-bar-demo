const BASE_URL = "http://pb-api.herokuapp.com/bars";

export default fetch(BASE_URL).then(response => response.json());
