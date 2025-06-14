
import { memo, useEffect, useMemo, useState } from "react";
import { GoogleMap, Libraries, Marker, useJsApiLoader } from "@react-google-maps/api";
import TaskModal, {
  TaskModalContent,
  TaskModalFooter,
  TaskModalHeader,
} from "../modals/TaskModal";
import MyCloseIcon from "../icons/My_CloseIcon";
import AyButton from "../myUi/AyButton";
import CircularProgress from "@mui/material/CircularProgress";
import { UseModal } from "@/providers/context/context";
import { makeToast, makeToastError } from "@/utils/toaster";
// import axios from "axios";

type Props = {
  setFieldValue: any;
  setGoogleAddress: (address: string) => void;
  googleAddress?: string;
};

// AlzaSy6Y1_RkdZ_JtlecBl6bFHUXuQwbf-CnjmB
const libraries: Libraries = ["geometry"];

function GoogleMapModal({ setFieldValue }: Props) {
  const { setIsOpen } = UseModal();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBpUCwzl4G9L6vrFOElEawM86H2QIQ6tdM", // Replace with your API key
    // libraries: ["places"], // Include 'places' if you want autocomplete functionality
    libraries,
  });

  // useEffect(() => {
  //   if (loadError) {
  //     console.error("❌ Invalid Google Maps API Key:", loadError);
  //     // setApiKeyValid(false);
  //     makeToastError("Invalid Google Maps API Key. Please check your key.");
  //   }
  // }, [loadError]);
  // makeToast("hshdas")

  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const containerStyle = useMemo(
    () => ({
      width: "100%",
      height: "400px",
    }),
    []
  );

  // Function to get the current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition({ lat: latitude, lng: longitude });
          setFieldValue("googleLocation", {
            latitude: latitude,
            longitude:longitude,
          });
          // setFieldValue("googleLocation", `${latitude}, ${longitude}`);
        },
        (error) => {
          console.error("Error getting location: ", error);
          // Use a default location (Delhi, in this case) if location is not available
          setMarkerPosition({ lat: 28.7041, lng: 77.1025 });
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setMarkerPosition({ lat: 28.7041, lng: 77.1025 }); // Default to Delhi
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const latLng = event.latLng;
    if (latLng) {
      const newPos = { lat: latLng.lat(), lng: latLng.lng() };
      // console.log(newPos, 'newPos');
      setMarkerPosition(newPos);
      //   setFieldValue('googleLocation', `${newPos.lat}, ${newPos.lng}`);
    }
  };

  // const handleSaveGoogleLocation = async () => {
  //   try {
  //     setIsLoading(true);
  //     const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${markerPosition?.lat}&lon=${markerPosition?.lng}`;
  //     await fetch(url)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch data from OpenStreetMap");
  //         }
  //         return response.json(); // Parse JSON response
  //       })
  //       .then((data) => {
  //         console.log(data,'google location');

  //         setFieldValue("store_address", data.display_name || data.address.city || data.address.town || data.address.village);
  //         setFieldValue("state", data.address.state);
  //         setFieldValue("country", data.address.country);
  //         setFieldValue("pincode", data.address.postcode);
  //         setFieldValue("googleLocation", {
  //           lat: markerPosition?.lat,
  //           lng: markerPosition?.lng,
  //         });
  //       })
  //       .catch(() => {
  //         setIsLoading(false);
  //         makeToastError("Something went wrong");
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //         makeToast("Address Fetched By Your Location");
  //         setIsOpen(false);
  //       });
  //   } catch (error) {
  //     console.error("Error fetching address from nominatim:", error);
  //     makeToastError("Error fetching address from Nominatim");
  //     return;
  //   }

  //   // if (markerPosition) {
  //   //   // makeToast("Google Location Added");
  //   //   // setFieldValue('googleLocation', `${markerPosition.lat}, ${markerPosition.lng}`);
  //   //   setFieldValue("googleLocation", {
  //   //     lat: markerPosition.lat,
  //   //     lng: markerPosition.lng,
  //   //   });
  //   //   setIsOpen(false);
  //   // }
  // };
  const reverseGeocodeUrl = useMemo(() => {
    if (!markerPosition) return null;
    return `https://nominatim.openstreetmap.org/reverse?format=json&lat=${markerPosition.lat}&lon=${markerPosition.lng}`;
  }, [markerPosition]);

  const handleSaveGoogleLocation = async () => {
    if (!reverseGeocodeUrl) return;

    try {
      setIsLoading(true);
      const response = await fetch(reverseGeocodeUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch data from OpenStreetMap");
      }

      const data = await response.json();

      setFieldValue(
        "storeAddress",
        data.display_name ||
          data.address.city ||
          data.address.town ||
          data.address.village
      );
      setFieldValue("state", data.address.state);
      setFieldValue("country", data.address.country);
      setFieldValue("pinCode", data.address.postcode);
      setFieldValue("googleLocation", {
        latitude: markerPosition?.lat,
        longitude: markerPosition?.lng,
      });

      makeToast("Address Fetched By Your Location");
      setIsOpen(false);
    } catch (error) {
      console.error("Error fetching address from Nominatim:", error);
      makeToastError("Error fetching address from Nominatim");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TaskModal className="h-fit 2xl:w-[40%] lg:w-[50%] md:w-[70%] w-full ">
      <TaskModalHeader>
        <div className="w-full">
          <span>Set Location</span>
        </div>
        <MyCloseIcon
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </TaskModalHeader>
      <TaskModalContent className="h-full">
        {isLoaded && markerPosition ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={markerPosition}
            zoom={12}
            onClick={handleMapClick}
          >
            <Marker position={markerPosition} />
          </GoogleMap>
        ) : (
          <div className="w-full flex items-center justify-center h-[400px]">
            <CircularProgress color="inherit" />
          </div>
        )}
      </TaskModalContent>
      <TaskModalFooter className="mt-auto">
        <AyButton
          title={`${isLoading ? "loading..." : "Set This Location"}`}
          onClick={() => {
            handleSaveGoogleLocation();
          }}
        />
      </TaskModalFooter>
    </TaskModal>
  );
}

export default memo(GoogleMapModal);
