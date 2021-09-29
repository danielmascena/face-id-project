import {useState} from 'react';
import Clarifai from "clarifai";
import CaptureImage from './components/CaptureImage';
import FaceDetect from './components/FaceDetect';
import ImageSearchForm from './components/ImageSearchForm';

// You need to add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: "3100d113e5214b2dbb10d08d06c3a2f6",
});


export default function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  // setState for our input with onInputChange function
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  // Perform a function when submitting with onSubmit
  const onSubmit = () => {
        // set imageUrl state
    setImageUrl(input);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input).then(
      (response) => displayFaceBox(calculateFaceLocation(response))
      ).catch((err) => console.log(err));
  };

  console.log({app})
  return (
    <div>
      <CaptureImage />
      <ImageSearchForm
        onInputChange={onInputChange}
        onSubmit={onSubmit}
      />
      
      <FaceDetect box={box} imageUrl={imageUrl} />
    </div>
  );
}
