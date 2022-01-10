import { axiosInstance } from "../config";
const getRequest = async (resource, setData, setOGData, setErrors) => {
  try {
    const res = await axiosInstance.get(`/api/${resource}`);
    //   console.log(res.data);
    setData(res.data);
    if (setOGData) {
       setOGData(res.data);
    }
   
  } catch (err) {
    setErrors(err.response.data.errors);
    console.log(err);
  }
};

export default getRequest;
