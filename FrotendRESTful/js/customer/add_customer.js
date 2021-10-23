const add = async () => {
  const customer_id = Number.parseInt(document.getElementById("customer_id").value);   //!เก็บค่าจาก input+คอนเวิดเป็นตัวเลข
  const customer_name = document.getElementById("customer_name").value;    //!เก็บค่าจาก input id customer_name
  const phonenumber = document.getElementById("phonenumber").value;     //!เก็บค่าจาก input id phonenumber
  const email = document.getElementById("email").value;                //!เก็บค่าจาก input id email
  const address = document.getElementById("address").value;       //!เก็บค่าจาก input id address
  if (customer_name && phonenumber && email && address) { //!ตรวจสอบค่า ว่ามีค่าส่งมาไหม
    const params = { //! set พารามิเตอร์
      // customer_id: customer_id,
      customer_name: customer_name,   //!กำหนดค่าตัวแปร ให้ตรงกับ ค่า property
      phonenumber: phonenumber,
      email: email,
      address: address,
    };
    try {
      const customer = await fetch( //! ส่งไปยัง server
        "http://localhost:5000/apis/customer",
        {
          method: "POST",   //!  ส่งเป็น post ไป
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",   //!คอนเวิดให้อยู่ในรูปแบบ json
          },
          body: JSON.stringify(params), //! เพิ่ม data
        }
      ).then((response) => {
        return response.json(); //! คอนเวิดให้อยู่ในรูปแบบ json
      }).then(() => {
        alert(`เพิ่มข้อมูลผู้ใช้เรียร้อยแล้ว`);
        window.location = './all_customer.html';
      });
    } catch (error) {    //! ตรวจสอบข้อยกเว้นในการที่จะเพิ่มข้อมูล
      alert(`เพิ่มข้อมูลผู้ใช้เรียร้อยแล้ว`);
      window.location = './all_customer.html';
    }
  } else {    //! ถ้ายังกรอกข้อมูลไม่ครบ จะแสดงข้อความ alert
    alert("ข้อมูลที่เพิ่มต้องไม่เป็นค่าว่าง");
  }
};