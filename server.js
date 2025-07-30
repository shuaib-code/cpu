const express = require("express");
const os = require("os");
const app = express();

// Basic endpoint to test server
app.get("/", (req, res) => {
	res.json({
		message: "Node.js Express Server is running!",
		status: "success",
	});
});

// Endpoint to check CPU and RAM usage
app.get("/stats", (req, res) => {
	const totalMem = os.totalmem() / (1024 * 1024); // Convert to MB
	const freeMem = os.freemem() / (1024 * 1024); // Convert to MB
	const usedMem = totalMem - freeMem;
	const cpuCount = os.cpus().length;

	res.json({
		cpu: {
			cores: cpuCount,
			model: os.cpus()[0].model,
		},
		memory: {
			totalMB: totalMem.toFixed(2),
			usedMB: usedMem.toFixed(2),
			freeMB: freeMem.toFixed(2),
			usagePercent: ((usedMem / totalMem) * 100).toFixed(2),
		},
		uptime: os.uptime(),
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
