import axios from "axios";
import { React, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({token}) => {

    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [name, setName] = useState('');
    const [description, setDesc] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData()

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)

            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("size", size)

            const response = await axios.post(backendUrl + '/api/product/add', formData, {headers:{token}});
            
            if (response.data.success) {
                toast.success(response.data.message, {
                    position: "top-center"
                  });

                  setName('');
                  setDesc('');
                  setSize('');
                  setPrice('');
                  setImage1(false);
                  setImage2(false);
            } else {
                toast.error(response.data.message, {
                    position: "top-center"
                  });
            }

        } catch (error) {
            console.log(error);
            toast.success(response.data.message, {
                position: "top-center"
              });
        }
    }


    return (
        <div className="flex flex-col justify-center items-center">
            <form onSubmit={onSubmitHandler} className="">
                <div className="text-center mb-2">
                    <p className="text-2xl mb-2">Upload Images</p>
                    <div className="flex gap-4">
                        <label htmlFor="image1">
                            {/* Renders upload image unless product image has been selected */}
                            {!image1 ?
                                <div className="flex flex-col justify-center items-center border-2 border-dashed border-black size-40 md:size-64 cursor-pointer">
                                    <i className="fa-solid fa-cloud-arrow-up text-4xl"></i>
                                    <p className="text-xl">Front</p>
                                </div>
                                : <img className="size-40 md:size-64 object-scale-down cursor-pointer" src={URL.createObjectURL(image1)} alt="" />
                            }
                            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden required />
                        </label>
                        <label htmlFor="image2">
                            {!image2 ?
                                <div className="flex flex-col justify-center items-center border-2 border-dashed border-black size-40 md:size-64 cursor-pointer">
                                    <i className="fa-solid fa-cloud-arrow-up text-4xl"></i>
                                    <p className="text-xl">Back</p>
                                </div>
                                : <img className="size-40 md:size-64 object-scale-down" src={URL.createObjectURL(image2)} alt="" />
                            }
                            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden/>
                        </label>
                    </div>
                </div>
                <div className="w-full mb-2">
                    <p className="mb-2">Product Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} className="w-full border border-stone-800 p-2 rounded-none" type="text" placeholder="Type here" required />
                </div>
                <div className="w-full mb-2">
                    <p className="mb-2">Product Description</p>
                    <textarea onChange={(e) => setDesc(e.target.value)} value={description} className="border border-stone-800 p-2 w-full rounded-none" type="" placeholder="Write content here" required />
                </div>
                <div className="flex flex-row items-center gap-5 mb-4">
                    <div className="w-full">
                        <p className="mb-2">Product Size</p>
                        <select onChange={(e) => setSize(e.target.value)} value={size} className="w-full border border-stone-800 p-2 rounded-none" required>
                            <option value="">Select Size</option>
                            <option value="S">Small</option>
                            <option value="M">Medium</option>
                            <option value="L">Large</option>
                            <option value="XL">Extra Large</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <p className="mb-2">Product Price</p>
                        <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full border border-stone-800 p-2 rounded-none" type="number" placeholder="0" required />
                    </div>
                </div>
                <button className="bg-green text-ivory w-full py-2" type="submit">Add Product</button>
            </form>
        </div>
    )
}

export default Add;