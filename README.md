# adsolo-k8s

เป็น Template ของ adsolo-k8s

## Installation

ในโปรเจคนี้เราเตรียมไฟล์สำหรับ Run แบบต่าง ๆ ไว้ รายละเอียดมีดังนี้

### Step ที่ทำครั้งแรกเท่านั้น
ใส่ค่า hosts เมื่อเข้า adsolo-k8s-dev.com, api.adsolo-k8s-dev.com, admin.adsolo-k8s-dev.com, app.adsolo-k8s-dev.com ให้เรียกไปที่ Service frontend, backend, admin, app ตามลำดับ ใช้คำสั่งนี้ในการตั้งค่า

```
make hosts
```
---
## คำสั่งต่าง ๆ ที่ใช้งานได้

ลบ Hosts ที่ใส่ไว้
```
make rm-hosts
```

run project แบบ dev mode
```
make dcup-dev
```

run project แบบ production mode
```
make dcup-prod
```

ลบ containers ของ pixnode ที่ run
```
make dc-down
```

ลบ containers และ images ของ pixnode ที่ run
```
make dc-clear
```

ลบ images, containers, networks ของ docker ในเครื่อง
```
make dc-reset-to-factory
```

---

## เข้าใช้งาน
เมื่อสั่ง run ด้วยคำสั่ง make dcup-dev เรียบร้อย 

เว็บหลักต้องเข้าไปที่ (frontend/home) https://adsolo-k8s-dev.com หรือ http://localhost:3000

ส่วนจัดการ Admin (frontend/admin) https://admin.adsolo-k8s-dev.com หรือ http://localhost:3001

ส่วน app (frontend/app) https://app.adsolo-k8s-dev.com หรือ http://localhost:3002

ส่วน backend (backend) https://api.pixnode-dev.com หรือ http://localhost:2000