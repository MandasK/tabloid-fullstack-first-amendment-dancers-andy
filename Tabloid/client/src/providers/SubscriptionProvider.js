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
        getToken().then((token) =>
            fetch(`/api/subscription/${subscriber}/${provider}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setSubscriptions));
    };

    ///api/subscription/GetAllUserSubscriptions

    const getUserSubscriptions = () => {
        return getToken().then((token) =>
            fetch(`/api/subscription/GetAllUserSubscriptions`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
        );
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
                .then(resp => {
                    if (resp.ok) {
                        return resp.json();
                    }
                    throw new Error("Unauthorized");
                }
                )
        );


    const Unsubscribe = (id) =>
        getToken().then((token) =>
            fetch(`/api/subscription/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }));



    return (
        <SubscriptionContext.Provider value={{ subscriptions, addSubscription, getReleventSubscriptions, Unsubscribe, getUserSubscriptions }}>
            {props.children}
        </SubscriptionContext.Provider>
    );
};