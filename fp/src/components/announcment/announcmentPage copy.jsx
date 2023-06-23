import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import "ol/ol.css"; // Import OpenLayers CSS
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import PersonIcon from "@mui/icons-material/Person";
import PaletteIcon from "@mui/icons-material/Palette";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
export function Profile() {
  const [data, setData] = useState([]);
  const [disaster, setId] = useState([]);
  const { id } = useParams();
  const ref = useRef(null);
  const [mode, setMode] = useState("default"); // Add a state variable for the mode

  const [comment, setComment] = useState({});
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/a/${id}`);
        setData(response.data.data);
        setId(response.data.data.idDisaster);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, sent]);
  const mapRef = useRef({}); // Reference to the map container element

  useEffect(() => {
    if (mapRef.current) {
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat(generateMapPosition()),
          zoom: 13,
        }),
      });

      if (disaster) {
        const markerFeature = new Feature({
          geometry: new Point(fromLonLat(generateMapPosition())),
        });

        const markerStyle = new Style({
          image: new CircleStyle({
            radius: 6, // Set the desired size of the marker
            fill: new Fill({
              color: "red", // Set the desired color of the marker
            }),
            stroke: new Stroke({
              color: "white",
              width: 2,
            }),
          }),
        });

        markerFeature.setStyle(markerStyle);

        const vectorSource = new VectorSource({
          features: [markerFeature],
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
        });

        map.addLayer(vectorLayer);
      }
    }
  }, [disaster]);
  const generateMapPosition = () => {
    if (disaster && disaster.length > 0) {
      const { latitude, longitude } = disaster[0]; // Access the first element
      return [latitude, longitude];
    }

    return [0, 0];
  };
  const handleCommentEnter = (event) => {
    const { name, value } = event.target;
    setComment((prevComment) => ({ ...prevComment, [name]: value }));
  };

  const postComment = () => {
    const commentUrl = "http://localhost:5000/api/comment";
    const oldPostUrl = `http://localhost:5000/api/a/${id}`;

    alert(comment);
    axios
      .post(commentUrl, comment)
      .then((response) => {
        const newCommentId = response.data.data._id;
        console.log(response);
        alert(newCommentId);
        axios
          .post(oldPostUrl, { reactionId: newCommentId })
          .then((response) => {
            console.log(response);
            alert("Last Done");
            setSent(!sent); // Toggle the value of sent to trigger the useEffect hook
            setComment(""); // Clear the comment input field
            handleCloseDialog();
          })
          .catch((error) => {
            console.error("Error posting comment to /api/a/{id}:", error);
          });
      })
      .catch((error) => {
        console.error("Error posting comment to /api/comment:", error);
      });
  };
  return (
    <div className="card bg-gray-200 shadow-md rounded-md mb-6 mx-10">
      <div className="card-content flex justify-space-between items-center">
        <div className="w-1/2 mr-10">
          <h5 className="font-bold text-primary text-2xl mb-2">{data.title}</h5>
          <img src={""} alt="Disaster" className="w-full mb-4 rounded-md" />
          <div className="mb-4">
            <h6 className="font-bold text-secondary text-xl mb-2">
              Description:
            </h6>
            <p className="text-secondary">{data.description}</p>
          </div>
          <div className="mb-4">
            <h6 className="font-bold text-secondary text-xl mb-2">Contact:</h6>
            <p className="text-secondary">{data.contact}</p>
          </div>
          <div className="mb-4">
            <h6 className="font-bold text-secondary text-xl mb-2">
              Person Information:
            </h6>
            <div className="flex items-center">
              <p className="text-secondary font-bold mr-2">Name:</p>
              <p className="text-secondary">{data.personName}</p>
            </div>
            <div className="flex items-center">
              <p className="text-secondary font-bold mr-2">Age:</p>
              <p className="text-secondary">{data.personAge}</p>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div
            ref={mapRef}
            className="map-container w-full h-96 rounded-md shadow-md"
          ></div>
          <Button
            variant="contained"
            color="primary"
            onClick={generateMapPosition}
            className="mt-4"
          >
            Generate Map Position
          </Button>
        </div>
      </div>

      <div className="bg-gray-100 py-4 px-10">
        <h5 className="font-bold text-primary text-2xl mb-2">
          {/* Comments ({data.comments.length}) */}
        </h5>
        {/* {data && data.comments.map((comment) => (
          <Card className="mb-4" key={comment.id}>
            <CardContent>
              <Typography variant="h6">{comment.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {comment.comment}
              </Typography>
            </CardContent>
          </Card>
        ))} */}

        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          className="mt-4"
        >
          Add Comment
        </Button>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add Comment</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Your Name"
              type="text"
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              margin="dense"
              name="comment"
              label="Your Comment"
              type="text"
              multiline
              fullWidth
              value={comment.comment}
              onChange={handleCommentEnter}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={postComment} color="primary">
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Profile;
