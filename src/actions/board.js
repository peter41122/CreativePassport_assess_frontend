import axios from 'axios'
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const uploadData = (data) => {
  return async (dispatch) => {
    return new Promise((resolve) => {
      axios.post(`${SERVER_URL}api/upload`, data)
      .then((response) => {
        // const data = response.data.message;
        dispatch(getAll());
        resolve({ success: "success" });
      }).catch((e) => {
        console.log(e);
        resolve();
      })
    })
  }
}

export const getAll = () => {
  return async (dispatch) => {
      return new Promise((resolve) => {
          axios.get(`${SERVER_URL}api/findAll`)
          .then((response) => {
              dispatch({
                  type: 'GET_DATA',
                  payload : response.data
              })
              resolve({success: "success"})
           }).catch((e) => {
              console.log(e)
              resolve()
          })
      })
  }
}

export const deleteRecord = (selectedId) => {
  return async (dispatch) => {
    return new Promise((resolve) => {
      axios.post(`${SERVER_URL}api/delete`, {
        selectedId
      })
      .then((response) => {
        // const data = response.data.message;
        dispatch(getAll());
        resolve({ success: "success" });
      }).catch((e) => {
        console.log(e);
        resolve();
      })
    })
  }
}
