import { axiosInstance } from "../config";

const showRequest = async (resource, id, setData, setErrors) => {
  try {
    const res = await axiosInstance.get(`/api/${resource}/${id}`);
    //   console.log(res.data);
    setData(res.data);
  } catch (err) {
    setErrors(err.response.data.errors);
    console.log(err);
  }
};

export default showRequest;
