const vision = require('@google-cloud/vision');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const client = new vision.ImageAnnotatorClient({
  keyFilename: 'google-service-account.json'
});


async function containsHumanFace(filePathOrBase64) {
  let request;
  if (filePathOrBase64.startsWith('http') || filePathOrBase64.endsWith('.jpg') || filePathOrBase64.endsWith('.png')) {
    request = { image: { source: { imageUri: filePathOrBase64 } } };
  } else {
    request = { image: { content: filePathOrBase64 } };
  }
  const [result] = await client.faceDetection(request);
  const faces = result.faceAnnotations;
  return faces && faces.length > 0;
}

async function detectLabels(imageBase64) {
  const [result] = await client.labelDetection({ image: { content: imageBase64 } });
  return result.labelAnnotations || [];
}

async function detectText(imageBase64) {
  const [result] = await client.textDetection({ image: { content: imageBase64 } });
  return result.textAnnotations || [];
}

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));


app.post('/vision/face', async (req, res) => {
  const { imageBase64 } = req.body;
  try {
    const hasFace = await containsHumanFace(imageBase64);
    res.json({ hasFace });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/vision/label', async (req, res) => {
  const { imageBase64 } = req.body;
  try {
    const labels = await detectLabels(imageBase64);
    res.json({ labels });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/vision/text', async (req, res) => {
  const { imageBase64 } = req.body;
  try {
    const texts = await detectText(imageBase64);
    res.json({ texts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = { containsHumanFace, detectLabels, detectText };

if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Vision face detection server running on port ${PORT}`);
  });
}
