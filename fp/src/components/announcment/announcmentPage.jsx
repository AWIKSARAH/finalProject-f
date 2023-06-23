import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import ai from "../../assets/pexels-photo-4262424.jpeg";
import "./style.css";
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const StyledCard = styled(Card)({
  backgroundColor: "#f0ecec",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  marginBottom: "16px",
  display: "flex",
  marginRight: "10%",
  marginLeft: "10%",

  // Media query for iPad screens
  "@media (max-width: 1024px)": {
    flexDirection: "column",
    alignItems: "center",
  },

  // Media query for phone screens
  "@media (max-width: 480px)": {
    flexDirection: "column",
    alignItems: "center",
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#215d7f", // Replace with your primary color
    },
    secondary: {
      main: "#FF0000", // Replace with your secondary color
    },
    background: {
      default: "#DFF1E8",
    },
  },
});

const Title = styled(Typography)({
  fontWeight: "bolder",
  color: theme.palette.primary.main,
  fontSize: "2.5em",
});
const Description = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const Contact = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.secondary.main,
}));

const PersonInfoWrapper = styled.div`
  margin-top: 16px;
`;

const PersonInfoTitle = styled(Typography)({
  fontWeight: "bold",
  color: theme.palette.primary.main,
});

const PersonInfoItem = styled(Typography)(({ theme, color }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: theme.spacing(1),
  color: color, // Apply the color based on the prop value
}));

const DisasterInfoWrapper = styled.div`
  margin-top: 16px;
`;

const DisasterInfoTitle = styled(Typography)({
  fontWeight: "bold",
});

const DisasterInfoItem = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const ReactionWrapper = styled.div`
  margin-top: 16px;
  border-top: 1px solid #8080805e;
  padding: 10px 5px;
  overflow: scroll;
`;

const ReactionTitle = styled(Typography)({
  fontWeight: "bold",
});

const ColorCircle = styled("div")(({ color }) => ({
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  backgroundColor: color,
  marginLeft: "8px",
}));
const ReactionItem = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  borderBottom: "1.5px solid #80808040",
}));

