import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { createProduct, clearErrors } from "../../actions/productAction";
import ImageIcon from "@mui/icons-material/Image";
import { categories } from "../../utils/constants";
import MetaData from "../Layouts/MetaData";
import BackdropLoader from "../Layouts/BackdropLoader";
import DateTimePicker from "react-datetime-picker";
import WorkerTable from "./WorkerTable";
const NewProduct = () => {
  const [DTvalue, onChange] = useState(new Date());
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.newProduct);

  const [required, setRequired] = useState([]);
  const [requireInput, setRequireInput] = useState({
    title: "",
    description: "",
  });

  const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [requirements, setRequirements] = useState([]);
//   const [cost, setCost] = useState(0);
//   const [purchasedBy, setPurchasedBy] = useState("");
  const [contactTo, setContactTo] = useState(0);
//   const [status, setStatus] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleSpecsChange = (e) => {
    setRequireInput({ ...requireInput, [e.target.name]: e.target.value });
  };

  const addSpecs = () => {
    if (!requireInput.title.trim() || !requireInput.title.trim()) return;
    setRequired([...required, requireInput]);
    setRequireInput({ title: "", description: "" });
  };

  const deleteSpec = (index) => {
    setRequired(required.filter((s, i) => i !== index));
  };

  

  const handleProductImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldImages) => [...oldImages, reader.result]);
          setImages((oldImages) => [...oldImages, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const [worker,setWorker] = useState([]);

  const fetchWorker = async()=>{
    const data = await fetch('../api/v1/get-worker');
    const parsedData = await data.json();
    setWorker(parsedData);
  }

  useEffect(()=>{
    fetchWorker();
  },[])

  const newProductSubmitHandler = async (e) => {
    console.log("submitted")
    e.preventDefault();

    const x = {
        name:title,
        phone:contactTo,
        // proof:images
    }

    const data = await fetch('../api/v1/add-worker',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(x)
    });
    const parsedData = await data.json();
    // console.log(parsedData);
    setTitle("");
    setContactTo(0);
    setImages([]);
    setWorker(parsedData);
    

    // required field checks
    
    
    // if (required.length <= 1) {
    //   enqueueSnackbar("Add Minimum 2 Specifications", { variant: "warning" });
    //   return;
    // }
    // if (images.length <= 0) {
    //   enqueueSnackbar("Add Product Images", { variant: "warning" });
    //   return;
    // }

    // const formData = new FormData();

    // formData.set("title", title);
    // // formData.set("description", description);
    // // formData.set("cost", cost);
    // // formData.set("requirements", requirements);
    // // formData.set("purchasedBy", "");
    // formData.set("contactTo", contactTo);

    // // images.forEach((image) => {
    // //   formData.append("images", image);
    // // });

    // // required.forEach((s) => {
    // //   formData.append("requirements", JSON.stringify(s));
    // // });

    // dispatch(createProduct(formData));
  };

  

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar("Product Created", { variant: "success" });
      dispatch({ type: NEW_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [dispatch, error, success, navigate, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Admin: New Product | Flipkart" />

      {loading && <BackdropLoader />}
      
      <form
        onSubmit={newProductSubmitHandler}
        encType="multipart/form-data"
        className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4"
        id="mainform"
      >
        <div className="flex flex-col gap-3 m-2 sm:w-1/2">
          <TextField
            label="title"
            variant="outlined"
            size="small"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <h2 className="font-medium">Contact Details</h2>
          <div className="flex justify-between gap-4 items-start">
            <TextField
              label="Contact To"
              type="number"
              variant="outlined"
              size="small"
              required
              value={contactTo}
              onChange={(e) => setContactTo(e.target.value)}
            />
            
            
          </div>
          </div>
        <div className="flex flex-col gap-2 m-2 sm:w-1/2">
          
          <div className="flex flex-col gap-1.5">
            {required.map((spec, i) => (
              <div className="flex justify-between items-center text-sm rounded bg-blue-50 py-1 px-2">
                <p className="text-gray-500 font-medium">{spec.title}</p>
                <p>{spec.description}</p>
                <span
                  onClick={() => deleteSpec(i)}
                  className="text-red-600 hover:bg-red-200 bg-red-100 p-1 rounded-full cursor-pointer"
                >
                  <DeleteIcon />
                </span>
              </div>
            ))}
          </div>

          <h2 className="font-medium">Upload Worker Photo</h2>
          <div className="flex gap-2 overflow-x-auto h-32 border rounded">
            {imagesPreview.map((image, i) => (
              <img
                draggable="false"
                src={image}
                alt="Product"
                key={i}
                className="w-full h-full object-contain"
              />
            ))}
          </div>
          <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2">
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleProductImageChange}
              className="hidden"
            />
            Choose Files
          </label>

          <div className="flex justify-end">
            <input
              form="mainform"
              type="submit"
              className="bg-primary-orange uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer"
              value="Submit"
            />
          </div>
        </div>
      </form>
      {console.log(worker,"jeet")}
      <WorkerTable worker={worker}/>
    </>
  );
};

export default NewProduct;
