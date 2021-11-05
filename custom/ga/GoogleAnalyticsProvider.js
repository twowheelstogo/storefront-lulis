import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import * as ga from "./index";

function GoogleAnalyticsProvider(props) {
    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = (url) => {
            ga.pageview(url);
        }
        //When the component is mounted, subscribe to router changes
        //and log those page views
        router.events.on('routeChangeComplete', handleRouteChange)

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    );

}

export default GoogleAnalyticsProvider;