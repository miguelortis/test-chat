import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../components/contexts/Context";
import { createRoot } from "react-dom/client";
import { Wrapper } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";


const render = (status) => {
    return <h1>{status}</h1>;
};

export default function App({ latLng }) {
    const { state: { users } } = useContext(Context);
    // [START maps_react_map_component_app_state]
    const [clicks, setClicks] = useState([]);
    const [zoom, setZoom] = useState(4); // initial zoom
    const [center, setCenter] = useState({
        lat: 0,
        lng: 0,
    });
    useEffect(() => {
        setCenter({
            lat: latLng.lat,
            lng: latLng.lng,
        })
    }, [latLng])

    console.log(users);
    const onClick = (e) => {
        // avoid directly mutating state
        setClicks([...clicks, e.latLng]);
        //console.log(zoom, e.latLng);
    };

    const onIdle = (m) => {
        //console.log("onIdle");
        setZoom(m.getZoom());
        setCenter(m.getCenter().toJSON());
    };


    // [END maps_react_map_component_app_state]
    const form = (
        <div
            style={{
                padding: "1rem",
                flexBasis: "250px",
                height: "100%",
                overflow: "auto",
            }}
        >
            <label htmlFor="zoom">Zoom</label>
            <input
                type="number"
                id="zoom"
                name="zoom"
                value={zoom}
                onChange={(event) => setZoom(Number(event.target.value))}
            />
            <br />
            <label htmlFor="lat">Latitude</label>
            <input
                type="number"
                id="lat"
                name="lat"
                value={center.lat}
                onChange={(event) =>
                    setCenter({ ...center, lat: Number(event.target.value) })
                }
            />
            <br />
            <label htmlFor="lng">Longitude</label>
            <input
                type="number"
                id="lng"
                name="lng"
                value={center.lng}
                onChange={(event) =>
                    setCenter({ ...center, lng: Number(event.target.value) })
                }
            />
            <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
            {clicks.map((latLng, i) => (
                <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
            ))}
            <button onClick={() => setClicks([])}>Clear</button>
        </div>
    );
    // [START maps_react_map_component_app_return]
    return (

        <div style={{ display: "block", height: "60vh", width: '50vw' }}>
            {/* {form} */}
            <Wrapper apiKey={"AIzaSyDw1cyxaqcruJeEMl-CTeZnQ4doXVYyT0A&libraries"} render={render}>
                <Map
                    center={center}
                    onClick={onClick}
                    onIdle={onIdle}
                    zoom={zoom}
                    style={{ flexGrow: "1", height: "100%" }}
                >
                    {users.map((user, i) => (
                        <Marker key={i} position={user.geolocation} />
                    ))}
                </Map>
            </Wrapper>
            {/* Basic form for controlling center and zoom of map. */}

        </div>

    );
    // [END maps_react_map_component_app_return]
};

const Map = ({ onClick, onIdle, children, style, ...options }) => {
    // [START maps_react_map_component_add_map_hooks]
    const ref = React.useRef(null);
    const [map, setMap] = React.useState();

    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);
    // [END maps_react_map_component_add_map_hooks]
    // [START maps_react_map_component_options_hook]
    // because React does not do deep comparisons, a custom hook is used
    // see discussion in https://github.com/googlemaps/js-samples/issues/946
    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);
    // [END maps_react_map_component_options_hook]
    // [START maps_react_map_component_event_hooks]
    React.useEffect(() => {
        if (map) {
            ["click", "idle"].forEach((eventName) =>
                window.google.maps.event.clearListeners(map, eventName)
            );
            if (onClick) {
                map.addListener("click", onClick);
            }

            if (onIdle) {
                map.addListener("idle", () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);
    // [END maps_react_map_component_event_hooks]
    // [START maps_react_map_component_return]
    return (
        <>
            <div ref={ref} style={style} />
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    return React.cloneElement(child, { map });
                }
            })}
        </>
    );
    // [END maps_react_map_component_return]
};

// [START maps_react_map_marker_component]
const Marker = (options) => {
    const [marker, setMarker] = React.useState();

    React.useEffect(() => {
        if (!marker) {
            setMarker(new window.google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);
    React.useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);
    return null;
};

// [END maps_react_map_marker_component]
const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
    if (
        isLatLngLiteral(a) ||
        a instanceof window.google.maps.LatLng ||
        isLatLngLiteral(b) ||
        b instanceof window.google.maps.LatLng
    ) {
        return new window.google.maps.LatLng(a).equals(new window.google.maps.LatLng(b));
    }
    // TODO extend to other types
    // use fast-equals for other objects
    return deepEqual(a, b);
});

function useDeepCompareMemoize(value) {
    const ref = React.useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value;
    }
    return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

// window.addEventListener("DOMContentLoaded", () => {
//     const root = createRoot(document.getElementById("root"));

//     root.render(<App />);
// });