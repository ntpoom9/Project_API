const init = async () => {
    const allCustomer = await fetch(
        "http://localhost:5000/apis/customer", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());  //! แสดงรูปแบบเป็น json
    allCustomer.forEach((element) => addCustomer(element)); //! ส่งค่า element ไปยัง ฟังก์ชัน addRestaurants
}

const addCustomer = (element) => {
    const item = document.createElement("div"); //!  สร้าง div card สำหรับนำข้อมูลมาโชว์
    item.className = "card"; //! กำหนดชื่อ class
     //!  เรียกใช้ พารามิเตอร์ ตามชื่อ ฟิล เพื่อให้แสดงข้อมูล
    const card = `    
    <div class="card-body">
      <h5 class="card-title">ชื่อผู้ใช้ : ${element.customer_name}</h5>
      <div class="content-data">
      <p class="topic-cus">ไอดีผู้ใช้ : <span class="content-cus">${element.customer_id}</span></p>
      <p class="topic-cus">เบอร์โทร : <span class="content-cus">${element.phonenumber}</span></p>
      <p class="topic-cus">อีเมล : <span class="content-cus">${element.email}</span></p>
      <p class="topic-cus">ที่อยู่ : <span class="content-cus">${element.address}</span></p>
      </div>
      

      <a href="#" class="btn btn-danger" onclick="deleteCustomerAll(${element.customer_id})">ลบ</a>
      <a href="edit_customer.html?customer_id=${element.customer_id}" class="btn btn-warning">แก้ไข</a>
    </div>
    `;
    item.innerHTML = card;  //!เอาไปแทรกที่card ลงใน div
    const customerElement = document.querySelector(".customer"); //!เข้าถึง class หน้า HTML
    customerElement.appendChild(item); //!เพิ่มลงไป
}


const removeAllResult = () => {
    const customerElement = document.querySelector(".customer");
    customerElement.innerHTML = "";
}



const deleteCustomerAll = async (customer_id) => { //!บไอดีที่ส่งมา
    if (customer_id) { //!เช็ค customer_id
        try {
            const restaurant = await fetch(
                "http://localhost:5000/apis/customer/" + customer_id, { //!ต่อไอดีที่ส่งมาจากการกำปุ่ม Delete 
                method: "DELETE",          //!DELETE
                mode: "cors",
                cache: "no-cache",               //!6-8 บอกว่า server อยู่ที่เดียวกัน
                credentals: "same-origin",
                headers: {
                    "Content-type": "application/json"  //!ข้อมุลอยู่ในรูปแบบ json
                },
            }).then((response) => {
                return response.json();  //!ส่งค่าในรูปแบบ json
            }).then(() => {
                alert(`ลบข้อมูลผู้ใช้ ไอดีที่ ${customer_id} เรียบร้อยแล้ว`); //!แสดง alter ว่าลบแล้ว
                location.reload(); //!load หน้าใหม่หลัง Delete
            }
            );
        } catch (error) {
            alert(`Customer customer_id:${customer_id} not found!!`);
        }
    } else {    //!-- id ไม่พบ จะแสดงข้อความ
        alert("Customer customer_id is missing")
    }
}