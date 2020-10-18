import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SubscriptionContext = React.createContext();

export const SubscriptionProvider = (props) => {
    const [subscriptions, setSubscriptions] = useState([]);
    const { getToken } = useContext(UserProfileContext);


    // const getReleventSubscriptions = (subscriber, provider) =>
    //     getToken().then((token) =>
    //         fetch(`/api/subscription/${subscriber}/${provider}`, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }).then((res) => res.json())
    //             .then(setSubscriptions));

    const getReleventSubscriptions = (subscriber, provider) => {
        debugger
        getToken().then((token) =>
            fetch(`/api/subscription/${subscriber}/${provider}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setSubscriptions));
    };



    const addSubscription = (subscription) =>
        getToken().then((token) =>
            fetch("/api/subscription/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(subscription)
            })
            //.then(resp => {
            // if (resp.ok) {
            //     return resp.json();
            // }
            // throw new Error("Unauthorized");
            // }
            //)
        );


    // const Unsubscribe = (subscription) =>
    //     getToken().then((token) =>
    //         fetch(`/api/subscription/${subscription}`, {
    //             method: "PUT",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(subscription),
    //         }));



    return (
        <SubscriptionContext.Provider value={{ subscriptions, addSubscription, getReleventSubscriptions }}>
            {props.children}
        </SubscriptionContext.Provider>
    );
};