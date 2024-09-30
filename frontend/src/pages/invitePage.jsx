import React, {useState} from "react";
import './invitePage.css';
import { useLocation } from "react-router-dom";

const InvitePage = () => {
    const location = useLocation();
    const selectedPlaces = location.state?.selectedPlaces || [];  //Default selectedPlaces to an empty array
    const [selectedPlace, setSelectedPlace] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState("");
    console.log(selectedPlaces,"----------------------------")

    const handleInvite = () => {
        // Logic for sending invites (e.g., API call)
        console.log("Invites sent for:", title);
    };

    return (
        <div>
        <div className="Invite-page-main">
            <h1>Invite Page</h1>

            <div className="form-section">
                <div className="form-group">
                    <label>Add Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Add title"
                    />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Time:</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Location (Selected Place):</label>
                    <input
                        type="text"
                        value={selectedPlace || ""}
                        readOnly
                        placeholder="Select a place from the list"
                    />
                </div>

                <div className="form-group">
                    <label>Add Guests:</label>
                    <input
                        type="text"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        placeholder="Add guests (comma-separated)"
                    />
                </div>

                <button onClick={handleInvite} className="invite-button">Invite</button>
            </div>

            {/* Display remaining selected places */}
            {selectedPlaces.length > 0 && (
                <div className="places-list">
                    <h2>Select a Location</h2>
                    {selectedPlaces.map((place, index) => (
                        <div
                            key={index}
                            className="place-card"
                            onClick={() => setSelectedPlace(place.name)} // Set selected place name on click
                            style={{ cursor: "pointer", border: "1px solid #ccc", marginBottom: "10px", padding: "10px", borderRadius: "5px" }} // Added styles for better UX
                        >
                            <h5>{place.name}</h5>
                            <p>{place.vicinity}</p>
                            <p>Rating: {place.rating || "N/A"}</p>
                            {place.photos && place.photos.length > 0 && (
                                <img
                                    src={place.photos[0].getUrl()}
                                    alt={place.name}
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
    );
};

export default InvitePage;

