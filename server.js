// server.js (in root folder)
const app = require('./backend/src/app'); // adjust path if needed
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
