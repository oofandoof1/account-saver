const express = require('express');
const app = express();

app.use(express.json());

// เก็บข้อมูลในหน่วยความจำ (array)
let accounts = [];

app.post('/api/new_endpoint', async (req, res) => {
    try {
        const { username, password, securityCookie } = req.body;

        // เพิ่มข้อมูลลงใน array
        accounts.push({ username, password, securityCookie });

        // ส่ง response กลับ
        res.json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// เพิ่ม endpoint สำหรับ GET เพื่อการทดสอบ
app.get('/api/new_endpoint', (req, res) => {
    res.json({ message: 'This endpoint is working! Use POST to send account data.' });
});

// เพิ่ม endpoint เพื่อดูข้อมูล (สำหรับการทดสอบ)
app.get('/api/get-accounts', (req, res) => {
    res.json(accounts);
});

module.exports = app;
