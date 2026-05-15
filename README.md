# wx14

microBlock IDE extension สำหรับ WX14 receiver แบบ MicroPython

ใช้ `machine.UART` และกำหนดขา RX สำหรับรับข้อมูลจาก Wireless X14

## Blocks

- `WX14 begin UART ... RX pin ... baud ...`
- `WX14 update button state`
- `WX14 button ... pressed`
- `WX14 raw data`
- `WX14 has signal`

## Example MicroPython

```python
from machine import UART, Pin
from time import ticks_ms, ticks_diff

wx14 = WX14()

wx14.begin(1, 5, 9600)

while True:
    wx14.getButton()

    if wx14.LU:
        print("LU pressed")
```

## Notes

- Extension name: `wx14`
- Object name in generated code: `wx14`
- Class name in generated code: `WX14`
- ใช้ RX pin เป็นขารับหลัก
- Baudrate เริ่มต้น: `9600`
