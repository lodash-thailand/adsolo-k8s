# adsolo-k8s
## ในส่วนของ Backend ต้องสร้างไฟล์ .env เพิ่มเติม
```
PORT=2000
MONGO_SERVER=mongodb://admin:123456@database:27017/adsolo-k8s
```
หรือปรับ `.env.example` เป็น `.env`

## วิธีการ deploy ระบบ
```
docker-compose up
```

## ทดสอบเพิ่มข้อมูลใส่ Backend
เข้าไปที่ http://localhost:2000/api/v1/insert/ข้อความที่ต้องการเพิ่ม
จะเพิ่มข้อความเข้าไปใน mongo

## api
http://localhost:2000/api/v1/examples แสดงรายการ examples ทั้งหมด (ข้อความที่พิมพ์เข้าไป)
http://localhost:2000/api/v1/examples/:mongoID แสดงรายการ example ID นั้น ๆ

## Project ของ Home
http://localhost:3000

## Project ของ App
http://localhost:3001