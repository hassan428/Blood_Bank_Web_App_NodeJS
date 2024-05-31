import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ErrorMessage } from './ErrorMessage';

export const Request = () => {
    const [errorMsg, setErrorMsg] = useState("eee");
    const [renderError, setRenderError] = useState(false);
    const [renderData, setRenderData] = useState([]);

    const store = useSelector((store) => store);
    const { userData, anOtheruserData, userLogged } = store;








    console.log(userData);
    useEffect(() => {
        if (!userData.myRequest) {
            setErrorMsg("There  is no request to display.");
            setRenderError(true);
        }
        else {
            setRenderData(Object.values(userData.myRequest))
            console.log(renderData)
            setRenderError(false);
        }
    }, [userData])



    return <>
        {
            renderError ? <ErrorMessage errorMsg={errorMsg} />
                :
                renderData.map((obj, ind) => {
                    const { birthDate, bloodGroup, email, firstName, lasttName, password, uid, username } = obj;

                    return <div key={ind} className='bg-secondary-main text-black m-2 p-2 flex justify-between items-center'>
                        <div>
                            <h3>Blood Group: {bloodGroup}</h3>
                            <h3>User Name: {username}</h3>
                        </div>
                        <div>
                            <h3>Full Name: {firstName + " " + lasttName}</h3>
                            <h3>Email: {email}</h3>
                        </div>
                    </div>
                })}
    </>

}
