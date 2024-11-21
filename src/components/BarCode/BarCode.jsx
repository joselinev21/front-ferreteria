import { useEffect, useState } from "react";

const BarCode = () => {
  const [videoData, setVideoData] = useState(null);

  const onClickCamera = async () => {
    const getPermisse = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    getPermisse.then(function (mediaStream) {
      console.log(mediaStream);

      setVideoData(window.URL.createObjectURL(mediaStream));
    });

    getPermisse.catch(function (err) {
      console.log(err.name);
    });
  };

  useEffect(() => {
    onClickCamera();
  }, []);

  console.log(videoData);

  return (
    <div>
      <video src={videoData} autoPlay>
        {}
      </video>
      <h1>BarCode</h1>
    </div>
  );
};

export default BarCode;
