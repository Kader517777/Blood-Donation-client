import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../Provider/AuthContext";
import TableRow from "../../Component/TableRow";

const MyDonationRequest = () => {
    const { user } = useContext(userContext);

    const [requestDonation, setRequestDonation] = useState();
    useEffect(() => {
        axios.get(`https://blood-donation-server-eight.vercel.app/requestDonation/${user?.email}`)
            .then(res => {
                setRequestDonation(res?.data);
            })
    }, [user?.email])

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold flex justify-center my-5">My Donation Request</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Recipient Name</th>
                            <th>Recipient Location</th>
                            <th>Donation Date</th>
                            <th>Donation Time</th>
                            <th>Donation Status</th>
                            <th>Donor Information</th>
                            <th>Edit</th>
                            <th>delete</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {requestDonation?.map((item, index) => <TableRow key={index} index={index} item={item} />)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDonationRequest;