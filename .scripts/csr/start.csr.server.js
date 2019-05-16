/* global process */
import express from 'express';
import path from 'path';
import {getVariablesesEnvironment} from "../../.tools";
import openBrowser from "react-dev-utils/openBrowser";



getVariablesesEnvironment();

const app = express();
const PORT = process.env.port || 3000;
const PUBLIC = process.env.public || '../dist';

app.use(express.static(PUBLIC));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(PUBLIC + '/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}. !!!!!!!!`);
});
openBrowser(`http://localhost:${PORT}`);
