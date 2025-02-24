    // ฟังก์ชันสำหรับสลับแสดง header โดยระบุ id ของ header ที่ต้องการ
    function toggleHeader(headerId) {
      const header = document.getElementById(headerId);
      if (header) {
        // ถ้า header แสดงอยู่ ให้ซ่อน ถ้าไม่แสดงให้แสดง
        header.style.display = (header.style.display === 'flex') ? 'none' : 'flex';
      }
    }

    // เพิ่ม event listener ให้กับแต่ละเมนูหลักที่ระบุ id แล้วแมปกับ header id ที่ต้องการ
    document.getElementById('his-stu').addEventListener('click', function(event) {
      event.stopPropagation();
      toggleHeader('header-his-stu');
    });

    document.getElementById('edu-stu').addEventListener('click', function(event) {
      event.stopPropagation();
      toggleHeader('header-edu-stu');
    });

    // ตัวอย่าง: หากต้องการให้เมนูอื่น ๆ (เช่น set-stu) ทำงานเพิ่มได้
    // document.getElementById('set-stu').addEventListener('click', function(event) {
    //   event.stopPropagation();
    //   // เพิ่มฟังก์ชันแสดง header หรือการกระทำอื่น ๆ ตามที่ต้องการ
    // });
