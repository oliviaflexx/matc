import { axiosInstance } from "../config";
import moment from "moment";

const createRequest = async (resource, resources, requestInfo, setDataStrings, setDataArrays, setCreate, setErrors, setSuccess) => {
  try {
    const res = await axiosInstance.post(`/api/${resource}/`, requestInfo);
    console.log(res.data);
    resources.push(res.data);
    setDataStrings.map((setData) => setData(""));
    setDataArrays.map((setData) => setData([]));
    setCreate(false);

    if (resource === "meetings") {
      setSuccess({
        message: `${moment(res.data.date).format(
          "MMMM Do YYYY"
        )} meeting created`,
      });
    } else if (resource === "faculty") {
      setSuccess({ message: `${res.data.name} created` });
    } else {
      setSuccess({ message: `${res.data.title} created` });
    }
  } catch (err) {
    setErrors(err.response.data.errors);
  }
};

export default createRequest;