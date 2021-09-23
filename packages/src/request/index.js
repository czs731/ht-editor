import axios from "axios";


function request(baseUrl=''){
  const url = baseUrl;
  // const requestPost = axios.create({
  //   baseURL :baseUrl,
  //   headers : {
  //     'Accept' : 'application/json',
  //     'Content-Type' : 'application/json; charset=UTF-8',
  //   },
  //   method : 'post',
  //   timeout : 60000,
  // })


  async function post(data={}){
    try {
      let res = await axios.post(url,data,{
        headers : {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json; charset=UTF-8',
        },
      });
      if(res.status==200 && res.data.errcode == 0){
        return res.data;
      }else{
        return false;
      }
    }catch (e) {
      console.log(e);
      return false;
    }
  }

  async function get(data={}){
    let res = await axios.get(url,data);
    console.log(res);
  }

  return {
    post,
    get
  }
}

export default request;