const DataCard = () => {
  const [data, setData] = useState([]);
  const [disaster, setId] = useState([]);
  const { id } = useParams();
  const ref = useRef(null);
  const [mode, setMode] = useState("default"); // Add a state variable for the mode

  const [comment, setComment] = useState({});
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // ...

  console.log(id);
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

  // if (!data) {
  //   return <div>Loading...</div>;
  // }
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const { idDisaster } = data;

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
    <ThemeProvider theme={theme}>
      {" "}
      <StyledCard>
        <CardContent
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div style={{ width: "50%", marginRight: "10%" }}>
            <Title variant="h5">{data.title}</Title>
            <img src={ai} alt="Image" style={{ width: "100%" }} />
            <button style={{ width: "100%" }}>did</button>
          </div>
          <div style={{ width: "50%" }}>
            {" "}
            <Description variant="body1">{data.description}</Description>
            <Contact variant="body2">Contact: {data.tel}</Contact>
            {data.idPerson && (
              <PersonInfoWrapper>
                <PersonInfoTitle variant="h6">
                  Person Information:
                </PersonInfoTitle>
                <PersonInfoItem>
                  <PersonIcon />
                  <span style={{ marginLeft: "8px" }}>
                    Name: {data.idPerson.name}
                  </span>
                </PersonInfoItem>

                <PersonInfoTitle variant="h6">
                  Person Information:
                </PersonInfoTitle>
                <PersonInfoItem>
                  <VisibilityIcon />
                  <span style={{ marginLeft: "8px" }}>
                    Eyes: {data.idPerson.eyes}
                  </span>
                  <ColorCircle
                    color={
                      data.idPerson.eyes === "Blue"
                        ? "#0000FF"
                        : data.idPerson.eyes === "Brown"
                        ? "#654321"
                        : data.idPerson.eyes === "Green"
                        ? "#008000"
                        : data.idPerson.eyes === "Hazel"
                        ? "#B58900"
                        : ""
                    }
                  />
                </PersonInfoItem>
                <PersonInfoItem>
                  <LocalLaundryServiceIcon />
                  <span style={{ marginLeft: "8px" }}>
                    Color Hair: {data.idPerson.colorHair}
                  </span>
                  <ColorCircle
                    color={
                      data.idPerson.colorHair === "Blonde"
                        ? "#FFFF00"
                        : data.idPerson.colorHair === "Brown"
                        ? "#964B00"
                        : data.idPerson.colorHair === "Black"
                        ? "#000000"
                        : data.idPerson.colorHair === "Red"
                        ? "#FF0000"
                        : ""
                    }
                  />
                </PersonInfoItem>
                <PersonInfoItem>
                  <PaletteIcon />
                  <span
                    style={{
                      marginLeft: "8px",
                      color: `${data.idPerson.colorSkin}`,
                    }}
                  >
                    Color Skin: {data.idPerson.colorSkin}
                  </span>
                  <ColorCircle
                    color={
                      data.idPerson.colorSkin === "Fair"
                        ? "#F8DEB3"
                        : data.idPerson.colorSkin === "Medium"
                        ? "#D2B48C"
                        : data.idPerson.colorSkin === "Dark"
                        ? "#8B4513"
                        : ""
                    }
                  />
                </PersonInfoItem>
              </PersonInfoWrapper>
            )}
            {data.idDisaster && (
              <DisasterInfoWrapper>
                <DisasterInfoTitle variant="h6">
                  Disaster Information:
                </DisasterInfoTitle>
                <DisasterInfoItem>
                  Type: {data.idDisaster.type}
                </DisasterInfoItem>
                <DisasterInfoItem>
                  Location: {data.idDisaster.location}
                </DisasterInfoItem>
                {/* Add more disaster info fields as needed */}
              </DisasterInfoWrapper>
            )}
          </div>
        </CardContent>
        <>
          <section className="comments-section">
            {data.reactionId && data.reactionId.length > 0 && (
              <ReactionWrapper>
                <ReactionTitle variant="h6">Reactions:</ReactionTitle>
                <div className="comment-new">
                  <Button variant="contained" onClick={handleOpenDialog}>
                    Add Comment
                  </Button>

                  <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Add Comment</DialogTitle>
                    <DialogContent>
                      <h3>Add your Comment</h3>
                      <h6
                        style={{
                          color: "gray",
                          marginBottom: "revert",
                          fontSize: "8px",
                        }}
                      >
                        Be positive and leave a beautiful touch !{" "}
                      </h6>

                      <TextField
                        label="Name"
                        name="name"
                        onChange={handleCommentEnter}
                      />
                      <TextField
                        label="Comment"
                        onChange={handleCommentEnter}
                        multiline
                        name="comment"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog}>Cancel</Button>
                      <Button onClick={postComment} color="primary">
                        Post Comment
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
                <div style={{ height: "300px", overflowY: "scroll" }}>
                  {data.reactionId.map((reaction) => (
                    <ReactionItem key={reaction._id}>
                      <div className="comment response" key={reaction._id}>
                        <div className="comment-avatar-container">
                          <img
                            className="comment-avatar"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs3B68lDbcT4MjXQrdGhS6L3_R9wEXA2FNolmSjVbXdg&s"
                            alt="avatar"
                          />
                        </div>
                        <p className="comment-text">{reaction.comment}</p>
                        <p className="comment-time-stamp">{reaction.name}</p>
                      </div>
                    </ReactionItem>
                  ))}
                </div>
              </ReactionWrapper>
            )}
          </section>
        </>
      </StyledCard>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "300px", overflow: "hidden" }}
      ></div>
    </ThemeProvider>
  );
};

export default DataCard;
