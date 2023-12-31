import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { userContext } from "../../Provider/AuthContext";
import { useState } from "react";
import { useEffect } from "react";

const CreateDonationRequest = () => {
    const { user } = useContext(userContext);
    const [userCollection, setUserCollection] = useState({})
    useEffect(() => {
        axios.get(`https://blood-donation-server-eight.vercel.app/user/${user?.email}`)
            .then(res => {
                setUserCollection(res?.data);
            })
    }, [user?.email])

    const handleRegitration = (e) => {
        e.preventDefault();
        console.log(e.target.rName);
        const rName = userCollection?.name;
        const email = userCollection?.email;
        const recipientName = e.target.recipientName.value;
        const district = e.target.district.value;
        const upazila = e.target.upazila.value;
        const hospitalName = e.target.hospitalName.value;
        const fullAddress = e.target.fullAddress.value;
        const date = e.target.donationDate.value;
        const donationDate = new Date(date)
        const time = e.target.donationTime.value;
        const donationTime = new Date(time)
        const requestMassage = e.target.requestMassage.value;
        const donationStatus = 'pending';


        const createDonationRequest = {
            rName,
            email,
            recipientName,
            district,
            upazila,
            hospitalName,
            fullAddress,
            donationDate,
            donationTime,
            requestMassage,
            donationStatus,

        }

        axios.post('https://blood-donation-server-eight.vercel.app/createDonationRequest', createDonationRequest)
            .then(res => {
                console.log(res.data.acknowledged);
                if (res.data.acknowledged) {
                    toast.success('successfully Donation Request Created!!!')
                    e.target.reset();
                }
            })
    }

    return (
        <form onSubmit={handleRegitration} className="card-body flex-shrink-0">

            <h1 className="text-5xl font-bold">Create Donation Request!</h1>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Requester Name</span>
                </label>
                <p className="text-2xl text-[#ff00aa] font-bold">{userCollection?.name}</p>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <p className=" text-2xl text-[#ff00aa] font-bold">{userCollection?.email}</p>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Recipient Name</span>
                </label>
                <input type="text" name="recipientName" placeholder="Recipient Name" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Recipient District</span>
                </label>
                <input type="text" name="district" placeholder="Recipient District" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Recipient Upazila</span>
                </label>
                <input type="text" name="upazila" placeholder="Recipient Upazila" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Hospital Name</span>
                </label>
                <input type="text" name="hospitalName" placeholder="Hospital Name (Where donate blood)" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Full Address</span>
                </label>
                <input type="text" name="fullAddress" placeholder="Full Address" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Donation Date</span>
                </label>
                <input type="date" name="donationDate" placeholder="Donation Date" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Donation Time</span>
                </label>
                <input type="time" name="donationTime" placeholder="Donation Time" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Request Message</span>
                </label>
                <textarea type="text" rows="4" cols="50" name="requestMassage" placeholder="Donation Time" className="input input-bordered" required />
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary">Request Send</button>
            </div>
        </form>
    );
};

export default CreateDonationRequest;